import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const SignInModel = ({ show, handleClose, setUsername, setPassword, handleSignin, isLoading}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
                <Form>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSignin} 
                    disabled={isLoading}
                    >
                    {isLoading ? (
                        <>
                            <Spinner animation="border" size='sm' className="me-2" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </Modal.Footer>
                    </Form>
        </Modal>
    );
};

export default SignInModel;
