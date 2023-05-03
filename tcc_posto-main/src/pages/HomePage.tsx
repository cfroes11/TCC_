import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
    <NavBar/>
      <div className='container'>
          <h1 className="primary-color">Encontra-Posto</h1>
          <p className="secondary-color">O melhor site para busca de postos de combustíveis mais próximo de você!</p>
      </div>
    <Footer/>
    </>
  );
}

export default HomePage;