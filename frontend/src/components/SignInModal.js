// components/SignInModel.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useSignIn } from '../contexts/SignInContext';
import { ip } from '../Services/Service';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import Alert from 'react-bootstrap/Alert';

const SignInModal = () => {
    const { showSignInModal, handleClose } = useSignIn();
    const { setIsSignIn } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleModalClose = () => {
        handleClose()
        setError(null)
    }

    const handleSignIn = async (event) => {
        event.preventDefault()
        setIsLoading(true);
        const auth = { username, password };
        try {
            const response = await fetch(ip + '/signin', {
                method: 'POST',
                body: JSON.stringify(auth),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const json = await response.json();
    
            if (response.ok) {
                handleModalClose();
                setIsSignIn(true);
                setIsLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Signed In",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                setIsSignIn(false);
                setIsLoading(false);
                setError(json.error)
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message)
        }
    };
    

    return (
        <Modal show={showSignInModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSignIn}>
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
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        type='submit'
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

            {error && (
                <Alert variant='danger' style={{margin: '10px'}}>An error occurred: {error}</Alert>
            )}
        </Modal>
    );
};

export default SignInModal;
