You can query app information using the *Launch Services* database to dump a *list of all registered apps*, then `grep` for the one you want (in this case *Google Chrome*), for example:

`/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -dump | grep -i "google chrome"`

Gives me the output:

```
path:          /Applications/Google Chrome.app/
executable:    Contents/MacOS/Google Chrome
path:          /Applications/Google Chrome.app/Contents/Versions/27.0.1453.116/Google Chrome Helper.app/
executable:    Contents/MacOS/Google Chrome Helper
```
