function CartItem({ ticket, q, select }) {
    return (
      <div className={`cart-item ${select ? 'select' : ''}`}>
        <div>
          <p>
            {q
              ? ticket.description.split('').map((letter, idx) => (
                  <span
                    style={{
                      color: q.toLowerCase().includes(letter.toLowerCase())
                        ? 'red'
                        : 'inherit',
                    }}
                    key={idx}
                  >
                    {letter}
                  </span>
                ))
              : ticket.description}{' '}
            / {ticket.size}
          </p>
          <div>
            {q
              ? ticket.vendorcode.split('').map((letter, idx) => (
                  <span
                    style={{
                      color: q.toLowerCase().includes(letter.toLowerCase())
                        ? 'red'
                        : 'inherit',
                    }}
                    key={idx}
                  >
                    {letter}
                  </span>
                ))
              : ticket.vendorcode}
            {' / '}
            {q
              ? ticket.barcode.split('').map((letter, idx) => (
                  <span
                    key={idx}
                    style={{
                      color: q.toLowerCase().includes(letter.toLowerCase())
                        ? 'red'
                        : 'inherit',
                    }}
                  >
                    {letter}
                  </span>
                ))
              : ticket.barcode}
          </div>
        </div>
        <div style={{ justifySelf: 'flex-end' }}>
          {ticket.price.toLocaleString('uz-UZ')} UZS
        </div>
      </div>
    )
  }


export default CartItem
