"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toISOLocaleString = toISOLocaleString;
function toISOLocaleString(date) {
    /*
      const minutesOffset = date.getTimezoneOffset(); // offset em minutos
      const secondsOffset = minutesOffset * 60; // offset em segundos
      const msOffset = secondsOffset * 1000; // offset em ms
    */
    return new Date(date.getTime() - (date.getTimezoneOffset() * 1000 * 60)).toISOString(); // trabalha com ms
}
//# sourceMappingURL=date-format.js.map