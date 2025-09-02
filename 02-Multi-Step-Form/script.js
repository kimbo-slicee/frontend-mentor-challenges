/*
* 1. add form validation
* 2. move to the next step
* 3. display back button
* 3. hidde form after confirm button clicked
*/

/* ======================Step-1: (Personal Info) Functionalities===================== */

/*
* 1. Require input message after click next button and focus on the input
* 2. add second validation using regex pattern for each input (optional)
* 3. remove disable attr from button if all validation passe
*/
const state={
        personInfo:{
            name:"",
            email:"",
            phone:""
        },
        plan:{

        },
        ons:{

        }
}
/*================ 1. Form Validation ===============*/
const regexValidation = (input) => {
    const inputType = input.type;
    const patterns = {
        text: {
            regex: /^(?!\s)(?!.*\s$)[\p{L}\s]{3,30}$/u,
            message: "valid Name (e.g. Stephen King)",
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
            message:"valid email address (e.g. stephenking@lorem.com)",
        },
        tel: {
            regex: /^\+?[0-9]{1,3}[-.\s]?[0-9]{3,15}$/,
            message:"Valid Phone number (e.g. +1 234 567 890) ",
        },
    };

    const rule = patterns[inputType];

    if (!rule) {
        console.warn(`Unsupported input type: ${inputType}`);
        return "";
    }

    return rule.regex.test(input.value) ? "" : rule.message;
};
const formValidation = () => {
    const inputs = document.querySelectorAll(".form-content input");
    inputs.forEach((input) => {
        const value = input.value.trim();
        const parent = input.closest("div");
        const span = parent.querySelector("span");
        input.style.border="0";
        span.textContent = "";
        if (!value) {
            span.textContent = "This field is required";
            input.style.border="2px solid var(--primary-red-500)";
        } else {
            const errorMessage = regexValidation(input);
            if (errorMessage) {
                span.textContent = errorMessage;
                input.style.border = "2px solid var(--primary-red-500)";
            }
        }
    });
};
/* =======================Step-2 :(Select Plan)=============================== */


/*============Handle form Buttons (Next Step, Back, Confirm)================*/
const steps = document.querySelectorAll("ol li > span");
const form = document.querySelector("form");
const formFields = [...form.querySelectorAll("fieldset")]; // convert once, not inside functions
const buttons = document.querySelectorAll("button[type='button']");
let step = 0;

/*====================== Helpers ===================*/
// Toggle visibility between steps
const showStep = (index) => {
    formFields.forEach((fieldset, i) => {
        fieldset.ariaHidden = i === index ? "false" : "true";
    });
    step = index;
    updateUI();
};

// Update active indicator + prev/next/confirm visibility
const updateUI = () => {
    // highlight active step in <ol>
    steps.forEach((s, i) => s.classList.toggle("active", i === step));

    // handle prev button
    const prevBtn = document.querySelector("button.prev");
    if (prevBtn) prevBtn.style.display = step !== 0 ? "block" : "none";

    // handle next / confirm toggle
    const nextBtn = document.querySelector("button.next");
    const confirmBtn = document.querySelector("button.confirm");
    if (nextBtn && confirmBtn) {
        const isLastStep = step === formFields.length - 1;
        nextBtn.style.display = isLastStep ? "none" : "block";
        confirmBtn.style.display = isLastStep ? "block" : "none";
    }
};

/*====================== Navigation ===================*/
const displayNextStep = () => {
    if (step < formFields.length - 1) {
        showStep(step + 1);
    }
};

const displayPrevStep = () => {
    if (step > 0) {
        showStep(step - 1);
    }
};

const displayThanksSection = () => {
    document.getElementById("form-section").ariaHidden = "true";
    document.getElementById("thank-you").ariaHidden = "false";
};

/*====================== Events ===================*/
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("prev")) {
            displayPrevStep();
        } else if (button.classList.contains("next")) {
            displayNextStep();
        } else if (button.classList.contains("confirm")) {
            displayThanksSection();
        }
    });
});

// Init first step correctly
showStep(0);











