import FileController from "./controllers/FileController.js";
import FormSubmitController from "./Controllers/FormSubmitController.js";
const fileInput = document.querySelector("input[type='file']");
const image = document.querySelector("img[alt='upload-file']");
const helperText = document.querySelector(".form-help");
const actions = document.querySelector(".upload-actions");
const actionsButtons = document.querySelectorAll(".upload-actions button");
const infoMessage = document.querySelector(".info-message");
const errorMessage = document.querySelector(".error-message");
const iconInfo = document.querySelector(".icon-info");
const form=document.querySelector("form");
const inputs=document.querySelectorAll("input:not([type='file'])");
const submit=document.querySelector("button[type='submit']");
const errors=document.querySelectorAll("span.error-message");
const fileController=new FileController({
    fileInput,
    image,
    helperText,
    actionsButtons,
    infoMessage,
    errorMessage,
    iconInfo,
    actions
});

// handel file upload
fileController.attachEvents();
const formSubmitController=new FormSubmitController(form,inputs,errors,submit);
formSubmitController.init();



