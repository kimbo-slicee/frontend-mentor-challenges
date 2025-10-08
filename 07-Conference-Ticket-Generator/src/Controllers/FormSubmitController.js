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
        // interactive validation
        this.inputs.forEach(input=>input.addEventListener("input",()=>RegexValidationService.validate(input)))
    }

    handleSubmit(e){
        e.preventDefault();
        // check if all input are valid;
        this.inputs.forEach((input)=>RegexValidationService.validate(input))
    }

}