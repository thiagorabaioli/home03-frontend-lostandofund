import { OrderItemDTO } from "./order";

export type DeliveredItemDetailsDTO = {
    itemId: number;
    description: string;
    imgUrl: string;
    foundDate: string;
    deliveredToName: string;
    deliveredToEmail: string;
    deliveredToContact: string;
    deliveryDate: string;
    deliveredToLocation: string; 
    conditionAccepted: boolean;
    sameCondition: boolean | null;
    
    interactions: OrderItemDTO[];
};