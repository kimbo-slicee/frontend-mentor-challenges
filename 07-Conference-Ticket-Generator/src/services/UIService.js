import DOMutils from "../../utils/DOMutils.js";
export default class UIService {
    static resetMessages(infoMessage, errorMessage, iconInfo) {
        DOMutils.addClass(infoMessage, "hidden");
        DOMutils.removeClass(errorMessage, "show");
        DOMutils.removeClass(iconInfo, "error");
    }

    static showError(message, infoMessage, errorMessage, iconInfo) {
        infoMessage.textContent = "";
        errorMessage.textContent = message;
        DOMutils.addClass(errorMessage, "show");
        DOMutils.addClass(iconInfo, "error");
    }

    static displayImage(file, imageElement) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    static updateUIAfterUpload(helperText, actions) {
        DOMutils.hideElement(helperText, "hidden");
        DOMutils.showElement(actions, "active");
    }
}
