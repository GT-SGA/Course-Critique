import {
  COURSE_DATA_REQUESTED,
  COURSE_DATA_RECIEVED,
  COURSE_DATA_FAILED
} from '../constants/ActionTypes'

const initialState = {
  isLoading: false,
  error: null,
  data: []
};

function getCourseDataReducer(state = initialState, action) {
  switch (action.type) {
      case COURSE_DATA_REQUESTED:
          return {
              isLoading: true,
              error: null,
              data: null
          };
      case COURSE_DATA_RECIEVED:
          return {
              isLoading: false,
              data: action.data,
              error: null
          };
      case COURSE_DATA_FAILED:
          return {
              isLoading: false,
              error: action.error
          };
      default:
          return state;

  }
}

export default getCourseDataReducer