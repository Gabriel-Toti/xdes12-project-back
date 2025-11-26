"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPaymentService = processPaymentService;
const not_defined_1 = require("../../../utils/errors/not-defined");
const not_found_1 = require("../../../utils/errors/not-found");
const announcement_repository_1 = require("../../announcement/repositories/announcement.repository");
const announcement_repository_2 = require("../../announcement/repositories/announcement.repository");
const property_repository_1 = require("../../property/repositories/property.repository");
const users_repository_1 = require("../../user/repositories/users.repository");
async function processPaymentService(userId, paymentData, prisma) {
    try {
        // Simular processamento de pagamento (não valida realmente os dados do cartão)
        // Apenas verifica se os campos foram preenchidos
        if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
            throw new not_defined_1.NotDefined("Dados do cartão incompletos");
        }
        if (paymentData.type === "boost") {
            // Validar que propertyId e number foram fornecidos
            if (!paymentData.propertyId || paymentData.number === undefined) {
                throw new not_defined_1.NotDefined("ID da propriedade e número do anúncio são obrigatórios para ativar boost");
            }
            // Verificar se o anúncio existe
            const announcement = await (0, announcement_repository_1.getAnnouncementById)(paymentData.propertyId, paymentData.number, prisma);
            if (!announcement) {
                throw new not_found_1.NotFound("Anúncio não encontrado");
            }
            // Verificar se o usuário é admin do imóvel
            const participants = await (0, property_repository_1.getParticipantsByProperty)(paymentData.propertyId, prisma);
            const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);
            if (!userIsAdmin) {
                throw new not_defined_1.NotDefined("Apenas administradores da propriedade podem ativar boost");
            }
            // Ativar boost no anúncio
            await (0, announcement_repository_2.updateAnnouncement)(paymentData.propertyId, paymentData.number, { boost: true }, prisma);
            return { success: true, message: "Boost ativado com sucesso" };
        }
        else if (paymentData.type === "premium") {
            // Verificar se o usuário existe
            const user = await (0, users_repository_1.getUserById)(userId, prisma);
            if (!user) {
                throw new not_found_1.NotFound("Usuário não encontrado");
            }
            // Ativar premium no usuário
            await prisma.users.update({
                where: { id: userId },
                data: { premium: true }
            });
            return { success: true, message: "Premium ativado com sucesso" };
        }
        else {
            throw new not_defined_1.NotDefined("Tipo de pagamento inválido");
        }
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=process-payment.service.js.map