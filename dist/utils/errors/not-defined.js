"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotDefined = void 0;
class NotDefined extends Error {
    constructor(message = "Required value not defined") {
        super(message);
        this.name = "NotDefined";
    }
}
exports.NotDefined = NotDefined;
//# sourceMappingURL=not-defined.js.map