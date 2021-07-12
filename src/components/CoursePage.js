'use es6'

import {API_BASE_URL} from "../constants/Endpoints";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import CourseTable from './CourseTable';
import MobileCourseTable from './MobileCourseTable';
import DropdownButton from 'react-bootstrap/DropdownButton'
import CoursePageHeader from './CoursePageHeader';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import { getCourseLoading } from "../selectors/courseDataSelectors";
import Footer from './footer';
import Grid from '@material-ui/core/Grid';
import { useMediaPredicate } from "react-media-hook";

const CoursePage = ({courseId}) => {
    const [courseDataTerm, setCourseDataTerm] = useState([]);
    const [shouldComponentRender, setShouldComponentRender] = useState(false)
    const [listState, updateList] = useState(false);
    const renderCount = useRef(0);
    const isViewable = useRef([]);
    const isChecked = useRef([]);
    const allToggle = useRef(true);
    const history = useHistory();
    const biggerThan992 = useMediaPredicate("(min-width: 992px)");
    const smallerThan991 = useMediaPredicate("(max-width: 991px)")

    let switchCheckedState = function(state) {
        isChecked.current.forEach((element, index) => isChecked.current[index] = state);
        updateList(!listState);
    }

    useEffect(() => {
        fetch(`${API_BASE_URL}/course?courseID=${courseId}`)
            .then(res => {
                setShouldComponentRender(true)
                return res.json()
            })
            .then(data => {
                setCourseDataTerm(data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [courseId]);
    
    if (!shouldComponentRender || courseDataTerm.raw == null) {

        return (
            <div className="loadDiv">
            <Spinner style={{display: 'inline-block'}} animation="grow" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Spinner style={{display: 'inline-block'}} animation="grow" role="status" variant="warning">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Spinner style={{display: 'inline-block'}} animation="grow" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </div>
            
        )
    } else {
        if(renderCount.current < 2) {
            renderCount.current++;
            if(isChecked.current.length > 0) {
                isViewable.current = new Array(isChecked.current.length);
                isViewable.current.forEach((element, index) => isViewable.current[index] = true);
            }
            updateList(!listState);
        }

        if(renderCount.current > 0) {
            allToggle.current = isChecked.current.every((element) => element == true);
        }

        return (
            <>
            <Container>
                    <CoursePageHeader
                        courseDataTerm={courseDataTerm.header}
                        filterData={courseDataTerm.raw}
                        isChecked={isChecked.current}
                        filter={listState}
                    />
                    <Row>
                        <DropdownButton id="profList" title="Professors" style={{marginTop: "10px", marginLeft: "1em", borderRadius: '4px'}}>
                            <div key="allCourseDiv">
                                <input type='checkbox' checked={allToggle.current} key="allCourse" style={{marginLeft: "15px"}} onChange={(event) => switchCheckedState(event.target.checked)}/>
                                <span>  (ALL)</span>
                            </div>

                            {
                                courseDataTerm.raw.map((section, index) => (
                                    <div key={isChecked.current.push(true)}>
                                        <input type='checkbox' defaultChecked={isChecked.current[index]} key={section.instructor_name} style={{marginLeft: "15px"}} onChange={(event) => 
                                            {
                                                isChecked.current.splice(courseDataTerm.raw.length, (isChecked.current.length-courseDataTerm.raw.length));
                                                isChecked.current[index] = !isChecked.current[index];
                                                updateList(!listState);
                                            }}/><span>  {section.instructor_name}</span>
                                    </div>
                                ))
                            }
                        </DropdownButton>
                        {/* <div style={{marginLeft: 'auto', marginRight: '4em'}}>
                            <Button variant='primary' style={{marginTop: "15px", marginLeft: "1em", backgroundColor: 'navy'}} onClick={() => history.push('/')}>Home</Button>
                        </div> */}
                    </Row>
                    <Row style={{marginBottom: "2em"}}>
                        {biggerThan992 &&
                            <CourseTable
                                courseDataTerm={courseDataTerm.raw}
                                courseId={courseId}
                                isChecked={isChecked.current}
                            />
                        }
                        {smallerThan991 &&
                            <MobileCourseTable
                                courseDataTerm={courseDataTerm.raw}
                                courseId={courseId}
                                isChecked={isChecked.current}
                            />
                        }
                    </Row>
                    <Row><Footer /></Row>
            </Container>
            </>
        )
    }
}

export default CoursePage;