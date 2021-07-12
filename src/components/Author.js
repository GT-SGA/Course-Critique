import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Footer from './footer.js'
import DarkModeButton from './DarkModeButton'
import { withRouter } from 'react-router-dom'
import '../style/author.css'

class Author extends Component {
    // componentDidMount(){
    //     document.title = "About the Critiquers"
    // }
    render() {
        return(
        <Container>
            <Col>
                <DarkModeButton/>
            </Col>
            <header style={{ backgroundColor: 'transparent', textAlign: 'center' }} class="author-page-title" id="overview">
                <h1>Authors</h1>
                <p>Of<a onClick={() => this.props.history.push('/')} style={{ fontWeight: '700', cursor: "pointer" }}> Course <a style={{ color: '#E8C343' }}>Critique</a></a></p>
                {/* <p>Of <a href="/" style={{ fontWeight: '700' }}>Course <a style={{ color: '#E8C343' }}>Critique</a></a></p> */}
            </header>
        <Row>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Abhinav-Gullapalli.jpeg")} alt="Picture of Abhi" width="160" height="160"/>
                <div class="author-title">
                    <h4>Abhinav Gullapalli</h4>
                    <h4>(Security Engineer)</h4>
                </div>
                {/* <a href="mailto:agullapalli3@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Andrew-von-Hillebrandt.png")} alt="Picture of Andrew" width="160" height="160"/>
                <div class="author-title">
                    <h4>Andrew von Hillebrandt</h4>
                    <h4>(Syllabus Repo)</h4>
                </div>
                {/* <a href="mailto:andrewvon@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Antonia-Nunley.png")} alt="Picture of Antonia" width="160" height="160"/>
                <div class="author-title">
                    <h4>Antonia Nunley</h4>
                    <h4>(Security Lead)</h4>
                </div>
                {/* <a href="mailto:anunley3@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
        </Row>
        <Row>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Cy-Heffley.jpg")}q alt="Picture of Cy" width="160" height="160"/>
                <div class="author-title">
                    <h4>Cy Heffley</h4>
                    <h4>(SGA VP of IT)</h4>
                </div>
                {/* <a href="http://linkedin.com/in/cy-heffley"><img src={require("../icons/Linkedin.png")} alt="Linkedin-icon"/></a>
                <a href="https://github.com/cheffley6"><img src={require("../icons/github.png")} alt="github-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/David-Zhang.png")} alt="Picture of David" width="160" height="160"/>
                <div class="author-title">
                    <h4>David Zhang</h4>
                    <h4>(Project Lead)</h4>
                </div>
                {/* <a href="mailto:dzhang351@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                {/* <a href="https://www.linkedin.com/in/david-zhang-861540193/"><img src={require("../icons/Linkedin.png")} alt="Linkedin-icon"/></a>
                <a href="https://github.com/dzhang2"><img src={require("../icons/github.png")} alt="github-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Fernanda-Moreno.png")} alt="Picture of Fernanda" width="160" height="160"/>
                <div class="author-title">
                    <h4>Fernanda Moreno</h4>
                    <h4>(UI/UX + Frontend Engineer)</h4>
                </div>
                {/* <a href="mailto:fmoreno6@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
        </Row>
        <Row>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Jared-Butler.jpeg")} alt="Picture of Jared" width="160" height="160"/>
                <div class="author-title">
                    <h4>Jared Butler</h4>
                    <h4>(Frontend Engineer)</h4>
                </div>
                {/* <a href="mailto:jaredbtlr@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Jun-Chen.jpeg")} alt="Picture of Jun" width="160" height="160"/>
                <div class="author-title">
                    <h4>Jun Chen</h4>
                    <h4>(Full Stack Engineer)</h4>
                </div>
                {/* <a href="mailto:jchen706@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-4">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Karis-Wang.jpeg")} alt="Picture of Karis" width="160" height="160"/>
                <div class="author-title">
                    <h4>Karis Wang</h4>
                    <h4>(UI/UX Designer)</h4>
                </div>
                {/* <a href="mailto:kariswang@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
        </Row>
        <Row>
            <div class="col-sm-6">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Nikhil-Malani.jpeg")} alt="Picture of Nikhil" width="160" height="160"/>
                <div class="author-title">
                    <h4>Nikhil Malani</h4>
                    <h4>(Backend Engineer)</h4>
                </div>
                {/* <a href="mailto:nmalani6@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
            <div class="col-sm-6">
                <div class="author-info span4">
                <img class="author-pic" src={require("../profilepics/Pawan-Yerramilli.jpeg")} alt="Picture of Pawan" width="160" height="160"/>
                <div class="author-title">
                    <h4>Pawan Yerramilli</h4>
                    <h4>(Frontend Engineer)</h4>
                </div>
                {/* <a href="mailto:pawan.yerramilli@gatech.edu"><img src={require("../icons/mail.jpg")} alt="mail-icon"/></a> */}
                </div>
            </div>
        </Row>
        <hr></hr>
        <Footer/>
        <br></br>
        </Container>
        )
    }
}

export default withRouter(Author);
