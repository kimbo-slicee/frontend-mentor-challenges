import RegexValidationService from "../services/RegexValidationService.js";

export default class FormSubmitController {
    constructor(form, inputs, errors, submitButton) {
        this.form = form;
        this.inputs = inputs;
        this.errors = errors;
        this.submitButton = submitButton;
    }

    init() {
        if (!this.form) return;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        // Setup listeners
        this.form.addEventListener("submit", this.handleSubmit);
        this.inputs.forEach(input => input.addEventListener("input", this.handleInput));
    }

    handleInput(e) {
        const input = e.target;
        RegexValidationService.validate(input);
    }

    handleSubmit(e) {
        e.preventDefault();

        const validationResults = this.inputs.map(input =>
            RegexValidationService.validate(input)
        );

        const isFormValid = validationResults.every(isValid => isValid === true);

        if (isFormValid) {
            this.submitForm();
        } else {
            this.showErrors();
        }
    }

    submitForm() {
        // Optional: disable the button or show loading
        this.submitButton.disabled = true;

        // Example: simulate successful submission
        console.log("✅ Form submitted successfully!");

        // Reset or send data
        this.form.reset();

        // Optional: re-enable button after some delay
        setTimeout(() => (this.submitButton.disabled = false), 1000);
    }

    showErrors() {
        console.warn("⚠️ Some fields are invalid.");
        this.errors.forEach((errorEl, index) => {
            const input = this.inputs[index];
            const isValid = RegexValidationService.validate(input);
            errorEl.textContent = isValid ? "" : "Invalid input";
        });
    }
}
