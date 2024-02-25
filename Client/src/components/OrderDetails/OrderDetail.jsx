export const OrderDetail = ({ id, orderId, productId, quantity  }) => {
    return (
        <tr>
            <td>{orderId}</td>
            <td>{productId}</td>
            <td>{quantity}</td>
        </tr>
    )
}