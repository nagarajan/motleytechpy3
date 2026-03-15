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

For tasks

1. cd tasks
2. npm install (install nvm and node if npm is missing)
3. npm run dev


## Publishing
1. Run `bash build.sh` to create the html files.
2. Commit and push git changes.
3. Log into server and run `bash publish.sh` command.
4. Check updated site.
5. Logout and Done.
