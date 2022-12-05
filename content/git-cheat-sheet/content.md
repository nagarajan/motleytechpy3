Title: Git Cheat Sheet
Date: 2016-02-09 01:25
Category: Technotes
Tags: Git
Authors: Nagarajan
Disqus_Identifier: git_cheat_sheet

Most common git commands / tricks / tips - concentrating on those that I have actually used (instead of trying to cover all commands).

<h4>Config commands</h4>

```bash
git config --global user.name <username>
git config --global user.email <email>
git config --global color.ui true

# shortcut aliases
git config --global alias.cm "commit -m" # git cm "commit message"
git config --global alias.st "status"    # git st === git status

# clone a repo
git clone <repo path> <folder name>

# adding a remote
git remote add <alias> <url>
```

<h4>Commonly used commands</h4>

```bash
# stage files
git add <file paths>
git add .   # current directory and all subdirs

# unstage files
git reset <file paths>
git reset # all staged files will be unstaged

# diff files
git diff <file path>
git diff --staged

# commit
git commit -m"message"
git commit --amend -m "Updated message for the previous commit"

# push to remote
git push <remote> <branch>

# pull changes and merge
git fetch <remote>
git merge <remote>/<branch>
git merge --abort

# rollback last commit - creates a new commit to undo last change
git revert HEAD

# create new branch
git checkout <branch>

# delete branch
git branch -d <branch>

# delete branch in remote
git push origin --delete <branch>
```


<h4>Moderately used commands</h4>

```bash
# show whats different in A wrt B
git diff branchB..branchA

# show commits in A which are not in B
git log branchB..branchA

# delete file
git rm <file>

# move or rename file
git mv <current_path> <new_path>

# Save modified and staged changes
git stash

# list stack-order of stashed file changes
git stash list

# write working from top of stash stack
git stash pop

# discard the changes from top of stash stack
git stash drop
```

<h4>Less commonly used commands</h4>

```bash
# rebase
git rebase <branch>

# clear staging and checkout commit
git reset --hard <commit>
```
