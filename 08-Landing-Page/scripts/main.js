const menuIcons=document.querySelector(".mobile-navigation");
const buttons=menuIcons.querySelectorAll("button");
const navigationMenu=document.querySelector(".header__navigation-menu");
const navBar=document.querySelector(".nav-list");

// mobile navBar
const toggleVisibility=(ele,className)=>{
    if(!ele) return;
    if(Array.isArray(ele)) ele.forEach((button)=>button.classList.toggle(className));
    else ele.classList.toggle(className);
}
/* ---- hide and display mobile navBar ---- */
const mobileNavBar=()=>{
    // toggle visibility of navBar
    toggleVisibility(navigationMenu,"open");
    toggleVisibility(navBar,"open");

}

/* --- Mobile navBar Functionalities --- */
menuIcons.addEventListener("click",()=>{
    toggleVisibility([...buttons],"hidden");
    mobileNavBar()
})




