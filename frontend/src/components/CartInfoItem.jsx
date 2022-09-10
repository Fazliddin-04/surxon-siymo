function CartInfoItem({ cart, q }) {
  let extra = 20
  let selled =
    cart.discountType === '%'
      ? cart.price - (cart.price / 100) * cart.discount
      : cart.price - cart.discount
  let soft = cart.price - (cart.price / 100) * extra

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
        {(cart.discountType === '%'
          ? cart.price -
            (cart.price / 100) * cart.discount -
            (cart.price - (cart.price / 100) * extra)
          : cart.price -
            cart.discount -
            (cart.price - (cart.price / 100) * extra)
        ).toLocaleString('uz-UZ', {
          currency: 'sum',
        })}{' '}
        UZS
      </div>
      <div>
        {soft.toLocaleString('uz-UZ', {
          currency: 'sum',
        })}{' '}
        UZS
      </div>
      <div>{new Date(cart.createdAt).toLocaleString('uz-UZ')}</div>
    </div>
  )
}

export default CartInfoItem
