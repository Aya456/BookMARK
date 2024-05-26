var bookmarkName=document.getElementById("bookmarkName");
var siteURL=document.getElementById("bookmarkURL");
var submitBtn=document.getElementById("submitBtn");
var updateBtn=document.getElementById("updateBtn");
var bookmarks=[];
var searchInput=document.getElementById("search")
var globalindex;
var nameError = document.getElementById("nameError");
var urlError=document.getElementById("urlError");
var errorMessage=document.getElementById("errorMessage");
var closeBtn=document.getElementById("closeBtn");


if(localStorage.bookmark != null){
    bookmarks = JSON.parse(localStorage.bookmark)
}else{
    bookmarks=[]
}
displayBookMark(bookmarks); 
 

function addbookmark() {
    if (validateName() && validateUrl() ) {
    var bookMark={
        siteName:bookmarkName.value,
        siteUrl:siteURL.value
    }
    
   }else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrongSite Name or Url is not valid, Please follow the rules below :!",
      });

   }

   bookmarks.push(bookMark);
    localStorage.setItem("bookmark",JSON.stringify(bookmarks));

    displayBookMark(bookmarks);
    clearInputs() ;
}

function displayBookMark(arr) {
    cartona="";
    for (var i = 0; i < arr.length; i++) {
        cartona+=`  <tr>
        <td>${i+1}</td>
        <td>${arr[i].siteName}</td>
        <td> <a class="btn btn-success" target="_blank" href="${arr[i].siteUrl}" ><i class="fa-regular fa-eye pe-2"></i>Visit</a></td>
        <td> <button class="btn btn-danger" onclick="deleteElement(${i})"><i class="fa-solid fa-trash pe-2"></i></i>Delete</button></td>
        <td> <button class="btn btn-primary  " onclick="updateElement(${i})"> <i class="fa-solid fa-pen pe-2" ></i>Update</button></td>
    </tr>`
    }
    document.getElementById("tableContent").innerHTML=cartona;
}
////////////////////////////////////////////////////////////
function clearInputs() {
    bookmarkName.value="";
    siteURL.value="";
    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.remove("is-valid");
    siteURL.classList.remove("is-invalid");
    siteURL.classList.remove("is-valid");
}

////////////////////////////////////////////////////////////////
function deleteElement(index) {
    bookmarks.splice(index,1); 
    localStorage.setItem("bookmark",JSON.stringify(bookmarks));
    displayBookMark(bookmarks);
}
///////////////////////////////////////////////////////////
function updateElement(indx) {
    globalindex=indx;
    bookmarkName.value = bookmarks[indx].siteName;
    siteURL.value =bookmarks[indx].siteUrl;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}
function finalUpdate() {
bookmarks[globalindex].siteName= bookmarkName.value;
bookmarks[globalindex].siteURL= siteURL.value;
localStorage.setItem("bookmark",JSON.stringify(bookmarks));

displayBookMark(bookmarks);

submitBtn.classList.remove("d-none");
updateBtn.classList.add("d-none");
clearInputs() ;
// bookmarkName.value="";
// siteURL.value="";
// bookmarkName.classList.remove("is-invalid");
// bookmarkName.classList.remove("is-valid");
// siteURL.classList.remove("is-invalid");
// siteURL.classList.remove("is-valid");
}
//////////////////////////////////////////////////////////////////
function searchElement(term) {
    cartona="";
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteName.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona+=`  <tr>
            <td>${i+1}</td>
            <td>${term?bookmarks[i].siteName.replace(term ,`<span class="text-danger fw-bolder">${term}</span>`):bookmarks[i].siteName}</td>
            <td> <a target="_blank" href="${bookmarks[i].siteUrl}" class="btn btn-success text-white"><i class="fa-regular fa-eye pe-2"></i>Visit</a></td>
            <td> <button class="btn btn-danger " onclick="deleteElement(${i})"><i class="fa-solid fa-trash pe-2"></i></i>Delete</button></td>
            <td> <button class="btn btn-primary  " onclick="updateElement(${i})"> <i class="fa-solid fa-pen pe-2" ></i>Update</button></td>
        </tr>` 
        }
    }
    document.getElementById("tableContent").innerHTML=cartona;

}



function validateUrl() {
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/g ;  
    return regex.test(siteURL.value);
}
function validateName() {
    var regex =  /^[a-z]{3,8}$/i ;  
    return regex.test(bookmarkName.value);
}

bookmarkName.addEventListener("input" ,function () {
  if (validateName()) {
        bookmarkName.classList.remove("is-invalid");
        bookmarkName.classList.add("is-valid");
  } else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
  } 
})
siteURL.addEventListener("input" ,function () {
    if (validateUrl()) {
        siteURL.classList.remove("is-invalid");
        siteURL.classList.add("is-valid");
    } else{
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
    } 
  })

  

