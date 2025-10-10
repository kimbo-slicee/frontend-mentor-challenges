import UIService from "./UIService.js";

/**
 * Handles regex-based input validation for form fields.
 * Each field is defined in the static `rules` object.
 */
export default class RegexValidationService {
    // Define validation rules in one centralized map
    static rules = {
        name: {
            pattern: /^[a-zA-Z\s]+$/u,
            message: "Please enter a valid name",
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
            message: "Please enter a valid email address",
        },
        github: {
            pattern: /^.+$/u,
            message: "Please enter your GitHub username or URL",
        },
    };

    /**
     * Validate a single input field.
     * @param {HTMLInputElement} input - The input element to validate.
     */
    static validate(input) {
        const { name, value } = input;
        let isFormValid=true;

        // 1️⃣ Handle empty input
        if (!value.trim()) {
            this.#setError(input, "This field is required");
            return false;
        }

        // 2️⃣ Get the matching rule for the input name
        const rule = this.rules[name];
        if (!rule) {
            console.warn(`[RegexValidationService] No validation rule for "${name}"`);
            return;
        }

        // 3️⃣ Test the regex pattern
        const isValid = rule.pattern.test(value);
        if (!isValid) {
            this.#setError(input, rule.message);
            return false;
        } else {
            UIService.cleanInputError(input);
            return isFormValid;
        }
    }

    /**
     * Private helper: Set an error message for an input.
     * @param {HTMLInputElement} input
     * @param {string} message
     */
    static #setError(input, message) {
        UIService.inputState(input, message);
    }
}
