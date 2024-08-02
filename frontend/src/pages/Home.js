import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSignIn } from '../contexts/SignInContext';

const Home = () => {
    const { isSignIn } = useAuth(); 
    const {handleShow} = useSignIn();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <Row className="text-center mb-4">
                <Col>
                    <h1 className="display-1">dRECORDS.</h1>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    {isSignIn ? (
                        <p className="text-primary">Signed in as: <b>admin</b></p>
                    ) : (
                        <Button variant="primary" onClick={handleShow}>Sign In</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
