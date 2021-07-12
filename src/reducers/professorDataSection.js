import {
    PROFESSOR_DATA_SECTION_REQUESTED,
    PROFESSOR_DATA_SECTION_RECIEVED,
    PROFESSOR_DATA_SECTION_FAILED,
    PROFESSOR_DATA_SECTION_UPDATED
} from '../constants/ActionTypes'

const initialState = {
    isLoading: false,
    error: null,
    data: []
  };

function getProfessorDataSectionReducer(state = initialState, action) {
    switch (action.type) {
        case PROFESSOR_DATA_SECTION_REQUESTED:
            return {
                isLoading: true,
                error: null,
                data: null
            };
        case PROFESSOR_DATA_SECTION_RECIEVED:
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        case PROFESSOR_DATA_SECTION_FAILED:
            return {
                isLoading: false,
                error: action.error
            };
        case PROFESSOR_DATA_SECTION_UPDATED:
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        default:
            return state;

    }
}

export default getProfessorDataSectionReducer