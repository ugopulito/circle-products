class ProductClass {
    constructor(id, title, description, image, category, price, oldPrice){
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.category = category;
        this.price = this.formatPrice(price);
        this.oldPrice = this.formatPrice(oldPrice || price);
    }

    formatPrice(value) {
        return Number(value).toFixed(2);
    }

    getPriceWithVAT() {
        const VATRate = 0.2;
        const priceWithVAT = this.price * (1 + VATRate);
        return this.formatPrice(priceWithVAT);
    }

    updateRawPrice(newPrice) {
        const updatedProduct = new ProductClass(
            this.id,
            this.title,
            this.description,
            this.image,
            this.category,
            this.formatPrice(newPrice),
            this.oldPrice
        )
        return updatedProduct
    }

    updateOldPrice(price) {
        const updatedProduct = new ProductClass(
            this.id,
            this.title,
            this.description,
            this.image,
            this.category,
            this.price,
            this.formatPrice(price)
        )
        return updatedProduct
    }
}

export default ProductClass