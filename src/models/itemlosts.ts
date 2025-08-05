import { OrderItemDTO } from "./orderitem";



export type ItemLostDTO = {
    id: number;
    status: boolean;
    location: string;
    whoFind: string;
    description: string;
    foundDate: string;
    imgUrl: string;
    orderItems: OrderItemDTO[];
}