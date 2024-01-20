import { Book } from "../types/book";

async function searchBooks(searchTerm: string, startIndex: number, maxResults: number): Promise<Book[]> {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.items) {
        const books: Book[] = data.items.map((item: any) => ({
          id: item.id,
          volumeInfo: {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            imageLinks: {
              thumbnail: item.volumeInfo.imageLinks?.thumbnail,
            },
          },
        }));
  
        return books;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
  export default searchBooks;