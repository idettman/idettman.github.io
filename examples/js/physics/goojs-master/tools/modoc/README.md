modoc (& tern definition compiler)
==================================

Documentation extractor and renderer.

**Disclaimer:**
Modoc does not support (nor does it need to) the full set of tags - see a list of supported tags and annotations below.
Modoc does not come with any guarantee that it runs well on anything else than goojs. Modoc works well by making assumptions about the structure of the code - goojs code.

###Setup

`npm install`

###Usage

`node src/modoc.js <sourcesPath> <templatesPath> <staticsPath> <outPath>`

Where

 + *sourcesPath* points to the engine or any other source rich in jsdoc
 + *templatesPath* points to the folder storing the templates used to generate doc pages
 + *staticsPath* points to where the styles and additional scripts are located - these files are just be copied over 
to the *outPath* directory
 + *outPath* points to where the result should be stored

**Ex:** `node tools/modoc/src/modoc.js src/goo tools/modoc/src/templates tools/modoc/src/statics out-doc` if called from the base *goojs* directory

###Writing jsdoc

The jsdoc extractor (*extractor.js*) can figure out what the constructor of a class is by searching for a function with the same name as the file name. It sound very specific but 99% of engine classes match this criteria (the exception is *SystemBus* which is documented using `@target-class`). 
 
The extractor can figure out what members do instances of classes have by looking for assignments to `this` in the constructor of a class.

Methods, static methods and static members are also detectable by looking for assignments to the prototype of the class or to the constructor itself. Members and static members are not extracted unless they are accompanied by a jsdoc comment. Methods and static methods are extracted default (even if and accompanying jsdoc comment is missing). Items whose names begin with an `_` are filtered out and so are items with an `@private` or an `@hidden`.

If you wish to document anything that is not covered by either of these cases you can just place a jsdoc comment (block, starting with a `*`) that contains an `@target-class` anywhere (in any file).
 
###Type expressions

Type expressions are used in `@param` and `@returns` tags. The type expression parser is mainly used to build the tern definitions used by the create code editor, but expressions should be correct and written in the same format nevertheless. Most elements of [the closure compiler expression](https://developers.google.com/closure/compiler/docs/js-for-compiler#types) are supported - there are missing ones since they're missing in tern as well (non-nullables (`!`), varargs (`...`), the *UNKNOWN* type (`?`)).

###Supported tags

 + `@param {<type>} <name> <description>` - any known classes mentioned in *type* are transformed in links
 + `@example` followed by any number of lines of code
 + `@returns {<type>} <description>`
 + `@deprecated <description>` - deprecated items are collected in a list and rendered in a special place
 + `@hidden` to exclude a method from rendering
 + `@private` same as `@hidden` and to communicate that this method should not be used from outside of its class
 + `@type {<type>}` for documenting the type of members of `this` in a constructor
 + `@default <value>` for documenting the default value of members of `this` in a constructor
 + `@property` same effect as `@type`, only that it appears in the constructor's jsdoc
 + `@readonly` to inform the user that this property should not be modified
 + `@extends <base-class>`
 + `@example-link <link> <text>` to link to a jsfiddle or a visual-test
 + `@target-class <target-class> <item-name> constructor|method|member|static-method|static-member` to document fictitious items
  
###Other transformations

 + `[text]{@link url}` generates a link for *text* pointing to *url*. This can stay in any *description* field.
 + `{@link class}` generates a link for class pointing to *class-doc.html*.
 + `(!)` adds a yellow-warning-triangle

###Tags/transformations under consideration

 + `@signature` to allow for multiple signatures
 + `@include file` to include lengthy descriptions stored in other files

###Uses 

 + *esprima* to parse the javascript code holding the docs
 + a custom extractor to retrieve relevant data: comments and signatures for constructors, instance methods, 
members, etc.
 + *dogma*, our in-house jsdoc parser (*doctrine* does not suit us perfectly)
 + *mustache* to render the doc
 + *highlight.js* for syntax highlighting of examples