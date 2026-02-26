
/* ---- handel button toggle button ----- */
const burgerMenu = document.querySelector(".burger-menu");
const closeMenu = document.querySelector(".close-icon");
const navMenu = document.querySelector(".nav-menu");
const toggleNavigationMenu=document.querySelector(".toggle-navigation-menu")


const handelToggleButton = _ => {
    navMenu.classList.toggle("active");
    closeMenu.hidden = !closeMenu.hidden;
    burgerMenu.hidden = !burgerMenu.hidden;
}
toggleNavigationMenu.addEventListener("click", _ =>handelToggleButton());