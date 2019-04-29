# Mopus
Mopus is an open-source module bundler in the way of webpack, built specifically for the needs of another library : Nixy.

In comparison with Webpack, Mopus is *extremely* lightweight and considerably faster for small projects. Compiling your project becomes a matter of milliseconds.

Mopus has easy solutions for HMR (*hot module resolution*) and custom actions on module loading.

[See the full documentation here](https://github.com/Lepzulnag/Mopus)


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

To build your project, go to the folder with the `mopus.json` file and execute : `mopus`.

You can pass options :

```mopus main.js -o output.js```

will build using the `main.js` file as an entry point, and will write the result into the file `output.js`.

You can pass any option (except object and array options) by adding the prefix `--` before the option name (example: `--output`). See the [configuration](https://github.com/Lepzulnag/Mopus#config) section for the list of all the options available.


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
	outputType: 'string',  // 'file' | 'string' | 'buffer'. Default is 'file'.
	output: 'myProject',
})
let str = mopus.compile().myProject
```

[See the full documentation here](https://github.com/Lepzulnag/Mopus)
