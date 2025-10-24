import FileValidationService from "../services/FileValidationService.js";
import UIService from "../services/UIService.js";
import File from "../models/File.model.js";
import { Store } from '../store/state.store.js';

export default class FileController {
     #DEFAULT_IMAGE = "assets/images/icon-upload.svg";
    constructor({fileInput, image, helperText, actionsButtons,requiredFiledMessage, infoMessage, errorMessage, iconInfo, actions }) {
        this.fileInput = fileInput;
        this.image = image;
        this.helperText = helperText;
        this.actionsButtons = actionsButtons;
        this.requiredFiledMessage=requiredFiledMessage;
        this.infoMessage = infoMessage;
        this.errorMessage = errorMessage;
        this.iconInfo = iconInfo;
        this.actions = actions;
    }

    init() {
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
        UIService.resetUI(this.requiredFiledMessage,this.infoMessage, this.errorMessage, this.iconInfo, this.actions);

        if (!FileValidationService.isValidSize(fileModel.file)) {
            UIService.fileOverSize(this.infoMessage, this.errorMessage, this.iconInfo);
            this.handleFileRemove();
            return;
        }

        UIService.displayImage(fileModel.file, this.image);
        UIService.displayActions(this.actions, this.helperText);

        // ✅ Save file data to store state
        Store.file = fileModel.file;
    }

    handleFileActions(e) {
        if (e.target.classList.contains("remove"))this.handleFileRemove()
        else this.handleFileChange();
    }

    handleFileRemove() {
        this.fileInput.value = "";
        this.image.src = this.#DEFAULT_IMAGE;
        UIService.removeActions(this.actions, this.helperText);

        // ✅ Clear file data from store state
        Store.file = null;
    }

    handleFileChange() {
        this.fileInput.click();
    }

    isFileExist() {
        if (!Store.file) {
            UIService.fileOverSize(this.infoMessage, this.errorMessage, this.iconInfo);
        }
    }
}
