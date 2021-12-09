AUTHOR = 'Nagarajan'
SITENAME = 'MotleyTech.net'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'https://getpelican.com/'),
         ('Python.org', 'https://www.python.org/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = "themes/elegant"
STATIC_PATHS = ['images', 'js', 'css']
EXTRA_PATH_METADATA = {
    'images/favicon.ico': {'path': 'favicon.ico'},
}

PLUGIN_PATHS = ["plugins"]
PLUGINS = [
    "render_math"
]

# Landing Page
PROJECTS_TITLE = "Other interesting things..."
PROJECTS = [
    {
        "name": "Veritasium",
        "url": "https://www.youtube.com/c/veritasium",
        "description": "Interesting Sciency stuff",
    },
    {
        "name": "Smarter Every Day",
        "url": "https://www.youtube.com/c/smartereveryday",
        "description": "More sciency stuff",
    },
    {
        "name": "Mathologer",
        "url": "https://www.youtube.com/c/Mathologer",
        "description": "Better and more mathy than numberphile",
    },
    {
        "name": "Numberphile",
        "url": "https://www.youtube.com/c/numberphile",
        "description": "Interesting mathy stuff",
    },
    {
        "name": "JSConf",
        "url": "https://www.youtube.com/c/JSConfEU",
        "description": "Useful for JS knowledge",
    },
    {
        "name": "Vercel (NextJS) Youtube Channel",
        "url": "https://www.youtube.com/channel/UCLq8gNoee7oXM7MvTdjyQvA",
        "description": "Useful for Next.js knowledge",
    },
    {
        "name": "Pycon",
        "url": "https://www.youtube.com/c/PyConUS",
        "description": "PyCon youtube channel",
    },
    {
        "name": "Douglas adams videos",
        "url": "https://www.youtube.com/watch?v=_ZG8HBuDjgc&list=PLlfk9bqzo-ZlpfJoGaMgyo_b5gTYS0-OX&index=1",
        "description": "Bunch of Douglas Adam's videos on youtube",
    },
    {
        "name": "Best of Monty Python",
        "url": "https://www.youtube.com/watch?v=imhrDrE4-mI&list=PLhboEWcuNB1__DiH8Z5MLYigS-KVxWktS&index=1",
        "description": "Bunch of clips from Monty Python",
    },
]

LANDING_PAGE_TITLE = "And now, for something almost entirely unlike tea..."
USE_SHORTCUT_ICONS = True

DISQUS_SITENAME = "motleytech"