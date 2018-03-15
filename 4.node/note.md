## 在浏览器端 全局作用域window
## Node端 可以直接访问global


## vscde 配置debug launch.json
```
        {
            "type": "node",
            "request": "launch",
            "name": "my debugger",
            "program": "${file}",
            "cwd": "${cwd}"
        }
```