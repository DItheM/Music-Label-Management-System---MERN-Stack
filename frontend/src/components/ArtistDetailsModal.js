import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ArtistDetailsModal = ({ show, handleClose, artist }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Artist Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Name:</h5>
                    <p className='text-primary'>{artist.name}</p>
                    <h5>Email:</h5>
                    <p className='text-primary'>{artist.email || 'No email available'}</p>
                    <h5>Phone Number:</h5>
                    <p className='text-primary'>{artist.phoneNumber || 'No phone number available'}</p>
                    <h5>Country:</h5>
                    <p className='text-primary'>{artist.country || 'No country available'}</p>
                    <h5>Birthdate:</h5>
                    <p className='text-primary'>{artist.birthdate ? new Date(artist.birthdate).toLocaleDateString() : 'No birthdate available'}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ArtistDetailsModal;
