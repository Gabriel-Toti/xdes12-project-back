"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttribute = deleteAttribute;
async function deleteAttribute(id, prisma) {
    return prisma.attributes.delete({
        where: {
            id
        }
    });
}
//# sourceMappingURL=attribute.repository.js.map