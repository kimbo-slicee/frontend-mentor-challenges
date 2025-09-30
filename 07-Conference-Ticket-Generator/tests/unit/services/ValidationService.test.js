import ValidationService from "../../../src/services/ValidationService.js";
describe("ValidationService", () => {
    test("returns true if file size is under 500KB", () => {
        const mockFile = { size: 300 * 1024 };
        expect(ValidationService.isValidSize(mockFile)).toBe(true);
    });

    test("returns false if file size is over 500KB", () => {
        const mockFile = { size: 600 * 1024 };
        expect(ValidationService.isValidSize(mockFile)).toBe(false);
    });
});
