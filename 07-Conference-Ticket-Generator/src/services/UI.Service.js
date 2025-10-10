// UI.Service.test.js.js
import DOMutils from "../utils/DOMutils.js";
import Form from "../utils/form.js";

export default class UIService {
    // Image preview
    static displayImage(file, imageElement) {
        const reader = new FileReader();
        reader.onload = e => imageElement.src = e.target.result;
        reader.readAsDataURL(file);
    }

    // Reset all UI to default
    static resetUI(infoMessage, errorMessage, iconInfo, actions) {
        DOMutils.removeClass(infoMessage, "hidden");
        DOMutils.hideElement(errorMessage);
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

    // Validation feedback
    static fileOverSize(infoMessage, errorMessage, iconInfo) {
        DOMutils.showElement(errorMessage);
        DOMutils.hideElement(infoMessage);
        DOMutils.addClass(iconInfo, "error");
    }

    static inputState(input,message){
        Form.showError(input,message);
    }
    static cleanInputError(input){
        Form.clearError(input)
    }
    static toggleVisibility(eleOne,eleTwo){
           DOMutils.toggleClass(eleTwo,"hidden");
           DOMutils.toggleClass(eleOne,"hidden");
    }
}
