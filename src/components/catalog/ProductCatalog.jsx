import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ModuleSection from '../common/ModuleSection'
import ProductGrid from './ProductGrid'
import useDebounce from '../../hooks/useDebounce'
import { IntegrationContext } from '../../context/IntegrationContext'
import { demoProducts } from '../../data/products'

export default function ProductCatalog({ onAddToCart }) {
  const integration = useContext(IntegrationContext)
  const currency = integration?.currency ?? 'GEL'
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const searchInputRef = useRef(null)
  const debouncedSearch = useDebounce(searchText, 250)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(demoProducts)
      setLoading(false)
    }, 450)

    searchInputRef.current?.focus()

    return () => clearTimeout(timer)
  }, [])

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((product) => product.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    const search = debouncedSearch.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesSearch = product.name.toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })
  }, [products, category, debouncedSearch])

  const clearFilters = useCallback(() => {
    setSearchText('')
    setCategory('All')
    searchInputRef.current?.focus()
  }, [])

  const handleAddToCart = useCallback(
    (product) => onAddToCart(product),
    [onAddToCart]
  )

  return (
    <ModuleSection
      title="პროდუქტების კატალოგი და ფილტრაცია"
    >
      <div className="catalog-toolbar">
        <input
          ref={searchInputRef}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="პროდუქტის ძებნა..."
        />

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="button" onClick={clearFilters}>
          ფილტრების გასუფთავება
        </button>
      </div>

      {loading ? (
        <div className="catalog-empty">იტვირთება...</div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          currency={currency}
          onAddToCart={handleAddToCart}
        />
      )}
    </ModuleSection>
  )
}

ProductCatalog.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
}
