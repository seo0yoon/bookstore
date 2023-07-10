import React, { useEffect, useState } from "react";
import { getBooks } from "../../../src/firebase/firestore";

import MainText from "../../components/main/mainText/MainText";
import CoverGif from "../../components/main/coverGif/CoverGif";
import MainBestSellers from "../../components/main/mainBestSellers/MainBestSellers";
import NewProduct from "../../components/main/newProduct/NewProduct";
import MainBanner from "../../components/main/mainBanner/MainBanner";

import "./Main.scss";
import MainOffers from "../../components/main/mainOffers/MainOffers";

const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <main className="mainSection">
        <div className="mainContainer">
          <div className="box">
            <MainText />
          </div>
          <div className="box">
            <CoverGif />
          </div>
        </div>
      </main>
      <MainBestSellers books={books} />
      <MainOffers />
      <NewProduct books={books} />
      <MainBanner />
    </>
  );
};

export default Main;
