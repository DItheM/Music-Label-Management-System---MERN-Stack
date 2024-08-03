import React, { useEffect, useState } from 'react';
import { ip } from '../Services/Service';
import AddArtist from '../components/AddArtist';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import EditArtistModal from '../components/EditArtistModal'; // Import EditArtistModal component
import { useSearch } from '../contexts/SearchContext';
import Swal from 'sweetalert2';

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State for showing artist update modal
    const [currentArtist, setCurrentArtist] = useState(null);
    const { searchTerm} = useSearch(); 

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await fetch(ip + '/artists/get', {
                method: 'GET'
            });
            const json = await response.json();

            if (response.ok) {
                setArtists(json); // Assuming json is an array of artists
                setFilteredArtists(json); // Initially set filtered artists to all artists
            } else {
                console.log(json.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleMainDelete = (artistId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(artistId)
            }
          });
    }

    const handleDelete = async (artistId) => {
        try {
            const response = await fetch(`${ip}/artists/${artistId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the artist from the state
                setArtists(artists.filter(artist => artist._id !== artistId));
                setFilteredArtists(filteredArtists.filter(artist => artist._id !== artistId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Artist has been deleted.",
                    icon: "success"
                  });
            } else {
                const error = await response.json();
                console.log(error.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleUpdate = (artist) => {
        setCurrentArtist(artist);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setCurrentArtist(null);
    };

    const handleSearchChange = () => {
        const term = searchTerm
        if (term) {
            setFilteredArtists(artists.filter(artist => 
                artist.name.toLowerCase().includes(term) || 
                artist.email.toLowerCase().includes(term) ||
                artist.phoneNumber.toLowerCase().includes(term) ||
                artist.country.toLowerCase().includes(term)
            ));
        } else {
            setFilteredArtists(artists);
        }
    };

    useEffect(() => {
        handleSearchChange()
    }, [searchTerm])

    return (
        <Container fluid>
            <Row>
                <Col md={8} className="border-end">
                    <h2>Artists</h2>
                    <ListGroup>
                        {filteredArtists.map((artist) => (
                            <ListGroup.Item key={artist._id}>
                                <div className="mb-2">
                                    <div className="d-flex justify-content-between">
                                        <strong>Name:</strong>
                                        <span className="text-primary">{artist.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <strong>Email:</strong>
                                        <span className="text-primary">{artist.email}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <strong>Phone Number:</strong>
                                        <span className="text-primary">{artist.phoneNumber}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <strong>Country:</strong>
                                        <span className="text-primary">{artist.country}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <strong>Birthdate:</strong>
                                        <span className="text-primary">{new Date(artist.birthdate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="danger"
                                        onClick={() => handleMainDelete(artist._id)}
                                        className="mt-2"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleUpdate(artist)}
                                        className="mt-2 ms-2"
                                    >
                                        Update
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <div className="p-3 border rounded">
                        <AddArtist fetchArtists={fetchArtists}/>
                    </div>
                </Col>
            </Row>
            {currentArtist && (
                <EditArtistModal
                    show={showUpdateModal}
                    handleClose={handleUpdateModalClose}
                    artist={currentArtist}
                    refreshArtists={fetchArtists}
                />
            )}
        </Container>
    );
};

export default Artists;
