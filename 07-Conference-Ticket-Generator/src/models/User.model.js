export default class User {
    constructor(name, email, github) {
        this.name = name || null;
        this.email = email || null;
        this.github = github || null;

        // association fields
        this.ticketId = null; // initially no ticket
    }

    // return safe user data
    getUser() {
        return {
            name: this.name,
            email: this.email,
            github: this.github,
            hasTicket: this.ticketId !== null,
            ticketId: this.ticketId
        };
    }

    // user can update profile
    setUser(name, github) {
        if (name) this.name = name;
        if (github) this.github = github;
    }

    // assign a ticket to user
    assignTicket(ticket) {
        if (!ticket || !ticket.id) throw new Error("Invalid ticket");
        this.ticketId = ticket.id;
    }

    // check if user exists and has a ticket
    isUserHasTicket(name, email) {
        if (this.name === name && this.email === email) {
            return { hasTicket: this.ticketId !== null, ticketId: this.ticketId };
        } else {
            return "User Not Found";
        }
    }
}
