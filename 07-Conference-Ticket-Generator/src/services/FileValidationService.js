export default class FileValidationService {
    static isEmptyFile({value}){
        return !value
    }
    static isValidSize(file, maxKB = 500) {
        return file && file.size / 1024 <= maxKB;
    }
    // validation file type
    static fileType({file,type}){
        // check for file type
        if(type!=="jpg" || type!=="jpe"){
            console.error("type invalid");
        }
    }
}
