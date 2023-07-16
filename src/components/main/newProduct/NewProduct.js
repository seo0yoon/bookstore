import React from "react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import "./NewProduct.scss";

SwiperCore.use([Pagination, Navigation]);

const NewProduct = ({ newBooks }) => {
  return (
    <section className="newProduct">
      <header className="newProductTitle">
        <h2>화제의 신상</h2>
      </header>

      <div className="swiperBox">
        <Swiper
          className="swiper desktop"
          spaceBetween={10}
          slidesPerView={5}
          centeredSlides={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {newBooks?.map((book) => (
            <SwiperSlide className="swiper-slide" key={book.id}>
              <div className="swiperSlideBox">
                <img
                  className="swiperSlideImg"
                  src={book.imageURL}
                  alt="book"
                />

                <div className="swiperSlideTitle">
                  <h4>{book.title}</h4>
                </div>
                <div className="swiperSlideAuthor">
                  <p>{book.author}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next">
          <AiOutlineDoubleRight />
        </div>
        <div className="swiper-button-prev">
          <AiOutlineDoubleLeft />
        </div>

        <Swiper
          className="swiper mobile"
          spaceBetween={10}
          slidesPerView={"auto"}
        >
          {newBooks?.map((book) => (
            <div className="swiperSlideBox" key={book.id}>
              <img className="swiperSlideImg" src={book.imageURL} alt="book" />
            </div>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewProduct;
