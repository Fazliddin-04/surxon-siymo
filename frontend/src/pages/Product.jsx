import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getTicket,
  closeTicket,
  deleteTicket,
} from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'

function Product() {
  const { isError, isLoading, message, ticket } = useSelector(
    (state) => state.tickets
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { productId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(productId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, productId])

  // Close Product
  const onProductClose = () => {
    dispatch(closeTicket(productId))
    toast.success('Product is out of stock')
    navigate('/products')
  }

  const onProductDelete = () => {
    dispatch(deleteTicket(productId))
    toast.success('Product is deleted')
    navigate('/products')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong...</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/products" />
        <h2>
          Product: {ticket.product}
          <span
            className={`status status-${
              ticket.status === 'in stock'
                ? 'open'
                : ticket.status === 'out of stock'
                ? 'closed'
                : ticket.status
            }`}
          >
            {ticket.status}
          </span>
        </h2>
        <h3>{new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product ID: #{ticket._id}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of product</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'out of stock' ? (
        <div className="boxes end">
          <button className="btn" onClick={onProductClose}>
            Out of Stock
          </button>
          <button className="btn btn-reverse " onClick={() => navigate('/')}>
            Edit
          </button>
          <button className="btn " onClick={onProductDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div className="boxes end">
          <span></span>
          <button className="btn btn-reverse " onClick={() => navigate('/')}>
            Edit
          </button>
          <button className="btn " onClick={onProductDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Product
