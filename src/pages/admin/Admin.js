import React from "react";
import { useForm } from "react-hook-form";
import { addBook } from "../../firebase/firestore";

const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addBook(data);
      alert("Book has been successfully added!");
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  return (
    <div className="Admin">
      <h2>새로운 책 추가</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>제목:</label>
        <input {...register("title", { required: true })} />
        {errors.title && <p>This field is required</p>}

        <label>저자:</label>
        <input {...register("author", { required: true })} />
        {errors.author && <p>This field is required</p>}

        <label>가격:</label>
        <input type="number" {...register("price", { required: true })} />
        {errors.price && <p>This field is required</p>}

        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};

export default Admin;
