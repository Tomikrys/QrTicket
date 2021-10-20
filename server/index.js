const path = require('path');
const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 3002;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
    host: 'pei17y9c5bpuh987.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'yjrfer6d5t0txe8w',
    password: 'uexuj8ax4fjc9rcm',
    port: "3306",
    database: 'din7oouyzkj380wd'
});

const data_table = "sjezd2021";

con.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});


// Handle GET requests to /get route
app.get("/get/:id/:column", (req, res) => {
    if (req.params.id.length === 6) {
        const id = req.params.id;
        const column = req.params.column;
        con.query("SELECT * FROM " + data_table + " WHERE ID=\'" + id + "\'", (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            console.log(rows[0][column]);

            res.json({
                message: rows[0][column]
            });
        });
    } else {
        res.json({
            message: "error code"
        });
    }
});

// Handle GET requests to /get route
app.get("/get/:id", (req, res) => {
    if (req.params.id.length === 6) {
        const id = req.params.id;
        con.query("SELECT * FROM " + data_table + " WHERE ID=\'" + id + "\'", (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            console.log(rows);

            res.json({
                message: rows
            });
        });
    } else {
        res.json({
            message: "error code"
        });
    }
});

// Handle SET requests to /set_timestamp route
app.get("/set_timestamp/:id/:column", (req, res) => {
    if (req.params.id.length === 6) {
        const id = req.params.id;
        const column = req.params.column;
        const timestamp = new Date().getTime();
        if (column.toLowerCase().includes("timestamp")) {
            con.query("UPDATE " + data_table + " SET " + column + " = \'" + timestamp + "\' WHERE ID=\'" + id + "\'", (err, rows) => {
                if (err) throw err;

                console.log('Updated with ' + timestamp);

                res.json({
                    message: timestamp
                });
            });
        } else {
            res.json({
                message: "error, updating wrong column"
            });
        }
    } else {
        res.json({
            message: "error code"
        });
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
// });