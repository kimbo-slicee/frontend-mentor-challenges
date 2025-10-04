import FileController from "../../../src/controllers/FileController.js";
import ValidationService from "../../../src/services/ValidationService.js";
import UIService from "../../../src/services/UIService.js";

jest.mock("../../../src/services/ValidationService.js", () => ({
    __esModule: true,
    default: {
        isValidSize: jest.fn()
    }
}));

jest.mock("../../../src/services/UIService.js", () => ({
    __esModule: true,
    default: {
        resetUI: jest.fn(),
        displayImage: jest.fn(),
        displayActions: jest.fn(),
        fileOverSize: jest.fn(),
        removeActions: jest.fn()
    }
}));

describe("FileController", () => {
    let controller;
    let mockElements;

    beforeEach(() => {
        // ✅ Mock DOM elements with classList and necessary methods
        mockElements = {
            fileInput: { value: "", click: jest.fn(), addEventListener: jest.fn() },
            image: { src: "" },
            helperText: { classList: { add: jest.fn(), remove: jest.fn(), contains: jest.fn() } },
            actionsButtons: [{ addEventListener: jest.fn(), classList: { contains: jest.fn() } }],
            infoMessage: { classList: { add: jest.fn(), remove: jest.fn() } },
            errorMessage: { classList: { add: jest.fn(), remove: jest.fn() } },
            iconInfo: { classList: { add: jest.fn(), remove: jest.fn() } },
            actions: { classList: { add: jest.fn(), remove: jest.fn() } }
        };

        controller = new FileController(mockElements);
    });

    test("handleFileUpload calls UIService.displayImage if file is valid", () => {
        const mockFile = new Blob(["test"], { type: "image/png" });
        ValidationService.isValidSize.mockReturnValue(true);

        controller.handleFileUpload({ target: { files: [mockFile] } });

        expect(UIService.resetUI).toHaveBeenCalled();
        expect(UIService.displayImage).toHaveBeenCalledWith(mockFile, mockElements.image);
        expect(UIService.displayActions).toHaveBeenCalled();
    });

    test("handleFileUpload calls UIService.fileOverSize if file too big", () => {
        const mockFile = new Blob(["big"], { type: "image/png" });
        ValidationService.isValidSize.mockReturnValue(false);

        controller.handleFileUpload({ target: { files: [mockFile] } });

        expect(UIService.fileOverSize).toHaveBeenCalled();
        expect(mockElements.fileInput.value).toBe("");
    });

    test("handleFileRemove resets input and image", () => {
        controller.handleFileRemove();

        expect(mockElements.fileInput.value).toBe("");
        expect(mockElements.image.src).toContain("assets/images/icon-upload.svg");
        expect(UIService.removeActions).toHaveBeenCalled();
    });

    test("handleFileChange triggers file input click", () => {
        controller.handleFileChange();
        expect(mockElements.fileInput.click).toHaveBeenCalled();
    });

    test("handelFileActions calls handleFileRemove if remove button clicked", () => {
        // simulate button click with class "remove"
        const button = { classList: { contains: () => true } };
        controller.handleFileRemove = jest.fn();
        controller.handleFileChange = jest.fn();

        controller.handelFileActions({ target: button });
        expect(controller.handleFileRemove).toHaveBeenCalled();
        expect(controller.handleFileChange).not.toHaveBeenCalled();
    });

    test("handelFileActions calls handleFileChange if not remove button", () => {
        // simulate button click with class "remove" = false
        const button = { classList: { contains: () => false } };
        controller.handleFileRemove = jest.fn();
        controller.handleFileChange = jest.fn();

        controller.handelFileActions({ target: button });
        expect(controller.handleFileChange).toHaveBeenCalled();
        expect(controller.handleFileRemove).not.toHaveBeenCalled();
    });
});
