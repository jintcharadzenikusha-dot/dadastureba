import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductCard({ product, currency, onAddToCart }) {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price

  return (
    <article className="catalog-card">
      <div className="catalog-card__art">{product.emoji}</div>

      <div className="catalog-card__meta">
        <span>{product.category}</span>
        {product.discount > 0 && (
          <strong className="catalog-card__discount">-{product.discount}%</strong>
        )}
      </div>

      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div className="catalog-card__footer">
        <div>
          {product.discount > 0 && (
            <del>{formatCurrency(product.price, currency)}</del>
          )}
          <strong>{formatCurrency(finalPrice, currency)}</strong>
        </div>

        <button
          type="button"
          onClick={() =>
            onAddToCart({
              id: product.id,
              name: product.name,
              price: Number(finalPrice.toFixed(2)),
            })
          }
        >
          კალათაში
        </button>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}
