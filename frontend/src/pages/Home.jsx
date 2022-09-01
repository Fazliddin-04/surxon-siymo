import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt, FaRegCalendarAlt } from 'react-icons/fa'

function Home() {
  const [date, setDate] = useState(
    new Date().toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  )

  const onMutate = (e) => {
    setDate(
      new Date(e.target.value).toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    )
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
            <p>3 680 000 $</p>
          </div>
          <div className="leftBordered">
            <small>Total selling price</small>
            <p>18 680 465 $</p>
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

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>

      <Link to="/new-ticket" className="btn btn-reverse">
        <FaQuestionCircle /> Create New Ticket
      </Link>
    </>
  )
}

export default Home
