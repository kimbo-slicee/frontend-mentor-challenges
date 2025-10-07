import RegexValidationService from "../services/RegexValidationService.js";
import UIService from "../services/UIService.js";
import FileValidationService from "../services/FileValidationService.js";

export default class FormSubmitController {
    // create init function as an entry point for this controller
    constructor(form,inputs,errors,submitButton) {
        this.form=form;
        this.inputs=inputs;
        this.errors=errors;
        this.submitButton=submitButton;
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e){
        e.preventDefault();
        this.isAllFilesValid();
    }
    // check inputs validation
    isAllFilesValid(){
        const regexValidation=[...this.inputs].map(({name,value})=>RegexValidationService.regexValidation(name,value));
        UIService.inputState(this.errors,regexValidation);
    }

    //create user instance
}