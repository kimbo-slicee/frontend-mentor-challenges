const submitBtn=document.querySelector("button[type='submit']");
const inputs=document.querySelectorAll("input,textarea");
const inputsState=Array.from(inputs).map((e)=>!e);
const Utils=(()=>{

})();

/* ================== Validation Module ==================*/
const Validation=(()=>{
    let index;
    const upDateInputSates=(valid)=>{
        inputsState[index]=valid;
    }
    const displayError=(input,message)=>{
        const messageSpan=input.nextElementSibling;
        messageSpan.textContent='';
        messageSpan.textContent=message;
        messageSpan.style.display="block";
        input.classList.replace("valid","invalid");
        upDateInputSates(false);
    }
    const hideError=(input)=>{
        const messageSpan=input.nextElementSibling;
        messageSpan.style.display="none";
        input.classList.add("valid");
        upDateInputSates(true)
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
            else hideError(input);
        }
    }
    const radioAndCheckBoxValidation=(input,type)=>{
        // change the bg and border for active radio input
        if(type==="radio" && input.checked){
            const radioInputs=document.querySelectorAll("input[type='radio']");
            const currenInputParent=input.parentElement;
            radioInputs.forEach(item=> item.parentElement.classList.remove("active-radio"));
            currenInputParent.classList.add("active-radio");
            upDateInputSates(true,index)
        }else if(type==="checkbox"){
            const span=input.closest("div.form-row").nextElementSibling;
            if(input.checked){
                span.style.display="none";
                upDateInputSates(true,index)
            }else{
                span.style.display="block";
                upDateInputSates(false,index)
            }

        }
        // display error message if checkbox unchecked
    }
    const regularValidation=(input)=>{
            const value=input.value.trim();
            const errorMessage="This field is required";
            const inputType=input.type;
            if(!value) displayError(input,errorMessage);
            else if (value && ( inputType!=="radio" && inputType!=="checkbox" ))return regexValidation(input);
            else radioAndCheckBoxValidation(input,inputType);
    }

    const inputValidation=(e,i)=>{
        const input=e.target;
        index=i
        regularValidation(input);
        submitBtn.disabled=!inputsState.every(ele=>ele===true);
        console.log(inputsState);
    }
    const formValidation=()=>{

    }

    return {inputValidation,formValidation}

})();

/*========Handel From Data Model=======*/
const submitForm=(e)=>{
    e.preventDefault();
    if(Validation.formValidation()){
        const formData=new FormData({

        })
    }
}
inputs.forEach((input,index)=>input.addEventListener("input",(e)=>Validation.inputValidation(e,index)));
submitBtn.addEventListener("submit",submitForm)


