import RegexValidationService from "../services/RegexValidationService.js";
import User from "../models/User.model.js";
import UIService from "../services/UIService.js"
import {Store} from '../store/state.store.js';
import TicketService from "../services/TicketService.js";

export default class FormSubmitController {
    constructor({form, inputs, errors, fileInput, formSection, generatedTicketSection,ticketWrapper,highlightedName,highlightedEmail,loader}) {
            this.form = form;
            this.inputs = inputs;
            this.errors = errors;
            this.fileInput = fileInput;
            this.formSection=formSection;
            this.generatedTicketSection=generatedTicketSection;
            // ticket elements
            this.ticketWrapper=ticketWrapper;
            this.highlightedName=highlightedName;
            this.highlightedEmail=highlightedEmail
            // loader
            this.loader=loader

    }

    init() {
        if (!this.form) return;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.inputs.forEach(input => input.addEventListener("input", this.handleInput));
    }

    handleInput(e) {
        const input = e.target;
        RegexValidationService.validate(input);
    }

    handleSubmit(e) {
        e.preventDefault();
        const validationResults = [...this.inputs].map(input => RegexValidationService.validate(input));
        const isFormValid = validationResults.every(isValid => isValid === true);

        if (!isFormValid) {
            this.showErrors();
            return;
        }

        if (!Store.file) {
            // Call UI service
            UIService.fileEmpty(this.fileInput,"Upload image under 500KB")
            return;
        }

        this.submitForm();
    }

    submitForm() {
        const userInfo = {};
        this.inputs.forEach(input => userInfo[input.name] = input.value);

        const user = new User(userInfo.name, userInfo.email, userInfo.github);

        const ticket = TicketService.generateTicket(user,this.ticketWrapper,this.highlightedName,this.highlightedEmail);

        Store.user = user;
        Store.ticket = ticket;
        this.form.reset();
        UIService.toggleVisibility(this.formSection, this.generatedTicketSection);
    }

    showErrors() {
        this.errors.forEach((errorEl, index) => {
            const input = this.inputs[index];
            const isValid = RegexValidationService.validate(input);
            errorEl.textContent = isValid ? "" : "Invalid input";
        });
    }
}
