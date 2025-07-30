export class Product {
  id: number;
  name: string;
  price: number;
  categoryId: string;

  constructor({ id, name, price, categoryId }) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (price) this.price = price;
    if (categoryId) this.categoryId = categoryId;
  }
}
