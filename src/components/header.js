import React, { Component, Fragment } from 'react';
import SearchBar from './SearchBar'
import { Col, Row, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import illo from '../images/illofinal-1000.png'
import DarkModeButton from './DarkModeButton'

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Col style={{ marginTop: '1vh' }}><DarkModeButton /></Col>
        </Grid>
        <Grid container item xs={12} spacing={2} direction="row-reverse" style={{ marginTop: "12vh", marginLeft: "0.5em", marginBottom: "8em" }} >
          <Col xs={12} md={6}>
            <img class="illo" src={illo} alt="3D user interface illustration of Course Critique" width="500" height="400"></img>
          </Col>
          <Col>
            <Row><h1 style={{ textAlign: 'left', fontWeight: '700' }}>Course <a style={{ color: '#E8C343' }}>Critique</a></h1></Row>
            <Row><h3 style={{ textAlign: 'left' }}>Type in a Professor or Course Name</h3></Row>
            <br></br>
            <Row><SearchBar format={2} /></Row>
          </Col>
        </Grid>
      </Fragment>
    )
  }
}

export default Header;