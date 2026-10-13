import PropTypes from 'prop-types'

export default function CouponForm({ coupon, onCouponChange, onApply, inputRef, message }) {
  return (
    <div className="coupon-card">
      <div>
        <h2>კუპონი</h2>
        <p>სატესტო კოდი: <strong>SALE10</strong></p>
      </div>
      <div className="coupon-row">
        <input
          ref={inputRef}
          value={coupon}
          onChange={(event) => onCouponChange(event.target.value)}
          placeholder="შეიყვანე კუპონის კოდი"
        />
        <button type="button" onClick={onApply}>გამოყენება</button>
      </div>
      {message && <p className="status-message">{message}</p>}
    </div>
  )
}

CouponForm.propTypes = {
  coupon: PropTypes.string.isRequired,
  onCouponChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  message: PropTypes.string.isRequired,
}
