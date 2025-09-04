/*============Handle form Buttons (Next Step, Back, Confirm)================*/
const steps = document.querySelectorAll("ol li > span");
const form = document.querySelector("form");
const formFields = [...form.querySelectorAll("fieldset")];
const buttons = document.querySelectorAll("button[type='button']");
let step = 0;
let stat={
    userInfo:{},
    selectedPlan:{},
    selectedOns:[]
}
const updateState=()=>{

}
/*====================== Helpers ===================*/
const showStep = (index) => {
    formFields.forEach((fieldset, i) => {
        fieldset.ariaHidden = i === index ? "false" : "true";
    });
    step = index;
    updateUI();
};
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
const removeClasses=(htmlElementsList,className)=>{
    htmlElementsList.forEach((e)=>e.classList.remove(className))
}

/*====================== Navigation ===================*/
const displayNextStep = () => {
    if (step < formFields.length - 1 && formValidation()) {
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
/* ======================Step-1: (Personal Info) Functionalities===================== */
const formValidation = () => {
    const inputs = document.querySelectorAll(".form-content input");
    let isFormFieldValid=false;
    inputs.forEach((input) => {
        const value = input.value.trim();
        const parent = input.closest("div");
        const span = parent.querySelector("span");
        input.style.border="0";
        span.textContent = "";
        if (!value) {
            span.textContent = "This field is required";
            input.style.border="2px solid var(--primary-red-500)";
            return isFormFieldValid;
        } else {
            const errorMessage = regexValidation(input);
            if (errorMessage) {
                span.textContent = errorMessage;
                input.style.border = "2px solid var(--primary-red-500)";
                return isFormFieldValid;
            }
        }
        stat.userInfo[input.name]=value // store valid  data in state object
        isFormFieldValid=!isFormFieldValid
    });
    return isFormFieldValid
};
/* =======================Step-2 :(Select Plan)=============================== */
const selectedPlanInform=(currentArticle,checkBoxStat)=>{
    let planName=currentArticle.querySelector("h2").textContent,
        planPrice=currentArticle.querySelector(periodCheckBox.checked?".yearly-price":".monthly-price").textContent,
        period= checkBoxStat.checked?"Yearly":"Monthly";
        stat.selectedPlan={plan:planName,price:planPrice,period:period}
    }
    // Handel checkBox toggling
    const billingPeriodWrapper=document.querySelector(".billing-period-wrapper");
    const periodCheckBox=document.getElementById("toggle-billing");
    const articles=document.querySelectorAll("article");
    let selectedArticle=document.querySelector("article.selected");
    const monthly=billingPeriodWrapper.firstElementChild;
    const yearly=billingPeriodWrapper.lastElementChild;
    selectedPlanInform(selectedArticle,periodCheckBox)
    // Handel Selected Article
articles.forEach((article)=>{
    article.addEventListener("click",()=>{
        removeClasses(articles,"selected");
        article.classList.add("selected")
        selectedArticle=article
        selectedPlanInform(selectedArticle,periodCheckBox)
    })
})

    // Handel toggle period
    periodCheckBox.addEventListener("input",()=>{
        yearly.classList.toggle("active")
        monthly.classList.toggle("active");
        // toggle monthly and yearly prices
        articles.forEach((article)=>{
        const monthlyPrice=article.querySelector(".monthly-price");
        const yearlyPrice=article.querySelector(".yearly");
              monthlyPrice.classList.toggle("hidden",periodCheckBox.checked);
              yearlyPrice.classList.toggle("hidden",!periodCheckBox.checked)
            })
            selectedPlanInform(selectedArticle,periodCheckBox);
            upDateOnsPrice()

    })

/* =======================Step-2 :(Add Ons)=============================== */
           // handel ons price based on period first
           const addOnsList=document.querySelectorAll("ul.addons-list li");
           const upDateOnsPrice=()=>{
                addOnsList.forEach((ons)=>{
                const onsMonthlyPrice=ons.getElementsByTagName("small")[0];
                const onsYearlyPrice=ons.getElementsByTagName("small")[1];
                // toggling price based on the input
                onsMonthlyPrice.classList.toggle("hidden")
                onsYearlyPrice.classList.toggle("hidden")
                })
            }
           // Handel Selected Ons
           addOnsList.forEach((ons,i)=>{
               const addOnsCheckBox=ons.querySelector("input[type='checkbox']");
               addOnsCheckBox.addEventListener("change",()=>{
               addOnsCheckBox.checked?ons.classList.add("selected"):ons.classList.remove("selected");
                    updateOnsList(ons,addOnsCheckBox,i)
               })
           })
            // Add Selected ons to ons List
            const defaultOnsSelected=document.querySelector("ul.addons-list li.selected");
            const defaultChecked=defaultOnsSelected.querySelector("input[type='checkbox']");
            let selectedOnsList=[];
            const updateOnsList=(ons,checkBox,index)=>{
               const onsName=ons.querySelector("h2").textContent;
               const onsPrice=[...ons.querySelectorAll("small")].find(ele=>!ele.classList.contains("hidden")).textContent;
               let onsInfo={id:index,ons:onsName,onsPrice:onsPrice};
               if(checkBox.checked && !selectedOnsList.includes(onsInfo)){
                   selectedOnsList.push(onsInfo)
               }else{
                   let uncheckedOnsIndex=selectedOnsList.findIndex((ele)=>ele.id===index);
                   selectedOnsList.splice(uncheckedOnsIndex,1)
               }
               stat.selectedOns=selectedOnsList;
           }
           // start the array withe default ons selected
           updateOnsList(defaultOnsSelected,defaultChecked,0)

/* =======================Step-3 :(Resume)=============================== */
const olItems=({ons,onsPrice}=stat,period)=>{
    return`
            <div class="service-item flex justify-between align-center">
                <dt>${ons}</dt>
                <dd>+$${onsPrice}/${period==="monthly"?"mo":"yr" }</dd>
              </div>
`
}
const summaryContainer= document.querySelectorAll("dl div");

/*========================= proxy functions ==========================*/
// const proxyFunctions=(currentStep)=>{
//       switch (currentStep){
//           case 1:
//               formValidation();
//               break;
//           case 2:
//               selectedPlanFunctionality();
//               break;
//           case 3:
//               addonsSectionFunctionality();
//               break
//           case 4:
//               finishingUp()
//               break
//           default :
//               console.error("step doesn't Exist");
//               break
//       }
// }
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











