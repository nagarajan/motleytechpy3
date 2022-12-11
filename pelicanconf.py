AUTHOR = 'Nagarajan'
SITENAME = 'MotleyTech'
TITLE = 'MotleyTech - variegated, technical and interesting'
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
STATIC_PATHS = ['images', 'js', 'css', 'fonts']
EXTRA_PATH_METADATA = {
    'images/favicon.ico': {'path': 'favicon.ico'},
}

PLUGIN_PATHS = ["plugins"]
PLUGINS = [
    "render_math",
    "custom_plugin"
]

# Landing Page
PROJECTS_TITLE = "Other distractions..."
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
        "description": "Mathy stuff - better than Numberphile",
    },
    {
        "name": "Numberphile",
        "url": "https://www.youtube.com/c/numberphile",
        "description": "Interesting mathy stuff",
    },
    {
        "name": "JSConf",
        "url": "https://www.youtube.com/c/JSConfEU",
        "description": "JSConf youtube channel",
    },
    {
        "name": "Pycon",
        "url": "https://www.youtube.com/c/PyConUS",
        "description": "PyCon youtube channel",
    },
    {
        "name": "Mandelbrot zoom",
        "url": "https://youtu.be/LhOSM6uCWxk",
        "description": "Mesmerizing Mandelbrot fractal zoom"
    },
    {
        "name": "Douglas adams videos",
        "url": "https://www.youtube.com/watch?v=_ZG8HBuDjgc&list=PLlfk9bqzo-ZlpfJoGaMgyo_b5gTYS0-OX&index=1",
        "description": "A playlist of Douglas Adam's videos on youtube",
    },
    {
        "name": "Mr Bean",
        "url": "https://www.youtube.com/user/MrBean/videos",
        "description": "Mr Bean's channel on Youtube",
    },
]

DIRECT_TEMPLATES = ["index", "technotes", "tags", "categories", "archives", "about", "404", "privates"]

LANDING_PAGE_TITLE = "And now, for something almost entirely unlike tea..."
USE_SHORTCUT_ICONS = True
RECENT_ARTICLE_SUMMARY = True

DISQUS_SITENAME = "motleytech"
GOOGLE_ANALYTICS = "G-V8WZYM91B4"
