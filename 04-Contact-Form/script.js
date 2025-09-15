
/**
 in the challenge there is just form validation in submit event So i decide to make challenge more interesting
 and add vaidation for each field and disabled submit btn until all fields are valid also i will add submit form
 validation in case of some one open the console and remove disabled attr
 */

const submitBtn=document.querySelector("button[type='submit']");
const inputs=document.querySelectorAll("input:not([type='radio'],[type='checkbox']),textarea");
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

   return {displayErrorSpan,haideErrorSpan};
})();
const Validation=(()=>{
    /*check input validation on two phases empty and regex validation*/
    const regexValidation=(e)=>{
    }
    const requiredField=(field)=>{
        Utilise.displayErrorSpan(field,"This filed Is require");
    }
    const inputValidation=(e)=>{
        const input=e.target;
        const entryValue=input.value.trim();
        Utilise.haideErrorSpan(input);
        if(!entryValue) {
            requiredField(input)
        }else{
            regexValidation(e)
        }

    }
    return {inputValidation}
})();
inputs.forEach((input)=>input.addEventListener("input",Validation.inputValidation))



