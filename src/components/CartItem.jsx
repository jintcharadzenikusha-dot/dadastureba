import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/formatCurrency'

export default function CartItem({ item, currency, onRemove, onQuantityChange }) {
  const lineTotal = item.price * item.quantity

  return (
    <article className="cart-item">
      <div className="product-mark">{item.name.charAt(0)}</div>

      <div className="product-info">
        <h3>{item.name}</h3>
        <p>{formatCurrency(item.price, currency)} / ცალი</p>
      </div>

      <div className="quantity-controls" aria-label={`${item.name} quantity controls`}>
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      <strong className="line-total">{formatCurrency(lineTotal, currency)}</strong>

      <button className="remove-btn" type="button" onClick={() => onRemove(item.id)}>
        წაშლა
      </button>
    </article>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
}
