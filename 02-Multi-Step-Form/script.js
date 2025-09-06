// ================== State ==================

const AppState = (() => {
    let state = {
        userInfo: {},
        selectedPlan: {},
        selectedOns: []
    };

    const get = () => state;
    const update = (partial) => state = { ...state, ...partial };
    const reset=()=>state={userInfo: {}, selectedPlan: {}, selectedOns: []}

    return { get, update ,reset};
})();

// ================== UI Module ==================
const FormUI = (() => {
    /*asked Steps*/
    const steps = document.querySelectorAll("ol li > span");
    const form = document.querySelector("form");
    const formFields = [...form.querySelectorAll("fieldset")];

    const showStep = (index) => {
        formFields.forEach((fieldset, i) => {
            fieldset.ariaHidden = i === index ? "false" : "true";
        });
        Navigation.setStep(index);
        updateUI(index);
    };

    const updateUI = (step) => {
        // Highlight step
        steps.forEach((s, i) => s.classList.toggle("active", i === step));

        // Handle prev button
        const prevBtn = document.querySelector("button.prev");
        if (prevBtn) prevBtn.style.display = step !== 0 ? "block" : "none";

        // Handle next / confirm toggle
        const nextBtn = document.querySelector("button.next");
        const confirmBtn = document.querySelector("button.confirm");
        if (nextBtn && confirmBtn) {
            const isLastStep = step === formFields.length - 1;
            nextBtn.style.display = isLastStep ? "none" : "block";
            confirmBtn.style.display = isLastStep ? "block" : "none";
        }
    };

    const removeClasses = (list, className) => {
        list.forEach((el) => el.classList.remove(className));
    };

    return { showStep, updateUI, removeClasses, formFields };
})();

// ================== Validation Module ==================
const Validation = (() => {
    const patterns = {
        text: {
            regex: /^(?!\s)(?!.*\s$)[\p{L}\s]{3,30}$/u,
            message: "valid Name (e.g. Stephen King)",
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
            message: "valid email address (e.g. stephenking@lorem.com)",
        },
        tel: {
            regex: /^\+?[0-9]{1,3}[-.\s]?[0-9]{3,15}$/,
            message: "Valid Phone number (e.g. +1 234 567 890)",
        },
    };

    const validateInput = (input) => {
        const rule = patterns[input.type];
        if (!rule) return "";
        return rule.regex.test(input.value) ? "" : rule.message;
    };

    const validateForm = () => {
        const inputs = document.querySelectorAll(".form-content input");
        let isValid = true;

        inputs.forEach((input) => {
            const parent = input.closest("div");
            const span = parent.querySelector("span");
            input.style.border = "0";
            span.textContent = "";

            if (!input.value.trim()) {
                span.textContent = "This field is required";
                input.style.border = "2px solid var(--primary-red-500)";
                isValid = false;
            } else {
                const errorMessage = validateInput(input);
                if (errorMessage) {
                    span.textContent = errorMessage;
                    input.style.border = "2px solid var(--primary-red-500)";
                    isValid = false;
                }
            }

            if (isValid) {
                AppState.update({
                    userInfo: {
                        ...AppState.get().userInfo,
                        [input.name]: input.value.trim()
                    }
                });
            }
        });

        if (isValid) Resume.render();
        return isValid;
    };

    return { validateForm };
})();

// ================== Navigation Module ==================
const Navigation = (() => {
    let step = 0;

    const getStep = () => step;
    const setStep = (index) => (step = index);

    const next = () => {
        if (step < FormUI.formFields.length - 1 && Validation.validateForm()) {
            FormUI.showStep(step + 1);
        }
    };

    const prev = () => {
        if (step > 0) {
            FormUI.showStep(step - 1);
        }
    };

    const confirm = () => {
        document.getElementById("form-section").ariaHidden = "true";
        document.getElementById("thank-you").ariaHidden = "false";
    };

    return { next, prev, confirm, setStep };
})();

// ================== Plan & Add-ons Module ==================
const PlansAndOns = (() => {
    const billingPeriodWrapper = document.querySelector(".billing-period-wrapper");
    const periodCheckBox = document.getElementById("toggle-billing");
    const articles = document.querySelectorAll("article");
    let selectedArticle = document.querySelector("article.selected");

    const monthly = billingPeriodWrapper.firstElementChild;
    const yearly = billingPeriodWrapper.lastElementChild;

    const updateSelectedPlan = () => {
        const planName = selectedArticle.querySelector("h2").textContent;
        const planPrice =
            selectedArticle.querySelector(
                periodCheckBox.checked
                    ? ".yearly-price"
                    : ".monthly-price")
                    .textContent;
        const period = periodCheckBox.checked ? "Yearly" : "Monthly";

        AppState.update({ selectedPlan: { plan: planName, planPrice, period } });
    };

    const initPlans = () => {
        updateSelectedPlan();

        // Select plan on click
        articles.forEach((article) => {
            article.addEventListener("click", () => {
                FormUI.removeClasses(articles, "selected");
                article.classList.add("selected");
                selectedArticle = article;
                updateSelectedPlan();
            });
        });

        // Toggle billing period
        periodCheckBox.addEventListener("change", () => {
            yearly.classList.toggle("active");
            monthly.classList.toggle("active");

            articles.forEach((article) => {
                const monthlyPrice = article.querySelector(".monthly-price");
                const yearlyPrice = article.querySelector(".yearly");
                monthlyPrice.classList.toggle("hidden", periodCheckBox.checked);
                yearlyPrice.classList.toggle("hidden", !periodCheckBox.checked);
            });

            updateSelectedPlan();
            updateOnsPrice();
        });
    };

    // Add-ons
    const addOnsList = document.querySelectorAll("ul.addons-list li");
    let selectedOnsList = [];

    const updateOnsPrice = () => {
        addOnsList.forEach((ons) => {
            const [monthlyPrice, yearlyPrice] = ons.getElementsByTagName("small");
            monthlyPrice.classList.toggle("hidden");
            yearlyPrice.classList.toggle("hidden");

        });
    };
    const updateOnsList = (ons, checkBox, index) => {
        const onsName = ons.querySelector("h2").textContent;
        const [monthlyPrice, yearlyPrice] = ons.querySelectorAll("small");

        const onsInfo = {
            id: index,
            ons: onsName,
            monthly: monthlyPrice.textContent,
            yearly: yearlyPrice.textContent
        };

        if (checkBox.checked && !selectedOnsList.find((o) => o.id === index)) {
            selectedOnsList.push(onsInfo);
        } else if (!checkBox.checked) {
            selectedOnsList = selectedOnsList.filter((o) => o.id !== index);
        }

        AppState.update({ selectedOns: selectedOnsList });
    };


    const initOns = () => {
        addOnsList.forEach((ons, i) => {
            const checkBox = ons.querySelector("input[type='checkbox']");
            checkBox.addEventListener("change", () => {
                ons.classList.toggle("selected", checkBox.checked);
                updateOnsList(ons, checkBox, i);
            });
        });

        // default selected
        const defaultOns = document.querySelector("ul.addons-list li.selected");
        if (defaultOns) {
            const defaultChecked = defaultOns.querySelector("input[type='checkbox']");
            updateOnsList(defaultOns, defaultChecked, 0);
        }
    };

    return { initPlans, initOns };
})();

// ================== Resume & Total Module ==================
const Resume = (() => {

    const planRow = ({ plan, planPrice, period }) => `
    <div class="service-item flex justify-between align-center">
      <dt>
        <p>${plan} (${period})</p>
        <a href="#" class="change-plan">Change</a>
      </dt>
      <dd>${planPrice}</dd>
    </div>`;

    const optionRows = (options, period) =>
        options.map(({ ons, monthly, yearly }) => `
    <div class="service-item flex justify-between align-center">
      <dt>${ons}</dt>
      <dd>${period === "Yearly" ? yearly : monthly}</dd>
    </div>`).join("");

    const calcTotal = ({ selectedPlan, selectedOns }) => {
        const totalPrice = document.querySelector(".total");
        const { planPrice, period } = selectedPlan;
        const planPriceNumber = Number(planPrice.replace(/\D/g, ""));

        const onsTotal = selectedOns.reduce((sum, ons) => {
            const price = (period === "Yearly" ? ons.yearly : ons.monthly);
            return sum + Number(price.replace(/\D/g, ""));
        }, 0);

        totalPrice.innerHTML = `
    <p>Total ${period === "Monthly" ? "(per month)" : "(per year)"}</p>
    <span aria-label="total-price"><strong>+$${planPriceNumber + onsTotal}/${period === "Monthly" ? "mo" : "yr"}</strong></span>
  `;
    };


    const render = () => {
        const dl = document.querySelector("dl.services-selected");
        const { selectedPlan, selectedOns } = AppState.get();

        dl.innerHTML = planRow(selectedPlan);
        dl.innerHTML += optionRows(selectedOns, selectedPlan.period);

        calcTotal(AppState.get());
    };



    return { render };
})();

// ================== Init ==================
(() => {
    const buttons = document.querySelectorAll("button[type='button']");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("prev")) Navigation.prev();
            if (btn.classList.contains("next")) Navigation.next();
            if (btn.classList.contains("confirm")) Navigation.confirm();
        });
    });

    PlansAndOns.initPlans();
    PlansAndOns.initOns();
    FormUI.showStep(0);
})();
