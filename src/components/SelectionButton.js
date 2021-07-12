'use es6'

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateDropdownItems } from '../utils/buttonUtils'
import {
    updateProfessorDataSection
} from '../actions/ProfessorDataSectionActions';

import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

const SelectionButton = ({ data, filter, onClickCourse }) => {
    const handleclick = course => {
        const updatedData = data.filter((dataPoint) => 
            dataPoint.Course === course
        )
        onClickCourse(updatedData)
    }
    const dropdownItems = calculateDropdownItems(data, filter)
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Form className="pl-3">
                    <Form.Group >
                        {dropdownItems.map(item => (
                            <Form.Check key={item} type="checkbox" label={item} onClick={() => handleclick(item)} />))}
                    </Form.Group>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    )
}


SelectionButton.propTypes = {
    data: PropTypes.array,
    filter: PropTypes.string.isRequired,
    onClickCourse: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onClickCourse: data => dispatch(updateProfessorDataSection(data )),

    }
}

export default connect(null, mapDispatchToProps)(SelectionButton); 