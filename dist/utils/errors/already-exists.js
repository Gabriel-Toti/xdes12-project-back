"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExists = void 0;
class AlreadyExists extends Error {
    constructor(message = "Value already exists") {
        super(message);
        this.name = "AlreadyExists";
    }
}
exports.AlreadyExists = AlreadyExists;
//# sourceMappingURL=already-exists.js.map