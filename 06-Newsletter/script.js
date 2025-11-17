const emailInput=document.querySelector("input[type='email']");
const messageError=document.querySelector(".newsletter__error");
const input=document.querySelector("input");
const button=document.querySelector("button[type='submit']");

const changeBorderColor=(valid,input)=>input.classList[valid?"remove":"add"]("inValid");

const validation=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    messageError.innerText=``;
    if (!email){
        messageError.innerText="this filed is require";
        changeBorderColor(false,input);
        return
    } else if(!emailRegex.test(email)){
        changeBorderColor(false,input);
        messageError.innerText="Valid Email Require";
        return;
    }
    changeBorderColor(true,input);
    button.disabled=false;
}
const handelEmailValidation=(e)=>{
    const email=e.target.value.trim();
    button.disabled=true;
    validation(email);
}
const handelFormSubmit=(e)=>{

}


/**/
emailInput.addEventListener("input",handelEmailValidation);
/**/
button.addEventListener("click",handelFormSubmit)

