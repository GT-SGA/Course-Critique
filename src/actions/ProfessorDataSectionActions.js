import {
    PROFESSOR_DATA_SECTION_REQUESTED,
    PROFESSOR_DATA_SECTION_RECIEVED,
    PROFESSOR_DATA_SECTION_FAILED,
    PROFESSOR_DATA_SECTION_UPDATED,
} from '../constants/ActionTypes'

export function fetchProfessorDataSectionRequested() {
    return {
        type: PROFESSOR_DATA_SECTION_REQUESTED
    }
}

export function fetchProfessorDataSectionRecieved(data) {
    return {
        type: PROFESSOR_DATA_SECTION_RECIEVED,
        data: data
    }
}

export function fetchProfessorDataSectionFailed(error) {
    return {
        type: PROFESSOR_DATA_SECTION_FAILED,
        error: error
    }
}

export const updateProfessorDataSection = data => {
    return {
        type: PROFESSOR_DATA_SECTION_UPDATED,
        data
    }
}