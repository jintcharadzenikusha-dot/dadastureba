import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CartWrapper from './components/CartWrapper'
import CartList from './components/CartList'
import CouponForm from './components/CouponForm'
import CartSummary from './components/CartSummary'
import useLocalStorage from './hooks/useLocalStorage'
import { useAppContext } from './context/AppContext'

const initialItems = [
  { id: 1, name: 'Laptop', price: 2500, quantity: 1 },
  { id: 2, name: 'Headphones', price: 250, quantity: 2 },
  { id: 3, name: 'Mouse', price: 80, quantity: 1 },
]

export default function App() {
  const { currency } = useAppContext()

  const [cartItems, setCartItems] = useLocalStorage(
    'shopping-cart',
    initialItems
  )

  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')

  const couponInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(
      'shopping-cart',
      JSON.stringify(cartItems)
    )
  }, [cartItems])

  useEffect(() => {
    couponInputRef.current?.focus()
  }, [])

  const handleRemove = useCallback(
    (id) => {
      setCartItems((items) =>
        items.filter((item) => item.id !== id)
      )
    },
    [setCartItems]
  )

  const handleQuantityChange = useCallback(
    (id, newQuantity) => {
      if (newQuantity < 1) return

      setCartItems((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    },
    [setCartItems]
  )

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )
  }, [cartItems])

  const finalTotal = useMemo(
    () => subtotal - subtotal * discount,
    [subtotal, discount]
  )

  const applyCoupon = useCallback(() => {
    if (coupon.trim().toUpperCase() === 'SALE10') {
      setDiscount(0.1)
      setMessage(
        '10% ფასდაკლება წარმატებით გააქტიურდა.'
      )
    } else {
      setDiscount(0)
      setMessage('კუპონის კოდი არასწორია.')
      couponInputRef.current?.focus()
    }
  }, [coupon])

  return (
    <main className="app-shell">
      <CartWrapper title="ინტერაქტიული საყიდლების კალათა">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h2>კალათა ცარიელია</h2>
            <p>
              ყველა პროდუქტი წაშლილია. ეს არის conditional
              rendering-ის მაგალითი.
            </p>
          </div>
        ) : (
          <div className="layout-grid">
            <div>
              <CartList
                items={cartItems}
                currency={currency}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />

              <CouponForm
                coupon={coupon}
                onCouponChange={setCoupon}
                onApply={applyCoupon}
                inputRef={couponInputRef}
                message={message}
              />
            </div>

            <CartSummary
              subtotal={subtotal}
              discount={discount}
              finalTotal={finalTotal}
              currency={currency}
            />
          </div>
        )}
      </CartWrapper>
    </main>
  )
}