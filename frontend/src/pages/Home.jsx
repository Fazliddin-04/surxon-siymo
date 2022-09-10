import { useState, useEffect } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getTickets, reset } from '../features/ticket/ticketSlice'

function Home() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  const [date, setDate] = useState(
    new Date().toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  )
  const [totalCostIncurred, setTotalCostIncurred] = useState(0)
  const [salePrice, setSalePrice] = useState(0)

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
    let costIncurred = 0
    tickets.forEach((ticket) => {
      costIncurred += ticket.price
    })

    setTotalCostIncurred(costIncurred)
  }, [tickets])

  const onMutate = (e) => {
    setDate(
      new Date(e.target.value).toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="home">
        <div className="flexbox">
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <select name="company" id="company">
              <option value="Shurchi restoran">Shurchi restoran</option>
              <option value="filial 1">filial 1</option>
              <option value="filial 2">filial 2</option>
            </select>
          </div>
          <label htmlFor="date" className="btn btn-outline">
            {date} <FaRegCalendarAlt />
            <input
              type="date"
              name="date"
              id="date"
              onChange={onMutate}
              defaultValue={new Date().toLocaleDateString('sv-SE')}
              required
              style={{ visibility: 'hidden', width: 0 }}
            />
          </label>
        </div>
        <div className="flexbox">
          <div className="leftBordered">
            <small>Total cost</small>
            <p>{totalCostIncurred.toLocaleString('uz-UZ')} UZS</p>
          </div>
          <div className="leftBordered">
            <small>Total selling price</small>
            <p> {salePrice.toLocaleString('uz-UZ')} UZS</p>
          </div>
          <div className="leftBordered">
            <small>Total margin</small>
            <p>38%</p>
          </div>
          <div className="leftBordered">
            <small>Best selling product</small>
            <p>iPhone 12 Pro Max</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
