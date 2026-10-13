import { useCallback, useState } from 'react'
import ProductCatalog from './components/catalog/ProductCatalog'

export default function App() {
  const [lastAdded, setLastAdded] = useState('')

  const handleAddToCart = useCallback((product) => {
    setLastAdded(`${product.name} დაემატა კალათაში.`)
  }, [])

  return (
    <div className="integrated-page">
      <header className="integrated-hero">
        <h1>პროდუქტების კატალოგი და ფილტრაცია</h1>
      </header>

      <div className="integrated-container">
        {lastAdded && <div className="catalog-empty">{lastAdded}</div>}
        <ProductCatalog onAddToCart={handleAddToCart} />
      </div>
    </div>
  )
}
