import * as paths from '../utils/requests'

export const categories = {
  trending: {
    title: 'Trending Now',
    path: paths.TRENDING_PATH,
  },
  netflixOriginals: {
    title: '',
    path: paths.NETFLIX_ORIGINALS_PATH,
  },
  topRated: {
    title: 'Top Rated',
    path: paths.TOP_RATED_PATH,
  },
  actionMovies: {
    title: 'Action Thrillers',
    path: paths.ACTION_MOVIES_PATH,
  },
  comedyMovies: {
    title: 'Comedies',
    path: paths.COMEDY_MOVIES_PATH,
  },
  horrorMovies: {
    title: 'Scary Movies',
    path: paths.HORROR_MOVIES_PATH,
  },
  romanceMovies: {
    title: 'Romance Movies',
    path: paths.ROMANCE_MOVIES_PATH,
  },
  documentaries: {
    title: 'Documentaries',
    path: paths.DOCUMENTARIES_PATH,
  },
}
