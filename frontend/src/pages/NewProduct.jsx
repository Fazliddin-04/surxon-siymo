import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'

function NewProduct() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('shirt')
  const [description, setDescription] = useState('')
  const [size, setSize] = useState('L')
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)
  const [vendorcode, setVendorcode] = useState('')
  const [barcode, setBarcode] = useState('')
  const [success, setSuccess] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      dispatch(reset())
      navigate('/products')
    }
  }, [isError, dispatch, message, navigate, success])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createTicket({
        product,
        description,
        size,
        amount,
        price,
        vendorcode,
        barcode,
      })
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div style={{ padding: '0px 20px' }}>
      <section className="heading">
        <h1>Create New Product</h1>
        <p>Please fill out the form below</p>
      </section>
      <div className="flexbox">
        <section className="form">
          <div className="flexbox">
            <div className="form-group">
              <label htmlFor="name">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Customer Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
              />
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="flexbox">
              <div className="form-group">
                <label htmlFor="product">Product</label>
                <select
                  name="product"
                  id="product"
                  onChange={(e) => setProduct(e.target.value)}
                >
                  <option value="shirt">Shirt</option>
                  <option value="trousers">Trousers</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="size">Size</label>
                <select
                  name="size"
                  id="size"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="tel"
                  name="amount"
                  id="amount"
                  className="form-control"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      /[A-Z]/i.test(e.target.value) ? amount : e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="tel"
                  name="price"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      /[A-Z]/i.test(e.target.value) ? price : e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="flexbox">
              <div className="form-group">
                <label htmlFor="vendorcode">Vendor Code</label>
                <input
                  type="tel"
                  name="vendorcode"
                  id="vendorcode"
                  className="form-control"
                  value={vendorcode}
                  onChange={(e) =>
                    setVendorcode(
                      /[A-Z]/i.test(e.target.value)
                        ? e.target.value.toUpperCase()
                        : e.target.value
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="barcode">Barcode</label>
                <input
                  type="tel"
                  name="barcode"
                  id="barcode"
                  className="form-control"
                  value={barcode}
                  onChange={(e) =>
                    /[A-Z]/i.test(e.target.value)
                      ? setBarcode(barcode)
                      : e.target.value.length < 13
                      ? setBarcode(e.target.value)
                      : setBarcode(barcode)
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description of the product</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default NewProduct
