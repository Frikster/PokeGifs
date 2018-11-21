const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static("public"));

app.get('/', (request, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// create route to get single book by its isbn
app.get('/sprites/:spriteUrl', (request, response) => {
    debugger
    // make api call using fetch
    fetch(`${decodeURIComponent(request.params.spriteUrl)}`) //This seems... unsafe
      .then(response => {
        debugger;
        return response.text();
      })
      .then(body => {
        debugger;
        // let results = JSON.parse(body)
        console.log(results); // logs to server
        response.send(results); // sends to frontend
      });
});

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`)
})
