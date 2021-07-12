import React from "react";
import { useMediaPredicate } from "react-media-hook";
import { Col, Row } from 'react-bootstrap'
import SearchBar from './SearchBar'
import DarkModeButton from './DarkModeButton'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';



const PageHeader = () => {
  const biggerThan992 = useMediaPredicate("(min-width: 992px)");
  const smallerThan991 = useMediaPredicate("(max-width: 991px)")

  return (
    <>
      {biggerThan992 &&
        <Row style={{ marginTop: '1vh' }}>
          <Col>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p class="course-title" style={{ textAlign: 'left', fontWeight: '700', cursor: "pointer", fontSize: '24px', textDecoration: "none" }}>Course <a style={{ color: '#E8C343' }}>Critique</a></p>
            </Link>
          </Col>
          <Col>
            <SearchBar format={3} />
          </Col>
          <Col>
            <DarkModeButton />
          </Col>
        </Row>
      }
      {smallerThan991 &&
        <>
          <Row style={{ marginTop: '1em' }}>
            <Col xs={8}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <p class="course-title" style={{ textAlign: 'left', fontWeight: '700', cursor: "pointer", fontSize: '24px', textDecoration: "none" }}>Course <a style={{ color: '#E8C343' }}>Critique</a></p>
              </Link>
            </Col>
            <Col xs={4}>
              <DarkModeButton />
            </Col>
          </Row>
          <Row>
          <Col>
            <SearchBar format={3} />
          </Col>
          </Row>
        </>
      }
    </>)
};

export default PageHeader;