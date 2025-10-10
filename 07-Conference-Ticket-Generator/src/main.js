import FileController from "./Controllers/File.controller.js";
import FormSubmitController from "./Controllers/FormSubmit.controller.js";

const formSection=document.getElementById("form-section");
const generatedTicketSection=document.getElementById("generated-ticket");
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
// ticket elements
const highlightedName=document.querySelector(".name-highlighted");
const highlightedEmail=document.querySelector(".email-highlighted");
const ticketWrapper=document.querySelector(".ticket");

const fileController=new FileController({
    form,
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
const formSubmitController=new FormSubmitController({
        form,
        inputs,
        errors,
        submit,
        formSection,
        generatedTicketSection,
        ticketWrapper,
        highlightedName,
        highlightedEmail

    });
fileController.init();
formSubmitController.init();



