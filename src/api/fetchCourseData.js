import {
  fetchCourseDataRequested,
  fetchCourseDataRecieved,
  fetchCourseDataFailed
} from '../actions/CourseDataActions';

import {API_BASE_URL} from "../constants/Endpoints";
function fetchCourseData(courseID) {
  return dispatch => {
      dispatch(fetchCourseDataRequested());
      // to do generalize to any professor
      // to do -- cannot let this rely on local host
      fetch(`${API_BASE_URL}?courseID=${courseID}`)
          .then(res => res.json())
          .then(res => {
              if (res.error) {
                  throw (res.error);
              }
              dispatch(fetchCourseDataRecieved(res))
              return res;
          })
          .catch(error => {
              dispatch(fetchCourseDataFailed(error));
          })
  }
}

export default fetchCourseData