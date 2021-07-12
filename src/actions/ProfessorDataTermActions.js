import {
    PROFESSOR_DATA_TERM_REQUESTED,
    PROFESSOR_DATA_TERM_RECIEVED,
    PROFESSOR_DATA_TERM_FAILED
} from '../constants/ActionTypes'

export function fetchProfessorDataTermRequested() {
    return {
        type: PROFESSOR_DATA_TERM_REQUESTED
    }
}

export function fetchProfessorDataTermRecieved(data) {
    return {
        type: PROFESSOR_DATA_TERM_RECIEVED,
        data: data
    }
}

export function fetchProfessorDataTermFailed(error) {
    return {
        type: PROFESSOR_DATA_TERM_FAILED,
        error: error
    }
}