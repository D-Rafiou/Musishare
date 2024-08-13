/*
(c) 2022 Louis D. Nel

Basic express server with middleware and
SQLite database.

The server allows client to find
chord progressions of songs in
its SQLite database. The database provided
has chord progressions of some 1200
popular jazz standards.

********************************************************************
Here we do server side rendering WITHOUT a
template engine.
In This example partial HTML files are
"rendered" with data placed in between them:

header.html + data + footer.html
*********************************************************************
*/

// const http = require('http')
// const express = require('express')
// const path = require('path')
// const favicon = require('serve-favicon')
// const logger = require('morgan')
// const fs = require('fs')
//read routes modules
// const routes = require('./routes/index')

// const  app = express() //create express middleware dispatcher

// const PORT = process.env.PORT || 3000

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs'); //use hbs handlebars wrapper

// app.locals.pretty = true //to generate pretty view-source code in browser

//some logger middleware functions
// function methodLogger(request, response, next){
// 		   console.log("METHOD LOGGER")
// 		   console.log("================================")
// 		   console.log("METHOD: " + request.method)
// 		   console.log("URL:" + request.url)
// 		   next(); //call next middleware registered
// }
// function headerLogger(request, response, next){
// 		   console.log("HEADER LOGGER:")
// 		   console.log("Headers:")
//            for(k in request.headers) console.log(k)
// 		   next() //call next middleware registered
// }

//register middleware with dispatcher
//ORDER MATTERS HERE
//middleware

// app.use(logger('dev'))
//app.use(methodLogger)
//routes
// app.get('/index.html', routes.index)
// app.get('/songs', routes.find)
// app.get('/users', routes.users)
// app.get('/song/*', routes.songDetails)
/*
(c) 2023 Louis D. Nel
Based on:
https://socket.io
see in particular:
https://socket.io/docs/
https://socket.io/get-started/chat/

Before you run this app first execute
>npm install
to install npm modules dependencies listed in package.json file
Then launch this server:
>node server.js

To test open several browsers to: http://localhost:3000/chatClient.html

*/const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs'); // Import the file system module
const path = require('path')
const favicon = require('serve-favicon')
const routes = require('./routes/index')
const bodyParser = require('body-parser'); // Add this line to require body-parser
const sqlite3 = require('sqlite3').verbose() //verbose provides more detailed stack trace
const session = require('express-session');

const db = new sqlite3.Database('data/db_1200iRealSongs')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs') //use hbs handlebars wrapper
const PORT = process.env.PORT || 3000;
let currentFilename = 'user.html'; // Initial filename to serve
let role = ""
app.use(bodyParser.json());

app.get('/index.html', routes.index)

app.use(session({
  secret: 'Rafiou123', // You should change this to a secure random string
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/html', {
  setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
          res.set('Content-Type', 'application/javascript');
      }
  }
}));

// app.use(routes.authenticate); //authenticate user
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// Serve static files

app.get(['/', '/user.html', '/mytunes',  '/chatClient.html'], (request, response) => {
  response.sendFile(__dirname + "/" + currentFilename);
});

// app.use(routes.authenticate); //authenticate user
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



server.listen(PORT) //start http server listening on PORT




// app.get(['/', '/user.html', '/mytunes', '/index.html','/chatClient.html'], (request, response) => {
//   response.sendFile(__dirname + '/user.html')
// })


// function handler(request, response) {
//   //handler for http server requests including static files
//   let urlObj = url.parse(request.url, true, false)
//   console.log('\n============================')
//   console.log("PATHNAME: " + urlObj.pathname)
//   console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
//   console.log("METHOD: " + request.method)

//   let filePath = ROOT_DIR + urlObj.pathname
//   if (urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html'

//   fs.readFile(filePath, function(err, data) {
//     if (err) {
//       //report error to console
//       console.log('ERROR: ' + JSON.stringify(err))
//       //respond with not found 404 to client
//       response.writeHead(404);
//       response.end(JSON.stringify(err))
//       return
//     }
//     response.writeHead(200, {
//       'Content-Type': get_mime(filePath)
//     })
//     response.end(data)
//   })

// }


app.get('/songs', (request, response) => {
  console.log(request.path)
  if(request.path == "/songs"){
  let songTitle = request.query.title
  let titleWithPlusSigns = songTitle.trim().replace(/\s/g, '+')
  console.log('titleWithPlusSigns: ' + titleWithPlusSigns)

  console.log('query: ' + JSON.stringify(request.query))
  if(!songTitle) {
    //send json response to client using response.json() feature
    //of express
    response.json({message: 'Please enter Song Title'})
    return
  }

//http://itunes.apple.com/search?term=Body+And+Soul&&entity=musicTrack&limit=3
  const options = {
    "method": "GET",
    "hostname": "itunes.apple.com",
    "port": null,
    "path": `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=10`,
    "headers": {
      "useQueryString": true
    }
  }
  //create the actual http request and set up
  //its handlers
  http.request(options, function(apiResponse) {
    let songData = ''
    apiResponse.on('data', function(chunk) {
      songData += chunk 
    })
    apiResponse.on('end', function() {
      if(songData != "<html><head><title>Error</title></head><body>Your request produced an error.  <BR>[newNullResponse]</body></html>"){// avoid server crashing by parsing error message
        // console.log("songdata length is " + songData);

      response.contentType('application/json').json(JSON.parse(songData))
      }
      songData = ''
    })
  }).end() //important to end the request
           //to actually send the message
}
})

function isAdmin(request, response, next) {
  console.log(request.session.user)

  if (request.session && request.session.user && request.session.user.role === 'admin') {
      // User is an admin, proceed to next middleware or route handler
      next();
  } else {
      // User is not an admin, send 403 Forbidden
      response.status(403).send('Forbidden');
  }
}

app.post('/authenticate', function(request, response) {
  console.log("finishing authentification")

  let username = request.body.username;
  let password = request.body.password;


  console.log("User: ", username)
  console.log("Password: ", password)
    let retrieved_user_role;
    let retrievedUserNumber;

    var authorized = false
    //check database users table for user
    db.all("SELECT userid, password, role FROM users", function(err, rows) {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].userid == username & rows[i].password == password) {
        authorized = true
        //  console.log(rows[i].role)
        //  console.log(rows[i].password)

        retrieved_user_role = rows[i].role
        retrievedUserNumber = i

        


        }
      }
      if (authorized == false) {
       
        console.log('No authorization found, send 401.')
        response.status(401).send('Authentication failed');


        response.end()
      }
       else
      {
        // global.user_role = retrieved_user_role

        response.status(200).json({
          user_role: retrieved_user_role,
          user_number: retrievedUserNumber
      });

        role = retrieved_user_role
        // if(role == "admin"){
         
        app.post('/role', function(req, res) {
          res.status(200).send(role);

 
        })

        request.session.user = {
          // username: username,
          role: retrieved_user_role
      }
      console.log(request.session.user)

  
    
        app.use(routes.authenticate);
    
  app.get('/users', routes.users);
  app.get('/messages', routes.messages);
  app.get('/banned', routes.banned);



         
          // }
          // else{
         // dynamically setting routes based on retrieved role 
         
         
          // }


      }
    })
  })







  let socketArray = new Map()

io.on('connection', function(socket) {
  let blocked = []
  db.all('SELECT userid FROM banned', (err, rows) => {
    for (var i = 0; i < rows.length; i++) {
     blocked.push(rows[i].userid) 
      //  console.log(rows[i].role)
      //  console.log(rows[i].password)

     


      }
  })


  socket.on("addgen", function(r){
    db.run(`INSERT OR REPLACE INTO General_Playlist VALUES (?, ?, ?)`, [r.songtitle, r.artist, r.src], function(err) {
      if (err) {
        console.error("Error inserting row:", err);
        // Handle the error appropriately, such as emitting an error event
      } else {
        
        console.log("Row inserted successfully");
       
      }
    })


  })
  socket.on("delgen", function(r){
    db.run(`DELETE FROM General_Playlist WHERE pic = ?`, [r.src], function(err) {
      if (err) {
        console.error("Error removing row:", err);
        // Handle the error appropriately, such as emitting an error event
      } else {
        console.log("Row removed successfully");
    }
    });


  })

  socket.on("please", function(data) {
    console.log(data)
    db.all(`SELECT songtitle, artist, pic FROM ${data}`, (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        return;
      }
  
      rows.forEach(row => {
        let dataToSend = {
          songtitle: row.songtitle,
          artist: row.artist,
          src: row.pic
        };
        socket.emit("here", dataToSend);
      })
    })




  })


  socket.on("pleasegen", function(data) {
    db.all(`SELECT songtitle, artist, pic FROM General_Playlist`, (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        return;
      }
  
      rows.forEach(row => {
        let dataToSend = {
          songtitle: row.songtitle,
          artist: row.artist,
          src: row.pic
        };
        socket.emit("heresgen", dataToSend);
      })
    })




  })

  // socket.id= ""
  // if(socket.id != ""){
    // socket.join("genroom")
    // console.log("works")

    // }
    let h = []
  //  let  Allusers = new Map()

  socket.on("update",function(data){

      let map = new Map()
      let updateA = new Array()
    
db.all('SELECT userid, role FROM users', (err, rows) => {
  if (err) {
      // Handle error
      return console.error("Error executing SQL query:", err);
  }

  // let Allusers = new Map();
  for (var i = 0; i < rows.length; i++) {
      // console.log(rows[i].userid);
      // console.log(rows[i].role);
      // Allusers.set(rows[i].userid, rows[i].role);
      map.set(rows[i].userid,rows[i].role)
      updateA.push(rows[i].userid)
      io.emit('users', rows[i].userid,rows[i].role);
    
  }

 io.emit("updateA",updateA)
})
 
})



  
  socket.on("create", function(data1, data2) {
    db.run("INSERT OR REPLACE INTO users VALUES (?, ?, 'guest')", [data1, data2], (err) => {
        if (err) {
            // Handle error
            return console.error("Error executing SQL query:", err);
        } else {
            db.run(`CREATE TABLE IF NOT EXISTS ${data1} (songtitle TEXT , artist TEXT, pic TEXT PRIMARY KEY)`, (err) => {
                if (err) {
                    // Handle error
                    return console.error("Error executing SQL query:", err);
                } else {
                    // Table creation successful
                }
            });
        }
    });
       
  db.all('SELECT userid, role FROM users', (err, rows) => {
    if (err) {
        // Handle error
        return console.error("Error executing SQL query:", err);
    }

    // let Allusers = new Map();
    for (var i = 0; i < rows.length; i++) {
        // console.log(rows[i].userid);
        // console.log(rows[i].role);
        // Allusers.set(rows[i].userid, rows[i].role);
        io.emit('users', rows[i].userid,rows[i].role);

    }

    // console.log(Allusers);

 
});

});

    





  socket.on("perma", function(banned) {
    console.log("perma")
    db.run("DELETE FROM users WHERE userid = ?", [banned], function(err) {
        if (err) {
            console.error("Error inserting banned user:", err);
            // Handle the error appropriately, such as emitting an error event
        } else {

          db.run("DELETE FROM banned WHERE userid = ?", [banned], function(err) {  // remove out of banned table as well
            if (err) {
                console.error("Error removing username:", err);
                // Handle the error appropriately, such as emitting an error event
            } else {
              blocked = blocked.filter(item => item !== banned);
              // io.emit("unbanned", username);
            }
        })
            io.emit("perma", banned);

            db.run(`DROP TABLE IF EXISTS ${banned}`, function(err) {
              if (err) {
                  console.error("Error dropping table:", err);
                  // Handle the error appropriately, such as emitting an error event
              } else {
                  console.log("Table dropped successfully");
              }
          })
        }
    })
       
  db.all('SELECT userid, role FROM users', (err, rows) => {
    if (err) {
        // Handle error
        return console.error("Error executing SQL query:", err);
    }

    // let Allusers = new Map();
    for (var i = 0; i < rows.length; i++) {
        // console.log(rows[i].userid);
        // console.log(rows[i].role);
        // Allusers.set(rows[i].userid, rows[i].role);
        io.emit('users', rows[i].userid,rows[i].role);

    }

    // console.log(Allusers);

 
});

})

  socket.on("ban", function(banned) {
    console.log("banning")
    db.run("INSERT OR REPLACE INTO banned (userid) VALUES (?)", [banned], function(err) {
        if (err) {
            console.error("Error inserting banned user:", err);
            // Handle the error appropriately, such as emitting an error event
        } else {
            io.emit("banned", banned);
        }
    })
})
socket.on("unban",function(banned){
 
 
    db.run("DELETE FROM banned WHERE userid = ?", [banned], function(err) {
      if (err) {
          console.error("Error removing username:", err);
          // Handle the error appropriately, such as emitting an error event
      } else {
        blocked = blocked.filter(item => item !== banned);
        console.log(blocked)
        // io.emit("unbanned", username);
      }
  })


  })

socket.on("role", function(data){
// console.log("routes will change")
  if(role == "admin"){

    // app.get('/users', routes.users)
    // app.get('/messages', routes.messages)
    // app.get('/banned', routes.banned)
   }
 


  socket.on('clientusername',function(user,role){

      socket.on("update",function(data){

        let map = new Map()
        let updateA = new Array()
      
  db.all('SELECT userid, role FROM users', (err, rows) => {
    if (err) {
        // Handle error
        return console.error("Error executing SQL query:", err);
    }

    // let Allusers = new Map();
    for (var i = 0; i < rows.length; i++) {
        // console.log(rows[i].userid);
        // console.log(rows[i].role);
        // Allusers.set(rows[i].userid, rows[i].role);
        map.set(rows[i].userid,rows[i].role)
        updateA.push(rows[i].userid)
        io.emit('users', rows[i].userid,rows[i].role);
      
    }

   io.emit("updateA",updateA)

 
});



  })

    socket.on("add", function(row, user) {
      db.run(`INSERT OR REPLACE INTO ${user} VALUES (?, ?, ?)`, [row.songtitle, row.artist, row.src], function(err) {
        if (err) {
          console.error("Error inserting row:", err);
          // Handle the error appropriately, such as emitting an error event
        } else {
          
          console.log("Row inserted successfully");
         
        }
      })
    })

    socket.on("remove", function(row, user) {
      db.run(`DELETE FROM ${user} WHERE pic = ?`, [row.src], function(err) {
        if (err) {
          console.error("Error removing row:", err);
          // Handle the error appropriately, such as emitting an error event
        } else {
          console.log("Row removed successfully");
      }
      });
    })
    db.all('SELECT userid FROM banned', (err, rows) => {
      for (var i = 0; i < rows.length; i++) {
       blocked.push(rows[i].userid) 
        //  console.log(rows[i].role)
        //  console.log(rows[i].password)
  
       
  
  
        }
    })
    // response.sendFile(__dirname + '/html/chatClient.html')
  
    // socket.emit("username",user)
  if(blocked.includes(user)){
 socket.emit("banned", user)

  }


    

     console.log("user: " + user )
    // socket.id = user
    console.log(user + " is connected")
    if(socket.id != ''){
      socketArray.set(user, socket.id)
      
    }
    
      // io.emit("users", socketArray)
      // console.log(socket.id)

    

    socket.on('pressedplus',function(Div){
  
      socket.broadcast.emit('div',Div)

    
  })



  socket.on('rowindex',function(index){
    socket.broadcast.emit('rowindex',index)
   

   })

   

    // if(socket.id != ""){
      socket.on("receivers",function(Array){
        h = Array
      })

      socket.on('clientSays', function(data) {
       
       
       
        
        console.log('RECEIVED: ' + data)
        //to broadcast message to everyone including sender:
        if(h.length == 0){
          db.run(`INSERT INTO messages VALUES (?)`, [data], function(err) {
            if (err) {
              console.error("Error inserting row:", err);
              // Handle the error appropriately, such as emitting an error event
            } else {
              
              console.log("message added to database successfully");
             
            }
          })
         for (let value of socketArray) {
          // console.log(socket.id)
          let a = value[1].toString() 
          let b = socket.id.toString()
          // console.log(a)
          // console.log(b)

          if(a === b){
            io.to(value).emit('backto', data) 
            // console.log("works")
          }
          else{
          io.to(value).emit('serverSays', data) 
              }
            }

             
            }
            else{
              let receivers = ""
              for (let [key, value] of socketArray) {
                console.log(key)
                if(h.includes(key)){
                  receivers += " " +key
                io.to(value).emit('private', data) 
                }

            }
            socket.emit('private', data)
              
            db.run(`INSERT INTO messages VALUES (?)`, [data + " : Receivers : " + receivers], function(err) {
              if (err) {
                console.error("Error inserting row:", err);
                // Handle the error appropriately, such as emitting an error event
              } else {
                
                console.log("message added to database successfully");
               
              }
            })
          }
      
        
        console.log(socketArray)
      })
        
     
    
      socket.on('disconnect', function(data) {
        //event emitted when a client disconnects
        console.log('client disconnected')
      })



    // }
  // })
  // if(socket.id!= ""){
  // }
  //console.dir(socket)

  // io.emit('serverSays', 'You are connected to CHAT SERVER')

  // socket.on('clientSays', function(data) {
  //   console.log('RECEIVED: ' + data)
  //   //to broadcast message to everyone including sender:
  //   io.emit('serverSays', data) //broadcast to everyone including sender
  //   //alternatively to broadcast to everyone except the sender
  //   //socket.broadcast.emit('serverSays', data)
  // })

  // socket.on('disconnect', function(data) {
  //   //event emitted when a client disconnects
  //   console.log('client disconnected')
  // })
})
})
})


console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
console.log(`To Test:`)
// console.log(`Open several browsers to: http://localhost:${PORT}/chatClient.html`)
console.log(`Open several browsers to: http://localhost:${PORT}/index.html`)
console.log(`Open several browsers to: http://134.117.242.35:${PORT}/index.html`)

// console.log(`Open several browsers to: http://localhost:${PORT}/user.html`)

// //start server
// app.listen(PORT, err => {
//   if(err) console.log(err)
//   else {
// 		console.log(`Server listening on port: ${PORT} CNTL:-C to stop`)
// 		console.log(`To Test:`)
// 		console.log('user: ldnel password: secret')
// 		console.log('http://localhost:3000/index.html')
// 		console.log('http://localhost:3000/users')
// 		console.log('http://localhost:3000/songs?title=Love')
// 		console.log('http://localhost:3000/song/372')
// 	}
// })



