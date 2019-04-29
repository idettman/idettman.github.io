# Mopus
Mopus is an open-source module bundler in the way of webpack, built specifically for the needs of another library : Nixy.

In comparison with Webpack, Mopus is *extremely* lightweight and considerably faster for small projects. Compiling your project becomes a matter of milliseconds.

Mopus has easy solutions for HMR (*hot module resolution*) and custom actions on module loading.

Mopus is still in beta version. If you find any bug, let me know ☺.


## Installation
From the command line :

```npm install -g mopus``` 

Or, if you prefer to install it locally :

```npm install mopus``` 



## Usage
You can use Mopus from the command line or with a Node project.

Like Webpack, Mopus uses a configuration file `mopus.json`. If the file is not present, default configuration will be used.

### Using from the command line
If you've installed Mopus globally, make sure your global node modules path is added to your environment variables.
To check if you can access mopus CLI, write in your console : `mopus -v`.

If you've installed Mopus locally, use npx : `npx mopus -v`.

To build your project, go to the folder with the `mopus.json` file and execute : `mopus`.

You can pass options :

```mopus main.js -o output.js```

will build using the `main.js` file as an entry point, and will write the result into the file `output.js`.

You can pass any option (except object and array options) by adding the prefix `--` before the option name (example: `--output`). See the [configuration](#config) section for the list of all the options available.


### Using from a Node program
First, require Mopus :

```javascript
const Mopus = require('mopus')
```

Then use it this way :

```javascript
const mopus = new Mopus({
	entry: 'main.js',
	output: 'bundle.js',
})
mopus.compile()
```

This will compile using the `main.js` file as an entry point, and will write the result into the file `bundle.js`.

#### Getting the result as a String or a Buffer
If you don't want the output to be written in a file but instead get the result as a string, use the option `outputType`.

```javascript
const Mopus = require('mopus')
const mopus = new Mopus({
	entry: 'main.js',
	output: 'myProject',
	outputType: 'string',  // 'file' | 'string' | 'buffer'. Default is 'file'.
})
let str = mopus.compile().myProject
```


## Importing modules
You can import a module using the `import` statement or the usual `require` function (see [here](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) to learn how to use `import`).

Let's suppose we have two files `main.js` and `Zabu.js` in the same folder :

```javascript
// main.js
import {Zabu} from './Zabu'  // the '.js' extension is unnecessary
new Zabu
```

```javascript
// Zabu.js
export {Zabu}
class Zabu {
	constructor() {
		console.log('Zabu!')
	}
}
```

Now let's compile our two files using the CLI : `mopus main.js -o bundle.js`

And let's execute it : `node bundle.js`

Then we should see the message `Zabu!` appearing.

## Exporting values

For a better understanding, I advice to put the export statements at the very top of your file - even before the imports.

See [here](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Instructions/export) to learn how to use the export statement.


## Having multiple projects
Mopus is perfect when you need to generate several bundles which share common files but use different configurations.

For example, you may need to compile two projects, the second one being a minified version of the first one :

```json
// mopus.json
{
	"entry": "main.js",
	"projects": [
		{
			"output": "bundle.js"
		},
		{
			"output": "bundle.min.js",
			"minify": true
		}
	]
}
```

Then, running `mopus` on the CLI will output two files : `bundle.js` and `bundle.min.js`.

If files are shared between different projects, they will only be parsed once by mopus.

## Class fields
[Class fields](https://github.com/tc39/proposal-class-fields) is a Javascript feature that will eventually come. For now, without a compiler like Babel or Typescript we need to declare all of our class fields in the constructor, preceded by a `this`.

Mopus naturally transform class fields into standard javascript. The following file :

```javascript
class Point {
	static instances = 0
	x = 0
	y = 0
	constructor() {
		Point.instances++
	}
}
```
will be transformed (and bundled) into : 

```javascript
class Point {
	constructor() {
		this.x = 0
		this.y = 0
		Point.instances++
	}
}
Point.instances = 0
```

If you don't want Mopus to transform class fields, set the option `processClassFields` to `false`.
## 

## <a name="config"></a>Configuration

### Global options
Global options cannot be assigned to a `project` object, only as a direct mopus option (common to every project).

See also the [project options](#project).


| Option | CLI | Type | Default | Description |
|-----------------------------|-----|---------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| root | -r | String | '' | The folder used as root. All modules paths will be resolved relatively to this. |
| projects |  | Array | [] | If you need different configurations that share some files, create a new project for every configuration. |
| rules |  | Object | {} | This option let you define the action to execute when a file is  `import`-ed or `require`-d. See the [rules](#rules) section for more informations. |
| folderRules |  | Object | {} | This option let you define the right action when a folder is `import`-ed or `require`-d. |
| allowDynamicRequires |  | Boolean | true | Set to false if you don't want to allow `require` with non-constant values. |
| externalModules |  | Array | null | List of module names that won't be bundled. |
| allowImportExportEverywhere |  | Boolean | false | Set to true if you want to be able to use `import` and `export` statements anywhere in the code. |
| allowReturnOutsideFunction |  | Boolean | true | Set to false if you dont' want the possibility to use `return` outside a function. |
| logs |  -l | Boolean | true | Set to false if you don't want any log. Errors won't be caught. |
| logInput |  | Boolean | true | Set to false if you don't want the program to log every module loaded. |
| logOutput |  | Boolean | true | Set to false if you don't want the program to log every output file. |
| logTimers |  | Boolean | false | Set to true if you want to log timers results. |
| logErrors |  | Boolean | true | Set to false if you want to catch errors yourself instead of displaying in the console. |
| globstar |  | Boolean | false | Set to true if you want to use the `**` [globstar](https://stackoverflow.com/questions/21834939/can-someone-explain-what-this-means-js-when-trying-to-fetch-the-src-files-i#answer-21856966) pattern matcher in module resolution. |


### <a name="project"></a>Project options
Project options can be used specifically in a project object, **or** as a global option that will apply to every project (if not overwritten by another project option).

| Option | CLI | Type | Default | Description |
|--------------------|---------|------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| output | -o | String | 'bundle' | The name of the project. You can omit the '.js' part. |
| outputDir |  | String | '' | The directory the output files will be generated to. |
| outputType |  | 'file' | 'string' | 'buffer' | 'file' | If set to 'string' or 'buffer', no file will be generated.  If set to 'buffer', the compilation result will be a [buffer](https://nodejs.org/api/buffer.html) instead of a string. |
| entry | special | String *or* Array of strings | 'src' | The entry file of your project. You can have multiple entry points. |
| entryDir |  | String | '' | The base directory of entry files. |
| input | -i | String | '' | If you want to compile from a string instead of files, you can set the input value. It can be combined with `entry` to add custom code at the end of the program. |
| processRequires | -re | Boolean | true | Set to false if you don't want Mopus to transform `require` calls. |
| processImports | -im | Boolean | true | Set to false if you don't want Mopus to transform `import` statements. |
| processExports | -ex | Boolean | true | Set to false if you don't want Mopus to transform `export` statements. |
| processClassFields | -cf | Boolean | true | Set to false if you don't want Mopus to transform class fields. |
| minify | -m | Boolean | false | Set to true to minify the output. |
| target | -t | 'node' | 'iso' | 'iso' | Set to 'node' if the output will be only used in Node environment. You will then be able to use dynamic requires, global node modules (like `fs`), and module constants like `__dirname` and `__filename`. |
| localDirnames |  | Boolean | true | Set to false if you want `__dirname` and `__filename` to be relative to the output directory. |
| format | -f | 'executable' | 'module' | 'executable' | Set to 'module' if you want your import file not to be executed, but loaded as a module. |
| entryAsModule |  | Boolean | true | Set to false for your entry files to be interpreted in global context instead of their own context. (Then imported files will be able to access variables defined in entry files). |
| exportEntries |  | Boolean | false | Set to true so that the values exported by your entry files will  also be exported by the whole program. |


## Additional notes

### Speed and minification
Mopus internally uses the excellent [Butternut](https://www.npmjs.com/package/butternut) minifier by Richard Harris. Butternut is amongst the fastest minifiers, still minifying the output slow down the whole process. In the future, Mopus will closely integrates minification to its core to make it as light as a breeze.

If you care about achieving maximum speed, don't minify your project and disable logs.


### Comments
Comments are automatically removed by Mopus. Most of the times they are not needed because the resulting bundle is made to be executed, not reverse-engineered.

Nonetheless there are cases when keeping comments is useful, so I plan to add support for comments.

### Sourcemaps
Mopus does not produce sourcemaps yet. I don't plan to add sourcemaps support before the [Javascript class fields proposal](https://github.com/tc39/proposal-class-fields) is live, because the most complex part about generating sourcemaps is to deal with class fields transformation.