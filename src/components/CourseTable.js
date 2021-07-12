
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Container from 'react-bootstrap/Container';
import rmp from '../images/rmp.png'
import "../style/pageTable.css"

function rowStyleFormat(row, rowIdx) {
  return { backgroundColor: rowIdx % 2 === 0 ? '#ebecf0' : '#f9f9f9', fontSize: "15px", color: 'black' };
}

function useWindowSize() {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function resizing() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", resizing);
    resizing();
    
    return () => window.removeEventListener("resize", resizing);
  }, []);
  
  return size;
}

const cellFormatter = (cell, row) => {
  if(cell != null) {
    return (
      <div className="course-header">
        <Link to={`/prof?profID=${row.instructor_gt_username}&fromCourse=${row.courseId}`}>{row.instructor_name}</Link>
        {
        row.link != null &&
        <a href={row.link} target="blank"><img style={{borderRadius: "10%", marginLeft: "8px"}} src={rmp} width="30" height="18"></img></a>
        }
      </div>
    )
  }
}

const CourseTable = ({ courseDataTerm, courseId, isChecked }) => {
  const ref = React.useRef();
  let displayArray = [];
  courseDataTerm.forEach((element, index) => {
    if (isChecked[index]) {
      displayArray.push(element);
      displayArray[displayArray.length-1]["courseId"] = courseId;
    }
  });

  const winSize = useWindowSize();

  return (
    //min height of table: 500px
    <Container>
    <div style={{ position: 'relative', height: winSize.height < 600 ? 115 : winSize.height - 490, maxWidth:"100%", margin: "auto", marginTop: '1em', marginBottom: '0' }}>
    <BootstrapTable tableHeaderClass="course-table-head" trClassName="course-table" striped condensed ref={ref} data={displayArray}>
      <TableHeaderColumn dataField='instructor_name' dataFormat={cellFormatter} isKey={true} width='205' dataSort={true}>Instructor</TableHeaderColumn>
      <TableHeaderColumn dataField='GPA' width='100' dataSort={true}>GPA</TableHeaderColumn>
      <TableHeaderColumn dataField='A' width='75' dataSort={true}>A</TableHeaderColumn>
      <TableHeaderColumn dataField='B' width='75' dataSort={true}>B</TableHeaderColumn>
      <TableHeaderColumn dataField='C' width='75' dataSort={true}>C</TableHeaderColumn>
      <TableHeaderColumn dataField='D' width='75' dataSort={true}>D</TableHeaderColumn>
      <TableHeaderColumn dataField='F' width='75' dataSort={true}>F</TableHeaderColumn>
      <TableHeaderColumn dataField='W' width='75' dataSort={true}>W</TableHeaderColumn>
    </BootstrapTable>
    </div>
    </Container>
  )
}

export default CourseTable
