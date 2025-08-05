export class OrderDTO {
  id?: number;
  items: OrderItemDTO[] = [];

}

export class OrderItemDTO {
  constructor(
    public itemlostId: number,
    public description: string,
    public imgUrl: string
  ) {}
  
}
