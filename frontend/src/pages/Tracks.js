import React, { useEffect, useState } from 'react';
import { ip } from '../Services/Service';
import AddTrack from '../components/AddTrack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import EditTrackModal from '../components/EditTrackModal'; // Import the EditTrackModal component
import ArtistDetailsModal from '../components/ArtistDetailsModal'; // Import the ArtistDetailsModal component
import { useSearch } from '../contexts/SearchContext';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [artistMap, setArtistMap] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showArtistModal, setShowArtistModal] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentArtist, setCurrentArtist] = useState(null);
    const { searchTerm } = useSearch();

    useEffect(() => {
        fetchTracks();
    }, []);

    useEffect(() => {
        handleSearchChange();
    }, [searchTerm, tracks]);

    const fetchTracks = async () => {
        try {
            const response = await fetch(ip + '/tracks/get', {
                method: 'GET'
            });
            const json = await response.json();

            if (response.ok) {
                setTracks(json); // Assuming json is an array of tracks

                // Fetch artist details for each track
                const artistPromises = json.map(track => fetchArtist(track.artistId));
                const artists = await Promise.all(artistPromises);

                // Create a map of artist ID to artist details
                const artistMapping = artists.reduce((acc, artist) => {
                    if (artist) {
                        acc[artist._id] = artist;
                    }
                    return acc;
                }, {});

                setArtistMap(artistMapping);
                setFilteredTracks(json); // Initially set filtered tracks to all tracks
            } else {
                console.log(json.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchArtist = async (artistId) => {
        try {
            const response = await fetch(`${ip}/artists/${artistId}`, {
                method: 'GET'
            });
            if (response.ok) {
                const artist = await response.json();
                return artist;
            } else {
                console.log('Error fetching artist:', await response.json());
                return null;
            }
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    const handleDelete = async (trackId) => {
        try {
            const response = await fetch(`${ip}/tracks/${trackId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the track from the state
                setTracks(tracks.filter(track => track._id !== trackId));
                setFilteredTracks(filteredTracks.filter(track => track._id !== trackId));
            } else {
                const error = await response.json();
                console.log(error.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = (track) => {
        setCurrentTrack(track);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentTrack(null);
    };

    const handleArtistClick = (artistId) => {
        setCurrentArtist(artistMap[artistId]);
        setShowArtistModal(true);
    };

    const handleArtistModalClose = () => {
        setShowArtistModal(false);
        setCurrentArtist(null);
    };

    const handleSearchChange = () => {
        const term = searchTerm.toLowerCase();
        if (term) {
            setFilteredTracks(tracks.filter(track => 
                track.title.toLowerCase().includes(term) ||
                artistMap[track.artistId]?.name.toLowerCase().includes(term) ||
                track.genre?.toLowerCase().includes(term)
            ));
        } else {
            setFilteredTracks(tracks);
        }
    };

    // Function to return appropriate item class based on value
    const itemClass = (value) => value ? 'text-primary' : 'text-muted';

    return (
        <Container fluid>
            <Row>
                <Col md={8} className="border-end">
                    <h2>Tracks</h2>
                    <ListGroup>
                        {filteredTracks.map((track) => {
                            // Determine the color class based on whether the genre is selected
                            const itemClassGenre = itemClass(track.genre);
                            const itemClassStartDate = itemClass(track.targetStartDate);
                            const itemClassReleaseDate = itemClass(track.targetReleaseDate);

                            return (
                                <ListGroup.Item key={track._id}>
                                    <div className="mb-2">
                                        <div className="d-flex justify-content-between">
                                            <strong>Title:</strong>
                                            <span className='text-primary'>{track.title}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Artist Name:</strong>
                                            <span
                                                className={`artist-link ${!track.artistId ? 'text-muted' : ''}`}
                                                onClick={() => track.artistId && handleArtistClick(track.artistId)}
                                            >
                                                {artistMap[track.artistId]?.name || 'Unknown'}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Genre:</strong>
                                            <span className={itemClassGenre}>{track.genre || 'Not Selected'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Start Date:</strong>
                                            <span className={itemClassStartDate}>
                                                {track.targetStartDate ? new Date(track.targetStartDate).toLocaleDateString() : 'Not Selected'}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>Release Date:</strong>
                                            <span className={itemClassReleaseDate}>
                                                {track.targetReleaseDate ? new Date(track.targetReleaseDate).toLocaleDateString() : 'Not Selected'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(track._id)}
                                            className="mt-2"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleEdit(track)}
                                            className="mt-2 ms-2"
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
                <Col md={4}>    
                    <div className="p-3 border rounded">
                        <AddTrack refreshTracks={fetchTracks}/>
                    </div>
                </Col>
            </Row>
            {currentTrack && (
                <EditTrackModal
                    show={showModal}
                    handleClose={handleModalClose}
                    track={currentTrack}
                    refreshTracks={fetchTracks}
                />
            )}
            {currentArtist && (
                <ArtistDetailsModal
                    show={showArtistModal}
                    handleClose={handleArtistModalClose}
                    artist={currentArtist}
                />
            )}
        </Container>
    );
};

export default Tracks;
