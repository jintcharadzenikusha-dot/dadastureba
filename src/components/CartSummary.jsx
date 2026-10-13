import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/formatCurrency'

export default function CartSummary({ subtotal, discount, finalTotal, currency }) {
  return (
    <aside className="summary-card">
      <h2>შეკვეთის შეჯამება</h2>
      <div className="summary-line">
        <span>ქვეჯამი</span>
        <strong>{formatCurrency(subtotal, currency)}</strong>
      </div>

      {discount > 0 && (
        <div className="summary-line discount-line">
          <span>ფასდაკლება</span>
          <strong>-{Math.round(discount * 100)}%</strong>
        </div>
      )}

      <div className="summary-total">
        <span>გადასახდელი</span>
        <strong>{formatCurrency(finalTotal, currency)}</strong>
      </div>

      <button className="checkout-btn" type="button">შეკვეთის გაფორმება</button>
    </aside>
  )
}

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  finalTotal: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
}
