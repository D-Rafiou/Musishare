const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/db_1200iRealSongs');
const axios = require('axios');

const headerFilePath = __dirname + '/../views/header.html';
const footerFilePath = __dirname + '/../views/footer.html';

// Function to check if a user is an admin

let user_role = ""
// Middleware to authenticate users
exports.authenticate = function (request, response, next) {
    const otherServerURL = 'http://localhost:3000/role';

    axios.post(otherServerURL, null, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
        .then((res) => {
            if (res.status === 200) {
                const userRole = res.data;
                // Check if the user is an admin

                    // Set user_role for this request only
                    request.user_role = userRole;
                    next(); // Call next middleware or route handler
               
            } else {
                console.log("Failed to authenticate");
                response.status(500).send('Internal Server Error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            response.status(500).send('Internal Server Error');
        });
};


// Route to render index page
exports.index = function (request, response) {
    response.render('index', {
        title: 'Share your music!',
        title2: 'Login',
        text: 'Or to create account'
    });
};

// Route to render users page
exports.users = function (request, response) {
    console.log(user_role)

    // Check if the user is admin
    if (request.user_role === request.user_role ) {
        db.all("SELECT userid, password, role FROM users", function (err, rows) {
            if (err) {
                console.error('Error:', err);
                response.status(500).send('Internal Server Error');
            } else {
                response.render('users', {
                    title: 'Users:',
                    userEntries: rows
                });
            }
        });
    } else {
      response.write('<h1>ERROR :Admin priviliges needed to see users')
    }
};



// Route to render messages page
exports.messages = function (request, response) {
    console.log()
    if (request.user_role === request.user_role ) {
        db.all("SELECT message FROM messages", function (err, rows) {
            if (err) {
                console.error('Error:', err);
                response.status(500).send('Internal Server Error');
            } else {
                response.render('messages', {
                    title: 'Messages:',
                    messageEntries: rows
                });
            }
        });
    } else {
      response.write('<h1>ERROR :Admin priviliges needed to see chat history')
    }
};
// route to render banned user page
exports.banned = function (request, response) {
    if (request.user_role === request.user_role ) {
        db.all("SELECT userid FROM banned", function (err, rows) {
            if (err) {
                console.error('Error:', err);
                response.write('<h1>ERROR ')
            } else {
                response.render('banned', {
                    title: 'Banned users:',
                    bannedEntries: rows
                });
            }
        });
    } else {
      response.write('<h1>ERROR :Admin priviliges needed to see banned users')
    }
};

