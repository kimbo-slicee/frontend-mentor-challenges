/* ---- change theme ---- */
const switchSrc=(image,theme,lightImageSrc,darkImageSrc)=>{
    const BASE_SRC="assets/images"
    image.src=theme==="dark"?`${BASE_SRC}/${darkImageSrc}`:`${BASE_SRC}/${lightImageSrc}`;
}
document.addEventListener("DOMContentLoaded", () => {
    const themeIcons = document.querySelectorAll(".icon");
    const sunIcon = document.querySelector(".icon-sun");
    const moonIcon = document.querySelector(".icon-moon");
    const root = document.documentElement;
    const logo=document.querySelector(".logo img");
    const mobileThemSwitcher=document.querySelector(".theme-switch-mobile input[type='checkbox']");

    /* ------- Get Default user Settings Scheme -------- */
    const defaultUserSettings = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const currentTheme = savedTheme || (defaultUserSettings ? "dark" : "light");

    root.setAttribute("data-theme", currentTheme);
    (currentTheme === "dark" ? sunIcon : moonIcon).classList.add("active");

    /* ------ toggle mobile theme based on the existing theme -------- */
    mobileThemSwitcher.checked=currentTheme === "dark"


    switchSrc(logo,currentTheme,"logo.svg","logo-white.svg");


    const changeThemeWithTransition = (callback) => {
        if (document.startViewTransition) document.startViewTransition(callback);
        else callback();
    };

    const switchTheme=()=>{
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        mobileThemSwitcher.checked = newTheme === "dark";
        switchSrc(logo,newTheme,"logo.svg","logo-white.svg");
        changeThemeWithTransition(() => {
            root.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    themeIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            switchTheme();
            themeIcons.forEach((button) => button.classList.toggle("active"));
        });
    });

    mobileThemSwitcher.addEventListener("input",()=>switchTheme())

});