import ValidationService from "./services/validationService.js";

const form =document.querySelector("form");
const fileInput=document.querySelector("input[type='file']");
const image=document.querySelector("img[alt='upload-file']");
const formHelpText=document.querySelector(".form-help");
const actionBtn=document.querySelector(".upload-actions");
const changeBtn=document.querySelector("button.change");
const removeBtn=document.querySelector("button.remove");

const userAvatar=(e)=>{
    const file=e.target.files[0];
    // size file Validation
    if(!ValidationService.isValidSize(file)) return;
    image.src=URL.createObjectURL(file);
    // hide helper text and display action btn
    formHelpText.style.display="none";
    actionBtn.style.display="grid"
}
const handelChangeImage=()=>{
    fileInput.click();
}
const handelRemoveImage=()=>{
    image.src="assets/images/icon-upload.svg";
    formHelpText.style.display="block";
    actionBtn.style.display="none"
}
const handelSubmit=()=>{
    // check if all fields are not empty and valid

}

changeBtn.addEventListener("click",handelChangeImage)
removeBtn.addEventListener("click",handelRemoveImage)
fileInput.addEventListener("change",userAvatar)
form.addEventListener("submit",handelSubmit)