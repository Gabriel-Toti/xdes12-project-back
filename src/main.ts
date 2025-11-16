// com o deploy planejado para o vercel, esse arquivo serve apenas para desenvolvimento
import { server } from "./server";
import http from 'http'

const port = process.env.SERVER_PORT || 3333;

const protocol: http.Server = http.createServer(server);

protocol.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});