'use es6'

import {API_BASE_URL} from "../constants/Endpoints";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ProfessorTable from './ProfessorTable'

import ProfessorPageHeader from './ProfessorPageHeader';
import MobileProfTable from './MobileProfTable';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { getProfessorLoading } from "../selectors/professorDataSelectors";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../style/pageHeader.css"
import Footer from './footer';
import { useMediaPredicate } from "react-media-hook";

const ProfessorPage = ({ professorId, fromCourse }) => {
    const [professorDataTerm, setProfessorDataTerm] = useState([]);
    const [shouldComponentRender, setShouldComponentRender] = useState(false)
    const [listState, updateList] = useState(false);
    const isChecked = useRef([[], []]);
    const isViewable = useRef([[], []]);
    // Scourses, Sterms, BAllToggles, Irenders
    const permLists = useRef([[], [], [true, true], 0]);
    const [aggregated, updateAgButton] = useState(false);
    const history = useHistory();
    const biggerThan992 = useMediaPredicate("(min-width: 992px)");
    const smallerThan991 = useMediaPredicate("(max-width: 991px)")

    let nullIndices = function (course, term) {
        if (course != null) {
            professorDataTerm.raw.forEach((element, index) => {
                if (course === element.course_id) {
                    isViewable.current[0][index] = false;
                }
            });
        } else if (term != null) {
            professorDataTerm.raw.forEach((element, index) => {
                if (term === element.Term) {
                    isViewable.current[1][index] = false;
                }
            });
        }
    }

    let restoreIndices = function (course, term) {
        if (course != null) {
            professorDataTerm.raw.forEach((element, index) => {
                if (!isViewable.current[0][index] && professorDataTerm.raw[index].course_id === course) {
                    isViewable.current[0][index] = true;
                }
            });
        } else if (term != null) {
            professorDataTerm.raw.forEach((element, index) => {
                if (!isViewable.current[1][index] && professorDataTerm.raw[index].Term === term) {
                    isViewable.current[1][index] = true;
                }
            })
        }
    }

    let switchCheckedState = function (menu, state) {
        isChecked.current[menu].forEach((element, index) => {
            isChecked.current[menu][index] = state;
        });
        if (isChecked.current[menu].every((element) => element == true) && menu == 0)
            permLists.current[0].forEach((element) => restoreIndices(element, null));
        else if (isChecked.current[menu].every((element) => element == true) && menu == 1)
            permLists.current[1].forEach((element) => restoreIndices(null, element));
        else if (menu == 0)
            permLists.current[0].forEach((element) => nullIndices(element, null));
        else if (menu == 1)
            permLists.current[1].forEach((element) => nullIndices(null, element));
        updateList(!listState);
    }

    let spliceArrays = function () {
        isChecked.current[0].splice(permLists.current[0].length, (isChecked.current[0].length - permLists.current[0].length));
        isChecked.current[1].splice(permLists.current[1].length, (isChecked.current[1].length - permLists.current[1].length));
    }

    let aggregate = function () {
        updateAgButton(!aggregated);
        spliceArrays();
    }

    useEffect(() => {
        fetch(`${API_BASE_URL}/prof?profID=${professorId}&by=section`)
            .then(res => {
                setShouldComponentRender(true)
                return res.json()
            })
            .then(data => {
                permLists.current[0] = [...new Set(data.raw.map((element) => { return element["course_id"] }))];
                permLists.current[1] = [...new Set(data.raw.map((element) => { return element["Term"] }))].sort((term1, term2) => {
                    let term1S = term1.split(" ");
                    let term2S = term2.split(" ");
                    let seasons = {
                        "Spring": 1,
                        "Summer": 2,
                        "Fall": 3
                    };
                    if (term1S[1] > term2S[1])
                        return -1;
                    else if (term1S[1] < term2S[1])
                        return 1;
                    else if (term1S[1] === term2S[1] && seasons[term1S[0]] > seasons[term2S[0]])
                        return -1;
                    else if (term1S[1] === term2S[1] && seasons[term1S[0]] < seasons[term2S[0]])
                        return 1;
                });
                setProfessorDataTerm(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [professorId]);

    if (!shouldComponentRender || professorDataTerm.raw == null) {
        return (
            <div className="loadDiv">
                <Spinner style={{ display: 'inline-block' }} animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <Spinner style={{ display: 'inline-block' }} animation="grow" role="status" variant="warning">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <Spinner style={{ display: 'inline-block' }} animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>

        )
    } else {
        if (permLists.current[3] == 0) {
            if (fromCourse == null)
                permLists.current[3]++;
            isViewable.current[0] = new Array(professorDataTerm.raw.length);
            isViewable.current[1] = new Array(professorDataTerm.raw.length);
            for (let i = 0; i < professorDataTerm.raw.length; i++) {
                isViewable.current[0][i] = true;
                isViewable.current[1][i] = true;
            }
            updateList(!listState);
        }

        if (permLists.current[3] < 2 && fromCourse != null) {
            permLists.current[3]++;
            if (isChecked.current[0].length < 1)
                updateList(!listState);
            if (isChecked.current[0].length > 0) {
                isChecked.current[0].forEach((element, index) => {
                    if (permLists.current[0][index] != fromCourse) {
                        isChecked.current[0][index] = false;
                        nullIndices(permLists.current[0][index])
                    }
                });
                updateList(!listState);
            }
        }

        if (permLists.current[3] > 0) {
            //    
            // isChecked.current[1].splice(permLists.current[1].length, (isChecked.current[1].length-permLists.current[1].length));
            permLists.current[2][0] = isChecked.current[0].every((element) => element == true);
            permLists.current[2][1] = isChecked.current[1].every((element) => element == true);
        }

        return (
            //set fluid for 2 column
            <Container>
                <ProfessorPageHeader
                    professorDataTerm={professorDataTerm.header}
                    filterData={professorDataTerm.raw}
                    filterArray={isViewable.current}
                    filter={listState}
                />
                <Row>
                    <DropdownButton id="courseList" variant='primary' title="Courses" style={{ marginTop: "10px", marginLeft: "1em" }}>
                        <div key="allCourseDiv">
                            <input type='checkbox' checked={permLists.current[2][0]} key="allCourse" style={{ marginLeft: "5px" }} onChange={(event) => switchCheckedState(0, event.target.checked)} />
                            <span>  (ALL)</span>
                        </div>
                        {
                            permLists.current[0].map((section, index) => (
                                <div key={isChecked.current[0].push(true)}>
                                    <input type='checkbox' defaultChecked={isChecked.current[0][index]} key={section.course_id} style={{ marginLeft: "5px" }} onChange={(event) => {
                                        spliceArrays();
                                        isChecked.current[0][index] = !isChecked.current[0][index];
                                        if (event.target.checked) {
                                            restoreIndices(section, null)
                                            updateList(!listState);
                                        } else {
                                            nullIndices(section, null);
                                            updateList(!listState);
                                        }
                                    }} /><span>  {section}</span>
                                </div>
                            ))
                        }
                    </DropdownButton>
                    <DropdownButton variant='primary' id="termList" title="Terms" style={{ marginTop: "10px", marginLeft: "1em" }}>
                        <div key="allCourseDiv">
                            <input type='checkbox' checked={permLists.current[2][1]} key="allCourse" style={{ marginLeft: "5px" }} onChange={(event) => switchCheckedState(1, event.target.checked)} />
                            <span>  (ALL)</span>
                        </div>
                        {
                            permLists.current[1].map((section, index) => (
                                <div key={isChecked.current[1].push(true)}>
                                    <input type='checkbox' defaultChecked={isChecked.current[1][index]} key={section.instructor_name} style={{ marginLeft: "5px" }} onChange={(event) => {
                                        spliceArrays();
                                        isChecked.current[1][index] = !isChecked.current[1][index];
                                        if (event.target.checked) {
                                            restoreIndices(null, section);
                                            updateList(!listState);
                                        } else {
                                            nullIndices(null, section);
                                            updateList(!listState);
                                        }
                                    }} /><span>  {section}</span>
                                </div>
                            ))
                        }
                    </DropdownButton>
                    {/* <Button id="aggregate" style={{marginTop: "10px", marginLeft: "1em", visibility: "hidden"}} onClick={() => aggregate()}>
                                {aggregated ? "Dea" : "A"}ggregate Sections
                            </Button> */}
                    {/* <div style={{marginLeft: 'auto', marginRight: '3em'}}>
                                <Button variant='primary' style={{marginTop: "15px"}} onClick={() => history.push('/')}>Home</Button>
                            </div> */}
                </Row>
                <Row style={{ marginBottom: "2em" }}>

                    {biggerThan992 &&
                        <ProfessorTable
                            professorDataTerm={professorDataTerm.raw}
                            isViewable={isViewable.current}
                            aggregated={aggregated}
                            professorId={professorId}
                        />
                    }
                    {smallerThan991 &&
                        <MobileProfTable
                            professorDataTerm={professorDataTerm.raw}
                            professorId={professorId}
                            isViewable={isViewable.current}
                            aggregated={aggregated}
                        />
                    }
                </Row>
                <Row><Footer /></Row>
            </Container>
        )
    }
}

export default ProfessorPage;