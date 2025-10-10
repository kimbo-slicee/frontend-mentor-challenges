export default class EventModel {
    title;
    date;
    location;
    constructor(title, date, location) {
        this.title = title;
        this.date = date;
        this.location = location;
    }
    // EventModel Details
    getEvenetDetails=()=>{
        return {
            title:this.title,
            date:this.date,
            location:this.location
        }
    }
}