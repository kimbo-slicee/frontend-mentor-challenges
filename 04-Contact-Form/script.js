const submitBtn=document.querySelector("button[type='submit']");
const inputs=document.querySelectorAll("input:not([type='checkbox'],[type='radio']),textarea");
const radios=document.querySelectorAll("input[type='radio']");

/* ================== Validation Module ==================*/
const Validation=(()=>{
    const displayError=(input,message)=>{
        const messageSpan=input.nextElementSibling;
        messageSpan.style.display="block";
        messageSpan.textContent='';
        messageSpan.textContent=message;
        // input border red
        input.classList.add("invalid");
    }
    const hideError=(input)=>{
        const messageSpan=input.nextElementSibling;
        input.classList.replace("valid","invalid");
        messageSpan.style.display="none";
    }
    const regexValidation=(input)=>{
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
        const inputName=input.name;
        const inputValue=input.value.trim();
        if(inputName){
            const message=patterns[inputName]?.message;
            const pattern=patterns[inputName]?.pattern;
            if(!pattern.test(inputValue)) displayError(input,message);
            else {
                hideError(input);
                input.classList.add("valid")
            }
        }else {
            console.error("add Name attr to input filed")
        }
    }
    const regularValidation=(input)=>{
            const value=input.value.trim();
            const errorMessage="This field is required";
            hideError(input);
            if(!value) displayError(input,errorMessage);
            else regexValidation(input)
    }
    const radioValidation=(input)=>{
        radios.forEach(input=>{
            if(input.checked){

            }
        })
    }
    const checkBoxValidation=()=>{

    }


    const inputValidation=(e)=>{
        const input=e.target;
        regularValidation(input);
    }

    return {inputValidation}

})();

/*========Handel From Data Model=======*/
const submitForm=(e)=>{
    e.preventDefault();
}
inputs.forEach(input=>input.addEventListener("input",Validation.inputValidation))
submitBtn.addEventListener("click",submitForm)


