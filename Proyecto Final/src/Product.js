export default class Product {
    constructor(title, description, code,price,status = true,stock,category,thumbnail){
        if ((title ?? 'empty') === 'empty') {
            throw new Error('El parametro "title" es obligatorio. Porfavor agrega un valor para "title" ')
        }
        if ((description ?? 'empty') === 'empty') {
            throw new Error('El parametro "description" es obligatorio. Porfavor agrega un valor para "description" ')
        }if ((code ?? 'empty') === 'empty') {
            throw new Error('El parametro "code" es obligatorio. Porfavor agrega un valor para "code" ')
        }if ((price ?? 'empty') === 'empty') {
            throw new Error('El parametro "price" es obligatorio. Porfavor agrega un valor para "price" ')
        }
        if ((stock ?? 'empty') === 'empty') {
            throw new Error('El parametro "stock" es obligatorio. Porfavor agrega un valor para "stock" ')
        }
        if ((category ?? 'empty') === 'empty') {
            throw new Error('El parametro "category" es obligatorio. Porfavor agrega un valor para "category" ')
        }

        this.title = title.trim();
        this.description = description.trim();
        this.code = code.trim();
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category.trim();
        this.thumbnail = thumbnail;
    }
}