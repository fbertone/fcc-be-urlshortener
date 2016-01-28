# Free Code Camp API Basejump: URL Shortener

## User stories:

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. When I visit that shortened URL, it will redirect me to my original link.


### Example creation usage:
* http://localhost:5000/new/https://www.google.com
* http://localhost:5000/new/http://freecodecamp.com/news

> If you want to pass a site that doesn't exist (or an invalid url) for some reason you can do:
* http://localhost:5000/new/invalid?allow=true

### Example creation output:
>  { "original_url": "http://freecodecamp.com/", "short_url": "http://localhost:5000/0" }

### Usage:
> http://localhost:5000/4

### Will redirect to:
> http://freecodecamp.com/

## Live preview
https://fbertone-fcc-urls.herokuapp.com/

## TODO
* Add tests

## Info
URL Shortener project for [Free Code Camp] Back End Certification.

###License
**MIT**

[Free Code Camp]: <http://www.freecodecamp.com>
