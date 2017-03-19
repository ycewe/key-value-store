# key-value-store

A simple Key Value Store developed on Node.js with a Redis server

### First Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

### Testing
1. Use `curl -H "Accept: application/json" --url https://key-value-store.herokuapp.com/object/<key>` to test GET method
2. Use `curl -d <key>=<value> -H Accept:application/json --url https://key-value-store.herokuapp.com/object/` to get POST method
