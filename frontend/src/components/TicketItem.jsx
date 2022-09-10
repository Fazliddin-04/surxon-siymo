import { Link } from 'react-router-dom'

function TicketItem({ ticket, q }) {
  return (
    <Link to={`/product/${ticket._id}`}>
      <div
        className={`ticket`}
        style={{
          backgroundColor:
            ticket.status === 'out of stock' ? '#e0534a82' : '#4badf720',
        }}
      >
        <div>
          <p>
            {q
              ? ticket.description.split('').map((letter) => (
                  <span
                    style={{
                      color: q.toLowerCase().includes(letter.toLowerCase())
                        ? 'red'
                        : 'inherit',
                    }}
                  >
                    {letter}
                  </span>
                ))
              : ticket.description}
          </p>
        </div>
        <div>
          {q
            ? ticket.vendorcode.split('').map((letter) => (
                <span
                  style={{
                    color: q.toLowerCase().includes(letter.toLowerCase())
                      ? 'red'
                      : 'inherit',
                  }}
                >
                  {letter}
                </span>
              ))
            : ticket.vendorcode}
        </div>
        <div>
          {' '}
          {q
            ? ticket.barcode.split('').map((letter) => (
                <span
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
        <div>{ticket.product}</div>
        <div>{ticket.size}</div>
        {/* <div className={`status status-${ticket.status}`}>{ticket.status}</div> */}
      </div>
    </Link>
  )
}

export default TicketItem
