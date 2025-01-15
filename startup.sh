#!/bin/sh

# Get the top-level directory of the git repository
git rev-parse --show-toplevel

# Get the commit template if set
git config --get commit.template

# Get information about the current branch
current_branch=$(git symbolic-ref --short HEAD)

# Get reference information for the current branch
git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/$current_branch refs/remotes/$current_branch

# Show the status of the working directory
git status -z -uall

# Checkout and track the remote branch (if it exists)
git checkout -q --track origin/$current_branch 2>/dev/null || echo "Remote branch origin/$current_branch does not exist"

# Push the current branch and set the upstream
git push -u origin $current_branch

# Checkout the main branch (assuming it's named 'main' or 'master')
git checkout -q main 2>/dev/null || git checkout -q master

# Checkout and track the original branch again
git checkout -q --track origin/$current_branch 2>/dev/null || echo "Remote branch origin/$current_branch does not exist"
