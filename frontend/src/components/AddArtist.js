import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ip } from '../Services/Service'; // Adjust import based on your file structure

const AddArtist = ({fetchArtists}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newArtist = {
            name,
            email,
            phoneNumber,
            country,
            birthdate: new Date(birthdate),
        };

        try {
            const response = await fetch(`${ip}/artists/`, {
                method: 'POST',
                body: JSON.stringify(newArtist),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Reset the form
                setName('');
                setEmail('');
                setPhoneNumber('');
                setCountry('');
                setBirthdate('');
                fetchArtists()
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Container>
            <h2>Add New Artist</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter artist name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter artist email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter artist phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter artist country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Artist
                </Button>
            </Form>
        </Container>
    );
};

export default AddArtist;
