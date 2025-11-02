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

/*-------------Testimonials Logic-------------*/

const testimonials = document.querySelector(".testimonial-list");
const testimonialItems = document.querySelectorAll(".testimonial-item");

let isDragging = false;
let startX;
let scrollLeft;

testimonials.addEventListener("mousedown", (e) => {
  isDragging = true;
  testimonials.classList.add("dragging");
  startX = e.pageX - testimonials.offsetLeft;
  scrollLeft = testimonials.scrollLeft;
});

testimonials.addEventListener("mouseleave", () => {
  isDragging = false;
  testimonials.classList.remove("dragging");
});

testimonials.addEventListener("mouseup", () => {
  isDragging = false;
  testimonials.classList.remove("dragging");
});

testimonials.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - testimonials.offsetLeft;
  const walk = (x - startX) * 2;
  testimonials.scrollLeft = scrollLeft - walk;
});
