import FileController from "./controllers/FileController.js";
import FormSubmitController from "./controllers/FormSubmitController.js";

const formSection=document.getElementById("form-section");
const generatedTicketSection=document.getElementById("generated-ticket");
const fileInput = document.querySelector("input[type='file']");
const image = document.querySelector("img[alt='upload-file']");
const helperText = document.querySelector(".form-help");
const actions = document.querySelector(".upload-actions");
const actionsButtons = document.querySelectorAll(".upload-actions button");
const requiredFiledMessage=document.querySelector(".error-message.filed-required");
const infoMessage = document.querySelector(".info-message");
const errorMessage = document.querySelector(".error-message");
const iconInfo = document.querySelector(".icon-info");
const form=document.querySelector("form");
const inputs=document.querySelectorAll("input:not([type='file'])");
const errors=document.querySelectorAll("span.error-message");
// ticket elements
const highlightedName=document.querySelector(".name-highlighted");
const highlightedEmail=document.querySelector(".email-highlighted");
const ticketWrapper=document.querySelector(".ticket");

const fileController=new FileController({
    fileInput,
    image,
    helperText,
    actionsButtons,
    requiredFiledMessage,
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
        fileInput,
        formSection,
        generatedTicketSection,
        ticketWrapper,
        highlightedName,
        highlightedEmail

    });
fileController.init();
formSubmitController.init();



