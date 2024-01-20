import axios from "axios";

export const searchBooks = async (
  searchTerm: string,
  startIndex: number,
  maxResults: number
): Promise<SearchBookType> =>  {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&sortBy=relevance`
    );

    const data = response.data;
    console.log(response.status);
    if (response.status==200) {
      return data;
    } else {
      console.warn("No books found.");
      throw new Error("No books found.");
      
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Error fetching books");
  }
};
