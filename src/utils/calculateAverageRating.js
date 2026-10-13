export function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0

  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
}
