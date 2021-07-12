import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

let container;
const app = (
  <Router>
      <Header />
  </Router>
 )

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

// it('renders without crashing', () => {
//   ReactDOM.render(app, container);
// });

// it("search button doesn't error", () => {
//   act(() => {
//     ReactDOM.render(app, container);
//   })
//   const search = document.getElementById('searchbar')
//   const button = container.querySelector('Button');
//   search.value = 'CS 1331'
//   console.log(search.value);
//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//   })
//   // expect(document.body.textContent).toBe('CS 1331');
// })

// it('elastic search updates state correctly', () => {
//   act(() => {
//     ReactDOM.render(app, container);
//   })
//   const search = document.getElementById('searchbar')
//   act(() => {
//     search.value = 'CS 1331'
//   })
//   console.log(search.value)
//   let links = document.getElementsByTagName("a");
//   console.log(links)
//   let expected = links[0]
//   console.log(expected)
//   console.log('test')
//   // expect(document.body.textContent).toBe('...')
// })