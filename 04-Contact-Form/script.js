
/**
 in the challenge there is just form validation in submit event So i decide to make challenge more interesting
 and add vaidation for each field and disabled submit btn until all fields are valid also i will add submit form
 validation in case of some one open the console and remove disabled attr
 */

const submitBtn=document.querySelector("button[type='submit']");
const inputs=document.querySelectorAll("input:not([type='radio'],[type='checkbox']),textarea");
const radioAndCheckBox=document.querySelectorAll("input[type='radio'],input[type='checkbox']");

// ================== State ==================
const FormFieldState = (() => {
    // Build initial state list
    const inputsStateList = [...inputs, ...radioAndCheckBox]
        .map(({ name, type }) => ({ name, type, isValid: false }));

    // Create Map: key = input name, value = { type, isValid }
    const stateObj = new Map(
        inputsStateList.map(({ name, type, isValid }) => [name, { type, isValid }])
    );

    // Update validity of a specific input
    const updateInputState = (inputName, isValid) => {
        if (stateObj.has(inputName)) {
            const field = stateObj.get(inputName);
            stateObj.set(inputName, { ...field, isValid });
        }
    };

    // Get state of one input
    const getInputState = (inputName) => stateObj.get(inputName);

    // Get all states (as object or array if you want to debug/log)
    const getAllStates = () => Object.fromEntries(stateObj);

    // Reset all inputs
    const reset = () => {
        for (const [name, field] of stateObj) {
            stateObj.set(name, { ...field, isValid: false });
        }
    };

    return { updateInputState, getInputState, getAllStates, reset };
})();


const Utilise=(()=>{
    const toggleStyles=(element,state)=>{
        const parent=element.closest("div");
        const start=parent.querySelector("label > span");
        start.style.color= state === "valid" ? "var(--clr-success)" : "var(--clr-error)";
        element.style.border=`2px solid ${state === "valid" ? "var(--clr-success)" : "var(--clr-error)"}`;

    }
    const displayErrorSpan=(element,message)=>{
        const span=document.createElement("span");
        span.className="error";
        span.textContent=message;
        element.after(span);
        toggleStyles(element,"invalid");
    }
    const haideErrorSpan=(element)=>{
         const errorSpan=element.nextElementSibling;
         if(!errorSpan) return;
         errorSpan.remove();
         toggleStyles(element,"valid");
    }
    const toggleActiveClass=(htmlElements,currentEle,className)=>{
        htmlElements.forEach(item=>item.classList.remove(className));
        currentEle.classList.add(className);
    }

   return {displayErrorSpan,haideErrorSpan,toggleActiveClass};
})();
const Validation=(()=>{
    /*check input validation on two phases empty and regex validation*/
    const regexValidation=(input,inputName,value)=>{
        const patterns = {
            firstName: {
                pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{4,30}$/u,
                message: "4–30 letters"
            },
            lastName: {
                pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{4,30}$/u,
                message: "4–30 letters"
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
                message: "Please Enter a Valid Email"
            },
            message: {
                pattern: /^.{10,500}$/,
                message: "10–500 chars"
            }
        };
        if(patterns[inputName]){
            const inputPattern=patterns[inputName]?.pattern
            const message=patterns[inputName]?.message;
            let isValid=inputPattern.test(value)
            if(!isValid)Utilise.displayErrorSpan(input, message);
            else Utilise.haideErrorSpan(input);
            return isValid;
        }
    }
    const requiredField=(field)=>{
        Utilise.displayErrorSpan(field,"This filed Is require");
        return false;
    }
    const inputValidation=(e)=>{
        const input=e.target;
        const entryValue=input.value.trim();
        const name=input.name;
        Utilise.haideErrorSpan(input);
        let isFieldValid = !entryValue?requiredField(input):regexValidation(input,name,entryValue);
        FormFieldState.updateInputState(name,isFieldValid);
        console.log(FormFieldState.getAllStates())
    }
    const radioAndCheckBoxValidation=(e)=>{
        const input=e.target;
        const type=input.type;
        const inputName=input.name;
        if(type==="radio" && input.checked){
            const fieldSetElement=input.closest("fieldset");
            const checkBoxFormControl=fieldSetElement.querySelectorAll(".form-control");
            const parent=input.parentElement
            Utilise.toggleActiveClass(checkBoxFormControl,parent,"active");
            FormFieldState.updateInputState(inputName,input.checked)
        }else if(type==="checkbox"){
                const parent=input.closest(".form-row")
                const errorSpan=parent.nextElementSibling;
                errorSpan.style.display="block";
                errorSpan.style.display=input.checked?"none":"bock"
                FormFieldState.updateInputState(inputName,input.checked);

        }
    }
    return {inputValidation,radioAndCheckBoxValidation}
})();
inputs.forEach((input)=>input.addEventListener("input",Validation.inputValidation));
radioAndCheckBox.forEach((input)=>input.addEventListener("change",Validation.radioAndCheckBoxValidation))



