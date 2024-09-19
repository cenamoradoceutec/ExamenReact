import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const sortedCategories = data.sort((a, b) => b.id - a.id);
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryClick = (id) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Desea eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id);
          Swal.fire('Deleted!', 'Se elimino Categoria.', 'success');
          setCategories(categories.filter((category) => category.id !== id));
        } catch (error) {
          Swal.fire('Error!', 'Hubo un problema al borrar categoria', 'error');
        }
      }
    });
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Función para manejar el error de imagen
  const handleImageError = (e) => {
    e.target.src = "https://a.d-cd.net/f4e8488s-960.jpg"; // Imagen de respaldo
  };

  return (
    <div className="container">
      <h2>Category List</h2>
      <div className="row">
        {currentCategories.map((category) => (
          <div className="col-md-4" key={category.id} style={{ cursor: 'pointer' }}>
            <div className="card mb-4">
              <img
                onClick={() => handleCategoryClick(category.id)}
                src={category.image}
                className="card-img-top"
                alt={category.name}
                onError={handleImageError} // Reemplazar imagen en caso de error
              />
              <div className="card-body">
                <h5 className="card-title" onClick={() => handleCategoryClick(category.id)}>{category.name}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryList;
