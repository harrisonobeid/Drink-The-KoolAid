const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '902083',
    key: 'e105a9334b89b9a29301',
    secret: '05ace0b4f2834e12e6d7',
    cluster: 'us3',
    encrypted: true
});

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());

app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;

    const presenceData = {
        user_id: req.body.username,
        user_info: {
            name: req.body.username
        }
    }; 
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

app.put('/users/:name', function(req, res) {
    console.log('User joined: ' + req.params.name);
    pusherClient.trigger('chat_channel', 'join', {
        name: req.params.name
    });
    res.sendStatus(204);
});

app.delete('/users/:name', function(req, res) {
    console.log('User left: ' + req.params.name);
    pusherClient.trigger('chat_channel', 'part', {
        name: req.params.name
    });
    res.sendStatus(204);
});

app.post('/users/:name/messages', function(req, res) {
    console.log('User ' + req.params.name + ' sent message: ' + req.body.message);
    pusherClient.trigger('chat_channel', 'message', {
        name: req.params.name,
        message: req.body.message
    });
    res.sendStatus(204);
});



app.listen(3000, function() {
    console.log('App listening on port 3000');
});