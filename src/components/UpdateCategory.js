import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCategory, getCategories } from '../services/categoryService';
import Swal from 'sweetalert2';

const UpdateCategory = () => {
  const { id } = useParams(); // Obtener el ID de la categoría desde la URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories();
        const category = categories.find((cat) => cat.id === parseInt(id));
        if (category) {
          setName(category.name);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category', error);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, { name });
      Swal.fire('Success', 'Category updated successfully', 'success');
      navigate('/'); // Redirigir al listado después de actualizar
    } catch (error) {
      Swal.fire('Error', 'There was an error updating the category', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Category</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
