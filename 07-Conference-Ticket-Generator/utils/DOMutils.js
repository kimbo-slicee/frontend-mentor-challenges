const DOMutils = (() => {
    const addClass = (ele, className) => {
        if (ele) ele.classList.add(className);
    };

    const removeClass = (ele, className) => {
        if (ele) ele.classList.remove(className);
    };

    const toggleClass = (ele, className) => {
        if (ele) ele.classList.toggle(className);
    };

    const showElement = (ele, className = "show") => {
        if (ele) removeClass(ele, "hidden"); // default hidden handling
        addClass(ele, className);
    };

    const hideElement = (ele, className = "hidden") => {
        if (ele) addClass(ele, className);
    };

    return { addClass, removeClass, toggleClass, showElement, hideElement };
})();

export default DOMutils;
