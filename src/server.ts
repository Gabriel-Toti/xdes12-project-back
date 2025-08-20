import express from 'express'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './router';

const server = express();
const allowedOrigins = [process.env.FRONTEND_URL, 'localhost:3000'];

server.use(express.json());
server.set("trust proxy", 1); // permitir o uso de cookies seguros
server.use(cookieParser());
server.disable("x-powered-by");
server.use(cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if(!origin)
        {
            callback(null, true);
        } else if(allowedOrigins.includes(origin))
        {
            callback(null, true);
        } else {
            callback(new Error("A politica de CORS desse servidor não permite acesso dessa origem."), false);
        }
    },
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // Métodos permitidos
    allowedHeaders: "Content-Type, Authorization", // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies/credenciais
}));
server.use(router);

export { server };