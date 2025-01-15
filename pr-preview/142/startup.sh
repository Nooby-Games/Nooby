#!/bin/sh

git rev-parse --show-toplevel
git config --get commit.template
git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/next-update refs/remotes/next-update
git status -z -uall
git checkout -q --track origin/next-update
git push -u origin next-update
git checkout -q master
git checkout -q --track origin/next-update
