# Hello visitor
Welcome to the source repo for the motleytech.net website.

## Installation

1. `git clone git@github.com:nagarajan/motleytechpy3.git`
2. `cd motleytechpy3`
3. `virtualenv venv`
4. `. venv/bin/activate`
5. `pip install -r requirements.txt`
6. `make devserver`
7. Visit http://localhost:8000 in the browser


## Publishing
1. Run `make html` to create the html files.
2. Commit and push git changes.
3. Log into server and pull latest changes (log into digital ocean and launch droplet console).
4. Copy output files (/root/dev/motleytechpy3/output) to server public folder (/var/www/html).

`git pull; sudo cp -r output/* /var/www/motleytech/html`

5. Check updated site.
6. Logout and Done.
