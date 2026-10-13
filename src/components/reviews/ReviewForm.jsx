import PropTypes from 'prop-types'
import StarRating from './StarRating'

export default function ReviewForm({ values, errors, onFieldChange, onSubmit }) {
  return (
    <form className="review-form" onSubmit={onSubmit}>
      <label>
        სახელი
        <input
          value={values.name}
          onChange={(event) => onFieldChange('name', event.target.value)}
          placeholder="თქვენი სახელი"
        />
        {errors.name && <small>{errors.name}</small>}
      </label>

      <label>
        კომენტარი
        <textarea
          value={values.comment}
          onChange={(event) => onFieldChange('comment', event.target.value)}
          placeholder="დაწერე შეფასება..."
        />
        {errors.comment && <small>{errors.comment}</small>}
      </label>

      <div>
        <span className="review-form__label">რეიტინგი</span>
        <StarRating
          value={values.rating}
          onChange={(rating) => onFieldChange('rating', rating)}
        />
        {errors.rating && <small>{errors.rating}</small>}
      </div>

      <button type="submit">შეფასების დამატება</button>
    </form>
  )
}

ReviewForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
