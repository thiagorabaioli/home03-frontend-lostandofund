// Importando do lugar certo
import { OrderItemDTO } from "./order";

export type ItemLostDTO = {
    id: number;
    status: boolean;
    location: string;
    whoFind: string;
    description: string;
    foundDate: string;
    imgUrl: string;
    orderItems: OrderItemDTO[]; // Usando o DTO correto
}