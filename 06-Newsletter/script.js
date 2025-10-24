const form = document.querySelector("form");
const input = document.querySelector("input[type='email']");
const error = document.querySelector(".newsletter__error");
const successBtn = document.querySelector(".newsletter-success__button");
const newsletterContainer = document.querySelector(".newsletter");
const successContainer = document.querySelector(".newsletter-success");

// --- Utilities ---
const showError = () => {
    error.style.display = "block";
    input.classList.add("invalid");
};

const hideError = () => {
    error.style.display = "none";
    input.classList.remove("invalid");
};

const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    return pattern.test(email);
};

const toggleVisibility = (showSuccess) => {
    newsletterContainer.setAttribute("aria-hidden", showSuccess);
    successContainer.setAttribute("aria-hidden", !showSuccess);

    newsletterContainer.classList.toggle("hide", showSuccess);
    successContainer.classList.toggle("display", showSuccess);
};

// --- Handlers ---
const handleSubmit = (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email || !isValidEmail(email)) {
        showError();
        return;
    }

    hideError();
    toggleVisibility(true); // show success
    form.reset();

    // Auto-hide success after 2s
    setTimeout(() => toggleVisibility(false), 2000);
};

const handleSuccessClose = () => toggleVisibility(false);

// --- Events ---
form.addEventListener("submit", handleSubmit);
input.addEventListener("input", hideError);
successBtn.addEventListener("click", handleSuccessClose);
