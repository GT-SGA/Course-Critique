import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfessorDataTerm, getProfessorLoading, getProfessorError } from '../selectors/professorDataSelectors';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Visualization from './Visualization';
import SearchBar from './SearchBar'
import SGALogo from '../images/sga.png'
import rmp from '../images/rmp.png'
import "../style/pageHeader.css"
import DarkModeButton from './DarkModeButton'
import PageHeader from './PageHeader'

class ProfessorPageHeader extends Component {


  shouldComponentRender() {
      const { isLoading } = this.props;
      if (this.props.professorDataTerm !== undefined) return true;
      if (isLoading === false) return true;
      // more tests
      return false;
  }

  render() {
      if (!this.shouldComponentRender()) return null
      if(this.props.professorDataTerm === undefined) return null
      let avgData = {...this.props.professorDataTerm[0]};
      if(this.props.filterArray[0].some(element => element == false) || this.props.filterArray[1].some(element => element == false)) {
        let newData = [];
        this.props.filterData.forEach((element, index) => {
          if (this.props.filterArray[0][index] && this.props.filterArray[1][index]) {
            newData.push(element);
          }
        });
        avgData = generateNewAverage(newData);
      }

      let name = this.props.professorDataTerm[0].instructor_name
      let link = this.props.professorDataTerm[0].link
      let avgGPA = avgData['avg_gpa']
      let avgA = avgData['avg_a']
      let avgB = avgData['avg_b']
      let avgC = avgData['avg_c']
      let avgD = avgData['avg_d']
      let avgF = avgData['avg_f']
      let avgW = avgData['avg_w']
      
      //data for visualization
      let data = [
        { grade: "A", percentage: avgA },
        { grade: "B", percentage: avgB },
        { grade: "C", percentage: avgC },
        { grade: "D", percentage: avgD },
        { grade: "F", percentage: avgF },
        { grade: "W", percentage: avgW }
      ]
      
      return (
        <div className="page-header">
          <PageHeader></PageHeader>
          <br></br>
          <h2 className="text-center" style={{fontSize: "30px"}}>{name}
            {
            link != null && 
            <a href={link} target="_blank"><img style={{marginLeft: "10px", borderRadius: "10%"}} src={rmp} width="40" height="24"></img></a> 
            }
          </h2>
          <div className="table-header center-table">
            <Table responsive className='table-striped'>
              <thead>
                <tr>
                  <th>Average Marks</th>
                  <th>GPA</th>
                  <th>A%</th>
                  <th>B%</th>
                  <th>C%</th>
                  <th>D%</th>
                  <th>F%</th>
                  <th>W%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{avgGPA}</td>
                  <td>{avgA}</td>
                  <td>{avgB}</td>
                  <td>{avgC}</td>
                  <td>{avgD}</td>
                  <td>{avgF}</td>
                  <td>{avgW}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          {/* {link != null &&
          <div className="text-center">
            <a href={link} target="_blank">View Rate my Prof</a> 
          </div>
          } */}
          {/* <div style={{ margin: 'auto', maxWidth: '700px' }}>
            <Visualization data={data} />
          </div> */}
          {/* <div style={{textAlign: 'center', marginLeft: '2em', marginRight: '2em'}}>
            <Button onClick={() => this.props.history.push('/')}>Home</Button>
          </div> */}
         
          {/* <p className="lite-header">Looking for a deeper dive into grades? Is our data not up to date? <br/>
           <a href="https://b.gatech.edu/2CnXYFG">Click Here!</a></p> */}
        </div>
      )
  }
}

function generateNewAverage(filterData) {

  let newData = {avg_a: 0, avg_b: 0, avg_c: 0, avg_d: 0, avg_f: 0, avg_w: 0, avg_gpa: 0};
  filterData.forEach((element) => newData["avg_a"] += element["A"]);
  filterData.forEach((element) => newData["avg_b"] += element["B"]);
  filterData.forEach((element) => newData["avg_c"] += element["C"]);
  filterData.forEach((element) => newData["avg_d"] += element["D"]);
  filterData.forEach((element) => newData["avg_f"] += element["F"]);
  filterData.forEach((element) => newData["avg_w"] += element["W"]);
  filterData.forEach((element) => newData["avg_gpa"] += element["GPA"]);
  for(var key in newData)
    if(key === "avg_gpa")
      newData[key] = (newData[key]/filterData.length).toFixed(2);
    else
      newData[key] = (newData[key]/filterData.length).toFixed(1);
  return newData;
}

const mapStateToProps = state => ({
  error: getProfessorError(state),
  data: getProfessorDataTerm(state),
  isLoading: getProfessorLoading(state)
})

ProfessorPageHeader.propTypes = {
  data: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps
)(withRouter(ProfessorPageHeader));