import PropTypes from 'prop-types'

export default function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="review-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={star <= value ? 'is-active' : ''}
          onClick={() => !readOnly && onChange(star)}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
}

StarRating.defaultProps = {
  onChange: () => {},
  readOnly: false,
}
