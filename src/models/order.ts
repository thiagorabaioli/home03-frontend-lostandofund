import { UserDTO } from "./user";

// A classe OrderDTO pode continuar a existir se for usada noutra parte do sistema.
export class OrderDTO {
  id?: number;
  items: OrderItemDTO[] = [];
}

// ESTA É A CORREÇÃO PRINCIPAL
// Transformámos a classe antiga num 'type' que corresponde ao DTO do backend.
export type OrderItemDTO = {
    id: number;
    type: number;
    notes: string;
    interactionDate: string; // O 'Instant' do Java é serializado como string
    user: UserDTO; // O objeto do utilizador que realizou a ação
}