class OrderDetail {
    constructor(id, orderId, productId, quantity) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

module.exports = OrderDetail;
