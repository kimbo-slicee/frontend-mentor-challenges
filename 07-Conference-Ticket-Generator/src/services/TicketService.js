import {Store} from "../store/state.store.js";
import Ticket from "../models/Ticket.model.js";
import TicketUtils from "../utils/ticket.js";
import {generateUUID} from "../utils/UUID.js";
import {getFormatedDate} from "../utils/DateFormat.js";
import {getRandomLocation} from "../utils/locationGenerator.js";

export default class TicketService{
    // create new ticket and associate a ticket for the user
    static generateTicket(user,ticketWrapper,highlightedName,highlightedEmail){
        if (!user) throw new Error("Cannot generate ticket without user data");

        const ticketId = generateUUID(5); // from your utils
        const createdAt = getFormatedDate();
        const image=URL.createObjectURL(Store.file);
        const location=getRandomLocation();
        const ticket = new Ticket(createdAt,location,ticketId,image, user.name, user.email, user.github);
        user.ticketId = ticketId;
        // display this ticket in the page withe user ticketArticle
        this.displayTicket(ticket,ticketWrapper,highlightedName,highlightedEmail);
        return ticket;
    }
    static displayTicket(ticket,ticketWrapper,highlightedName,highlightedEmail){
        const {name,email}=ticket;
        TicketUtils.displayHighlightedText(highlightedName,name);
        TicketUtils.displayHighlightedText(highlightedEmail,email)
        TicketUtils.displayGeneratedTicket(ticket,ticketWrapper);
    }


}