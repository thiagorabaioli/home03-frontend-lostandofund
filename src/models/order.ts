export class OrderDTO {
  id?: number;
  items: OrderItemDTO2[] = [];

}

export class OrderItemDTO2 {
  constructor(
    public itemlostId: number,
    public description: string,
    public imgUrl: string
  ) {}
  
}
