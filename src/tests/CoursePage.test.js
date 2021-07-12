import React from 'react';
import ReactDOM from 'react-dom';
import CoursePage from '../components/CoursePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';

let container;
jest.useFakeTimers()

// setup
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

/*TODO: test various courses with verifying with predetermined data
        mock data so frontend/component testing not impacted by incorrect backend (test backend api separately)
*/
//helper to test different courses efficiently
const renderCourse = courseID => {
  const app = (
    <Router>
        <CoursePage courseId={courseID} />
    </Router>
  )
  act(() => {
    ReactDOM.render(app, container)
  })
}
  // fetch.mockResponseOnce(JSON.stringify({
  //     header: [
  //       {
  //         full_name: "CS 1332",
  //         description: "Data Structures",
  //         credits: 3,
  //         avg_gpa: 2.95,
  //         avg_a: 36.2,
  //         avg_b: 29.7,
  //         avg_c: 16.3,
  //         avg_d: 5.7,
  //         avg_f: 4.1,
  //         avg_w: 8
  //       }
  //     ],
  //     raw: [
  //       {
  //         instructor_gt_username: "mhb6",
  //         instructor_name: "Hudachek-Buswell, Mary",
  //         class_size_group: "Large (31-49 students)",
  //         GPA: 2.97,
  //         A: 36.3,
  //         B: 30.2,
  //         C: 17.1,
  //         D: 5.5,
  //         F: 3.3,
  //         W: 7.6
  //       },
  //       {
  //         instructor_gt_username: "jkim844",
  //         instructor_name: "Kim, Joonho J",
  //         class_size_group: "Large (31-49 students)",
  //         GPA: 3.05,
  //         A: 39.1,
  //         B: 34.1,
  //         C: 10.4,
  //         D: 7.4,
  //         F: 3,
  //         W: 6
  //         },
  //       ]  
  //     })
  //   )
  // }

//Test 1: basic rendering
it('renders without crashing', () => {
  renderCourse("Math 1554")
});

//Test 2
it('test title', () => {
  renderCourse("Math 1554")
  let title = document.getElementsByTagName('a')
  console.log(title)
  console.log(title.item(0))
  console.log(container.textContent)
  // make sure header data is not all null
});

//Test 3
it('valid header data', () => {
  renderCourse("CS 1332")
  // make sure header data is not all null
});