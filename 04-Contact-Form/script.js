/**
 * Extended form validation:
 * - Live field validation
 * - Submit disabled until all fields are valid
 * - Extra safe check on submit
 * - Reset UI styles after submission
 */

const form = document.querySelector("form");
const submitBtn = form.querySelector("button[type='submit']");
const inputs = form.querySelectorAll("input:not([type='radio'],[type='checkbox']), textarea");
const radioAndCheckBox = form.querySelectorAll("input[type='radio'], input[type='checkbox']");

// ================== State ==================
const FormState = (() => {
    const fields = [...inputs, ...radioAndCheckBox].map(({ name, type }) => ({
        name,
        type,
        isValid: false,
    }));

    const state = new Map(fields.map(({ name, type, isValid }) => [name, { type, isValid }]));

    const update = (name, isValid) => {
        if (!state.has(name)) return;
        state.set(name, { ...state.get(name), isValid });
    };

    const getAll = () => Object.fromEntries(state);

    const reset = () =>
        state.forEach((field, name) => state.set(name, { ...field, isValid: false }));

    const areAllValid = () => [...state.values()].every(({ isValid }) => isValid);

    const getInvalidFields = () =>
        [...state.entries()]
            .filter(([, { isValid }]) => !isValid)
            .map(([name, { type }]) => ({ name, type }));

    return { update, getAll, reset, areAllValid, getInvalidFields };
})();

// ================== DOM Utils ==================
const DomUtils = (() => {
    const toggleStyles = (element, state) => {
        const parent = element.closest("div");
        const labelSpan = parent?.querySelector("label > span");
        const color = state === "valid" ? "var(--clr-success)" : "var(--clr-error)";
        if (labelSpan) labelSpan.style.color = color;
        if (element.type) element.style.border = `2px solid ${color}`;
    };

    const clearStyles = (element) => {
        const parent = element.closest("div");
        const labelSpan = parent?.querySelector("label > span");
        if (labelSpan) labelSpan.style.color = "";
        element.style.border = "";
    };

    const showError = (element, message) => {
        if (element.nextElementSibling?.classList.contains("error")) {
            element.nextElementSibling.textContent = message;
            return;
        }
        const span = document.createElement("span");
        span.className = "error";
        span.textContent = message;
        element.after(span);
        toggleStyles(element, "invalid");
    };

    const hideError = (element) => {
        const errorSpan = element.nextElementSibling;
        if (!errorSpan?.classList.contains("error")) return;
        errorSpan.remove();
        toggleStyles(element, "valid");
    };

    const toggleActiveClass = (elements, current, className) => {
        elements.forEach((el) => el.classList.remove(className));
        current.classList.add(className);
    };

    const resetRadioAndCheckbox = () => {
        radioAndCheckBox.forEach((input) => {
            const parent = input.closest(".form-control");
            if (parent) parent.classList.remove("active");
            clearStyles(input);
        });
    };

    const displayPopup = () => {
        const popup = document.querySelector(".alert");
        popup.style.top = `20%`;
        setTimeout(() => (popup.style.top = `-50%`), 2500);
    };

    return { showError, hideError, toggleActiveClass, displayPopup, clearStyles, resetRadioAndCheckbox };
})();

// ================== Validation ==================
const Validation = (() => {
    const patterns = {
        firstName: {
            pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{4,30}$/u,
            message: "4–30 letters",
        },
        lastName: {
            pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{4,30}$/u,
            message: "4–30 letters",
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
            message: "Please enter a valid email",
        },
        message: {
            pattern: /^.{10,500}$/,
            message: "10–500 chars",
        },
    };

    const validateRegex = (input, name, value) => {
        const config = patterns[name];
        if (!config) return true;
        const isValid = config.pattern.test(value);
        isValid ? DomUtils.hideError(input) : DomUtils.showError(input, config.message);
        return isValid;
    };

    const validateRequired = (input) => {
        DomUtils.showError(input, "This field is required");
        return false;
    };

    const validateInput = (e) => {
        const input = e.target;
        const { name, value } = input;
        DomUtils.hideError(input);
        const isValid = value.trim()
            ? validateRegex(input, name, value.trim())
            : validateRequired(input);
        FormState.update(name, isValid);
        toggleSubmit();
    };

    const validateRadioAndCheckBox = (e) => {
        const input = e instanceof Event ? e.target : e;
        const { type, name, checked } = input;

        if (type === "radio") {
            const fieldset = input.closest("fieldset");
            const controls = fieldset.querySelectorAll(".form-control");
            if (!checked) {
                DomUtils.showError(fieldset, "Please select a query type");
                return;
            }
            DomUtils.toggleActiveClass(controls, input.parentElement, "active");
            FormState.update(name, true);
            DomUtils.hideError(fieldset);
        } else if (type === "checkbox") {
            checked
                ? DomUtils.hideError(input.closest(".form-row"))
                : DomUtils.showError(
                    input.closest(".form-row"),
                    "To submit this form, please consent to being contacted"
                );
            FormState.update(name, checked);
        }

        toggleSubmit();
    };

    const toggleSubmit = () => {
        submitBtn.disabled = !FormState.areAllValid();
    };

    return { validateInput, validateRadioAndCheckBox };
})();

// ================== Form Handler ==================
const FormHandler = (() => {
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!FormState.areAllValid()) {
            FormState.getInvalidFields().forEach(({ name, type }) => {
                const input = document.querySelector(`[name=${name}]`);
                type === "radio" || type === "checkbox"
                    ? Validation.validateRadioAndCheckBox(input)
                    : DomUtils.showError(input, "This field is required");
            });
            return;
        }

        form.reset();
        FormState.reset();
        DomUtils.resetRadioAndCheckbox(); // <-- clear radio/checkbox styles
        inputs.forEach(DomUtils.clearStyles); // <-- clear borders/colors from text inputs
        DomUtils.displayPopup();
    };

    return { handleFormSubmit };
})();

// ================== Event Listeners ==================
inputs.forEach((input) => {
    input.addEventListener("input", Validation.validateInput);
    input.addEventListener("focus", () => DomUtils.clearStyles(input));
});

radioAndCheckBox.forEach((input) =>
    input.addEventListener("change", Validation.validateRadioAndCheckBox)
);

form.addEventListener("submit", FormHandler.handleFormSubmit);
