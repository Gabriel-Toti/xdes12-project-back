import { server } from "./server";
import https from 'https'
import http from 'http'
import fs from 'fs'
import path from "path";

const keyFile = path.join(__dirname, "..", "certificates/server.key");
const certificateFile = path.join(__dirname, "..", "certificates/server.crt");

const keyPath = path.join(process.env.SSL_KEY || keyFile);
const certificatePath = path.join(process.env.SSL_CERTIFICATE || certificateFile);

const nodeEnvironment = process.env.NODE_ENV || "development";
const port = process.env.SERVER_PORT || 3333;

let protocol: http.Server | https.Server;

if(nodeEnvironment === 'production') {
    const key = fs.readFileSync(keyPath, 'utf-8');
    const cert = fs.readFileSync(certificatePath, 'utf-8');

    const httpsOptions = {
        key,
        cert
    };

    protocol = https.createServer(httpsOptions, server);
} else {
    protocol = http.createServer(server);
}

protocol.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});