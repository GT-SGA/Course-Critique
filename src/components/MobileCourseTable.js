
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "../style/pageTable.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
  if (cell != null) {
    return (
      <div className="course-header">
        <Link to={`/prof?profID=${row.instructor_gt_username}&fromCourse=${row.courseId}`}>{row.instructor_name}</Link>
      </div>
    )
  }
}

const columnsFormatter = [{
  dataField: 'instructor_name',
  text: 'Instructor',
  formatter: cellFormatter,
  sort: true,
  sortCaret: (order, column) => {
    if (!order) return (<span class="order"><span class="dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px', color: 'rgb(204, 204, 204)'}}></span></span><span class="dropup"><span class="caret" style={{margin: '10px 0px', color: 'rgb(204, 204, 204)'}}></span></span></span>);
    else if (order === 'asc') return (<span class="order dropup"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    else if (order === 'desc') return (<span class="order dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    return null;
  }
}, {
  dataField: 'GPA',
  text: 'GPA',
  sort: true,
  sortCaret: (order, column) => {
    if (!order) return (<span class="order"><span class="dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px', color: 'rgb(204, 204, 204)'}}></span></span><span class="dropup"><span class="caret" style={{margin: '10px 0px', color: 'rgb(204, 204, 204)'}}></span></span></span>);
    else if (order === 'asc') return (<span class="order dropup"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    else if (order === 'desc') return (<span class="order dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    return null;
  }
},
]

const MobileCourseTable = ({ courseDataTerm, courseId, isChecked }) => {
  const ref = React.useRef();
  let displayArray = [];
  courseDataTerm.forEach((element, index) => {
    if (isChecked[index]) {
      displayArray.push(element);
      displayArray[displayArray.length - 1]["courseId"] = courseId;
    }
  });

  const expandRow = {
    renderer: row => (
      <Container item xs={10} spacing={1}>
        <Row style={{ margin: "auto", textAlign: "center" }}>
          <Col style={{padding: 0}}><b>A%</b><br></br>{row.A}</Col>
          <Col style={{padding: 0}}><b>B%</b><br></br>{row.B}</Col>
          <Col style={{padding: 0}}><b>C%</b><br></br>{row.C}</Col>
          <Col style={{padding: 0}}><b>D%</b><br></br>{row.D}</Col>
          <Col style={{padding: 0}}><b>F%</b><br></br>{row.F}</Col>
          <Col style={{padding: 0}}><b>W%</b><br></br>{row.W}</Col>
        </Row>
      </Container>
    ),
    expandColumnRenderer: ({ expanded, rowKey, expandable }) => (expanded ? '▼' : '▶\uFE0E'),
    expandHeaderColumnRenderer: ({ isAnyExpands }) => (isAnyExpands ? '+' : '−'),
    showExpandColumn: true,
    expandColumnPosition: 'left',
  }

  const winSize = useWindowSize();

  return (
    //min height of table: 500px
    <Container>
      <div style={{ position: 'relative', height: "100%", overflowY: "scroll", maxWidth: "100%", margin: "auto", marginTop: '1em', marginBottom: '0' }}>
        <BootstrapTable keyField="instructor_name" headerClasses="course-table-head" rowClasses="course-table" columns={columnsFormatter} striped bootstrap4 ref={ref} data={displayArray} expandRow={expandRow} />
      </div>
    </Container>
  )
}

export default MobileCourseTable
