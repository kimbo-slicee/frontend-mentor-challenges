// UIService.test.js.js
import DOMutils from "../utils/DOMutils.js";
import FormUtils from "../utils/formUtils.js";

export default class UIService {
    // Image preview
    static displayImage(file, imageElement) {
        const reader = new FileReader();
        reader.onload = e => imageElement.src = e.target.result;
        reader.readAsDataURL(file);
    }

    // Reset all UI to default
    static resetUI(requiredFiledMessage,infoMessage, errorMessage, iconInfo, actions) {
        DOMutils.removeClass(infoMessage, "hidden");
        DOMutils.hideElement(errorMessage);
        DOMutils.hideElement(requiredFiledMessage)
        DOMutils.removeClass(iconInfo, "error");
        DOMutils.hideElement(actions);
    }

    // Actions
    static displayActions(actions, helperText) {
        DOMutils.hideElement(helperText);
        DOMutils.replaceClass(actions, "hidden", "show");
    }

    static removeActions(actions, helperText) {
        DOMutils.hideElement(actions);
        DOMutils.removeClass(helperText, "hidden");
    }

    // File validation
    static fileEmpty(inputFile){
        if(!inputFile) return;
        const messageContainer=inputFile.closest("div").nextElementSibling;
        const icon=messageContainer.querySelector("svg");
        const infoMessage=messageContainer.querySelector(".info-message")
        const errorMessage=messageContainer.querySelector(".error-message");
        const requiredFiledMessage=messageContainer.querySelector(".error-message.filed-required");
        DOMutils.hideElement(infoMessage)
        DOMutils.hideElement(errorMessage);
        DOMutils.showElement(requiredFiledMessage)
        DOMutils.addClass(icon, "error");
    }
    static fileOverSize(infoMessage, errorMessage, iconInfo) {
        DOMutils.showElement(errorMessage);
        DOMutils.hideElement(infoMessage);
        DOMutils.addClass(iconInfo, "error");
    }

    static inputState(input,message){
        FormUtils.showError(input,message);
    }
    static cleanInputError(input){
        FormUtils.clearError(input)
    }
    static toggleVisibility(eleOne,eleTwo){
           DOMutils.toggleClass(eleTwo,"hidden");
           DOMutils.toggleClass(eleOne,"hidden");
    }
}
