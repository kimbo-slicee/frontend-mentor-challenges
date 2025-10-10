export default class File {
    constructor(file) {
        this.file = file;
        this.name = file?.name || "";
        this.size = file?.size || 0;
        this.type = file?.type || "";
    }

    get sizeInKB() {
        return (this.size / 1024).toFixed(2);
    }
}