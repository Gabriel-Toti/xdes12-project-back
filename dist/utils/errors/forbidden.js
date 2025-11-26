"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
class Forbidden extends Error {
    constructor(message = "Forbidden access") {
        super(message);
        this.name = "Forbidden";
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=forbidden.js.map