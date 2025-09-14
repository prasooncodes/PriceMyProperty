import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBed, FaHome, FaSearch, FaInfoCircle } from 'react-icons/fa';

import image1 from '../../Images/image1.jpeg';
import image2 from '../../Images/image2.jpeg';
import image3 from '../../Images/image3.jpg';

const Poster = () => {
    // --- Styles for the new design ---
    const heroContainerStyle = {
        position: 'relative',
        height: '650px', // Adjust height as needed
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        background: '#1a1a2e', // Fallback background color
    };

    const carouselOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.0)', // Slightly less opaque overlay for background images
        zIndex: 1,
    };

    const contentWrapperStyle = {
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px', // Max width for content centering
        padding: '0 20px',
    };

    const headlineStyle = {
        fontSize: '3.8rem', // Larger, bolder headline
        fontWeight: '700',
        marginBottom: '15px',
        textShadow: '0 4px 15px rgba(0,0,0,0.8)',
        letterSpacing: '-1px',
    };

    const subHeadlineStyle = {
        fontSize: '1.4rem',
        fontWeight: '300',
        marginBottom: '40px',
        textShadow: '0 2px 10px rgba(0,0,0,0.7)',
        color: '#ccc',
    };

    const searchBarStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        // --- MODIFIED HERE: Increased alpha to 0.4 for more transparency ---
        background: 'rgba(255, 255, 255, 0.4)', // More transparent white background
        borderRadius: '12px',
        padding: '20px',
        
        border: '1px solid rgba(255, 255, 255, 0.3)', // Slightly more visible border
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', // Added a subtle box shadow for depth
    };

    const inputGroupStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly more opaque input fields for readability
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const formControlStyle = {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#333',
        boxShadow: 'none',
    };

    const dropdownToggleStyle = {
        backgroundColor: '#fff',
        borderColor: '#eee',
        color: '#333',
        borderRadius: '8px',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    };

    const searchButtonStyle = {
        backgroundColor: '#007bff', // Your accent color
        borderColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        height: 'calc(2.5em + .75rem + 2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const infoTextStyle = {
        fontSize: '0.9rem',
        color: '#aaa',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
    };

    // Responsive adjustments
    const mediaQueries = `
        @media (min-width: 768px) {
            .search-bar-row {
                flex-direction: row;
            }
            .search-input-group {
                flex-grow: 1;
            }
        }
        @media (max-width: 767px) {
            .hero-headline {
                font-size: 2.5rem;
            }
            .hero-subheadline {
                font-size: 1.1rem;
            }
            .search-bar-row {
                flex-direction: column;
            }
            .search-bar-row > * {
                width: 100%;
            }
            .hero-section-search-bar { /* Apply responsive styles to the search bar itself */
                padding: 15px;
            }
        }
    `;

    return (
        <div style={heroContainerStyle}>
            <style>{mediaQueries}</style>

            <Carousel interval={7000} fade controls={false} indicators={false} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <Carousel.Item style={{ height: '100%' }}>
                    <img className="d-block w-100" src={image1} alt="Cityscape background" style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                </Carousel.Item>
                <Carousel.Item style={{ height: '100%' }}>
                    <img className="d-block w-100" src={image2} alt="Modern home background" style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                </Carousel.Item>
                <Carousel.Item style={{ height: '100%' }}>
                    <img className="d-block w-100" src={image3} alt="Abstract property background" style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                </Carousel.Item>
            </Carousel>

            <div style={carouselOverlayStyle} />

            <div style={contentWrapperStyle}>
                <h1 className="hero-headline" style={headlineStyle}>Unlock Your Future</h1>
                <p className="hero-subheadline" style={subHeadlineStyle}>Seamlessly Find Your Dream Property</p>

                <div style={searchBarStyle} className="hero-section-search-bar"> {/* Added class for responsive styling */}
                    <div className="d-flex align-items-center justify-content-center search-bar-row" style={{ gap: '10px', flexWrap: 'wrap' }}>
                        <Dropdown as={InputGroup.Prepend}>
                            <Dropdown.Toggle variant="light" id="dropdown-bedrooms" style={dropdownToggleStyle}>
                                <FaBed className="me-2" /> Bedrooms: Select
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">1 BHK</Dropdown.Item>
                                <Dropdown.Item href="#">2 BHK</Dropdown.Item>
                                <Dropdown.Item href="#">3 BHK</Dropdown.Item>
                                <Dropdown.Item href="#">4+ BHK</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={InputGroup.Prepend}>
                            <Dropdown.Toggle variant="light" id="dropdown-property-type" style={dropdownToggleStyle}>
                                <FaHome className="me-2" /> Property Type: Select
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Flat</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <InputGroup className="search-input-group" style={inputGroupStyle}>
                            <InputGroup.Text style={{ border: 'none', backgroundColor: 'transparent' }}>
                                <FaMapMarkerAlt style={{ color: '#007bff' }} />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter Location or Area..."
                                style={formControlStyle}
                            />
                        </InputGroup>

                        <Button variant="primary" type="submit" style={searchButtonStyle}>
                            <FaSearch className="me-2" /> Search
                        </Button>
                    </div>
                    <p style={infoTextStyle}>
                        <FaInfoCircle /> Currently featuring a wide selection of flats.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Poster;