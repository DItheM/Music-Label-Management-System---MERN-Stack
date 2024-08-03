import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ip } from '../Services/Service';

const EditTrackModal = ({ show, handleClose, track, refreshTracks }) => {
    const [formData, setFormData] = useState({
        title: '',
        artistId: '',
        artistName: '',
        genre: '',
        targetStartDate: '',
        targetReleaseDate: ''
    });
    const [suggestions, setSuggestions] = useState([]);
    const [isArtistSelected, setIsArtistSelected] = useState(false);

    useEffect(() => {
        if (track) {
            setFormData({
                title: track.title,
                artistId: track.artistId,
                artistName: '', // Fetch artist name based on artistId
                genre: track.genre,
                targetStartDate: track.targetStartDate ? new Date(track.targetStartDate).toISOString().split('T')[0] : '',
                targetReleaseDate: track.targetReleaseDate ? new Date(track.targetReleaseDate).toISOString().split('T')[0] : ''
            });

            fetchArtist(track.artistId);
        }
    }, [track]);

    const fetchArtist = async (artistId) => {
        try {
            const response = await fetch(`${ip}/artists/${artistId}`);
            if (response.ok) {
                const artist = await response.json();
                setFormData((prevData) => ({
                    ...prevData,
                    artistName: artist.name
                }));
                setIsArtistSelected(true);
            }
        } catch (error) {
            console.error('Error fetching artist:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isArtistSelected) {
            alert('Please select a valid artist from the suggestions.');
            return;
        }

        try {
            const response = await fetch(`${ip}/tracks/${track._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    artistId: formData.artistId
                })
            });

            if (response.ok) {
                refreshTracks();
                handleClose();
            } else {
                const error = await response.json();
                console.log(error.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleArtistInputChange = async (e) => {
        const query = e.target.value;
        setFormData({
            ...formData,
            artistName: query
        });

        if (query.length > 2) { // Start searching after 3 characters
            try {
                const response = await fetch(`${ip}/artists/?q=${encodeURIComponent(query)}`);
                const artists = await response.json();
                setSuggestions(artists);
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectArtist = (artist) => {
        setFormData({
            ...formData,
            artistName: artist.name,
            artistId: artist._id
        });
        setSuggestions([]);
        setIsArtistSelected(true);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Track</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formArtistName">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control
                            type="text"
                            name="artistName"
                            value={formData.artistName}
                            onChange={handleArtistInputChange}
                            required
                        />
                        {suggestions.length > 0 && (
                            <ul className="list-group">
                                {suggestions.map((artist) => (
                                    <li
                                        key={artist._id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleSelectArtist(artist)}
                                    >
                                        {artist.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTargetStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="targetStartDate"
                            value={formData.targetStartDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTargetReleaseDate">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="targetReleaseDate"
                            value={formData.targetReleaseDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditTrackModal;
