
function back(){
    window.location.href = 'http://localhost:3000/user.html';

}
role = sessionStorage.getItem("role")

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back').addEventListener('click', back);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backer').addEventListener('click', back);
  });


  if(role == "admin"){
    document.getElementById("admin").style.display = ""
  }
  else{
    document.getElementById("err").style.display = ""


  }