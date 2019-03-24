├──  error: ENOENT: no such file or directory, stat '/usr/local/lib/node_modules/@rubicon/generator-legion
├── eslint@5.2.0
├── grunt-cli@1.2.0
├── gulp-cli@2.0.1
├── jsdoc-to-markdown@4.0.1
└── npm@6.4.1




## Resources
https://stackoverflow.com/questions/19874582/change-default-global-installation-directory-for-node-js-modules-in-windows/42914008#42914008

## Node/NPM Global Config
Building on the installation concept of chocolatey and the idea suggested by @Tracker, what worked for me was to do the following and all users on windows were then happy working with nodejs and npm.

Choose C:\ProgramData\nodejs as installation directory for nodejs and install nodejs with any user that is a member of the administrator group.

Create a folder called npm-cache at the root of the installation directory, which after following above would be C:\ProgramData\nodejs\npm-cache.

Create a folder called etc at the root of the installation directory, which after following above would be C:\ProgramData\nodejs\etc.

Set NODE environment variable as C:\ProgramData\nodejs.

Set NODE_PATH environment variable as  C:\ProgramData\nodejs\node_modules.

Ensure %NODE% environment variable previously created above is added (or its path) is added to %PATH% environment variable.

Edit %NODE_PATH%\npm\npmrc with the following content prefix=C:\ProgramData\nodejs

From command prompt, set the global config like so...

npm config --global set prefix "C:\ProgramData\nodejs"

npm config --global set cache "C:\ProgramData\nodejs\npm-cache"

It is important the steps above are carried out preferably in sequence and before updating npm (npm -g install npm@latest) or attempting to install any npm module.

Performing the above steps helped us running nodejs as system wide installation, easily available to all users with proper permissions. Each user can then run node and npm as required.




```
NODE_DEBUG                ','-separated list of core modules that should print debug information
NODE_DEBUG_NATIVE         ','-separated list of C++ core debug categories that should print debug output
NODE_DISABLE_COLORS       set to 1 to disable colors in the REPL
NODE_EXTRA_CA_CERTS       path to additional CA certificates file
NODE_NO_WARNINGS          set to 1 to silence process warnings
NODE_OPTIONS              set CLI options in the environment via a space-separated list
NODE_PATH                 ':'-separated list of directories prefixed to the module search path
NODE_PENDING_DEPRECATION  set to 1 to emit pending deprecation warnings
NODE_PRESERVE_SYMLINKS    set to 1 to preserve symbolic links when resolving and caching modules
NODE_REDIRECT_WARNINGS    write warnings to path instead of stderr
NODE_REPL_HISTORY         path to the persistent REPL history file
NODE_V8_COVERAGE          directory to output v8 coverage JSON to
OPENSSL_CONF              load OpenSSL configuration from file


; default values
access = null
allow-same-version = false
also = null
always-auth = false
audit = true
audit-level = "low"
auth-type = "legacy"
bin-links = true
browser = null
ca = null
cache = "/Users/idettman/.npm"
cache-lock-retries = 10
cache-lock-stale = 60000
cache-lock-wait = 10000
cache-max = null
cache-min = 10
cafile = undefined
cert = null
cidr = null
color = true
commit-hooks = true
depth = null
description = true
dev = false
dry-run = false
editor = "vi"
engine-strict = false
fetch-retries = 2
fetch-retry-factor = 10
fetch-retry-maxtimeout = 60000
fetch-retry-mintimeout = 10000
force = false
git = "git"
git-tag-version = true
global = false
global-style = false
globalconfig = "/usr/local/etc/npmrc"
globalignorefile = "/usr/local/etc/npmignore"
group = 1786577421
ham-it-up = false
heading = "npm"
https-proxy = null
if-present = false
ignore-prepublish = false
ignore-scripts = false
init-author-email = ""
init-author-name = ""
init-author-url = ""
init-license = "ISC"
init-module = "/Users/idettman/.npm-init.js"
init-version = "1.0.0"
json = false
key = null
legacy-bundling = false
link = false
local-address = undefined
loglevel = "notice"
logs-max = 10
; long = false (overridden)
maxsockets = 50
message = "%s"
; metrics-registry = null (overridden)
node-options = null
node-version = "11.0.0"
noproxy = null
offline = false
onload-script = null
only = null
optional = true
otp = null
package-lock = true
package-lock-only = false
parseable = false
prefer-offline = false
prefer-online = false
prefix = "/usr/local"
preid = ""
production = false
progress = true
proxy = null
read-only = false
rebuild-bundle = true
registry = "https://registry.npmjs.org/"
rollback = true
save = true
save-bundle = false
save-dev = false
save-exact = false
save-optional = false
save-prefix = "^"
save-prod = false
scope = ""
script-shell = null
scripts-prepend-node-path = "warn-only"
searchexclude = null
searchlimit = 20
searchopts = ""
searchstaleness = 900
send-metrics = false
shell = "/bin/bash"
shrinkwrap = true
sign-git-commit = false
sign-git-tag = false
sso-poll-frequency = 500
sso-type = "oauth"
strict-ssl = true
tag = "latest"
tag-version-prefix = "v"
timing = false
tmp = "/var/folders/q5/tpgz39_j7hg0gccdgjs6tkj4wq_szw/T"
umask = 18
unicode = true
unsafe-perm = true
update-notifier = true
usage = false
user = 0
; user-agent = "npm/{npm-version} node/{node-version} {platform} {arch}" (overridden)
userconfig = "/Users/idettman/.npmrc"
version = false
versions = false
viewer = "man"
```