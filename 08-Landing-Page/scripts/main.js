const menuIcons=document.querySelector(".mobile-navigation");
const buttons=menuIcons.querySelectorAll("button");
const navigationMenu=document.querySelector(".header__navigation-menu");
const navBar=document.querySelector(".nav-list");
const themeIcon=document.querySelector(".theme-switch-button");

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

/* ---- change theme ---- */
themeIcon.addEventListener("click",()=>{
    let root=document.documentElement;
    const theme = getComputedStyle(root).getPropertyValue('--theme').trim();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if(!document.startViewTransition){
        root.style.setProperty('--theme', newTheme);
        return;
    }
    document.startViewTransition(()=>{
        root.style.setProperty('--theme', newTheme);
    })
    localStorage.setItem('theme', newTheme);
})