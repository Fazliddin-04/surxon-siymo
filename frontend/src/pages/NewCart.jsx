import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCart, reset } from '../features/cart/cartSlice'
import { getTickets, closeTicket } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import { FaCheck, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa'
import CartItem from '../components/CartItem'

function NewCart() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cart
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState('nothing')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState('UZS')
  const [success, setSuccess] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { tickets, isLoading: ticketsLoading } = useSelector(
    (state) => state.tickets
  )

  const [searchQ, setSearchQ] = useState('')

  const ref = useRef()
  const basket = useRef()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
    if (success) {
      products.forEach((ticket) => {
        dispatch(closeTicket(ticket._id))
      })
      dispatch(reset())
      navigate('/history')
    }
  }, [isError, dispatch, message, navigate, success, products])

  useEffect(() => {
    let sum = 0
    products.forEach((ticket) => {
      sum += ticket.price
    })

    setPrice(sum)
  }, [products])

  useEffect(() => {
    discount < 0
      ? setDiscount(0)
      : discountType === '%' && discount > 100
      ? setDiscount(100)
      : discount > 0 && price < discount
      ? setDiscount(0)
      : setDiscount(discount)
  }, [discount, discountType, price])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createCart({
        name,
        email,
        products,
        description,
        price,
        discount,
        discountType,
      })
    )
  }

  if (isLoading || ticketsLoading) {
    return <Spinner />
  }

  return (
    <div
      className="flexbox"
      style={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '0px 20px',
      }}
    >
      <div
        style={{
          flex: 1,
          padding: '0px 20px',
        }}
      >
        <div className="form-group searchBox">
          <label htmlFor="search" style={{ margin: '0 10px' }}>
            <FaSearch size={20} />
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchQ}
            onChange={(e) => {
              setSearchQ(e.target.value)
              if (e.target.value !== '') {
                ref.current.style.display = 'block'
                basket.current.style.display = 'none'
              } else {
                ref.current.style.display = 'none'
                basket.current.style.display = 'block'
              }
            }}
            style={{
              marginBottom: 0,
              height: '100%',
              fontSize: '1.2rem',
              paddingLeft: '50px',
            }}
            placeholder="Vendor code, barcode, product"
          />
          <div
            className="clear"
            style={{ display: searchQ !== '' ? 'flex' : 'none' }}
            onClick={() => {
              setSearchQ('')
              ref.current.style.display = 'none'
              basket.current.style.display = 'block'
            }}
          >
            <FaTimes />
          </div>
        </div>

        <div className="tickets" ref={ref} style={{ display: 'none' }}>
          {tickets &&
            tickets.map((ticket, idx) =>
              ticket.status !== 'out of stock' && searchQ !== '' ? (
                ticket.description
                  .toLowerCase()
                  .includes(searchQ.toLowerCase()) ||
                ticket.vendorcode
                  .toLowerCase()
                  .includes(searchQ.toLowerCase()) ||
                ticket.barcode.includes(searchQ) ? (
                  <div key={idx} className="flexbox">
                    <CartItem ticket={ticket} q={searchQ} select={true} />
                    {!products.includes(ticket) ? (
                      <div
                        onClick={() => {
                          setProducts((prevState) => [...prevState, ticket])
                        }}
                      >
                        <FaPlus />
                      </div>
                    ) : (
                      <div>
                        <FaCheck />
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={idx}></div>
                )
              ) : (
                <div key={idx}></div>
              )
            )}
        </div>

        <div ref={basket}>
          <h1>Basket</h1>
          <div className="tickets">
            {products.length !== 0 ? (
              products.map((ticket, idx) => (
                <div className="flexbox" key={idx}>
                  <CartItem ticket={ticket} />
                  <div
                    onClick={() => {
                      setProducts((p) => p.splice(ticket))
                    }}
                  >
                    <FaTrash />
                  </div>
                </div>
              ))
            ) : (
              <h3>No elements selected</h3>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="form form-sm">
        <div>
          <div className="form-group flexbox" style={{ flexWrap: 'nowrap' }}>
            <input
              type="tel"
              value={discount}
              onChange={(e) =>
                setDiscount(
                  /[A-Z]/i.test(e.target.value) ? discount : e.target.value
                )
              }
            />
            <div className="flexbox btn-group">
              <label
                htmlFor="UZS"
                className={`btn ${discountType === 'UZS' ? 'active' : ''}`}
              >
                UZS
                <input
                  type="radio"
                  name="discountType"
                  id="UZS"
                  onChange={() => setDiscountType('UZS')}
                />
              </label>
              <label
                htmlFor="percent"
                className={`btn ${discountType === '%' ? 'active' : ''}`}
              >
                %
                <input
                  type="radio"
                  name="discountType"
                  id="percent"
                  onChange={() => setDiscountType('%')}
                />
              </label>
            </div>
          </div>
          {/* <div className="btn-group">
            <label
              htmlFor="15percent"
              className={`btn ${discount === 15 ? 'active' : ''}`}
            >
              15%
              <input
                type="radio"
                name="discount"
                id="15percent"
                onChange={() => setDiscount(15)}
              />
            </label>
            <label
              htmlFor="30percent"
              className={`btn ${discount === 30 ? 'active' : ''}`}
            >
              30%
              <input
                type="radio"
                name="discount"
                id="30percent"
                onChange={() => setDiscount(30)}
              />
            </label>
            <label
              htmlFor="50percent"
              className={`btn ${discount === 50 ? 'active' : ''}`}
            >
              50%
              <input
                type="radio"
                name="discount"
                id="50percent"
                onChange={() => setDiscount(50)}
              />
            </label>
            <label
              htmlFor="75percent"
              className={`btn ${discount === 75 ? 'active' : ''}`}
            >
              75%
              <input
                type="radio"
                name="discount"
                id="75percent"
                onChange={() => setDiscount(75)}
              />
            </label>
          </div> */}
        </div>
        <div>
          <div className="flexbox" style={{ justifyContent: 'space-between' }}>
            <p>Price</p>
            <p>{price.toLocaleString('uz-UZ', { currency: 'sum' })} UZS</p>
          </div>
          <div className="flexbox" style={{ justifyContent: 'space-between' }}>
            <p>Discount</p>
            <p>
              {discount.toLocaleString('uz-UZ', { currency: 'sum' })}{' '}
              {discountType}
            </p>
          </div>
          <div className="flexbox" style={{ justifyContent: 'space-between' }}>
            <h3>Total</h3>
            <h3>
              {(discountType === '%'
                ? price - (price / 100) * discount
                : price - discount
              ).toLocaleString('uz-UZ', {
                currency: 'sum',
              })}{' '}
              UZS
            </h3>
          </div>
          <button className="btn btn-block btn-reverse">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default NewCart
