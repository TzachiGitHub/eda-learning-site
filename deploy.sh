#!/bin/bash

# EDA Learning Site - GitHub Deployment Script
# This script handles repository creation and pushing to GitHub

set -e  # Exit on error

echo "🚀 EDA Learning Site - GitHub Deployment"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "app.js" ]; then
    echo "❌ Error: Not in the correct project directory"
    echo "Please run this from /workspace/group/coding-projects/eda-learning-site/"
    exit 1
fi

# Get GitHub username
if [ -z "$GITHUB_USERNAME" ]; then
    read -p "Enter your GitHub username: " GITHUB_USERNAME
fi

# Check if token is available
if [ -z "$GITHUB_TOKEN" ]; then
    echo ""
    echo "⚠️  GITHUB_TOKEN environment variable not found"
    echo "You can either:"
    echo "  1. Set it: export GITHUB_TOKEN=your_token_here"
    echo "  2. Enter it now (hidden input)"
    echo "  3. Let git prompt you during push (recommended)"
    echo ""
    read -p "Do you want to enter token now? (y/N): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -sp "Enter GitHub Personal Access Token: " GITHUB_TOKEN
        echo ""
    fi
fi

# Repository name
REPO_NAME="eda-learning-site"

echo ""
echo "📝 Configuration:"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $REPO_NAME"
echo "  Token: $([ -n "$GITHUB_TOKEN" ] && echo '✅ Set' || echo '❌ Not set (will prompt during push)')"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    echo "Run: git init && git branch -m main"
    exit 1
fi

# Check if there are commits
if ! git rev-parse HEAD >/dev/null 2>&1; then
    echo "❌ Error: No commits found"
    echo "Run: git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote already exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "ℹ️  Remote 'origin' already exists"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Current: $REMOTE_URL"
    read -p "Remove and re-add? (y/N): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo "✅ Removed existing remote"
    else
        echo "Keeping existing remote"
    fi
fi

# Add remote if it doesn't exist
if ! git remote get-url origin >/dev/null 2>&1; then
    if [ -n "$GITHUB_TOKEN" ]; then
        # Use token in URL (for automated pushing)
        REPO_URL="https://$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        echo "🔗 Adding remote with token authentication..."
    else
        # Standard URL (git will prompt for credentials)
        REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        echo "🔗 Adding remote (will prompt for credentials)..."
    fi

    git remote add origin "$REPO_URL"
    echo "✅ Remote added successfully"
fi

echo ""
echo "📤 Pushing to GitHub..."
echo ""

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your site is now on GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo ""
    echo "1. Enable GitHub Pages:"
    echo "   Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
    echo "   Source: main branch"
    echo "   Click Save"
    echo ""
    echo "2. Your site will be live at:"
    echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
    echo ""
    echo "   (Wait 1-2 minutes for deployment)"
    echo ""
    echo "🔗 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common issues:"
    echo "  • Repository doesn't exist on GitHub - Create it first at:"
    echo "    https://github.com/new"
    echo "  • Invalid credentials - Check your token or username"
    echo "  • Token lacks 'repo' permissions - Generate new token with full repo access"
    echo ""
    exit 1
fi
