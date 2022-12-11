Title: Dev env commands and tips
Date: 2020-10-13 09:12
Category: Private
Tags: dev
Authors: Nagarajan
Disqus_Identifier: dev_env_tips

<h4>Fix for the git ssh identity issue </h4>

```bash
eval "$(ssh-agent -s)"
# this give the pid (process id of the ssh-agent)

# kill that pid
kill -9 <pid>

# restart ssh-agent
eval "$(ssh-agent -s)"

# add the ssh key to the agent
ssh-add ~/.ssh/id_gh_nagarajan

# test ssh connection
ssh -T git@github.com
```

<h4>Move files on the web server to the nginx public folder</h4>

```bash
# cd to the right folder
cd dev/motleytechpy3

# copy files
git pull; sudo cp -r output/* /var/www/motleytech/html
```
