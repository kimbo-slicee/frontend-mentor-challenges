/**
 * I extended the basic form validation challenge:
 * - Live validation for each field
 * - Disable submit button until all fields are valid
 * - Extra check on submit in case someone manipulates DOM
 */

const submitBtn = document.querySelector("button[type='submit']");
const inputs = document.querySelectorAll("input:not([type='radio'],[type='checkbox']),textarea");
const radioAndCheckBox = document.querySelectorAll("input[type='radio'],input[type='checkbox']");
const form=document.querySelector("form");

// ================== State ==================
const FormFieldState = (() => {
    const fields = [...inputs, ...radioAndCheckBox].map(({ name, type }) => ({
        name,
        type,
        isValid: false,
    }));

    const state = new Map(fields.map(({ name, type, isValid }) => [name, { type, isValid }]));

    const update = (name, isValid) => {
        if (!state.has(name)) return;
        const field = state.get(name);
        state.set(name, { ...field, isValid });
    };

    const get = (name) => state.get(name);

    const getAll = () => Object.fromEntries(state);

    const reset = () => {
        for (const [name, field] of state) {
            state.set(name, { ...field, isValid: false });
        }
    };

    const areAllValid = () => [...state.values()].every(({ isValid }) => isValid);

    const getInvalidFields = () =>
        [...state.entries()]
            .filter(([, { isValid }]) => !isValid)
            .map(([name,{type}]) => new Object({name, type}));

    return { update, get, getAll, reset, areAllValid, getInvalidFields };
})();

// ================== Utils ==================
const Utils = (() => {
    const toggleStyles = (element, state) => {
        const {type}=element;
        const parent = element.closest("div");
        const labelSpan = parent?.querySelector("label > span");
        if (labelSpan) labelSpan.style.color = state === "valid" ? "var(--clr-success)" : "var(--clr-error)";
        if(type) element.style.border = `2px solid ${state === "valid" ? "var(--clr-success)" : "var(--clr-error)"}`;
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
        if (!errorSpan || !errorSpan.classList.contains("error")) return;
        errorSpan.remove();
        toggleStyles(element, "valid");
    };

    const toggleActiveClass = (elements, current, className) => {
        elements.forEach((el) => el.classList.remove(className));
        current.classList.add(className);
    };

    const removeClass=(element,className)=>element.className.remove(className)

    const displayPopup=()=>{
        const popUp=document.querySelector(".alert");
        popUp.style.top=`20%`;
        setTimeout(()=>{
        popUp.style.top=`-50%`;
        },2500)
    }

    return { showError, hideError, toggleActiveClass , displayPopup,removeClass};
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
        if (!config) return true; // if no regex defined, skip

        const { pattern, message } = config;
        const isValid = pattern.test(value);

        if (!isValid) Utils.showError(input, message);
        else Utils.hideError(input);

        return isValid;
    };
    const validateRequired = (input) => {
        Utils.showError(input, "This field is required");
        return false;
    };

    const validateInput = (e) => {
        const input = e.target;
        const { name, value } = input;
        Utils.hideError(input);
        const isValid = value.trim()
            ? validateRegex(input, name, value.trim())
            : validateRequired(input);
        FormFieldState.update(name, isValid);
        toggleSubmit();
    };

    const validateRadioAndCheckBox = (e) => {
        const input =e instanceof Event ? e.target : e
        const { type, name, checked} = input;
        if (type === "radio") {
            const fieldset = input.closest("fieldset");
            const controls = fieldset.querySelectorAll(".form-control");
            if(!checked) {
                Utils.showError(fieldset, "Please select a query type");
                return;
            }
            Utils.toggleActiveClass(controls, input.parentElement, "active");
            FormFieldState.update(name, true);
            Utils.hideError(fieldset)
        } else if (type === "checkbox") {
            const parentRow = input.closest(".form-row");
            checked
                ? Utils.hideError(parentRow)
                : Utils.showError(parentRow,"To submit this form, please consent to being contacted")
                FormFieldState.update(name, checked);
        }

        toggleSubmit();
    };

    const toggleSubmit = () => {
        submitBtn.disabled = !FormFieldState.areAllValid();
    };

    return { validateInput, validateRadioAndCheckBox };
})();
// ================= Form Data =====================
const FormDataInstance=(()=>{
    const handelFormSubmit=(e)=>{
        const inputsValidationState=FormFieldState.areAllValid();
        e.preventDefault();
        if(!inputsValidationState){
            // display errors message for not valid inputs
            const invalidInputsName=FormFieldState.getInvalidFields();
                [...invalidInputsName]
                .map(({name,type})=> type === "radio" ||  type === "checkbox"
                 ? Validation.validateRadioAndCheckBox(document.querySelector(`input[type=${type}]`))
                 :[{name,type}]
                        .filter(({name,type})=>type!=="radio" && type!=="checkbox")
                        .map(({name})=>document.querySelector(`[name=${name}]`))
                        .forEach((input)=>Utils.showError(input,"This field is Require"))
                );
                return;
        }
        // // get object data
        // const formData=new FormData(form);
        // for (const [key, value] of formData.entries()) {
        //     console.log(key, ":", value);
        // }
        console.log(FormFieldState.getInvalidFields())
        form.reset();
        FormFieldState.reset();
        Utils.displayPopup();
    }
    return{handelFormSubmit}
})();
// ================== Event Listeners ==================
inputs.forEach((input) => input.addEventListener("input", Validation.validateInput));
radioAndCheckBox.forEach((input) =>
    input.addEventListener("change", Validation.validateRadioAndCheckBox)
);

form.addEventListener("submit",FormDataInstance.handelFormSubmit)
