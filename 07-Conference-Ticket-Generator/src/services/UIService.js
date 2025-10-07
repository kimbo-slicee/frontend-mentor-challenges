// UIService.test.js.js
import DOMutils from "../utils/DOMutils.js";

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
    // display error message for the closest input
    static inputState(errorsSpan,messages){
        messages.forEach(({message=null,isValid},index)=>{
            if(!isValid){
                let span=errorsSpan[index];
                span.textContent=message;
                DOMutils.removeClass(span.parentElement,"hidden");
                DOMutils.redBorder(span);
            }
        })
    }
    // hide the form section and display generated ticket section
    static toggleSections(){

    }
}
