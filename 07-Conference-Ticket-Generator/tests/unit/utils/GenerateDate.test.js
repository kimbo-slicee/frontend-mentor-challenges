import {generateDate} from "../../../src/utils/GenerateDate.js";

describe('generateDate', () => {
    test('should return a date 5 days in the future from now', () => {
        // Current system date
        const now = new Date();

        // Expected date after 5 days
        const expected = new Date(now);
        expected.setDate(now.getDate() + 5);

        // Get formatted version (same format as the function)
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        const expectedFormatted = expected.toLocaleDateString('en-US', options);

        // Run function
        const result = generateDate();

        // Assertions
        expect(result).toBe(expectedFormatted);
    });

    test('should return string in correct format', () => {
        const result = generateDate();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/[A-Za-z]{3} \d{2}, \d{4}/);
    });
});
