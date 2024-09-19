import React, { useState } from "react";
import { createCategory } from "../services/categoryService";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = { name, image };
      await createCategory(newCategory);
      Swal.fire("Success", "Category created successfully", "success");
      setName("");
      setImage("");
    } catch (error) {
      Swal.fire("Error", "There was an error creating the category", "error");
    }
  };

  return (
    <div className="container">
      {" "}
      <h2>Add New Category</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="mb-3">
          {" "}
          <label htmlFor="name" className="form-label">
            Category Name
          </label>{" "}
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
        </div>{" "}
        <div className="mb-3">
          {" "}
          <label htmlFor="image" className="form-label">
            Image URL
          </label>{" "}
          <input
            type="url"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />{" "}
        </div>{" "}
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default AddCategory;
