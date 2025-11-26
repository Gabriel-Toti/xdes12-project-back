"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./domain/user/routes/user.routes"));
const preferences_routes_1 = __importDefault(require("./domain/attributes/routes/preferences.routes"));
const property_routes_1 = __importDefault(require("./domain/property/routers/property.routes"));
const rules_routes_1 = __importDefault(require("./domain/attributes/routes/rules.routes"));
const announcement_routes_1 = __importDefault(require("./domain/announcement/routes/announcement.routes"));
const matches_routes_1 = __importDefault(require("./domain/matches/routes/matches.routes"));
const payment_routes_1 = __importDefault(require("./domain/payment/routes/payment.routes"));
const notification_routes_1 = __importDefault(require("./domain/notification/routes/notification.routes"));
const router = (0, express_1.Router)();
exports.router = router;
//! Placeholder
router.get('/', (_, res) => res.status(200).send('Hello, world!'));
router.use(user_routes_1.default);
router.use(preferences_routes_1.default);
router.use(property_routes_1.default);
router.use(rules_routes_1.default);
router.use(announcement_routes_1.default);
router.use(matches_routes_1.default);
router.use(payment_routes_1.default);
router.use(notification_routes_1.default);
//# sourceMappingURL=router.js.map