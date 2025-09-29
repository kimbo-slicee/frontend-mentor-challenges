export default class ValidationService {
    // check file size
    static isValidSize(file, maxKB = 500) {
        return file && file.size / 1024 <= maxKB;
    }
}

