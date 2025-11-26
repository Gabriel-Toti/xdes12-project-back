"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
class Unauthorized extends Error {
    constructor(message = "Unauthorized access") {
        super(message);
        this.name = "Unauthorized";
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=unauthorized.js.map