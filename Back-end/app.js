const express = require('express');
const cors = require('cors');//para comunicacion entre dominios
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3020;

app.use(cors());
app.use(express.json());

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
}

main().catch(console.error);

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', require('./routes/user'));
app.use('/api/refresh-token', require('./routes/refreshToken'));

app.get("/", (req, res) => {
    res.send("Hello world!!");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});