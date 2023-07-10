import React from "react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import "./NewProduct.scss";

SwiperCore.use([Pagination, Navigation]);

const NewProduct = ({ books }) => {
  console.log(books);

  return (
    <div className="newProduct">
      <div className="newProductTitle">
        <h2>화제의 신상</h2>
      </div>

      <div className="swiperBox">
        <Swiper
          className="swiper desktop"
          spaceBetween={10}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          autoplay={{ delay: 2000 }}
        >
          {books?.map((book) => (
            <SwiperSlide className="swiper-slide" key={book.id}>
              <div className="swiperSlideBox">
                <img
                  className="swiperSlideImg"
                  src={book.imageURL}
                  alt="book"
                />

                <div className="swiperSlideTitle">
                  <h3>{book.title}</h3>
                </div>
                <div className="swiperSlideAuthor">
                  <h4>{book.author}</h4>
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
          {books?.map((book) => (
            <div className="swiperSlideBox">
              <img className="swiperSlideImg" src={book.imageURL} alt="book" />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProduct;
