import db from "../../src/firebase/firestore";

export const getBooks = async () => {
  try {
    const booksRef = db.collection("books");
    const snapshot = await booksRef.get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    let books = [];
    snapshot.forEach((doc) => {
      let bookData = doc.data();
      books.push({
        id: doc.id,
        ...bookData,
      });
    });

    return books;
  } catch (err) {
    console.log("Error getting books", err);
  }
};
