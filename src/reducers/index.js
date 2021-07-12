import {combineReducers} from 'redux'

import getProfessorDataTermReducer from './professorDataTerm'
import getProfessorDataSectionReducer from './professorDataSection'
import getCourseDataReducer from './courseData'

const rootReducer = combineReducers({
    professorDataTerm: getProfessorDataTermReducer,
    professorDataSection: getProfessorDataSectionReducer,
    courseData: getCourseDataReducer,

})

export default rootReducer