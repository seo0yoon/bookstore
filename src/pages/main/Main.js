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
  const [bestseller, setBestseller] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    const fetchBestsellerBooks = async () => {
      const fetchedBestseller = await getBooks("bestseller"); // ensure "bestSeller" is correct type
      setBestseller(fetchedBestseller);
    };

    fetchBestsellerBooks();
  }, []);

  useEffect(() => {
    const fetchNewBooks = async () => {
      const fetchedNewBooks = await getBooks("new");
      setNewBooks(fetchedNewBooks);
    };

    fetchNewBooks();
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
