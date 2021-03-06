const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.static(__dirname + "/build"));

const { User } = require("./models/User");
const { Result } = require("./models/Result");

app.post('/user', (req, res) => {
    const user = new User(req.body)
    User.findOne({username: user.username}).then((existingUser) => {
        if (!existingUser) {
            user.save().then(result => {
                res.send(result)
            }, error => {
                res.status(400).send(error)
            })
        } else {
            res.status(400).send("User already exist!")
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send(error)  // server error
    })
})

app.get('/user/:username', (req, res) => {
    const query = {username: req.params.username}
    User.findOne(query).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send(error)  // server error
    })
});

app.put('/user', (req, res) => {
    const user = req.body;
    User.findOneAndUpdate({username: user.username}, user, {
            new: true,
            omitUndefined: true
        }).then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send(user)
            }
        }).catch((error) => {
            console.log(error)
            res.status(400).send() // bad request for changing the user.
        })

})

app.post('/result/:username', (req, res) => {
    const result = new Result(req.body);
    const query = {username: req.params.username};
    User.findOne(query).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            user.history.push(result);
            user.save().then(result => {
                res.send(result);
            }, error => {
                console.log(error)
                res.status(400).send(error)
            })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send(error)  // server error
    })
})

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    },
    function (err) {
        if (err) return console.log("Error: ", err);
        console.log(
            "MongoDB Connection -- Ready state is:",
            mongoose.connection.readyState
        );
    }
);

app.listen(process.env.PORT || 3000);
