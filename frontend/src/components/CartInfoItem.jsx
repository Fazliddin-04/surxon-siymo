function CartInfoItem({ cart }) {
  let extra = 20
  let selled =
    cart.discountType === '%'
      ? cart.price - (cart.price / 100) * cart.discount
      : cart.price - cart.discount
  let soft = cart.price - (cart.price / 100) * extra
  let profit =
    cart.discountType === '%'
      ? cart.price - (cart.price / 100) * cart.discount - soft
      : cart.price - cart.discount - soft
  let loss = profit <= 0 ? soft - selled : 0

  return (
    <div className="cart-info-item">
      <div>
        {cart.products.map((product, idx) => (
          <div key={idx}>
            <p>
              {product.description} / {product.size}
            </p>
          </div>
        ))}
      </div>
      <div>
        {' '}
        {selled.toLocaleString('uz-UZ', {
          currency: 'sum',
        })}{' '}
        UZS
      </div>
      <div>
        {profit.toLocaleString('uz-UZ', {
          currency: 'sum',
        })}{' '}
        UZS
      </div>
      <div>
        {loss.toLocaleString('uz-UZ', {
          currency: 'sum',
        })}{' '}
        UZS
      </div>
      <div>{new Date(cart.createdAt).toLocaleString('uz-UZ')}</div>
    </div>
  )
}

export default CartInfoItem
