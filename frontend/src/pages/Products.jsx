import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'
import { Link } from 'react-router-dom'
import { FaPlus, FaSearch } from 'react-icons/fa'

function Products() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  const [totalProducts, setTotalProducts] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [searchQ, setSearchQ] = useState('')

  const dispatch = useDispatch()

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
    let cost = 0
    tickets.forEach((ticket) => {
      cost += ticket.price
    })
    setTotalProducts(tickets.length)
    setTotalCost(cost)
  }, [tickets])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div style={{ padding: '0px 20px' }}>
      <h1>Products</h1>
      <div className="flexbox banner flex-ones">
        <div className="leftBordered">
          <small>Total Products</small>
          <p>{totalProducts}</p>
        </div>
        <div className="leftBordered">
          <small>Total cost</small>
          <p>{totalCost.toLocaleString('uz-UZ', { currency: 'sum' })} sum</p>
        </div>
      </div>
      <div className="flexbox banner">
        <div
          className="form-group searchBox"
          style={{ marginBottom: 0, height: '100%' }}
        >
          <label htmlFor="search">
            <FaSearch />
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            style={{ marginBottom: 0, height: '100%' }}
            placeholder="Vendor code, barcode, product"
          />
        </div>
        <Link to={'/new-product'} className="btn btn-reverse">
          <FaPlus /> Create New Ticket
        </Link>
      </div>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Tovar</div>
          <div>Sotuvchi kodi</div>
          <div>Barkod</div>
          <div>Kategoriya</div>
          <div>O'lcham</div>
        </div>
        {/* {[...tickets]
          .reverse()
          .map((ticket) =>
            searchQ !== '' ? (
              ticket.description
                .toLowerCase()
                .includes(searchQ.toLowerCase()) ||
              ticket.vendorcode.toLowerCase().includes(searchQ.toLowerCase()) ||
              ticket.barcode.includes(searchQ) ? (
                <TicketItem key={ticket._id} ticket={ticket} q={searchQ} />
              ) : (
                <></>
              )
            ) : (
              <TicketItem key={ticket._id} ticket={ticket} />
            )
          )} */}
      </div>
    </div>
  )
}

export default Products
