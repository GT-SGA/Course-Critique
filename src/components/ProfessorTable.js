
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Container from 'react-bootstrap/Container';
import "../style/pageTable.css"


function rowStyleFormat(row, rowIdx) {
  return { backgroundColor: rowIdx % 2 === 0 ? '#ebecf0' : '#f9f9f9', fontSize: "15px" };
}

function termSort(term1A, term2A, order) {
  let term1 = "";
  let term2 = "";
  if(order == "desc") {
    term1 = term1A.Term;
    term2 = term2A.Term;
  } else {
    term1 = term2A.Term;
    term2 = term1A.Term;
  }

  let term1S = term1.split(" ");
  let term2S = term2.split(" ");
  let seasons = {
      "Spring" : 1,
      "Summer" : 2,
      "Fall" : 3
  };
  if(term1S[1] > term2S[1])
      return -1;
  else if(term1S[1] < term2S[1])
      return 1;
  else if(term1S[1] === term2S[1] && seasons[term1S[0]] > seasons[term2S[0]])
      return -1;
  else if(term1S[1] === term2S[1] && seasons[term1S[0]] < seasons[term2S[0]])
      return 1;
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
    return (
      <div className="prof-head">
        <Link to={`/course?courseID=${row.course_id}`}>{row.course_id}</Link>
      </div>
    )
  }

const sizeTruncator = (cell, row) => {
    if (row.class_size_group.includes("Very Small"))
      return ("Very Small (<10 students)")
    if (row.class_size_group.includes("Very Large"))
      return ("Very Large (>50 students)")
    return row.class_size_group
}

const ProfessorTable = ({ professorDataTerm, isViewable, aggregated, professorId }) => {
  const ref = React.useRef();
  let displayArray = [];
  let aggregatorAverages = {};
  professorDataTerm.forEach((element, index) => {
    if (isViewable[0][index] && isViewable[1][index]) {
      if (aggregated) {
        if (!(displayArray.map((viewableElement) => {return viewableElement["course_id"]})).includes(element["course_id"])) {
          displayArray.push(element);
          aggregatorAverages[element["course_id"]] = [];
        } else {
          aggregatorAverages[element["course_id"]].push(element);
        }
      } else {
        displayArray.push(element);
      }

    }
  });   

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

  const winSize = useWindowSize();

  return (
    <Container>
    <div style={{ position: 'relative', height: winSize.height < 600 ? 115 : winSize.height - 490, maxWidth:"100%", margin: "auto", marginTop: '1em', marginBottom: '0' }}>
    <BootstrapTable tableHeaderClass="prof-table-head" trClassName="prof-table" striped condensed ref={ref} data={aggregated ? agDisplayArray : displayArray}>
      <TableHeaderColumn dataField='course_id' dataFormat={cellFormatter} isKey={true} width='120' dataSort={true}>Course</TableHeaderColumn>
      <TableHeaderColumn dataField='Section' width='100' dataSort={true}>Section</TableHeaderColumn>
      <TableHeaderColumn dataField='Term' width='120' dataSort={true} sortFunc={termSort}>Term</TableHeaderColumn>
      <TableHeaderColumn dataField='class_size_group' dataFormat={sizeTruncator} width='190' dataSort={true}>Size</TableHeaderColumn>
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

export default ProfessorTable
