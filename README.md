# This is OAuth example

OAuth Example Node.js Version

Node Version: 10+

## Bootstrap

1. modiyfy /etc/hosts with following setting, and run `npm install`
    ```sh
    127.0.0.1 printer.example.com
    127.0.0.1 photo.example.net
    ```
2. `node client/server.js`
3. `node resource_server/server.js`
5. go to `http://printer.example.com:4000/` to use OAuth login, username: 123, password: 123.
6. go to `http://photo.example.net:3000/` and upload photo
7. go back to `http://printer.example.com:4000/`, you'll see the pohotos.