import React, { useState } from 'react';
import './App.css'
import { ArticleList, Footer, Formulario } from './components'; // Asegúrate de importar el componente Footer
import data from './data/data';

function App() {
  const allCategories = [
    'All',
    ...new Set(data.map(article => article.category)),
  ];

  const [categories, setCategories] = useState(allCategories);
  const [articles, setArticles] = useState(data);

  const filterCategory = (category) => {
    if (category === 'All') {
      setArticles(data);
      return;
    }

    const filteredData = data.filter(article => article.category === category);
    setArticles(filteredData);
  }

  return (
    <>
      <div className='title'>
        <h1>
          Blog <span>Personal</span> 
        </h1>
      </div>


      <ArticleList articles={articles} />

      <div className="footer-container">
        <Footer /> {/* Aquí agregamos el Footer */}
      </div>
      
    </>
  );
}

export default App;
