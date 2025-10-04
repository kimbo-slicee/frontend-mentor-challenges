export default class ValidationService {
    static patterns = {
        name: {
            pattern: /^[a-zA-Z\s]+$/u,
            message: "Please enter a valid name",
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
            message: "Please enter a valid email",
        },
        github: {
            pattern: /^.+$/u, // at least one character
            message: "Please enter your GitHub account",
        },
    };

    static isValidSize(file, maxKB = 500) {
        return file && file.size / 1024 <= maxKB;
    }

    static regexValidation(name, value) {
        const field = this.patterns[name];
        if (!field) return `No validation rule for ${name}`;

        if (!field.pattern.test(value)) {
            return field.message;
        }

        return null;
    }
}
