const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static("public"));

app.get('/', (request, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/sprites/:spriteUrl', (request, response) => {
    // make api call using fetch

  // string vlsOrigin = Request.Headers["ORIGIN"];
  // Response.AddHeader("Access-Control-Allow-Origin", vlsOrigin);
  // Response.AddHeader("Access-Control-Allow-Methods", "POST");
  // Response.AddHeader("Access-Control-Allow-Headers", "accept, content-type");
  
  // fetch(`${decodeURIComponent(request.params.spriteUrl)}`) //This seems... unsafe
  //     .then(response => {
  //       debugger;
  //       return response;
  //     })
  //     .then(body => {
  //       debugger;
  //       // let results = JSON.parse(body)
  //       // console.log(results); // logs to server
  //       response.send(body); // sends to frontend
  //     });

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  global.Headers = global.Headers || require("fetch-headers");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append("Accept", "text/plain");
  myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append("GET");

  fetch(proxyurl + `${decodeURIComponent(request.params.spriteUrl)}`, { headers: myHeaders}) 
    .then(response => {
      return response.buffer();
    })
    .then(body => {
      debugger
      response.send(body); // sends to frontend
    })
    .catch(() => {
      console.log("Can’t access " + url + " response. Blocked by browser?");
      debugger})

  // fetch(`${decodeURIComponent(request.params.spriteUrl)}`).then(response => {
  //   debugger
  //   const reader = response.body.getReader();
  //   const stream = new ReadableStream({ start(controller) {
  //       // The following function handles each data chunk
  //       function push() {
  //         // "done" is a Boolean and value a "Uint8Array"
  //         reader.read().then(({ done, value }) => {
  //           // Is there no more data to read?
  //           if (done) {
  //             // Tell the browser that we have finished sending data
  //             controller.close();
  //             return;
  //           }

  //           // Get the data and send it to the browser via the controller
  //           controller.enqueue(value);
  //           push();
  //         });
  //       }

  //       push();
  //     } });

  //   return new Response(stream, { headers: { "Content-Type": "text/html" } });
  // });



});

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`)
})
