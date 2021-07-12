import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import SGALogo from '../images/sga.png'

import Table from 'react-bootstrap/Table';

import { getCourseLoading, getCourseData, getCourseError } from '../selectors/courseDataSelectors';
import Visualization from './Visualization';
import SearchBar from './SearchBar'
import DarkModeButton from './DarkModeButton'
import PageHeader from './PageHeader'

class CoursePageHeader extends Component {
  shouldComponentRender() {
    const { isLoading } = this.props;
    if (isLoading === false) return true;
    // more tests
    return false;
  }

  render() {
    if (!this.shouldComponentRender()) return null
    if (this.props.courseDataTerm === undefined) return null
    let name = this.props.courseDataTerm[0]["full_name"]
    let description = this.props.courseDataTerm[0]["description"]
    let credits = this.props.courseDataTerm[0]["credits"]
    if (credits === null)
      credits = "N/A"
    if (description === null || description.length === 0)
      description = "Varies"

    let avgData = { ...this.props.courseDataTerm[0] };
    if (this.props.isChecked.some(element => element === false)) {
      let newData = [];
      this.props.filterData.forEach((element, index) => {
        if (this.props.isChecked[index])
          newData.push(element);
      });
      avgData = generateNewAverage(newData);
    }

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

    function generateNewAverage(filterData) {
      let totalSections = 0;
      let newData = { avg_a: 0, avg_b: 0, avg_c: 0, avg_d: 0, avg_f: 0, avg_w: 0, avg_gpa: 0 };
      filterData.forEach((element) => newData["avg_a"] += element["A"] * element["sections"]);
      filterData.forEach((element) => newData["avg_b"] += element["B"] * element["sections"]);
      filterData.forEach((element) => newData["avg_c"] += element["C"] * element["sections"]);
      filterData.forEach((element) => newData["avg_d"] += element["D"] * element["sections"]);
      filterData.forEach((element) => newData["avg_f"] += element["F"] * element["sections"]);
      filterData.forEach((element) => newData["avg_w"] += element["W"] * element["sections"]);
      filterData.forEach((element) => newData["avg_gpa"] += element["GPA"] * element["sections"]);
      filterData.forEach((element) => totalSections += element["sections"]);
      for (var key in newData)
        if (key === "avg_gpa")
          newData[key] = (newData[key] / totalSections).toFixed(2);
        else
          newData[key] = (newData[key] / totalSections).toFixed(1);
      return newData;
    }

    return (
      <div className="page-header">
        <PageHeader></PageHeader>
        <br></br>
        <h2 className="text-center" style={{ fontSize: "30px" }}>{name}</h2>
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
        {/* <div style={{ margin: 'auto', maxWidth: '700px' }}>
            <Visualization data={data} />
          </div> */}
        {/* <div style={{ textAlign: 'center', marginLeft: '2em', marginRight: '2em' }}>
            <p>Credits: {credits}</p>
            <p>Course description: {description}</p>
          </div> */}
        {/* <p className="lite-header">Want to make Course Critique better? Consider contributing by uploading current/past class syllabi <a href="">here</a>!</p> */}
        {/* <p className="lite-header">Looking for a deeper dive into grades? Is our data not up to date? <br />
          <a href="https://b.gatech.edu/2CnXYFG">Click Here!</a></p> */}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  data: getCourseData(state),
  error: getCourseError(state),
  isLoading: getCourseLoading(state)
})

CoursePageHeader.propTypes = {
  data: PropTypes.array,
  error: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps
)(withRouter(CoursePageHeader));