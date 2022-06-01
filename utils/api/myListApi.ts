import axios from 'axios'
import { User } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { SetterOrUpdater } from 'recoil'
import { Movie } from '../../typing'
import { db } from '../firebase'
import { API_KEY, BASE_URL } from '../requests'

export const addToMyList = (user: User, movie: Movie | DocumentData) => {
  return setDoc(
    doc(db, 'customers', user.uid, 'myList', movie!.id.toString()),
    {
      ...movie,
    }
  ).catch((error) => Promise.reject(error))
}

export const removeFromMyList = (user: User, movieId: Number) => {
  return deleteDoc(
    doc(db, 'customers', user!.uid, 'myList', movieId.toString())
  ).catch((error) => Promise.reject(error))
}

export const getModalMovie = (movie: Movie | DocumentData) => {
  return axios
    .get(
      `${BASE_URL}/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${
        movie.id
      }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    )
    .then((res) => res.data)
    .catch((error) => Promise.reject(error))
}

export const myListListener = (
  userId: string,
  setMyList: SetterOrUpdater<DocumentData[]>
) => {
  return onSnapshot(
    collection(db, 'customers', userId, 'myList'),
    (snapshot) =>
      setMyList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
    (error) => console.log(error)
  )
}
