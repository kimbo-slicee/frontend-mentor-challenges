const DOMutils = (() => {
    const addClass = (ele, className) => {
        if (ele) ele.classList.add(className);
    };

    const removeClass = (ele, className) => {
        if (ele) ele.classList.remove(className);
    };

    const toggleClass = (ele, classOne) => {
        if (ele) ele.classList.toggle(classOne);
    };

    const showElement = (ele, className = "show") => {
        if (ele) removeClass(ele, "hidden");
        addClass(ele, className);
    };

    const hideElement = (ele, className = "hidden") => {
        if (ele) addClass(ele, className);
    };
    const replaceClass=(ele, className, newClass)=>{
         if (ele) ele.classList.replace(className,newClass)
    };

    return { addClass, removeClass, toggleClass, showElement, hideElement, replaceClass};
})();

export default DOMutils;
