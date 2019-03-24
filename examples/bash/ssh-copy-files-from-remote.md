# Terminal Commands

## SCP
Uses the ssh protocol to copy files across machines. It extends the syntax of cp to allow references to other systems.

You can use `-r` for recursive.

### Usage

Copy a file from local to remote
```
scp /path/to/local/file username@hostname:/path/to/remote/file
```

Copy file from remote to local
```
scp username@hostname:/path/to/remote/file /path/to/local/file
```

Copy with a port number
```
scp -P 1234 username@hostname:/path/to/remote/file /path/to/local/file
```

### Examples

Copy log file from the prod inventory mapping machine to local git repo
```
scp idettman@fflp-imw0001.las1.fanops.net://app/rp-inventory-mapping-mrfs-writer/log/inventory-mapping-mrfs-writer.log /Users/idettman/dev/repos/inventory-mapping-mrfs-writer/logfile2.log
```