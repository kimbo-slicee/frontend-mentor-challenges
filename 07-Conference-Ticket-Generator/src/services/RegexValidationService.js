export default class RegexValidationService{
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
            pattern: /^.+$/u,
            message: "Please enter your GitHub account",
        },
    };
    static regexValidation(name, value) {
        const field = this.patterns[name];
        let isValid=true;
        if (!field) return `No validation rule for ${name}`;
        if (!field.pattern.test(value)) {
            return {message:field["message"],isValid:false};
        }
        return {isValid:isValid};
    }
}