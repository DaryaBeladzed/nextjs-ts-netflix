import { getProducts } from '@stripe/firestore-stripe-payments'
import { categories } from '../../constants/movie'
import payments from '../stripe'

export const getPlans = () => {
  return getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  }).catch((error) => Promise.reject(error))
}

export const getCategories = () => {
  return Promise.all(
    Object.values(categories).map((category) =>
      fetch(category.path)
        .then((res) => res.json())
        .then((data) => ({
          title: category.title,
          movies: data.results,
        }))
    )
  )
}
