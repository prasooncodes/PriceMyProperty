import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSampleData } from '../../RTK/Slices/allDataSlice';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Loading from '../Sections/Loading';
import { FaHeart, FaPhone, FaArrowRight, FaRulerCombined, FaBed, FaBath, FaHome, FaCity, FaCalendarAlt } from 'react-icons/fa';

// Import the CSS file
import './AllFlats.css';

const AllFlats = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState({});

    const { data, loading, error, hasMoreData } = useSelector((state) => state.allData);
    
    // Debug logs
    console.log('AllFlats Debug Info:');
    console.log('Data:', data);
    console.log('Data length:', data ? data.length : 0);
    console.log('Loading:', loading);
    console.log('Error:', error);

    // Load sample data immediately on component mount
    useEffect(() => {
        if (!data || data.length === 0) {
            console.log('Loading sample data...');
            dispatch(loadSampleData());
        }
    }, [dispatch, data]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-5 error-message">
                <p className="text-danger">Error: {error}</p>
                <Button variant="primary" onClick={() => dispatch(loadSampleData())}>Load Sample Data</Button>
            </div>
        );
    }

    const wishlistHandler = (flat) => {
        const existingData = JSON.parse(localStorage.getItem('wishList')) || [];
        const flatExists = existingData.some((item) => item._id === flat._id);

        if (!flatExists) {
            existingData.push(flat);
            localStorage.setItem('wishList', JSON.stringify(existingData));
            alert(`${flat.SOCIETY_NAME} added to wishlist!`);
        } else {
            alert(`${flat.SOCIETY_NAME} is already in your wishlist!`);
        }
    };

    const handleContactClick = (e, contactNumber) => {
        e.stopPropagation();
        if (contactNumber) {
            window.location.href = `tel:${contactNumber}`;
        } else {
            alert('Contact number not available');
        }
    };

    const formatPrice = (price) => {
        if (price >= 1) {
            return `₹${price.toFixed(2)} Cr`;
        } else {
            return `₹${(price * 100).toFixed(2)} Lakh`;
        }
    };

    return (
        <div className="all-flats-page">
            <Container>
                <div className="text-center mb-4">
                    <h2 className="section-title">Explore All Properties</h2>
                    <p className="section-subtitle">Find your dream home from our extensive collection</p>
                </div>
                
                <Row className="justify-content-center">
                    <Col lg={12}>
                        {(!data || !Array.isArray(data) || data.length === 0) ? (
                            <div className="text-center mt-5">
                                <div className="no-properties-container">
                                    <FaHome size={60} className="text-muted mb-3" />
                                    <p className="no-properties-message">No properties found.</p>
                                    <Button variant="primary" onClick={() => dispatch(loadSampleData())}>
                                        Load Sample Data
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Row>
                                {data.map((flat) => (
                                    <Col xs={12} key={flat._id || flat.PROP_ID} className="mb-4">
                                        <Card
                                            className={`property-card h-100 ${isHovered[flat._id] ? 'card-hovered' : ''}`}
                                            onMouseEnter={() => setIsHovered(prev => ({ ...prev, [flat._id]: true }))}
                                            onMouseLeave={() => setIsHovered(prev => ({ ...prev, [flat._id]: false }))}
                                        >
                                            <Row className="g-0 h-100">
                                                <Col md={4} className="card-img-col">
                                                    <div className="image-container">
                                                        <Card.Img
                                                            src={flat.Image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                                            alt={`Image of ${flat.SOCIETY_NAME}, ${flat.CITY}`}
                                                            className="card-img"
                                                        />
                                                        <div className="property-type-badge">
                                                            {flat.PROPERTY_TYPE || 'Flat'}
                                                        </div>
                                                        <Button
                                                            onClick={(e) => { e.stopPropagation(); wishlistHandler(flat); }}
                                                            className="wishlist-button"
                                                            aria-label="Add to wishlist"
                                                        >
                                                            <FaHeart />
                                                        </Button>
                                                    </div>
                                                </Col>
                                                
                                                <Col md={8}>
                                                    <Card.Body className="card-body d-flex flex-column">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <div>
                                                                    <Card.Title className="card-title">
                                                                        {flat.SOCIETY_NAME}
                                                                    </Card.Title>
                                                                    <Card.Subtitle className="card-subtitle mb-2">
                                                                        <FaCity className="me-1" /> 
                                                                        {flat.location}, {flat.CITY}
                                                                    </Card.Subtitle>
                                                                </div>
                                                                {flat.Situation && (
                                                                    <span className={`status-badge ${flat.Situation === 'Ready To Move' ? 'ready-to-move' : 'under-construction'}`}>
                                                                        {flat.Situation}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="price-section mb-3">
                                                                <h4 className="price-text">
                                                                    {formatPrice(flat.PRICE)}
                                                                </h4>
                                                                <div className="price-details">
                                                                    <span className="price-per-sqft">
                                                                        ₹{flat.Price_per_sqft?.toLocaleString() || 'N/A'}/sqft
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="property-details mb-3">
                                                                <Row>
                                                                    <Col xs={6} sm={3}>
                                                                        <div className="detail-item">
                                                                            <FaRulerCombined className="detail-icon" />
                                                                            <span>{flat.AREA || 'N/A'} sqft</span>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={6} sm={3}>
                                                                        <div className="detail-item">
                                                                            <FaBed className="detail-icon" />
                                                                            <span>{flat.BEDROOM_NUM || 'N/A'} BHK</span>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={6} sm={3}>
                                                                        <div className="detail-item">
                                                                            <FaBath className="detail-icon" />
                                                                            <span>{flat.BALCONY_NUM || 'N/A'} Balcony</span>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xs={6} sm={3}>
                                                                        <div className="detail-item">
                                                                            <FaCalendarAlt className="detail-icon" />
                                                                            <span>{flat.AGE || 'N/A'}</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            {flat.FURNISH && (
                                                                <div className="furnish-info mb-3">
                                                                    <span className="furnish-badge">
                                                                        {flat.FURNISH}
                                                                    </span>
                                                                    {flat.amenity_luxury && (
                                                                        <span className={`luxury-badge luxury-${flat.amenity_luxury.toLowerCase()}`}>
                                                                            {flat.amenity_luxury} Luxury
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {flat.DESCRIPTION && (
                                                                <Card.Text className="description-text">
                                                                    {flat.DESCRIPTION.length > 150 
                                                                        ? `${flat.DESCRIPTION.substring(0, 150)}...` 
                                                                        : flat.DESCRIPTION
                                                                    }
                                                                </Card.Text>
                                                            )}
                                                        </div>

                                                        <div className="card-actions">
                                                            <Row>
                                                                <Col xs={12} sm={4}>
                                                                    <Button
                                                                        onClick={(e) => handleContactClick(e, flat.Contact)}
                                                                        variant="outline-primary"
                                                                        className="w-100 mb-2 mb-sm-0"
                                                                        disabled={!flat.Contact}
                                                                    >
                                                                        <FaPhone className="me-1" /> Contact
                                                                    </Button>
                                                                </Col>
                                                                <Col xs={12} sm={8}>
                                                                    <Link 
                                                                        to={`/propertyDetails/${flat._id || flat.PROP_ID}`}
                                                                        className="text-decoration-none w-100"
                                                                    >
                                                                        <Button 
                                                                            variant="primary" 
                                                                            className="w-100 view-details-btn"
                                                                        >
                                                                            View Details <FaArrowRight className="ms-1" />
                                                                        </Button>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        
                        {/* Load More Button (if needed in future) */}
                        {hasMoreData && data && data.length > 0 && (
                            <div className="text-center mt-4">
                                <Button 
                                    variant="outline-primary" 
                                    size="lg"
                                    disabled={loading}
                                    onClick={() => {
                                        // Add load more functionality when connecting to real API
                                        console.log('Load more clicked');
                                    }}
                                >
                                    {loading ? 'Loading...' : 'Load More Properties'}
                                </Button>
                            </div>
                        )}

                        {/* Results Summary */}
                        {data && data.length > 0 && (
                            <div className="results-summary text-center mt-4">
                                <p className="text-muted">
                                    Showing {data.length} {data.length === 1 ? 'property' : 'properties'}
                                </p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AllFlats;