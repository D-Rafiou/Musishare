//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page
let bool = false
// import { username } from './interface.js';
+    socket.emit("update",1)

let clientuser = sessionStorage.getItem('username')
let role = sessionStorage.getItem('role')
socket.emit("role",role)
if(role == "admin"){

 

}
else{
    
  document.getElementById("del").style.display = ""    // admin cannot delete their account 
}
console.log(clientuser)
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
  // console.log(userNumber)
  // let client = localStorage.getItem(userNumber)

function userName(){
  console.log(clientuser)
 
 console.log(clientuser)  
    if(check(clientuser)){
     console.log("good username")
    //  let msgDiv = document.createElement('div')
    
    // msgDiv.textContent = username + "has joined"
    //  document.getElementById('messages').appendChild(msgDiv)
    //  bool = true
    socket.emit('clientusername',clientuser,role)
     if(role!= "admin"){
      socket.emit('clientSays', clientuser +" has joined ")

     }
     else{
      socket.emit('clientSays', "Admin " + clientuser +" has joined ")


     }
      // let m = document.createElement("div")
      let msgbutton = document.createElement("input")
      let box = document.createElement("input")
      msgbutton.type = "button"
      msgbutton.value = "send"
      msgbutton.id = "send_button"
      msgbutton.onclick = sendMessage
      box.type = "text"
      box.id = "msgBox"
      let c = document.createElement("input")
      c.type = "button"
      c.value = "CLEAR"
      c.id = "send_button"
      c.onclick = clear
      // m.appendChild(box);
      // m.appendChild(msgbutton);
      document.getElementById("send1").appendChild(box)
    
      document.getElementById("send1").appendChild(msgbutton)
      document.getElementById("send1").appendChild(c)

      // document.getElementById("username").remove()
      document.getElementById("Connect").remove()
  socket.emit("clientsays", clientuser +"Has joined")
  // Unhide the div
document.getElementById("playlist").style.display = "";
document.getElementById("personal").style.display = "";

document.getElementById("messages").style.display = "";
document.getElementById("send1").style.display = "";
document.getElementById("songs_div").style.display = "";
document.getElementById("songtable").style.display = "";
document.getElementById("noon").style.display = "";

}
else{
  console.log("bad username")
  // document.getElementById('username').value = ''
 
}
  }





function users(){
  window.location.href = 'http://localhost:3000/users';

}

function messages(){
  window.location.href = 'http://localhost:3000/messages';

}

function ba(){

  window.location.href = 'http://localhost:3000/banned';

  
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('users').addEventListener('click', users);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('chat').addEventListener('click', messages);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('gone').addEventListener('click', ba);
});



function login(){ 
  window.location.href = 'http://localhost:3000/index.html';

}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back').addEventListener('click', login);
});
//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
//   document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('Connect').addEventListener('click', userName)
//   document.getElementById('clear').addEventListener('click', clear)

  //add keyboard handler for the document as a whole, not separate elements.
//   document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
