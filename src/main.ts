// com o deploy planejado para o vercel, esse arquivo serve apenas para desenvolvimento
import "./config/env";
import { server } from "./server";
import http from 'http'
import { initSchedulers } from "./services/scheduler.service";

const port = process.env.SERVER_PORT || 3333;

const protocol: http.Server = http.createServer(server);

protocol.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    
    // Inicializar schedulers de lembretes
    initSchedulers();
});