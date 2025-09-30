export default class User{
    // user properties
    static id=0;
    fullName;
    email;
    githubAccount;
    ticketId;

    constructor(fullName,email,githubAccount,ticketId) {
        this.id=++User.id;
        this.fullName=fullName;
        this.email=email;
        this.githubAccount=githubAccount;
        this.ticketId=ticketId;
    }
    /*get user info*/
    getUser(){
        return {
            fullName:this.fullName,
            email:this.email,
            gitHubAcc:this.githubAccount,
            ticket:this.ticketId
        }
    }


}