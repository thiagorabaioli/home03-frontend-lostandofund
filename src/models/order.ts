import { UserDTO } from "./user";


export class OrderDTO {
  id?: number;
  items: OrderItemDTO[] = [];
}


export type OrderItemDTO = {
    id: number;
    type: number;
    notes: string;
    interactionDate: string; 
    user: UserDTO; 
}