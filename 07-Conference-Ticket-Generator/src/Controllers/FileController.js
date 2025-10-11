import FileModel from "../models/File.js";
import ValidationService from "../services/ValidationService.js";
import UIService from "../services/UIService.js";

export default class FileController {
    constructor({ fileInput, image, helperText, actions, infoMessage, errorMessage, iconInfo }) {
        this.fileInput = fileInput;
        this.image = image;
        this.helperText = helperText;
        this.actions = actions;
        this.infoMessage = infoMessage;
        this.errorMessage = errorMessage;
        this.iconInfo = iconInfo;

        this.attachEvents();
    }

    attachEvents() {
        this.fileInput.addEventListener("change", (e) => this.handleFileUpload(e));
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const fileModel = new FileModel(file);

        UIService.resetMessages(this.infoMessage, this.errorMessage, this.iconInfo);

        if (!ValidationService.isValidSize(fileModel.file)) {
            UIService.showError("File is too large", this.infoMessage, this.errorMessage, this.iconInfo);
            return;
        }

        UIService.displayImage(fileModel.file, this.image);
        UIService.updateUIAfterUpload(this.helperText, this.actions);
    }
}
