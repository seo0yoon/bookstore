import React, { useEffect, useState } from "react";
import {
  getBestsellerBooks,
  getNewBooks,
} from "../../../src/firebase/firestore";

import MainText from "../../components/main/mainText/MainText";
import CoverGif from "../../components/main/coverGif/CoverGif";
import MainBestSellers from "../../components/main/mainBestSellers/MainBestSellers";
import NewProduct from "../../components/main/newProduct/NewProduct";
import MainBanner from "../../components/main/mainBanner/MainBanner";

import "./Main.scss";
import MainOffers from "../../components/main/mainOffers/MainOffers";

const Main = () => {
  const [bestseller, setBestseller] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBestseller = await getBestsellerBooks();
      setBestseller(fetchedBestseller);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedNewBooks = await getNewBooks();
      setNewBooks(fetchedNewBooks);
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
      <MainBestSellers bestseller={bestseller} />
      <MainOffers />
      <NewProduct newBooks={newBooks} />
      <MainBanner />
    </>
  );
};

export default Main;
