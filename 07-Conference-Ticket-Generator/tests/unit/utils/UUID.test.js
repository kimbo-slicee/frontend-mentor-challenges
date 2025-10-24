import {generateUUID} from "../../../src/utils/UUID.js";

describe('UUID Service', () => {
    test('should generate an ID with the correct length', () => {
        const id = generateUUID(5);
        expect(id).toHaveLength(5);
    });

    test('should generate different IDs each time', () => {
        const id1 = generateUUID();
        const id2 = generateUUID();
        expect(id1).not.toBe(id2);
    });
});