
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
    const inputsStateList= [...inputs, ...radioAndCheckBox]
        .map(({name, type}) => new Object({name, type, isValidField: false}))
    //
    const uniqueByName = [
        ...new Map(inputsStateList.map(obj => [obj.name, obj])).values()
    ];
    console.log(uniqueByName);
    const setInputState = (newState) => inputState = {...inputState, ...newState};

    const getInputSate=()=>inputState;

     return {setInputState,getInputSate}

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
    const regexValidation=(input,value)=>{
        const inputName=input.name;
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
        // check if pattern exist first
        if(patterns[inputName]){
            const inputPattern=patterns[inputName]?.pattern
            const message=patterns[inputName]?.message;
            if(!inputPattern.test(value)) Utilise.displayErrorSpan(input,message);
            else Utilise.haideErrorSpan(input);
        }
    }
    const requiredField=(field)=>{
        Utilise.displayErrorSpan(field,"This filed Is require");
    }
    const inputValidation=(e)=>{
        const input=e.target;
        const entryValue=input.value.trim();
        Utilise.haideErrorSpan(input);
        !entryValue?requiredField(input):regexValidation(input,entryValue)
    }
    const radioAndCheckBoxValidation=(e)=>{
        const input=e.target;
        const type=input.type;
        if(type==="radio" && input.checked){
            const fieldSetElement=input.closest("fieldset");
            const checkBoxFormControl=fieldSetElement.querySelectorAll(".form-control");
            const parent=input.parentElement
            Utilise.toggleActiveClass(checkBoxFormControl,parent,"active");
            FormFieldState.getInputSate()
        }else if(type==="checkbox"){
                const parent=input.closest(".form-row")
                const errorSpan=parent.nextElementSibling;
            if(!input.checked){
                errorSpan.style.display="block"
            }else{
                errorSpan.style.display="none"
            }
        }
    }
    return {inputValidation,radioAndCheckBoxValidation}
})();
inputs.forEach((input)=>input.addEventListener("input",Validation.inputValidation));
radioAndCheckBox.forEach((input)=>input.addEventListener("change",Validation.radioAndCheckBoxValidation))



