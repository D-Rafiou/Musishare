let emptyObject = {};

// localStorage.clear();
//When the index.html loads and the storage_table.js script file is loaded by the index.html 
let tableDiv
let buttons = ''
let songtitle = ''
let artist = ''

let x = 0;
let rowindex = 0;

window.addEventListener('load', (event) => {

    tableDiv = document.getElementById("songtable")

    document.getElementById('submit_button').addEventListener("click", pressedButton)
    createTable("matching songs")
    // loadDataToTable()

})

window.addEventListener('load', (event) => {

  tableDiv = document.getElementById("playlist")

  document.getElementById('submit_button').addEventListener("click", pressedButton)
  createTablep("General_Playlist")
  loadDataToTable()

})

window.addEventListener('load', (event) => {

  tableDiv = document.getElementById("personal")

  // document.getElementById('submit_button').addEventListener("click", pressedButton)
  createpersonal("Personal table")
  DataToTable()

})
function cleartable(){ 
  let tblBody = document.getElementById("tableBody")

  while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
}
  y = 0;
  rowindex =0
}
function DataToTable(){
socket.emit("please",clientuser)

socket.on("here", function(data){
  let newDiv = document.createElement("div");
  let button = document.createElement("input");
  button.type = "button";
  button.value = "-";
  button.id = x;
  button.songtitle = data.songtitle
  button.artist = data.artist 
  button.src =  data.src 
  button.onclick = deletep

   newDiv.appendChild(button)
   addpRow(newDiv,data.songtitle,data.artist,data.src)



})




}


function createTable(title) {

    // creates a <table> element and a <tbody> element
    let tbl = document.createElement('table');

    //Create the title of the table
    let tblheader = document.createElement('thead');
    let thtitle = document.createElement('th')
    thtitle.innerHTML = title
    tblheader.appendChild(thtitle)
    thtitle.setAttribute('colspan', '2')
    tbl.appendChild(tblheader)

    let tblBody = document.createElement('tbody');
    tblBody.id = "tableBody"


    let titlerow = document.createElement('tr');
    tblBody.appendChild(titlerow)
    let celltitle1 = document.createElement('td')
    celltitle1.innerHTML = "buttons"
    let celltitle2 = document.createElement('td')
    celltitle2.innerHTML = "songtitle"
    celltitle1.setAttribute('style', 'border:none;')
    celltitle2.setAttribute('style', 'border:none;')
    let celltitle3 = document.createElement('td')
    celltitle3.innerHTML = "artist"
    let celltitle4 = document.createElement('td')
    celltitle4.innerHTML = "pic"
    celltitle3.setAttribute('style', 'border:none;')
    celltitle4.setAttribute('style', 'border:none;')

    titlerow.appendChild(celltitle1)
    titlerow.appendChild(celltitle2)
    titlerow.appendChild(celltitle3)
    titlerow.appendChild(celltitle4)
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    tableDiv.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }
  function createTablep(title) { // create table for playlist 

    // creates a <table> element and a <tbody> element
    let tbl = document.createElement('table');

    //Create the title of the table
    let tblheader = document.createElement('thead');
    let thtitle = document.createElement('th')
    thtitle.innerHTML = title
    tblheader.appendChild(thtitle)
    thtitle.setAttribute('colspan', '2')
    tbl.appendChild(tblheader)

    let tblBody = document.createElement('tbody');
    tblBody.id = "playlistBody"


    // let titlerow = document.createElement('tr');
    // tblBody.appendChild(titlerow)
    let celltitle1 = document.createElement('td')
    celltitle1.innerHTML = "buttonsp"
    let celltitle2 = document.createElement('td')
    celltitle2.innerHTML = "songtitlep"
    celltitle1.setAttribute('style', 'border:none;')
    celltitle2.setAttribute('style', 'border:none;')
    let celltitle3 = document.createElement('td')
    celltitle3.innerHTML = "artistp"
    let celltitle4 = document.createElement('td')
    celltitle4.innerHTML = "picp"
    celltitle3.setAttribute('style', 'border:none;')
    celltitle4.setAttribute('style', 'border:none;')

    // titlerow.appendChild(celltitle1)
    // titlerow.appendChild(celltitle2)
    // titlerow.appendChild(celltitle3)
    // titlerow.appendChild(celltitle4)
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    tableDiv.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }

  function createpersonal(title) { // create table for playlist 

    // creates a <table> element and a <tbody> element
    let tbl = document.createElement('table');

    //Create the title of the table
    let tblheader = document.createElement('thead');
    let thtitle = document.createElement('th')
    thtitle.innerHTML = title
    tblheader.appendChild(thtitle)
    thtitle.setAttribute('colspan', '2')
    tbl.appendChild(tblheader)

    let tblBody = document.createElement('tbody');
    tblBody.id = "personalBody"


    // let titlerow = document.createElement('tr');
    // tblBody.appendChild(titlerow)
    let celltitle1 = document.createElement('td')
    celltitle1.innerHTML = "buttonsp"
    let celltitle2 = document.createElement('td')
    celltitle2.innerHTML = "songtitlep"
    celltitle1.setAttribute('style', 'border:none;')
    celltitle2.setAttribute('style', 'border:none;')
    let celltitle3 = document.createElement('td')
    celltitle3.innerHTML = "artistp"
    let celltitle4 = document.createElement('td')
    celltitle4.innerHTML = "picp"
    celltitle3.setAttribute('style', 'border:none;')
    celltitle4.setAttribute('style', 'border:none;')

    // titlerow.appendChild(celltitle1)
    // titlerow.appendChild(celltitle2)
    // titlerow.appendChild(celltitle3)
    // titlerow.appendChild(celltitle4)
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    tableDiv.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }
function loadDataToTable(){
  // let tableBody = document.getElementById("playlistBody");

  socket.emit("pleasegen",clientuser)

  socket.on("heresgen", function(data){
    let newDiv = document.createElement("div");

  
  
  
  

        
  newDiv.songtitle = newDiv.songtitle
  newDiv.artist = data.artist
  newDiv.src = data.src
  let button = document.createElement("input");
  button.type = "button";
  button.value = "-";
  button.id = x;
  button.songtitle = data.songtitle
  button.artist = data.artist
  button.src = data.src
  let button1 = document.createElement("input");
  button1.type = "button";
  button1.value = "⬇";
  button1.id = x;
  button1.songtitle =data.songtitle
  button1.artist = data.artist
  button1.src = data.src

  let button2 = document.createElement("input");
  button2.type = "button";
  button2.value = "↑";
  button2.id = x;
  button2.songtitle = data.songtitle
  button2.artist = data.artist
  button2.src = data.src


  
  //set the onclick event listener for each button to the function pressedButton
  button.onclick = pressedminus;
  button1.onclick = presseddown;
  button2.onclick = pressedup;

  newDiv.appendChild(button);
  // newDiv.appendChild(button1);
  newDiv.appendChild(button2);
        

  addRowp(newDiv,data.songtitle,data.artist,data.src)


      

    })
  }
  



function addRow(buttons,songname,artist,src) {
  let pic = new Image()
  pic.src = src
  pic.alt = src
  pic.height = 50
  pic.width = 50
    let body = document.getElementById("tableBody")
    // console.log(body)
    let contentrow = document.createElement('tr');
    let cellbuttons = document.createElement('td')
    cellbuttons.appendChild(buttons)
    let cellsname = document.createElement('td')
    cellsname.innerHTML = songname

    let cellartist = document.createElement('td')
    cellartist.innerHTML = artist

    let cellpic = document.createElement('td')
    cellpic.appendChild(pic) 
 
    body.appendChild(contentrow)

    contentrow.appendChild(cellbuttons)
    contentrow.appendChild(cellsname)
    contentrow.appendChild(cellartist)
    contentrow.appendChild(cellpic)

}
function addRowp(buttons,songname,artist,src) {    // add row for playlist table 
  // let butt = document.createElement("div");
  // butt.appendChild(buttons)
  butt = buttons
  let pic = new Image()
  pic.src = src
  pic.alt = src
  pic.height = 50
  pic.width = 50
  let body = document.getElementById("playlistBody")
  // console.log(body)
  let contentrow = document.createElement('tr');
  let cellbuttons = document.createElement('td')
  cellbuttons.songtitle = buttons.songtitle
  cellbuttons.artist = buttons.artist 
  cellbuttons.src = buttons.src
  cellbuttons.appendChild(buttons);
  let cellsname = document.createElement('td')
  cellsname.innerHTML = songname
  let cellartist = document.createElement('td')
  cellartist.innerHTML = artist
   
  let cellpic = document.createElement('td')
  cellpic.appendChild(pic) 

  body.appendChild(contentrow)

  contentrow.appendChild(cellbuttons)
  contentrow.appendChild(cellsname)
  contentrow.appendChild(cellartist)
  contentrow.appendChild(cellpic)

}

function addpRow(buttons,songname,artist,src) {    // add row for personal playlist table 
  // let butt = document.createElement("div");
  // butt.appendChild(buttons)
  butt = buttons
  let pic = new Image()
  pic.alt = src
  console.log(src)
  pic.src = src
  pic.height = 50
  pic.width = 50
  let body = document.getElementById("personalBody")
  // console.log(body)
  let contentrow = document.createElement('tr');
  let cellbuttons = document.createElement('td')
  cellbuttons.songtitle = buttons.songtitle
  cellbuttons.artist = buttons.artist 
  cellbuttons.src = buttons.src
  cellbuttons.appendChild(buttons);
  let cellsname = document.createElement('td')
  cellsname.innerHTML = songname
  let cellartist = document.createElement('td')
  cellartist.innerHTML = artist
   
  let cellpic = document.createElement('td')
  cellpic.appendChild(pic) 

  body.appendChild(contentrow)

  contentrow.appendChild(cellbuttons)
  contentrow.appendChild(cellsname)
  contentrow.appendChild(cellartist)
  contentrow.appendChild(cellpic)

}
//This function is called whenever a button is clicked.


function getSong() {

   cleartable();
    let songTitle = document.getElementById('songTitleTextField').value.trim()
    console.log('songTitle: ' + songTitle)
    if(songTitle === '') {
        return alert('Please enter a Song Title')
    }

    let songsDiv = document.getElementById('songs_div')
    songsDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            Object.assign(emptyObject, response);
            let lim =emptyObject["resultCount"]
            for(let i = 0; i < parseInt(lim); i++){
            let button = document.createElement("input");
            button.type = "button"
            button.rowindex = rowindex
            button.value = "+"
            button.id = rowindex
            button.onclick = pressedplus
            

            songtitle = emptyObject["results"][i]["trackName"]
            artist = emptyObject["results"][i]["artistName"]
            src = emptyObject["results"][i]["artworkUrl100"]
            button.songtitle = songtitle
            button.artist = artist 
            button.src = src 
            
            // if (fname !== '' && lname !== ''){
          
                // document.getElementById('songTitleTextField').value = ''
                // document.getElementById('songTitleTextField').value = ''
          
                // localStorage.setItem("buttons" + y, buttons);
                // localStorage.setItem("songtitle" + y, songtitle);
                // localStorage.setItem("artist" + y, artist);
                // localStorage.setItem("pic" + y, src);
                // localStorage.setItem("buttonsp" + x, button);
                // localStorage.setItem("songtitlep" + x, songtitle);
                // localStorage.setItem("artistp" + x, artist);
                // localStorage.setItem("picp" + x, src);
          
                // x++;
                rowindex ++;
                // y++;
                
                addRow(button, songtitle,artist,src)
                // addRowp(button, songtitle,artist,src)
            }
 			songsDiv.innerHTML = songsDiv.innerHTML + `
			<h1>Songs matching: ${songTitle} </h1>
      
			`
      }
    }
    xhr.open('GET', `/songs?title=${songTitle}`, true)
    xhr.send()
}
// console.log(emptyObject["resultCount"])
function pressedplus(event){

  // x = 0
  //this.id refers to the button id that you added in the createButtons function
  //this.id is for the specific button pressed.
  
  // console.log('button clicked', this.id);
  // alert("Button: at row " + this.rowindex + " is pressed.");
  let tableBody = document.getElementById("playlistBody");
  let l = tableBody.rows.length
  let newDiv = document.createElement("div");
  let button = document.createElement("input");
  button.type = "button";
  button.value = "-";
  button.id = x;
  button.songtitle = this.songtitle
  button.artist = this.artist 
  button.src = this.src 

  let button1 = document.createElement("input");
  button1.type = "button";
  button1.value = "⬇";
  button1.id = x;
  button1.songtitle = this.songtitle
  button1.artist = this.artist 
  button1.src = this.src

  newDiv.songtitle = this.songtitle
  newDiv.artist = this.artist 
  newDiv.src = this.src

  let button2 = document.createElement("input");
  button2.type = "button";
  button2.value = "↑";
  button2.id = x;
  button2.songtitle = this.songtitle
  button2.artist = this.artist 
  button2.src = this.src


  
  //set the onclick event listener for each button to the function pressedButton
  button.onclick = pressedminus;
  button1.onclick = presseddown;
  button2.onclick = pressedup;

  newDiv.appendChild(button);
  // newDiv.appendChild(button1);
  newDiv.appendChild(button2);
  newDiv.artist = this.artist 
  newDiv.src = this.src
  this.songtitle = clientuser + " : " + this.songtitle
  newDiv.songtitle = this.songtitle

  addRowp(newDiv,this.songtitle,this.artist,this.src)


  let data = {
    src : this.src,
    songtitle : this.songtitle,
    artist: this.artist

    


   }

  socket.emit("addgen",data)
  socket.emit('pressedplus',newDiv)


}
socket.on('div',function(Div){


 console.log(Div.songtitle);
 let tableBody = document.getElementById("playlistBody");
 let l = tableBody.rows.length
 let newDiv = document.createElement("div");
 let button = document.createElement("input");
 button.type = "button";
 button.value = "-";
 button.id = x;
 button.songtitle = Div.songtitle
 button.artist = Div.artist 
 button.src = Div.src 

 let button1 = document.createElement("input");
 button1.type = "button";
 button1.value = "⬇";
 button1.id = x;
 button1.songtitle = Div.songtitle
 button1.artist = Div.artist 
 button1.src = Div.src

 newDiv.songtitle = Div.songtitle
 newDiv.artist = Div.artist 
 newDiv.src = Div.src

 let button2 = document.createElement("input");
 button2.type = "button";
 button2.value = "↑";
 button2.id = x;
 button2.songtitle = Div.songtitle
 button2.artist = Div.artist 
 button2.src = Div.src


 
 //set the onclick event listener for each button to the function pressedButton
 button.onclick = pressedminus;
 button1.onclick = presseddown;
 button2.onclick = pressedup;

 newDiv.appendChild(button);
//  newDiv.appendChild(button1);
 newDiv.appendChild(button2);
 newDiv.songtitle = Div.songtitle
 newDiv.artist = Div.artist 
 newDiv.src = Div.src
 addRowp(newDiv,Div.songtitle,Div.artist,Div.src)






})




socket.on('rowindex',function(index){

    deleteRow(index)
  
  
  })

  function deletepRow(rowIndex) {
    // socket.emit('pressed','pressminus')
  
  
    let tableBody = document.getElementById("personalBody");
  
    let rowToDelete = tableBody.rows[rowIndex];
  
        rowToDelete.parentNode.removeChild(rowToDelete);
  
        
  
    
  }
  
  function deleteRow(rowIndex) {
  // socket.emit('pressed','pressminus')


  let tableBody = document.getElementById("playlistBody");

  let rowToDelete = tableBody.rows[rowIndex ];

      rowToDelete.parentNode.removeChild(rowToDelete);

    

  
}


function getRowIndex(event) {
  let button = event.target;

  let row = button.closest('tr');

  // If a row is found, return its index
  if (row) {
      return row.rowIndex;
  } else {
      return null;
  }
}
function pressedminus(event){

  if(role == "admin"){
  let rowIndex = getRowIndex(event); // Get the row index using the function we discussed earlier
  socket.emit('rowindex',rowIndex)

  if (rowIndex !== null) {

      // localStorage.removeItem("buttonsp" + rowindex);
   
    
   
      deleteRow(rowIndex); // Pass the row index to the deleteRow function

  }
  let data = {
    src : this.src



   }
   socket.emit("delgen",data)




}
else{


  alert("Admin priviliges needed to delete from general playlist");
}




}
function presseddown(event){
  let rowIndex = getRowIndex(event); // Get the row index using the function we discussed earlier

  console.log('button clicked', this.parentNode.parentNode.rowIndex);

  alert("Button: at row " + rowIndex + " is pressed.");



}
function pressedup(event){

  // let rowIndex = getRowIndex(event); // Get the row index using the function we discussed earlier
  let tableBody = document.getElementById("personalBody");
  // let l = tableBody.rows.length
  let newDiv = document.createElement("div");
  let button = document.createElement("input");
  button.type = "button";
  button.value = "-";
  button.id = x;
  button.songtitle = this.songtitle
  button.artist = this.artist 
  button.src =  "" +this.src.toString() 
  button.onclick = deletep

   newDiv.appendChild(button)
   addpRow(newDiv,this.songtitle,this.artist,this.src)
   console.log(typeof button.src)


   let data = {
    songtitle: this.songtitle,
    artist: this.artist,
    src: this.src.toString()
  };
   socket.emit("add",data,clientuser)
 
  // console.log('button clicked', this.parentNode.parentNode.rowIndex);


  alert(this.songtitle + " will be added to your personal playlist")



}

function deletep(event){
    let rowIndex = getRowIndex(event); // Get the row index using the function we discussed earlier
    // socket.emit('rowindex',rowIndex)
  
    if (rowIndex !== null) {
        deletepRow(rowIndex); // Pass the row index to the deleteRow function
  
    }

      let data = {
       src : this.src



      }
  
      alert(this.songtitle + " will be removed to your personal playlist")
      this.src = this.src.toString()
      socket.emit("remove",data,clientuser)

  }
 
  
function pressedButton(){
  getSong()
  
  // buttons = " "
  // songtitle = document.getElementById('songTitleTextField').value
  // artist = document.getElementById('songTitleTextField').value
  // pic = document.getElementById('songTitleTextField').value

  // // if (fname !== '' && lname !== ''){

  //     document.getElementById('songTitleTextField').value = ''
  //     document.getElementById('songTitleTextField').value = ''

  //     localStorage.setItem("buttons" + x, buttons);
  //     localStorage.setItem("songtitle" + x, songtitle);
  //     localStorage.setItem("artist" + x, artist);
  //     localStorage.setItem("pic" + x, pic);


  //     x++;
      
  //     addRow(buttons, songtitle,artist,pic)
  // }

}

//Attach Enter-key Handler
const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('submit_button').addEventListener('click', getSong)

//   //add key handler for the document as a whole, not separate elements.
//   document.addEventListener('keyup', pressedButton)
  
// })
