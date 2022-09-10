import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCarts, reset } from '../features/cart/cartSlice'
import Spinner from '../components/Spinner'
import CartInfoItem from '../components/CartInfoItem'

function History() {
  const { carts, isLoading, isSuccess } = useSelector((state) => state.cart)

  const [totalHistory, setTotalHistory] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalLoss, setTotalLoss] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getCarts())
  }, [dispatch])

  useEffect(() => {
    let sum = 0
    let profit = 0
    let loss = 0
    let extra = 20
    carts.forEach((cart) => {
      sum +=
        cart.discountType === '%'
          ? cart.price - (cart.price / 100) * cart.discount
          : cart.price - cart.discount
      profit +=
        cart.discountType === '%'
          ? cart.price -
            (cart.price / 100) * cart.discount -
            (cart.price - (cart.price / 100) * extra)
          : cart.price -
            cart.discount -
            (cart.price - (cart.price / 100) * extra)
      loss += profit <= 0 ? cart.price - (cart.price / 100) * extra - sum : 0
    })
    setSellingPrice(sum)
    setTotalProfit(profit)
    setTotalLoss(loss)
    setTotalHistory(carts.length)
  }, [carts])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div style={{ padding: '0px 20px' }}>
      <h1>Tarix</h1>
      <div className="flexbox banner flex-ones">
        <div className="leftBordered">
          <small>Umumiy Xaridlar</small>
          <p>{totalHistory}</p>
        </div>
        <div className="leftBordered">
          <small>Umumiy Pul aylanmasi</small>
          <p>{sellingPrice.toLocaleString('uz-UZ')} UZS</p>
        </div>
        <div className="leftBordered">
          <small>Umumiy Foyda</small>
          <p>{totalProfit.toLocaleString('uz-UZ')} UZS</p>
        </div>
        <div className="leftBordered">
          <small>Umumiy Zarar</small>
          <p>{totalLoss.toLocaleString('uz-UZ')} UZS</p>
        </div>
      </div>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Tovar</div>
          <div>Sotildi</div>
          <div>Foyda</div>
          <div>Zarar</div>
          <div>Sana</div>
        </div>
        {carts.length !== 0 ? (
          carts.map((cart) => <CartInfoItem key={cart._id} cart={cart} />)
        ) : (
          <h3 style={{ textAlign: 'center' }}>Sotilgan tovarlar yo'q</h3>
        )}
      </div>
    </div>
  )
}

export default History
