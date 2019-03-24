#### type: type [-afptP] name [name ...]
    
For each name indicate how it would be interpreted if used as a command name

`-t`  
returns one of `alias, keyword, function, builtin, file, ''`  
if name is an alias, shell reserved word, shell function, shell builtin, disk file, or unfound  

`-p`  
returns the name of the disk file that would be executed or nothing if `type -t NAME` would not return file  

`-P`  
forces a path search for each name, even if it is an `alias, builtin, function`  
returns the name of the disk file that would be executed

`-a`  
returns all of the places that contain an executable named file 
that includes `aliases, builtins, functions`, if the `-p` flag is not also used

`-f`  
suppresses shell function lookup


##### Example: get file path
    command: `type -P node`  
    result: `/usr/local/bin/node`

##### Example: get file type
    command: `type -t node`  
    result: `file`
    
    command: `type -t source`  
    result: `builtin`
    
#### typeset: typeset [-afFirtx] [-p] name[=value] ...