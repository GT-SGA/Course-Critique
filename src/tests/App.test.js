import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // need router for testing to work
  const app = (
    <Router>
        <App />
    </Router>)
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
