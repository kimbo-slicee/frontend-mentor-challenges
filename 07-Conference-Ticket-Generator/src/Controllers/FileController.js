// FileController.js
import ValidationService from "../services/ValidationService.js";
import UIService from "../services/UIService.js";
import File from "../models/File.js";

const DEFAULT_IMAGE = "assets/images/icon-upload.svg";

export default class FileController {
    constructor({ fileInput, image, helperText, actionsButtons, infoMessage, errorMessage, iconInfo, actions }) {
        this.fileInput = fileInput;
        this.image = image;
        this.helperText = helperText;
        this.actionsButtons = actionsButtons;
        this.infoMessage = infoMessage;
        this.errorMessage = errorMessage;
        this.iconInfo = iconInfo;
        this.actions = actions;
    }

    attachEvents() {
        this.fileInput.addEventListener("change", this.handleFileUpload.bind(this));
        this.actionsButtons.forEach(btn =>
            btn.addEventListener("click", this.handleFileActions.bind(this))
        );
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const fileModel = new File(file);

        // Reset UI before applying new state
        UIService.resetUI(this.infoMessage, this.errorMessage, this.iconInfo, this.actions);

        if (!ValidationService.isValidSize(fileModel.file)) {
            UIService.fileOverSize(this.infoMessage, this.errorMessage, this.iconInfo);
            this.handleFileRemove();
            return;
        }

        UIService.displayImage(fileModel.file, this.image);
        UIService.displayActions(this.actions, this.helperText);
    }

    handleFileActions(e) {
        if (e.target.classList.contains("remove")) {
            this.handleFileRemove();
        } else {
            this.handleFileChange();
        }
    }

    handleFileRemove() {
        this.fileInput.value = "";
        this.image.src = DEFAULT_IMAGE;
        UIService.removeActions(this.actions, this.helperText);
    }

    handleFileChange() {
        this.fileInput.click();
    }
}
