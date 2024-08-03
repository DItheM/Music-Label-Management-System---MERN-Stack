import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ip } from '../Services/Service';
import Swal from 'sweetalert2';

const AddTrack = ({refreshTracks}) => {
    const [title, setTitle] = useState('');
    const [artistId, setArtistId] = useState('');
    const [artistName, setArtistName] = useState('');
    const [genre, setGenre] = useState('');
    const [targetStartDate, setTargetStartDate] = useState('');
    const [targetReleaseDate, setTargetReleaseDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isArtistSelected, setIsArtistSelected] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isArtistSelected) {
            alert('Please select a valid artist from the suggestions.');
            return;
        }

        // Create the new track object, only including dates if they are not empty
        const newTrack = {
            title,
            artistId,
            genre,
            ...(targetStartDate && { targetStartDate: new Date(targetStartDate) }),
            ...(targetReleaseDate && { targetReleaseDate: new Date(targetReleaseDate) }),
        };

        try {
            const response = await fetch(`${ip}/tracks/`, {
                method: 'POST',
                body: JSON.stringify(newTrack),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Reset the form
                setTitle('');
                setArtistId('');
                setArtistName('');
                setGenre('');
                setTargetStartDate('');
                setTargetReleaseDate('');
                setSuggestions([]);
                setIsArtistSelected(false);
                refreshTracks()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Track Added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleArtistInputChange = async (event) => {
        const query = event.target.value;
        setArtistName(query);

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
        setArtistName(artist.name);
        setArtistId(artist._id); // Set the selected artist's ID
        setSuggestions([]);
        setIsArtistSelected(true); // Mark the artist as selected
    };

    return (
        <Container>
            <h2>Add New Track</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter track title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArtistId">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Start typing artist name"
                        value={artistName}
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

                <Form.Group className="mb-3" controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter genre (optional)"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTargetStartDate">
                    <Form.Label>Target Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={targetStartDate}
                        onChange={(e) => setTargetStartDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTargetReleaseDate">
                    <Form.Label>Target Release Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={targetReleaseDate}
                        onChange={(e) => setTargetReleaseDate(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Track
                </Button>
            </Form>
        </Container>
    );
};

export default AddTrack;
