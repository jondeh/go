require("dotenv").config()
const massive = require('massive'),
    express = require('express'),
    app = express(),
    {SERVER_PORT} = process.env;

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`SERVER LISTENING ON ${SERVER_PORT}`));
