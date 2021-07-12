import {
  COURSE_DATA_REQUESTED,
  COURSE_DATA_RECIEVED,
  COURSE_DATA_FAILED
} from '../constants/ActionTypes'

export function fetchCourseDataRequested() {
  return {
      type: COURSE_DATA_REQUESTED
  }
}

export function fetchCourseDataRecieved(data) {
  return {
      type: COURSE_DATA_RECIEVED,
      data: data
  }
}

export function fetchCourseDataFailed(error) {
  return {
      type: COURSE_DATA_FAILED,
      error: error
  }
}