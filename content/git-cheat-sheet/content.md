Title: Git Cheat Sheet
Date: 2019-02-09 01:25
Category: Technotes
Tags: Git
Authors: Nagarajan
Disqus_Identifier: git_cheat_sheet

Most common git commands / tricks / tips - concentrating on those that I have actually used (instead of trying to cover all commands).

<h4>Most Commonly used commands</h4>

```bash
git config --global user.name nagarajan
git config --global user.email nag.rajan@gmail.com
git config --global color.ui true

# shortcut aliases
git config --global alias.cm "commit -m"
git config --global alias.st "status"
```

<h4>Moderately used commands</h4>

More commonly used commands

View changes on branchA wrt branchB.

```bash
git log branchB..branchA
```

Stashing and unstashing changes

```bash
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
