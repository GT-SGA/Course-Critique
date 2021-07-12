
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
      <div className="prof-head">
        <Link to={`/course?courseID=${row.course_id}`}>{row.course_id}</Link> - {row.Section}
      </div>
    )
  }
}

const columnsFormatter = [{
  dataField: 'course_id',
  text: 'Course',
  formatter: cellFormatter,
  sort: true,
  headerStyle: () => {
    return { width: "40%" };
  },
  sortCaret: (order, column) => {
    if (!order) return (<span class="order"><span class="dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px', color: 'rgb(204, 204, 204)'}}></span></span><span class="dropup"><span class="caret" style={{margin: '10px 0px', color: 'rgb(204, 204, 204)'}}></span></span></span>);
    else if (order === 'asc') return (<span class="order dropup"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    else if (order === 'desc') return (<span class="order dropdown"><span class="caret" style={{margin: '10px 0px 10px 5px'}}></span></span>);
    return null;
  }
}, {
  dataField: 'Term',
  text: 'Term',
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

const MobileProfTable = ({ professorDataTerm, isViewable, aggregated, professorId }) => {
    const ref = React.useRef();
    let displayArray = [];
    let aggregatorAverages = {};
    professorDataTerm.forEach((element, index) => {
      element["identifier"] = element["course_id"] + element["Term"] + element["Section"]
      if (isViewable[0][index] && isViewable[1][index]) {
        if (aggregated) {
          if (!(displayArray.map((viewableElement) => {return viewableElement["course_id"]})).includes(element["course_id"])) {
            displayArray.push(element);
            aggregatorAverages[element["course_id"]] = [];
          } else {
            aggregatorAverages[element["course_id"]].push(element);
          }
        } else {
          console.log(element)
          displayArray.push(element);
        }
  
      }
    });
    console.log(displayArray)
    
    let agDisplayArray = [];

    if (aggregated) {
      displayArray.forEach((element, index) => {
        agDisplayArray.push({...element});
      });
      agDisplayArray.forEach((element, index) => {
        let avgGPA = element['GPA'];
        let avgA = element['A'];
        let avgB = element['B'];
        let avgC = element['C'];
        let avgD = element['D'];
        let avgF = element['F'];
        let avgW = element['W'];
          
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgGPA += addableElement['GPA']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgA += addableElement['A']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgB += addableElement['B']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgC += addableElement['C']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgD += addableElement['D']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgF += addableElement['F']});
        aggregatorAverages[element["course_id"]].forEach(addableElement => {avgW += addableElement['W']});
  
        agDisplayArray[index]['GPA'] = (avgGPA / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(2);
        agDisplayArray[index]['A'] = (avgA / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
        agDisplayArray[index]['B'] = (avgB / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
        agDisplayArray[index]['C'] = (avgC / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
        agDisplayArray[index]['D'] = (avgD / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
        agDisplayArray[index]['F'] = (avgF / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
        agDisplayArray[index]['W'] = (avgW / (aggregatorAverages[element["course_id"]].length + 1)).toFixed(1);
  
        agDisplayArray[index]["Section"] = "N/A";
        agDisplayArray[index]["Term"] = "N/A";
      })
    }

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
      <div style={{ position: 'relative', height: '100%', overflowY: "scroll", maxWidth: "100%", margin: "auto", marginTop: '1em', marginBottom: '0' }}>
        <BootstrapTable keyField="identifier" headerClasses="prof-table-head" rowClasses="prof-table" columns={columnsFormatter} striped bootstrap4 ref={ref} data={displayArray} expandRow={expandRow} />
      </div>
    </Container>
  )
}

export default MobileProfTable
