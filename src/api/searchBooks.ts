import axios from "axios";

export const searchBooks = async (
  searchTerm: string,
  startIndex: number,
  maxResults: number
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`
    );

    const data = response.data;
    console.log(response.status);
    if (data.items) {
      return data.items;
    } else {
      console.warn("No books found.");
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};
