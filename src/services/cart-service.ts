import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from '../localstorage/cart-repository';
import { ItemLostDTO } from "../models/itemlosts";

export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart() : OrderDTO {
    return cartRepository.get();
}

export function addProduct(itemlost: ItemLostDTO) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.itemlostId === itemlost.id);
    if (!item) {
        const newItem = new OrderItemDTO(itemlost.id, itemlost.description, itemlost.imgUrl);
        cart.items.push(newItem);
        cartRepository.save(cart);
    }
}

export function clearCart() {
    cartRepository.clear();
}



