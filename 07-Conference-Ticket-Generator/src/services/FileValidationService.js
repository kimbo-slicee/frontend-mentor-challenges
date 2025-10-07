export default class FileValidationService {
    static isValidSize(file, maxKB = 500) {
        return file && file.size / 1024 <= maxKB;
    }
    // validation file type
}
