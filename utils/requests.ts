const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const TRENDING_PATH = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
export const NETFLIX_ORIGINALS_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`
export const TOP_RATED_PATH = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
export const ACTION_MOVIES_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
export const COMEDY_MOVIES_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
export const HORROR_MOVIES_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
export const ROMANCE_MOVIES_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`
export const DOCUMENTARIES_PATH = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
