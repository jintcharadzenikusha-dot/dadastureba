import PropTypes from 'prop-types'

export default function CartWrapper({ title, children }) {
  return (
    <section className="cart-wrapper">
      <div className="cart-header">
        <div>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="cart-content">
        {children}
      </div>
    </section>
  )
}

CartWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
