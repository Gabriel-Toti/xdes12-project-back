import { PrismaClient } from "@prisma/client";
import { ProcessPaymentData } from "../interfaces/payment.interface";
import { NotDefined } from "../../../utils/errors/not-defined";
import { NotFound } from "../../../utils/errors/not-found";
import { getAnnouncementById } from "../../announcement/repositories/announcement.repository";
import { updateAnnouncement } from "../../announcement/repositories/announcement.repository";
import { getParticipantsByProperty } from "../../property/repositories/property.repository";
import { getUserById } from "../../user/repositories/users.repository";

export async function processPaymentService(
    userId: string,
    paymentData: ProcessPaymentData,
    prisma: PrismaClient
) {
    try {
        // Simular processamento de pagamento (não valida realmente os dados do cartão)
        // Apenas verifica se os campos foram preenchidos
        
        if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
            throw new NotDefined("Dados do cartão incompletos");
        }

        if (paymentData.type === "boost") {
            // Validar que propertyId e number foram fornecidos
            if (!paymentData.propertyId || paymentData.number === undefined) {
                throw new NotDefined("ID da propriedade e número do anúncio são obrigatórios para ativar boost");
            }

            // Verificar se o anúncio existe
            const announcement = await getAnnouncementById(
                paymentData.propertyId,
                paymentData.number,
                prisma
            );

            if (!announcement) {
                throw new NotFound("Anúncio não encontrado");
            }

            // Verificar se o usuário é admin do imóvel
            const participants = await getParticipantsByProperty(paymentData.propertyId, prisma);
            const userIsAdmin = participants.some(p => p.id_user === userId && p.admin === true);

            if (!userIsAdmin) {
                throw new NotDefined("Apenas administradores da propriedade podem ativar boost");
            }

            // Ativar boost no anúncio
            await updateAnnouncement(
                paymentData.propertyId,
                paymentData.number,
                { boost: true },
                prisma
            );

            return { success: true, message: "Boost ativado com sucesso" };
        } else if (paymentData.type === "premium") {
            // Verificar se o usuário existe
            const user = await getUserById(userId, prisma);

            if (!user) {
                throw new NotFound("Usuário não encontrado");
            }

            // Ativar premium no usuário
            await prisma.users.update({
                where: { id: userId },
                data: { premium: true }
            });

            return { success: true, message: "Premium ativado com sucesso" };
        } else {
            throw new NotDefined("Tipo de pagamento inválido");
        }
    } catch (error) {
        throw error;
    }
}

