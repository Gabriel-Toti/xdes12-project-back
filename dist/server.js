"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./router");
const server = (0, express_1.default)();
exports.server = server;
const allowedOrigins = [process.env.FRONTEND_URL, 'localhost:3000'];
server.use(express_1.default.json());
server.set("trust proxy", 1); // permitir o uso de cookies seguros
server.use((0, cookie_parser_1.default)());
// Servir arquivos estáticos de uploads
server.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
server.disable("x-powered-by");
server.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
        }
        else if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("A politica de CORS desse servidor não permite acesso dessa origem."), false);
        }
    },
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Métodos permitidos
    allowedHeaders: "Content-Type, Authorization", // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies/credenciais
}));
server.use(router_1.router);
//# sourceMappingURL=server.js.map