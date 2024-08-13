//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
// const socket = io() //by default connects to same server that served the page
// let username = ''ss
// let bool = false
// io.on('connection', function(socket) {
//   socket.id = document.getElementById('username').value.trim()
  // if(socket.id!= ""){
  // console.log(socket.id + " is connected")
  // }
  //console.dir(socket)

  // io.emit('serverSays', 'You are connected to CHAT SERVER')

  // socket.on('clientSays', function(data) {
  //   console.log('RECEIVED: ' + data)
    //to broadcast message to everyone including sender:
    // io.emit('serverSays', data) //broadcast to everyone including sender
    //alternatively to broadcast to everyone except the sender
    //socket.broadcast.emit('serverSays', data)
  // })
  // socket.on('clientSays', function(data) {
  //   socket.id = document.getElementById('username').value.trim()
  //   console.log("siuuuuu")
  //   //to broadcast message to everyone including sender:
  //   // io.emit('serverSays', data) //broadcast to everyone including sender
  //   //alternatively to broadcast to everyone except the sender
  //   //socket.broadcast.emit('serverSays', data)
  // })
  // socket.on("newfile",function(data){
  //   io.emit("works","works")

  //   window.location.href = `${window.location.origin}/${data}`;

  // })

let banned = 0;
let usersarray = new Map();
let updateA = new Array()
socket.emit("update",1)
// console.log(typeof usersarray)
socket.on("updateA",function(newA){
  console.log(newA)
  updateA = newA




})

socket.on("banned",function(data){
  if(data != clientuser){  alert("User " + data + " has been banned");}

  if( role != "admin" && data === clientuser){

let zeee = document.createElement("div")
zeee.textContent = "You have been banned and lost all access"
zeee.style.color ="red"
// localStorage.set(clientuser,"1")
document.getElementById("ha").appendChild(zeee)


socket.close();

 document.getElementById("songs_div").style.display = "none"
 document.getElementById("songtable").style.display = "none"
 document.getElementById("playlist").style.display = "none"
 document.getElementById("noon").style.display = "none"
 document.getElementById("personal").style.display = "none"
 document.getElementById("Connect").remove()



 alert("You have been banned and lost all access")
}

})


socket.on("perma",function(data){

  socket.emit("update",1)

  if(data != clientuser){  alert("User " + data + " is gone")}

  if( role != "admin" && data === clientuser){

let zeee = document.createElement("div")
zeee.style.color = "red"
zeee.textContent = "YOU'RE COOKED"
// localStorage.set(clientuser,"1")
document.getElementById("ha").appendChild(zeee)


socket.close();

 document.getElementById("songs_div").style.display = "none"
 document.getElementById("songtable").style.display = "none"
 document.getElementById("playlist").style.display = "none"
 document.getElementById("noon").style.display = "none"
 document.getElementById("personal").style.display = "none"
 document.getElementById("Connect").remove()


   alert("You're cooked")
}
usersarray.clear

socket.emit("update",1)

})








socket.on("users", function(data1,data2){   // function to update array of users everytime user joins 

usersarray.set(data1,data2)

// console.log(usersarray)

})


  
socket.on('serverSays', function(message) {
  // if(bool == true ){
  // socket.id = document.getElementById('username').value.trim()
  // }
  // else{
  //   socket.id = ""
  // }

  let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  msgDiv.textContent = message
  msgDiv.style.color = 'black'


  document.getElementById('messages').appendChild(msgDiv)
  // while(bool == false){
  //   document.getElementById('messages').innerHTML = "";

  // }
})
socket.on('backto', function(message) {
  // if(bool == true ){
  // socket.id = document.getElementById('username').value.trim()
  // }
  // else{
  //   socket.id = ""
  // }

  let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  msgDiv.textContent = message
  msgDiv.style.color = 'blue'


  document.getElementById('messages').appendChild(msgDiv)
  // while(bool == false){
  //   document.getElementById('messages').innerHTML = "";

  // }
})
socket.on('private', function(message) {
  // if(bool == true ){
  // socket.id = document.getElementById('username').value.trim()
  // }
  // else{
  //   socket.id = ""
  // }

  let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  msgDiv.textContent = message
  msgDiv.style.color = 'red'

  document.getElementById('messages').appendChild(msgDiv)
  // while(bool == false){
  //   document.getElementById('messages').innerHTML = "";

  // }
})
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
function sendMessage() {
  let receiversArray = []
  let output1 = ""
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  if(message.includes(':')){
    let output0 = message.substring(message.indexOf(":"))
    output1 = output0.replaceAll(":", "")
   let receivers = message.substring(0,message.indexOf(":"))
   if(receivers.includes(",")){
    let a = receivers.replaceAll(" ", "")
    let b = a.replaceAll(":", "")
     receiversArray = b.split(",")
   }
   else{
    let a = receivers.trim()
    let b = a.replaceAll(":", "")
     receiversArray = [b]

   }

  }
  
  // if(document.getElementById('username').value.trim() ==''){
   if(role != "admin"){
  socket.emit("receivers", receiversArray)
   if(receiversArray.length==0){
  socket.emit('clientSays', clientuser +" : "+ message)
   }
   else{
    socket.emit('clientSays', clientuser +" : "+ output1 ) 


   }

  }
  else{
    socket.emit("receivers", receiversArray)
   if(receiversArray.length==0){
  socket.emit('clientSays', "Admin " +clientuser +" : "+ message)
   }
   else{
    socket.emit('clientSays',"Admin " + clientuser +" : "+ output1) 


   }

   

  }
  document.getElementById('msgBox').value = ''
  console.log(socket.id)
}
// function userName(){
//  username = document.getElementById('username').value.trim()
// if(check(username)){
//  console.log("good username")
// //  let msgDiv = document.createElement('div')

// // msgDiv.textContent = username + " is your username and you have successfuly connected"
// //  document.getElementById('messages').appendChild(msgDiv)
//  bool = true
//   // socket.emit('clientSays', username +" has joined the chat")
//   socket.emit('clientusername',username)
//   // let m = document.createElement("div")
//   let msgbutton = document.createElement("input")
//   let box = document.createElement("input")
//   msgbutton.type = "button"
//   msgbutton.value = "send"
//   msgbutton.id = "send_button"
//   msgbutton.onclick = sendMessage
//   box.type = "text"
//   // box.value = "Send a message"
//   box.id = "msgBox"

//   // m.appendChild(box);
//   // m.appendChild(msgbutton);
//   document.getElementById("send1").appendChild(box)

//   document.getElementById("send1").appendChild(msgbutton)
//   document.getElementById("username").remove()
//   document.getElementById("Connect").remove()


// }
// else{
//   console.log("bad username")
//   document.getElementById('username').value = ''
//    username = ''
// }
// }


  document.getElementById('ban!').addEventListener('click', function(){
+    socket.emit("update",1)
    console.log(updateA)


   if(role == "admin"){
let banneduser = document.getElementById('banneduser').value.trim()
let mess = document.createElement('div')

 if(updateA.includes(banneduser) == false){
  mess.textContent = "this user doesn't exist"
  mess.style.color = "red"
  document.getElementById("ha").appendChild(mess)
 }
 else if(usersarray.get(banneduser) == "admin"){

  mess.textContent = "this is an admin user"
  mess.style.color = "red"
  document.getElementById("ha").appendChild(mess)



 }
 else{
  mess.textContent = banneduser + " will be successfuly banned "
  mess.style.color = "green"
  document.getElementById("ha").appendChild(mess)
  socket.emit("ban", banneduser)
 }

}
else{
  alert("Only admin users can ban")
}

  })


  
  document.getElementById('unban').addEventListener('click', function(){
    socket.emit("update",1)

    if(role == "admin"){
    let banneduser = document.getElementById('banneduser').value.trim()
    let mess = document.createElement('div')
    console.log(typeof usersarray)
     if(updateA.includes(banneduser) == false){
      mess.textContent = "this user doesn't exist"
      mess.style.color = "red"
      document.getElementById("ha").appendChild(mess)
     }
     else if(usersarray.get(banneduser) == "admin"){

      mess.textContent = "this is an admin user"
      mess.style.color = "red"
      document.getElementById("ha").appendChild(mess)



     }
     else{
      mess.textContent = banneduser + " will be successfuly unbanned "
      mess.style.color = "green"
      document.getElementById("ha").appendChild(mess)
      socket.emit("unban", banneduser)
     }

    }
    else{
      alert("Only admin users can unban")
    }
    
      })

      
  document.getElementById('perma').addEventListener('click', function(){
    socket.emit("update",1)

        if(role == "admin"){
    let banneduser = document.getElementById('banneduser').value.trim()
    let mess = document.createElement('div')

     if(updateA.includes(banneduser) == false){
      mess.textContent = "this user doesn't exist"
      mess.style.color = "red"
      document.getElementById("ha").appendChild(mess)
     }
     else if(usersarray.get(banneduser) == "admin"){

      mess.textContent = "this is an admin user"
      mess.style.color = "red"
      document.getElementById("ha").appendChild(mess)



     }
     else{
      mess.textContent = banneduser + " will be permanently banned "
      mess.style.color = "green"
      document.getElementById("ha").appendChild(mess)
      socket.emit("perma", banneduser)
     }

    }
    else{

      alert("Nice try but only admin users can ban!")
    }
    // usersarray.clear
    socket.emit("update",1)
    
      })



      
  document.getElementById('delete').addEventListener('click', function(){
      
    let button = document.createElement("input")
    button.type = "button"
    button.id ="comfirm"
    button.value = "comfirm deletion"
    button.onclick = del
    document.getElementById("del").appendChild(button)

    // let banneduser = document.getElementById('banneduser').value.trim()

    
      // socket.emit("perma", banneduser)
     
    
      })

function del(){
console.log("deleting account")
 socket.emit("perma", clientuser)




}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}
function clear(){
      document.getElementById('messages').innerHTML = "";

}
//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  // document.getElementById('send_button').addEventListener('click', sendMessage)
  // document.getElementById('Connect').addEventListener('click', userName)
  // document.getElementById('clear').addEventListener('click', clear)

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
