const menuIcons=document.querySelector(".mobile-navigation");
const buttons=menuIcons.querySelectorAll("button");
const navigationMenu=document.querySelector(".header__navigation-menu");
const navBar=document.querySelector(".nav-list");

console.log(document.documentElement.scrollWidth > window.innerWidth);

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

    // toggle body scroll
    toggleVisibility(document.body,"no-scroll");

}

/* --- Mobile navBar Functionalities --- */
menuIcons.addEventListener("click",()=>{
    toggleVisibility([...buttons],"hidden");
    mobileNavBar()
})



/*------------- Testimonials Logic -------------*/

const testimonials = document.querySelector(".testimonial-list");
const testimonialItems = document.querySelectorAll(".testimonial-item");
const navigation = document.querySelector(".testimonial-navigation");

if (testimonials && testimonialItems.length && navigation) {
    // --- Build navigation dynamically ---
    navigation.innerHTML = Array.from(testimonialItems, () => `<span></span>`).join('');
    const navDots = Array.from(navigation.children);
    navDots[0].classList.add("active");

    // --- Drag scroll logic ---
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

     const startDrag = (e) => {
        isDragging = true;
        testimonials.classList.add("dragging");
        startX = e.pageX - testimonials.offsetLeft;
        scrollStart = testimonials.scrollLeft;
    };

     const stopDrag = () => {
        isDragging = false;
        testimonials.classList.remove("dragging");
    };

     const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - testimonials.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed here
        testimonials.scrollLeft = scrollStart - walk;
    };

    testimonials.addEventListener("mousedown", startDrag);
    testimonials.addEventListener("mouseleave", stopDrag);
    testimonials.addEventListener("mouseup", stopDrag);
    testimonials.addEventListener("mousemove", onDrag);

    // --- Update active dot on scroll ---
    testimonials.addEventListener("scroll", () => {
        const itemWidth = testimonialItems[0].getBoundingClientRect().width;
        const currentIndex = Math.round(testimonials.scrollLeft / itemWidth);

        navDots.forEach(dot => dot.classList.remove("active"));
        if (navDots[currentIndex]) navDots[currentIndex].classList.add("active");
    });

    // --- Optional: click on navigation dot to scroll ---
    navDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            testimonials.scrollTo({
                left: testimonialItems[0].offsetWidth * index,
                behavior: "smooth"
            });
        });
    });
}
