'use es6'

import React, { Component, useState, useEffect, useRef } from "react";
import PhotoContainer from "./PhotoContainer";
import "../App.css";
import { Col, Row } from 'react-bootstrap'
import SearchBar from './SearchBar'
import DarkModeButton from './DarkModeButton'
import Container from 'react-bootstrap/Container';
import PageHeader from './PageHeader'
import Footer from './footer';

class NotFoundPage extends Component { 
    constructor() {
        super();
        this.state = {
            photos: []
        };
    }

    componentDidMount() {
        fetch("https://api.thedogapi.com/v1/images/search?limit=1")
        .then(response => {
            if(!response.ok) {
                throw Error("Error fetching the cute doggie");
            }
            return response.json()
        .then(allData => {
            this.setState({ photos: allData });
            })
        .catch(err => {
            throw Error(err.message);
            })
        });
    }

    render() {
        return (
            <Container>
            <div className="page-header">
            <PageHeader></PageHeader>
            </div>
            <section className="doggos">
                <h2 style={{ marginTop: '1em' }}>404 - Page Not Found</h2>
                <h2 style={{ marginTop: '1em' }}>Enjoy this picture of a doggo :)</h2>
                <PhotoContainer photos={this.state.photos} />
            </section>
            <Footer />
            </Container>
        )
    }
}

export default NotFoundPage;