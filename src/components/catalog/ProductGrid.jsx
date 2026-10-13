import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, currency, onAddToCart }) {
  if (products.length === 0) {
    return <div className="catalog-empty">პროდუქტი ვერ მოიძებნა.</div>
  }

  return (
    <div className="catalog-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currency={currency}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}
