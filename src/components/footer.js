import React, { Component, Fragment } from 'react';
import { Col, Row } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <Grid container item xs={10} spacing={2} style={{ margin: "12px auto", paddingBottom: "10px", paddingTop: "32px", textAlign: "center", height: "1px" }}>
                    {/* <Row>
                        {/* <h6 style={{textAlign: 'left'}}>
                        Open source under 
                        <a href='http://www.gnu.org/licenses/gpl-3.0.html'> GPLv3 </a> 
                        where applicable.
                        </h6>
                    </Row>
                        </h6> */}
                    <Col><a class="footer-text" href='/author'>Authors</a></Col>
                    <Col><a class="footer-text" href="https://lite.gatech.edu/lite_script/dashboards/grade_distribution.html" target="_blank">Deeper Dive (IRP)</a></Col>
                    <Col><a class="footer-text" href="https://gatech.smartevals.com" target="_blank">CIOS Homepage</a></Col>
                    <Col><a class="footer-text" href="https://docs.google.com/forms/d/e/1FAIpQLSdn35wDkPOcJagxO-nZBxrO-GmeQIg_VRQj1QcJKLaiE_q-Hw/viewform" target="_blank">Feedback</a></Col>
                </Grid>
            </Fragment>
        )
    }
}

export default Footer 