const rqLessons = {
    'rq1-1': { title: '1.1 The Problem React Query Solves', xp: 50, content: `
        <div class="hook-story">🚀 <strong>Real World:</strong> Before React Query, every team reinvented the same wheel: useEffect + useState + loading flag + error flag + refetch logic. 50 lines of messy code per data fetch. TanStack Query replaces all of that with 3 lines — and adds caching, background refetching, and deduplication for free.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> React Query is one of the most downloaded React libraries (7M+ weekly downloads). It fundamentally changes how you think about server data in React apps.</div>
        <h3>😩 Before React Query</h3>
        <pre><code>function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(\`/api/users/\${userId}\`)
            .then(r => r.json())
            .then(data => { setUser(data); setLoading(false); })
            .catch(err => { setError(err); setLoading(false); });
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;
    return <div>{user.name}</div>;
    // Also: no caching, no background refresh, no deduplication...
}</code></pre>
        <h3>😊 With React Query</h3>
        <pre><code>function UserProfile({ userId }) {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json())
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;
    return <div>{user.name}</div>;
    // Also: automatic caching, background refetch, deduplication ✅
}</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What is the primary problem React Query solves?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Managing server state (loading, error, caching, refetching) is complex. React Query handles all of it.')">Managing server state — loading, errors, caching, and refetching — in a clean, reusable way</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','React Query handles server state, not client state like form inputs or UI toggles.')">Managing client-side state like form inputs and UI toggles</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Name 3 things React Query does for you that you'd have to build manually with useEffect.</p><textarea placeholder="1. ... 2. ... 3. ..."></textarea></div>
    `},
    'rq1-2': { title: '1.2 Setup & QueryClientProvider', xp: 50, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> React Query replaces useEffect + useState data fetching. Handles caching, loading, errors, background refetch automatically.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> QueryClient is the global cache store. Every query across your entire app shares the same cache — just like Apollo Client. If two components fetch the same user, only ONE network request is made.</div>
        <h3>📦 Setup</h3>
        <pre><code>npm install @tanstack/react-query
npm install @tanstack/react-query-devtools  # Essential for dev!</code></pre>
        <pre><code>// main.tsx / index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,  // 5 minutes
            retry: 1,
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <YourApp />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}</code></pre>
        <h3>🔧 React Query DevTools</h3>
        <p>Install the DevTools — they show you every query, its status, data, and timing. Essential for understanding what React Query is doing under the hood.</p>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Why wrap your app in QueryClientProvider?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! QueryClientProvider provides the global cache to all components. Without it, useQuery can\'t access the cache.')">It provides the global query cache to all components via React context</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','QueryClientProvider provides the cache, not authentication.')">It handles user authentication</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What is the QueryClient and what does it do?</p><textarea placeholder="QueryClient is..."></textarea></div>
    `},
    'rq1-3': { title: '1.3 useQuery Deep Dive', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Wrap app in QueryClientProvider. QueryClient = global cache. Install DevTools.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> From the TkDodo blog (32 articles on React Query, by the maintainer): "React Query does NOT invoke the queryFn on every re-render." This surprises most developers. Understanding staleTime is crucial to avoiding unexpected fetches.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> useQuery is the core of React Query. Mastering queryKey, queryFn, and staleTime means you understand 80% of the library.</div>
        <h3>🔍 useQuery Anatomy</h3>
        <pre><code>const {
    data,           // The returned data (undefined when loading)
    isLoading,      // True on FIRST fetch (no cached data)
    isFetching,     // True whenever a request is in-flight
    isError,        // True if query failed
    error,          // The error object
    refetch,        // Function to manually trigger refetch
    status,         // 'pending' | 'success' | 'error'
} = useQuery({
    queryKey: ['users', filters],   // Unique cache key — ARRAY format!
    queryFn: () => fetchUsers(filters),
    staleTime: 60_000,              // Data fresh for 60 seconds
    enabled: !!userId,              // Only fetch if userId exists
});</code></pre>
        <h3>🔑 queryKey is Everything</h3>
        <pre><code>// Different keys = different cache entries
useQuery({ queryKey: ['user', 1] })  // user 1
useQuery({ queryKey: ['user', 2] })  // user 2 (separate cache!)
useQuery({ queryKey: ['users', { page: 1 }] })  // page 1
useQuery({ queryKey: ['users', { page: 2 }] })  // page 2</code></pre>
        <h3>⏱️ staleTime vs isFetching</h3>
        <ul>
            <li><strong>staleTime: 0</strong> (default) — data immediately stale after fetch. Refetches on window focus, component mount.</li>
            <li><strong>staleTime: 60000</strong> — data fresh for 60s. No refetch unless key changes or manually triggered.</li>
            <li><code>isLoading</code> = no cached data + fetching. <code>isFetching</code> = any request in-flight (including background).</li>
        </ul>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Two components both call useQuery with the same queryKey. How many network requests?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! React Query deduplicates requests. Same queryKey = same cache entry = ONE request, both components get the data.')">One — React Query deduplicates requests with the same queryKey</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','React Query deduplicates! Both components share the same cache entry and only one request fires.')">Two — one per component</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What is the difference between isLoading and isFetching?</p><textarea placeholder="isLoading: ... isFetching: ..."></textarea></div>
    `},
    'rq1-4': { title: '1.4 useMutation', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> useQuery — queryKey (cache key), queryFn (fetch fn), staleTime (freshness). Deduplication = one request per unique key.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> When you submit a form on a React app (create post, update profile), that's a mutation. React Query's useMutation handles loading states, error handling, and — most importantly — cache invalidation after success.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Mutations are the write side. Understanding onSuccess → invalidateQueries is the most important React Query pattern.</div>
        <h3>✏️ useMutation</h3>
        <pre><code>const queryClient = useQueryClient();

const createPost = useMutation({
    mutationFn: (newPost) => fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()),

    onSuccess: () => {
        // Invalidate the posts list — force refetch!
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
        console.error('Failed to create post:', error);
    }
});

// Usage
<button
    onClick={() => createPost.mutate({ title: 'Hello', body: '...' })}
    disabled={createPost.isPending}
>
    {createPost.isPending ? 'Saving...' : 'Create Post'}
</button></code></pre>
        <h3>🔑 The invalidateQueries Pattern</h3>
        <p>After a mutation succeeds → call <code>invalidateQueries</code> → React Query marks those queries as stale → they refetch → UI shows fresh data. This is the core React Query workflow.</p>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>After creating a new post, why do you call invalidateQueries(['posts'])?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The cached posts list is now stale (missing the new post). invalidateQueries marks it stale and triggers a refetch.')">The cached posts list is stale — invalidateQueries triggers a refetch to show the new post</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','invalidateQueries isn\'t for clearing errors — it marks cache as stale to trigger a refetch.')">To clear error states</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Describe the full mutation → cache invalidation flow.</p><textarea placeholder="User submits form → mutationFn fires → onSuccess → invalidateQueries → ..."></textarea></div>
    `},
    'rq1-5': { title: '1.5 Quiz: Core Concepts', xp: 150, content: `
        <div class="lesson-recap">🔄 <strong>Module 1 summary:</strong> useQuery (queryKey, queryFn, staleTime, deduplication). useMutation (mutationFn, onSuccess, invalidateQueries). QueryClientProvider wraps app.</div>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>What does staleTime: 60000 mean?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Data is considered fresh for 60 seconds. No background refetch during this window even if window is refocused.')">Data is considered fresh for 60 seconds — no background refetch during that window</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','staleTime affects staleness, not how long data is kept in memory (that\'s gcTime).')">Data is deleted from cache after 60 seconds</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>What's the correct queryKey for fetching user 42's posts?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','String keys work but lose the ability to invalidate by prefix. Array format is the recommended pattern.')">queryKey: "user-42-posts"</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Array format is correct. Descriptive + includes the dynamic variable. Can invalidate with [\'user\', 42] prefix.')">queryKey: ['user', 42, 'posts']</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>After deleting a post, what should you call in onSuccess?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','window.location.reload() is a brute-force approach that loses all state. Use invalidateQueries.')">window.location.reload()</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ queryClient.invalidateQueries marks the posts cache as stale → React Query refetches → UI updates.')">queryClient.invalidateQueries({ queryKey: [\'posts\'] })</button>
        <div class="quiz-feedback"></div></div>
        <h3>🎯 Module 1 Complete!</h3>
    `},
    'rq2-1': { title: '2.1 Dependent Queries', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Module 1 complete!</strong> useQuery, useMutation, QueryClientProvider, staleTime, invalidateQueries. Now: advanced patterns.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Fetch the user first, then use their ID to fetch their orders. This is dependent fetching — common in every real app. React Query handles it with the enabled option.</div>
        <pre><code>function UserOrders({ userId }) {
    // Step 1: Fetch user
    const { data: user } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    });

    // Step 2: Fetch orders ONLY when user is loaded
    const { data: orders } = useQuery({
        queryKey: ['orders', user?.id],
        queryFn: () => fetchOrders(user.id),
        enabled: !!user?.id,  // ← Key! Don't run until user exists
    });
}</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What does enabled: !!user?.id do?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! !!user?.id converts to boolean. If user is undefined (not loaded yet), enabled is false and the query doesn\'t run.')">Prevents the query from running until user.id exists (truthy)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','enabled controls whether the query runs at all, not if it runs in parallel.')">Makes the query run in parallel with the user query</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">When would you use the enabled option?</p><textarea placeholder="I'd use enabled when..."></textarea></div>
    `},
    'rq2-2': { title: '2.2 Pagination', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Dependent queries — use enabled to conditionally run queries. enabled: !!value prevents running until value exists.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> GitHub's Issues list, Twitter's feed, any paginated list — React Query makes pagination elegant with keepPreviousData, so users see the current page while the next one loads.</div>
        <pre><code>function PaginatedPosts() {
    const [page, setPage] = useState(1);

    const { data, isPlaceholderData } = useQuery({
        queryKey: ['posts', { page }],
        queryFn: () => fetchPosts(page),
        placeholderData: keepPreviousData, // Keep showing page 1 while page 2 loads!
    });

    return (
        <>
            {data?.posts.map(post => <PostCard key={post.id} post={post} />)}
            <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
            >Previous</button>
            <button
                onClick={() => setPage(p => p + 1)}
                disabled={isPlaceholderData || !data?.hasMore}
            >Next</button>
        </>
    );
}</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does keepPreviousData do and why is it good UX?</p><textarea placeholder="keepPreviousData shows..."></textarea></div>
    `},
    'rq2-3': { title: '2.3 Optimistic Updates', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Pagination with keepPreviousData — show current page while fetching next. No loading flash between pages.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> When you like a tweet, the heart turns red INSTANTLY — before the server responds. That's an optimistic update. Facebook uses this everywhere. If the server fails, the UI rolls back. React Query makes this elegant.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Optimistic updates make apps feel instant. Users don't wait for the server to see their action take effect.</div>
        <pre><code>const toggleLike = useMutation({
    mutationFn: ({ postId, liked }) =>
        fetch(\`/api/posts/\${postId}/like\`, { method: liked ? 'DELETE' : 'POST' }),

    onMutate: async ({ postId, liked }) => {
        // 1. Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['posts'] });

        // 2. Save current state (for rollback)
        const previousPosts = queryClient.getQueryData(['posts']);

        // 3. Optimistically update the cache
        queryClient.setQueryData(['posts'], (old) =>
            old.map(post =>
                post.id === postId
                    ? { ...post, liked: !liked, likesCount: liked ? post.likesCount - 1 : post.likesCount + 1 }
                    : post
            )
        );

        return { previousPosts }; // For rollback
    },

    onError: (err, variables, context) => {
        // 4. Roll back on error
        queryClient.setQueryData(['posts'], context.previousPosts);
    },

    onSettled: () => {
        // 5. Always refetch to sync with server
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
});</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Explain the 5 steps of an optimistic update with rollback.</p><textarea placeholder="1. Cancel... 2. Save... 3. Update... 4. Rollback... 5. Refetch..."></textarea></div>
    `},
    'rq2-4': { title: '2.4 Infinite Queries', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Optimistic updates — update cache immediately, roll back on error, sync with server after.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Instagram's feed, Twitter's timeline, Reddit's posts — all infinite scroll. useInfiniteQuery handles the "load more" pattern, accumulating pages of data while keeping track of the next cursor/page.</div>
        <pre><code>const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
} = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = null }) =>
        fetch(\`/api/posts?cursor=\${pageParam}&limit=10\`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // undefined = no more pages
});

// Flatten all pages into one array
const allPosts = data?.pages.flatMap(page => page.posts) ?? [];

return (
    <>
        {allPosts.map(post => <PostCard key={post.id} post={post} />)}
        <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
        >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
    </>
);</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does getNextPageParam return and what happens when it returns undefined?</p><textarea placeholder="getNextPageParam returns... undefined means..."></textarea></div>
    `},
    'rq2-5': { title: '2.5 Final Assessment', xp: 250, content: `
        <div class="lesson-recap">🔄 <strong>Module 2 summary:</strong> Dependent queries, pagination, optimistic updates, infinite queries.</div>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>You want to fetch user orders but only after the user is loaded. How?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ enabled: !!user?.id — query only runs when user.id is truthy (user is loaded).')">Set enabled: !!user?.id on the orders query</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Nesting useQuery inside another is invalid — hooks can\'t be conditional or nested.')">Nest the useQuery inside the user useQuery\'s onSuccess</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>A like button should feel instant. Which pattern?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Just invalidating after mutation causes a loading flash — the button doesn\'t feel instant.')">Invalidate queries after mutation</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Optimistic update! Update cache immediately in onMutate, rollback in onError, sync in onSettled.')">Optimistic update with rollback on error</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>Instagram-style feed that loads more on scroll. Which hook?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','useQuery fetches a single page — you\'d have to manage page accumulation manually.')">useQuery with a page state variable</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ useInfiniteQuery accumulates pages, provides fetchNextPage, hasNextPage, and isFetchingNextPage.')">useInfiniteQuery</button>
        <div class="quiz-feedback"></div></div>
        <h3>🎓 React Query Course Complete!</h3>
        <ul>
            <li>✅ Server state vs client state — the paradigm shift</li>
            <li>✅ QueryClientProvider + QueryClient setup</li>
            <li>✅ useQuery — queryKey, queryFn, staleTime, enabled</li>
            <li>✅ useMutation — mutationFn, onSuccess, invalidateQueries</li>
            <li>✅ Dependent queries with enabled</li>
            <li>✅ Pagination with keepPreviousData</li>
            <li>✅ Optimistic updates with rollback</li>
            <li>✅ Infinite queries with useInfiniteQuery</li>
        </ul>
        <p><strong>You now think in server state. 🚀</strong></p>
    `}
};

const rqFlashcards = [
    { term: 'useQuery', def: 'Fetch and cache server data. Requires queryKey (cache key) and queryFn (async fetch function). Returns data, isLoading, error.' },
    { term: 'queryKey', def: 'Unique identifier for cached data. Array format: [\'user\', userId]. Same key = same cache entry = deduplicated requests.' },
    { term: 'staleTime', def: 'How long data is considered fresh. Default: 0 (immediately stale). Fresh data = no background refetch on window focus.' },
    { term: 'gcTime', def: 'How long unused data stays in cache (garbage collection time). Default: 5 minutes. Different from staleTime!' },
    { term: 'isLoading vs isFetching', def: 'isLoading: first fetch with no cached data. isFetching: any request in-flight (including background). isLoading = subset of isFetching.' },
    { term: 'useMutation', def: 'Handle write operations. mutationFn = async function. onSuccess/onError/onSettled callbacks. Returns mutate function + isPending.' },
    { term: 'invalidateQueries', def: 'Mark queries as stale to trigger a refetch. Call in onSuccess after mutations to refresh affected data.' },
    { term: 'enabled', def: 'Conditionally run a query. enabled: false = query never runs. enabled: !!userId = only run when userId exists.' },
    { term: 'refetchOnWindowFocus', def: 'Default: true. React Query refetches when tab regains focus. Common source of unexpected requests in development.' },
    { term: 'keepPreviousData', def: 'Show previous page data while next page loads. Prevents loading flash on pagination.' },
    { term: 'Optimistic Update', def: 'Update cache immediately (before server response). Roll back in onError. Sync in onSettled. Makes UI feel instant.' },
    { term: 'useInfiniteQuery', def: 'Accumulate multiple pages of data. fetchNextPage, hasNextPage, getNextPageParam. For infinite scroll patterns.' },
];
