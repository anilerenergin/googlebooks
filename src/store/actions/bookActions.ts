import {Book} from '../../types/book';

export const SET_BOOKS = 'SET_BOOKS';

export const setBooks = (books: Book[]) => ({
  type: SET_BOOKS,
  payload: books,
});