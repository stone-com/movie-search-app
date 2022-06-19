import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';

function App() {
  return (
    <>
      <Header />
      <div className='app'></div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
