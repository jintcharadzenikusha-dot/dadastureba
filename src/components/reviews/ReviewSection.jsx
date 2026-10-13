import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ModuleSection from '../common/ModuleSection'
import ReviewForm from './ReviewForm'
import StarRating from './StarRating'
import useFormValidation from '../../hooks/useFormValidation'
import { IntegrationContext } from '../../context/IntegrationContext'
import { calculateAverageRating } from '../../utils/calculateAverageRating'

export default function ReviewSection() {
  const integration = useContext(IntegrationContext)

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Ana',
      comment: 'ძალიან კარგი პროდუქტია.',
      rating: 5,
    },
  ])
  const [averageRating, setAverageRating] = useState(5)
  const newestReviewRef = useRef(null)
  const form = useFormValidation()

  useEffect(() => {
    setAverageRating(calculateAverageRating(reviews))
  }, [reviews])

  const averageLabel = useMemo(
    () => `${averageRating.toFixed(1)} / 5`,
    [averageRating]
  )

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (!form.isValid) return

      setReviews((current) => [
        ...current,
        {
          id: Date.now(),
          ...form.values,
        },
      ])

      form.reset()

      setTimeout(() => {
        newestReviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 0)
    },
    [form]
  )

  return (
    <ModuleSection
      title="მომხმარებლის მიმოხილვები და რეიტინგი"
    >
      <div
        className="review-summary"
        data-platform={integration?.platformName ?? 'React E-Commerce Platform'}
      >
        <div>
          <span>საშუალო რეიტინგი</span>
          <strong>{averageLabel}</strong>
        </div>
        <StarRating value={Math.round(averageRating)} readOnly />
      </div>

      <ReviewForm
        values={form.values}
        errors={form.errors}
        onFieldChange={form.setField}
        onSubmit={handleSubmit}
      />

      <div className="review-list">
        {reviews.map((review, index) => (
          <article
            key={review.id}
            ref={index === reviews.length - 1 ? newestReviewRef : null}
          >
            <div className="review-list__heading">
              <strong>{review.name}</strong>
              <StarRating value={review.rating} readOnly />
            </div>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </ModuleSection>
  )
}
