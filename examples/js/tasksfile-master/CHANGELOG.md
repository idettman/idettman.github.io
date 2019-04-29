## 5.0.0 beta

*Renames:*

- renaming project from `runjs` to `tasksfile`
- `run` api function renamed to `sh`
- calling tasks occurs through `npx task` not `npx run` script

*Mechanics:*

- options are passed to task function as first argument, 
they are not available through `options(this)` anymore

- to be able to run tasks, entry to `npm scripts` must be added.
`npx task` alias runs `task` entry from there. `tasksfile.js` will
act now like a script which allows greated flexibility how it is run,
like: `"task": "node tasksfile.js"` or `"task": "ts-node tasksfile.ts"`.
That means tasksfile no longer reads `runjs` config from `package.json`
which allowed to use `babel-register`, `ts-node/register` or change
name of `runfile.js` as this can be directly adjusted in `npm scripts`
entry.

- to be able to call a task from `tasksfile.js`, 
task must be exposed through `cli` api function, not
exported from module as it was before


*Removals*

- removing `option` and `options` helper
- removing autocomplete feature


## 4.4.0

- source code migrated from `Flow/Babel` to `TypeScript`

## 4.3.0

- adding experimental bash autocompletion feature

## 4.2.0

*Changes:*

- introducing `help` utility function
- improving task docs generation by annotations

*Dev env:*

- improving e2e tests
- using external module `microcli` as for cli args parsing and `--help` handling

## 4.1.0

- remove log option from `run` api command
- upgrade dependent packages
- introducing `options` helper, deprecating `option`
- better printing of methods list when calling `run`

*For development env:*

- add tests coverage check
- introducing `flow` types

## 4.0.0

**Changes:**

- removing `ask` and `generate` helpers from api, to keep runjs codebase more focused about its main purpose
- dropping support for `node` < 6.11.1
- support for other than `Babel` transpilers, like `TypeScript`
- log option to run function, when `false` it does not log the command
- documentation updates
- support for `async` / `await`
- `option` helper

**Migration from 3.x to 4.x procedure:**

- make sure you have node version >=6.11.1
- if you use Babel you need to add `"runjs": {requires: ["./node_modules/babel-register"]}` config to your package.json, otherwise Babel transpiler won't be picked up
- find alternatives for ask and generate, those are not supported by runjs anymore

## 3.4.1

- changing documentation format for calling `run` without arguments (task documentation)
- changing name of the prop for documentation from doc to help
- when typing `--help` option with task run it will provide documentation only for that task (`run sometask --help`)

## 3.3.0

- migrating to `yarn`
- removing task execution logging (decoration function) as it not working well with exporting pure functions
- passing task options through `this.options` inside a task function

## 3.2.1

- fixes within handling dashed arguments when calling tasks, dashed arguments can be "spaced" by "-" or "." now, for example: `--some-argument` or `--some.argument` (#49)

## 3.2.0

- documenting tasks args when calling `run` without arguments
- presenting list of available tasks from `runfile.js` in more readable way
- passing `stdio` directly to `spawn` / `execSync`
- changing run api where now it resolves/returns null by default and resolves/returns with value for option stdio: 'pipe'. This - allows to return colours to the terminal if provided by commands outcome.

## 3.1.1

- Bug fix: pass `process.env` by default to `spawn` and `execSync`

## 3.1.0

- fixes #43 `stderr` maxBuffer exceeded error (use `spawn` for `async` calls not `exec`)
- `runfile.js` example update in README
- drops support for `node` < 4.8.0

## 3.0.0

- task name spacing/nesting, better for scaling tasks into many files
- task descriptions
- `ask` function
- handling dash arguments in tasks (for example `--test`, `-t`)
- logging tasks arguments to console when executing tasks
- fixing exit codes when task not found
- `run` function returns an output of a command now
- improving documentation
- deep code refactor, more unit tests

## 2.6.1

- bugfix: streaming `stderr` also for `async` process

## 2.6.0

- streaming output of an `async` command by default (`run` api function)

## 2.5.1

- presenting straightforward message when no `runfile.js` found

## 2.5.0

- bringing backwards compatibility with `node` >= 4.0.0 (previously `node` >= 6.0.0 required)
- `run` command in `async` mode now returns a `Promise`

## 2.4.3

- handling config from `package.json` to define a custom path to `babel-register`
- executing async commands through `child_process.span` (better `stdio` handling)

## 2.4.0

- removing watch method from api
- RunJS will fallback to pure node now if user `babel-register` not found (falling back to it's own `babel-register` before)
adding information to README: Why RunJS ? and other README update

## 2.3.0

- dropping Babel 5 support
- handling new `exports.default` after babel update

## 2.2.0

- more explicit exceptions
- handling existing `babel-register` or `babel/register` require hooks from the user package

## 2.1.0

- new functions available as part of runjs api: `watch` and `generate`
- broader README with extensive `runfile.js` example

## 2.0.0

- dropping `es5` and `coffeescript` support in favor of `es6` (handled by babel)
- dropping support for `node` < 4.0