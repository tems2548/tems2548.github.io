// var myVar;

// function loaded() {
//   myVar = setTimeout(showPage, 2000);
//   document.onreadystatechange ()=>{}
// }

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("my-con").style.display = "block";
}

document.onreadystatechange = ()=>{
  if(document.readyState === "complete"){
    showPage();
  }
}