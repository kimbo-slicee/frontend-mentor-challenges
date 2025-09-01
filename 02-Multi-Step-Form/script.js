/*
* forms Steps
* 1. form validation
* */
const button=document.querySelector("button.next");
const regex=(input)=>{
    const inputType=input.type;
    let regex;
    switch (inputType) {
        case "text":
             regex=/^(?![._])[a-zA-Z0-9._]{3,16}(?<![._])$/
            break;
        case "number":
             regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$ /
            break;
        case "phone":
            regex=/^\+?[0-9]{1,3}[-.\s]?[0-9]{3,15}$/
            break;
        default:
            console.log("Regex Not Working");
    }
}
const formValidation=()=>{
      const inputs=document.querySelectorAll(".form-content input");
      inputs.forEach((input)=>{
          if(input.value.trim().length===0){
              const errorMessage=input.closest("div").querySelector("span");
              errorMessage.style.display="block";
          }
      })
}
button.addEventListener("click",formValidation)
