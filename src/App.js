import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import AddCategory from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory'; // Importar el nuevo componente
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} /> {/* Ruta para actualizar */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
