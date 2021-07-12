import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux'
import configureStore from './store'
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

(function() {
    // Change these if you use something different in your hook.
    var storageKey = 'darkMode';
    var classNameDark = 'dark-mode';
    var classNameLight = 'light-mode';
  
    function setClassOnDocumentBody(darkMode) {
      document.body.classList.add(darkMode ? classNameDark : classNameLight);
      document.body.classList.remove(darkMode ? classNameLight : classNameDark);
    }
    
    var preferLightQuery = '(prefers-color-scheme: light)';
    var mql = window.matchMedia(preferLightQuery);
    var supportsColorSchemeQuery = mql.media === preferLightQuery;
    var localStorageTheme = null;
    try {
      localStorageTheme = localStorage.getItem(storageKey);
    } catch (err) {}
    var localStorageExists = localStorageTheme !== null;
    if (localStorageExists) {
      localStorageTheme = JSON.parse(localStorageTheme);
    }
  
    // Determine the source of truth
    if (localStorageExists) {
      // source of truth from localStorage
      setClassOnDocumentBody(localStorageTheme);
    } else if (supportsColorSchemeQuery) {
      // source of truth from system
      setClassOnDocumentBody(mql.matches);
      localStorage.setItem(storageKey, mql.matches);
    } else {
      // source of truth from document.body
      var isDarkMode = document.body.classList.contains(classNameDark);
      localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
    }
  })();
  
ReactDOM.render(
    <Provider store={configureStore()}>
     <AppRouter />
    </Provider>,
    document.getElementById('root')
   );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
