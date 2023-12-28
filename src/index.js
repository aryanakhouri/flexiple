import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './styles.module.css'
import Searchbar from './packages/flexipleWeatherApp/page-components/SearchBar/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <div style={{background: 'white' , textAlign : 'center', minHeight: '20px', opacity: '60%'}}><h1>Type a place whose weather you wish to know</h1></div>
  <div className={styles.whole_page}>
    <Searchbar />
  </div>
  </>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
