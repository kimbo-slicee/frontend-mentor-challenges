export function getFormatedDate() {
        const DAYS=5
        const date = new Date();
        date.setDate(date.getDate() + DAYS);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
