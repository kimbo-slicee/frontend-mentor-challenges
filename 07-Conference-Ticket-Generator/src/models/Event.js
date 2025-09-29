export default class Event{
    title;
    date;
    location;
    constructor(title, date, location) {
        this.title = title;
        this.date = date;
        this.location = location;
    }
    // Event Details
    getEvenetDetails=()=>{
        return {
            title:this.title,
            date:this.date,
            location:this.location
        }
    }
}