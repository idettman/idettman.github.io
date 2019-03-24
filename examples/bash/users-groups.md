## account info

### id  
print numeric user ID, and all the groups you're a member of, not just your primary group (first group is the primary)  
`id`  
`id -un`  
`id -F`  
`id -p` is suggested for normal interactive use.

For chmod/chown use user id (e.g. 501) or account name (e.g. danielbeck)  
``chown -R `id -u`:`id -g` FOLDER``

### whoami  
`chown -R $(whoami):staff`   
get your primary group  
``groups $(whoami) | cut -d' ' -f1``



If you want to know who's currently logged in to the system:


