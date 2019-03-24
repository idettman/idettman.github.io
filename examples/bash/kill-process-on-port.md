# Find process by port and kill process

find processes using port `9999`
```
lsof -i :9999
```

kill using the PID from `lsof`
```
kill -9 <PID>
```