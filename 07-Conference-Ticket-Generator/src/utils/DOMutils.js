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

    // Form validation Utils

    const ERROR_COLOR = "var(--error)";
    const NEUTRAL_COLOR = "var(--neutral-500)";

    // Static SVG string (trusted, static). We parse it into a node to avoid injecting user text into HTML.
    const SVG_MARKUP = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-info error" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
    <path stroke="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
  </svg>`;

    // Parse the SVG markup into a DOM node
    function _createSvgNode() {
        const tpl = document.createElement("template");
        tpl.innerHTML = SVG_MARKUP.trim();
        return tpl.content.firstElementChild.cloneNode(true);
    }

    function _setBorder(input, color) {
        if (!input || !input.style) return;
        input.style.border = `1px solid ${color}`;
    }

    // Build a DocumentFragment containing the svg + accessible span with textContent (safe)
    function _createErrorFragment(message) {
        const fragment = document.createDocumentFragment();
        const svg = _createSvgNode();
        fragment.appendChild(svg);

        const span = document.createElement("span");
        span.setAttribute("aria-live", "polite");
        span.className = "error-message";
        span.textContent = message || "This field is required";
        fragment.appendChild(span);

        return fragment;
    }

    // Ensure there is a sibling container after the input; if missing, create one.
    function _ensureContainer(input) {
        if (!input) return null;
        let container = input.nextElementSibling;
        if (!container) {
            container = document.createElement("div");
            input.insertAdjacentElement("afterend", container);
        }
        return container;
    }

    // Public: show error for field
    function showError(input, message) {
        if (!input) return;
        const container = _ensureContainer(input);
        if (!container) return;

        // Replace contents safely
        container.innerHTML = "";
        container.appendChild(_createErrorFragment(String(message || "This field is required")));
        _setBorder(input, ERROR_COLOR);
    }

    // Public: clear error
    function clearError(input) {
        if (!input) return;
        const container = input.nextElementSibling;
        if (!container) return;

        container.innerHTML = "";
        _setBorder(input, NEUTRAL_COLOR);
    }

    // Keep old names (if you used them elsewhere) — thin aliases


    return { addClass, removeClass, toggleClass, showElement, hideElement, replaceClass,showError,clearError};
})();

export default DOMutils;
