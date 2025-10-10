const TicketUtils = (() => {
    /**
     * Private function that returns the HTML structure for a ticket.
     * @param {Object} ticket - Ticket data object
     * @param {string} ticket.issuedDate - The issued or event date
     * @param {string} ticket.location - Event location
     * @param {string} ticket.id - Ticket unique ID
     * @param {string} ticket.image - User profile image
     * @param {string} ticket.name - User’s namee
     * @param {string} ticket.userGithub - GitHub usernamee
     */
    function _ticketUI({ date,location,uniqueId,image,name,github }) {
        if (!date || !location || !uniqueId || !image || !name || !github) {
            throw new Error("Missing required ticket information");
        }
        return `
      <!-- Ticket ID -->
      <p class="ticket__id"><span>#${uniqueId}</span></p>

      <!-- Ticket Header -->
      <header class="ticket__header">
        <img
          src="assets/images/logo-mark.svg"
          alt="Coding Conf logo"
          class="ticket__logo">

        <div class="ticket__event">
          <h3 class="ticket__title">Coding Conf</h3>
          <p>
            <small>
              <time datetime="${date}">${date}</time>
              / <span class="location">${location}</span>
            </small>
          </p>
        </div>
      </header>

      <!-- Ticket User Info -->
      <div class="ticket__user">
        <img
          src="${image}"
          alt="Profile picture of ${name}"
          class="ticket__avatar">

        <div class="ticket__user-details">
          <p class="ticket__user-name">${name}</p>
          <div class="ticket__user-github">
            <img
              src="assets/images/icon-github.svg"
              alt="GitHub icon"
              class="icon">
            <span class="ticket__user-handle">${github}</span>
          </div>
        </div>
      </div>
    `;
    }

    /**
     * Replace text content in a given element.
     * @param {HTMLElement} element - DOM element
     * @param {string} content - Text to display
     */
    function displayHighlightedText(element, content) {
        if (!element) return;
        element.textContent = content ?? "";
    }

    /**
     * Render the generated ticket inside the wrapper element.
     * @param {TicketModel} ticket - The ticket instance
     * @param {HTMLElement} wrapper - Container for displaying ticket
     */
    function displayGeneratedTicket(ticket, wrapper) {
        if (!wrapper || !ticket) return;
        wrapper.innerHTML = _ticketUI(ticket);
    }

    return {
        displayGeneratedTicket,
        displayHighlightedText
    };
})();

export default TicketUtils;
