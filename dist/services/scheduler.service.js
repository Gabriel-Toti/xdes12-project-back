"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchedulers = initSchedulers;
const cron = __importStar(require("node-cron"));
const client_1 = require("@prisma/client");
const mailer_1 = require("../utils/mailer");
const logger_1 = require("../utils/logger");
const create_notification_service_1 = require("../domain/notification/services/create-notification.service");
const prisma = new client_1.PrismaClient();
// Envia lembretes semanais para usuários inativos (não acessaram em 7 dias)
async function sendInactivityReminders() {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // Buscar usuários que não acessaram nos últimos 7 dias
        const inactiveUsers = await prisma.users.findMany({
            where: {
                active: true,
                last_login: {
                    lt: sevenDaysAgo
                }
            },
            take: 50 // Limitar para evitar sobrecarga
        });
        logger_1.logger.info(`Encontrados ${inactiveUsers.length} usuários inativos para lembrete`);
        for (const user of inactiveUsers) {
            try {
                // Criar notificação interna
                await (0, create_notification_service_1.createNotification)({
                    id_user: user.id,
                    type: 'reminder',
                    title: '👋 Sentimos sua falta!',
                    message: 'Há novos anúncios que podem combinar com suas preferências. Que tal dar uma olhada?',
                    link: '/anuncios'
                });
                // Enviar email (apenas se não enviou recentemente)
                await (0, mailer_1.sendMail)({
                    to: user.email,
                    subject: 'Sentimos sua falta! Novos imóveis disponíveis 🏠',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #667eea;">Olá, ${user.name}!</h2>
              <p>Sentimos sua falta no CASAR! 👋</p>
              <p>Há novos anúncios de imóveis que podem ser perfeitos para você.</p>
              <p>Nosso sistema de compatibilidade encontrou várias opções que combinam com suas preferências.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/anuncios" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block;
                          font-weight: bold;">
                  Ver Anúncios
                </a>
              </div>
              <p style="color: #666; font-size: 0.875rem;">
                Dica: Anúncios patrocinados aparecem em destaque e geralmente são preenchidos mais rápido!
              </p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 0.75rem;">
                Você está recebendo este email porque não acessa o CASAR há alguns dias. 
                Se não desejar mais receber lembretes, você pode desativar isso em suas configurações de perfil.
              </p>
            </div>
          `
                });
                logger_1.logger.info(`Lembrete enviado para ${user.email}`);
            }
            catch (error) {
                logger_1.logger.error(`Erro ao enviar lembrete para ${user.email}: ${error}`);
            }
        }
    }
    catch (error) {
        logger_1.logger.error(`Erro ao processar lembretes de inatividade: ${error}`);
    }
}
// Envia lembretes sobre matches pendentes (a cada 3 dias)
async function sendPendingMatchesReminders() {
    try {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        // Buscar matches não aceitos criados há mais de 3 dias
        const pendingMatches = await prisma.matches.findMany({
            where: {
                accepted: false
            },
            include: {
                users: true,
                announcement: {
                    include: {
                        property: {
                            include: {
                                participation: {
                                    where: {
                                        admin: true
                                    },
                                    include: {
                                        users: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            take: 50
        });
        logger_1.logger.info(`Encontrados ${pendingMatches.length} matches pendentes para lembrete`);
        // Agrupar por propriedade para evitar múltiplos emails para o mesmo admin
        const matchesByProperty = new Map();
        for (const match of pendingMatches) {
            const propertyId = match.announcement.property.id;
            if (!matchesByProperty.has(propertyId)) {
                matchesByProperty.set(propertyId, []);
            }
            matchesByProperty.get(propertyId).push(match);
        }
        // Enviar lembretes para admins
        for (const [, matches] of matchesByProperty) {
            const property = matches[0]?.announcement?.property;
            if (!property)
                continue;
            const admins = property.participation.filter(p => p.admin);
            for (const admin of admins) {
                try {
                    await (0, create_notification_service_1.createNotification)({
                        id_user: admin.id_user,
                        type: 'reminder',
                        title: `📬 ${matches.length} match(es) aguardando resposta`,
                        message: `Você tem ${matches.length} pessoas interessadas no imóvel "${property.name}". Não deixe de responder!`,
                        link: `/imoveis`
                    });
                    await (0, mailer_1.sendMail)({
                        to: admin.users.email,
                        subject: `${matches.length} pessoa(s) interessada(s) no seu imóvel! 🏠`,
                        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #667eea;">Olá, ${admin.users.name}!</h2>
                <p><strong>${matches.length} pessoa(s)</strong> demonstrou interesse no seu imóvel <strong>"${property.name}"</strong>.</p>
                <p>Não perca a oportunidade de encontrar o inquilino ideal! Quanto mais rápido você responder, maiores as chances de fechar negócio.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/conta" 
                     style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            color: white; 
                            padding: 12px 30px; 
                            text-decoration: none; 
                            border-radius: 8px; 
                            display: inline-block;
                            font-weight: bold;">
                    Ver Matches
                  </a>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="color: #999; font-size: 0.75rem;">
                  Este é um lembrete sobre matches pendentes. Você pode gerenciar seus matches na página do seu perfil.
                </p>
              </div>
            `
                    });
                    logger_1.logger.info(`Lembrete de matches enviado para ${admin.users.email}`);
                }
                catch (error) {
                    logger_1.logger.error(`Erro ao enviar lembrete de matches para ${admin.users.email}: ${error}`);
                }
            }
        }
    }
    catch (error) {
        logger_1.logger.error(`Erro ao processar lembretes de matches pendentes: ${error}`);
    }
}
// Envia sugestões semanais de novos anúncios com alta compatibilidade
async function sendWeeklyHighlights() {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // Buscar anúncios criados na última semana
        const recentAnnouncements = await prisma.announcement.findMany({
            where: {
                created_at: {
                    gte: sevenDaysAgo
                }
            },
            include: {
                property: true
            }
        });
        if (recentAnnouncements.length === 0) {
            logger_1.logger.info('Nenhum anúncio novo esta semana para highlights');
            return;
        }
        // Buscar usuários ativos (acessaram nos últimos 30 dias)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = await prisma.users.findMany({
            where: {
                active: true,
                last_login: {
                    gte: thirtyDaysAgo
                }
            },
            take: 100 // Limitar para evitar spam
        });
        logger_1.logger.info(`Enviando highlights semanais para ${activeUsers.length} usuários ativos`);
        for (const user of activeUsers) {
            try {
                await (0, create_notification_service_1.createNotification)({
                    id_user: user.id,
                    type: 'new_announcement',
                    title: '✨ Novos anúncios esta semana!',
                    message: `${recentAnnouncements.length} novos imóveis foram anunciados. Confira!`,
                    link: '/anuncios'
                });
                await (0, mailer_1.sendMail)({
                    to: user.email,
                    subject: `✨ ${recentAnnouncements.length} novos imóveis esta semana!`,
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #667eea;">Olá, ${user.name}!</h2>
              <p>Temos <strong>${recentAnnouncements.length} novos anúncios</strong> esta semana no CASAR! ✨</p>
              <p>Alguns deles podem ser perfeitos para você. Não perca a oportunidade!</p>
              ${recentAnnouncements.slice(0, 3).map(ann => `
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 15px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #333;">${ann.title}</h3>
                  <p style="color: #666; margin: 5px 0;">📍 ${ann.property.address}</p>
                  <p style="color: #059669; font-weight: bold; margin: 5px 0;">
                    R$ ${ann.average_cost.toLocaleString('pt-BR')} / mês
                  </p>
                </div>
              `).join('')}
              ${recentAnnouncements.length > 3 ? `<p style="color: #666;">E mais ${recentAnnouncements.length - 3} anúncios...</p>` : ''}
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/anuncios" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block;
                          font-weight: bold;">
                  Ver Todos os Anúncios
                </a>
              </div>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 0.75rem;">
                Este é um resumo semanal dos novos anúncios no CASAR. Para não receber estes emails, acesse suas configurações de perfil.
              </p>
            </div>
          `
                });
                logger_1.logger.info(`Highlights semanais enviados para ${user.email}`);
            }
            catch (error) {
                logger_1.logger.error(`Erro ao enviar highlights para ${user.email}: ${error}`);
            }
        }
    }
    catch (error) {
        logger_1.logger.error(`Erro ao processar highlights semanais: ${error}`);
    }
}
// Inicializar schedulers
function initSchedulers() {
    logger_1.logger.info('Inicializando schedulers...');
    // Lembretes de inatividade: toda segunda-feira às 10h
    cron.schedule('0 10 * * 1', () => {
        logger_1.logger.info('Executando: Lembretes de inatividade');
        sendInactivityReminders();
    });
    // Lembretes de matches pendentes: a cada 3 dias às 14h
    cron.schedule('0 14 */3 * *', () => {
        logger_1.logger.info('Executando: Lembretes de matches pendentes');
        sendPendingMatchesReminders();
    });
    // Highlights semanais: toda sexta-feira às 9h
    cron.schedule('0 9 * * 5', () => {
        logger_1.logger.info('Executando: Highlights semanais');
        sendWeeklyHighlights();
    });
    logger_1.logger.info('Schedulers inicializados com sucesso!');
}
//# sourceMappingURL=scheduler.service.js.map