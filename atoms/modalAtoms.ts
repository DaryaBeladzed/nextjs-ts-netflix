import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Genre, Movie } from '../typing'

export const modalModeState = atom({
  key: 'modalMode',
  default: false,
})

export const modalMovieState = atom<Movie | null | DocumentData>({
  key: 'modalMovie',
  default: null,
})

export const modalGenresState = atom<Genre[]>({
  key: 'modalGenres',
  default: [],
})
