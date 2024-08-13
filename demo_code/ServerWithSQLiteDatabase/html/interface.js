
// let newuser = document.createElement('div')
// let login = document.createElement("div")
// let comfirm = document.createElement("input")
// let user = document.createElement("input")
// let pass = document.createElement("input")
// let create = document.createElement("input")
// let username = document.createElement("input")
// let password = document.createElement("input")
const socket = io() //by default connects to same server that served the page



let usersarray = new Map()

let updateA = new Array()
// console.log(typeof usersarray)
socket.on("updateA",function(newA){

  updateA = newA




})

function sendUserRole(userRole) {
  // Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  
  // Configure the request
  xhr.open('POST', '/userrole', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Define the callback function to handle the response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful
        console.log('User role sent successfully');
      } else {
        // Error handling if the request failed
        console.error('Failed to send user role:', xhr.status);
      }
    }
  };

  // Convert the user role to JSON and send it in the request body
  xhr.send(JSON.stringify({ userRole: userRole }));
}
// user.type = 'text'
// user.placeholder = 'enter new username'
// user.id = 'user'
// pass.type = 'text'
// pass.placeholder = 'create password'
// pass.id = 'pass'

// username.type = 'text'
// username.placeholder = 'enter username'
// username.id = 'username'
// password.type = 'text'
// password.placeholder = 'enter password'
// password.id = 'password'


// create.type = 'button'
// create.value = "create"
// create.id = "create"

// comfirm.type = 'button'
// comfirm.value = "Login"
// comfirm.id = "Login"
// comfirm.click = auth()
// // login.id = 'login'
// // newuser.id = 'newuser'
// login.appendChild(username)
// login.appendChild(password)
// login.appendChild(comfirm)
// newuser.appendChild(user)
// newuser.appendChild(pass)
// newuser.appendChild(create)

// document.getElementById('login').appendChild(login);
// document.getElementById('create').appendChild(newuser);

 
// let username = '';
// Convert auth function to arrow function
const auth = () => {
  let us = document.getElementById('user').value;
  let pas = document.getElementById('pass').value;
  username = us 
  localStorage.setItem('username',username)

  authenticateUser(us, pas);
}


  
  function authenticateUser(username, password) {
    // Send an AJAX request to the server to authenticate the user
    console.log("starting authentification")
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/authenticate', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Authentication successful
          // let warning = document.createElement("input")
          // warning.textContent = "not happening"
          let response = JSON.parse(xhr.responseText);

           let userRole = response.user_role
          //  sendUserRole(userRole)
          //  exports.userRole = userRole

            let userNumber = response.user_number
           sessionStorage.setItem('username',username)
           console.log(sessionStorage.getItem("username"))
           sessionStorage.setItem('role',userRole)

          //  localStorage.setItem(userNumber,username)
           console.log("hbcsdwshjwjhd")
          window.location.href = 'http://localhost:3000/user.html';

          // Redirect the user or perform further actions
        } else {
          // Authentication failed
          // let warning = document.createElement("div")
          // warning.textContent = "wrong username or password"
          // warning.style.color ='black'
          // document.getElementById("login").appendChild(warning)
           alert("wrong username or password !")
          console.log('Authentication failed');
          // Display an error message to the user
        }
      }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));
  }

  // exports.username = username;
  // export { getUsername };

  
  socket.on("users", function(data1,data2){   // function to update array of users everytime user joins 

    usersarray.set(data1,data2)
    
    // console.log(usersarray)
    
    })
// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add listener to login button
  document.getElementById('Login').addEventListener('click', auth);
});

function check(str) {
  // Check if the first character is a letter
  if (!str.charAt(0).match(/[a-zA-Z]/)) {
      return false;
  }

  // Check if the string contains only letters or numbers
  if (!str.match(/^[a-zA-Z0-9]*$/)) {
      return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  // Add listener to login button
  socket.emit("update",1)    // reupdate list of users 

  document.getElementById('com').addEventListener('click', function(){
   socket.emit("update",1)    // reupdate list of users 

  let newuser = document.getElementById("username").value.trim()
  let newpass = document.getElementById("password").value.trim()

  if(check(newuser)){
    
    if(updateA.includes(newuser) == false){
  
   socket.emit("create",newuser,newpass)
    
   let mess = document.createElement("div")
   mess.textContent = "Successfully created new account and " + newuser + " can now login"
   mess.style.color = "green"
   document.getElementById("create").appendChild(mess)
   socket.emit("update",1)    // reupdate list of users 


  }
  else{

   alert("This username is taken")

  }

}




  else{
   
    console.log("bad username")
    alert("username not acceptable")


  }

  // usersarray.clear
  socket.emit("update",1)

  })
})
// export { username };
