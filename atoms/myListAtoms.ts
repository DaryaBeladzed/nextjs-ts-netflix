import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'

export const myListState = atom<DocumentData[]>({
  key: 'myList',
  default: [],
})
