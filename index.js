// simple node.js application to receive data from clients and keep this data in memory

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

// dynamic endpoint
var EP_DISPLAYD = process.env.EP_DISPLAYD || 'http://localhost';

app.post('/events', (req, res) => {
    const event = req.body;

    // push the event in memory
    events.push(event);

    // forward the event to the display service
    axios.post(`${EP_DISPLAYD}:4001/events`, event);
    console.log('event received', event);
    res.send({status: 'ok event rec. and forwarded'});
});

// list and return the events when a get request is received
app.get('/events', (req, res) => {
  console.log(events);
  res.send(events);
});

app.listen(4005, () => {
    console.log(`${EP_DISPLAYD}:4001/events`)
    console.log('Listening to 4005');
});