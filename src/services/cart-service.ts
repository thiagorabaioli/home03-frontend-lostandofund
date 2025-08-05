import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from '../localstorage/cart-repository';
import { ItemLostDTO } from "../models/itemlosts";

export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart() : OrderDTO {
    return cartRepository.get();
}

// Adiciona um item à lista de reclamação (carrinho)
export function addItem(itemlost: ItemLostDTO) {
    const cart = cartRepository.get();
    // Verifica se o item já não está na lista
    const item = cart.items.find(x => x.itemlostId === itemlost.id);
    if (!item) {
        const newItem = new OrderItemDTO(itemlost.id, itemlost.description, itemlost.imgUrl);
        cart.items.push(newItem);
        cartRepository.save(cart);
    }
}

// Limpa a lista de reclamação
export function clearCart() {
    cartRepository.clear();
}

// Remove um item da lista de reclamação
export function removeItem(itemlostId: number) {
    const cart = cartRepository.get();
    cart.items = cart.items.filter(x => x.itemlostId !== itemlostId);
    cartRepository.save(cart);
}