# CSS Cheats

CSS Cheatsheets with icons for quick copy & paste.

----

## Making new cheatsheets

First off of course, fork the repo. Cheatsheets are JSON files in app/rulesets/cheatsheet_name.cheats. A cheatsheet contains css rules, each with a selector and some declarations. Check out flexbox.cheats/flexbox.json, it's rather simple. After you've made your new something.cheats folder, add some info about your cheatsheet to rulesets.json. Use the flexbox entry as an example.

For some declarations it makes sense to make a little image to make it easier to remember what the values do. The filename needs to be in the format `{property-name}_{value}.svg`.

When you're done, send a pull request to get the cheatsheet added to the app.