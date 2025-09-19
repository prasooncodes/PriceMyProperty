import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchAllData, resetData } from '../../RTK/Slices/allDataSlice';
import './AllFlats.css';

const AllFlats = () => {
    const dispatch = useDispatch();
    const { data, loading, error, currentPage } = useSelector((state) => state.allData);

    useEffect(() => {
        // Load initial data
        dispatch(fetchAllData(1));
        
        return () => {
            // Cleanup on component unmount
            dispatch(resetData());
        };
    }, [dispatch]);

    const handleLoadMore = () => {
        dispatch(fetchAllData(currentPage + 1));
    };

    const handleContactClick = (e, contactNumber) => {
        e.stopPropagation();
        if (contactNumber) {
            window.open(`tel:${contactNumber}`, '_self');
        } else {
            alert('Contact number not available');
        }
    };

    const formatPrice = (price) => {
        if (!price) return 'Price not available';
        return `₹${(price / 10000000).toFixed(2)} Cr`;
    };

    const formatArea = (area) => {
        if (!area) return 'N/A';
        return `${area} sqft`;
    };

    if (loading && (!data || data.length === 0)) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div className="mt-3">
                    <h5>Loading Properties...</h5>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="all-flats-container py-4">
            <Row>
                <Col>
                    <h2 className="text-center mb-4 text-light">Available Properties</h2>
                    
                    {error && (
                        <Alert variant="danger" className="mb-4">
                            <Alert.Heading>Error Loading Data</Alert.Heading>
                            <p>{error}</p>
                            <Button 
                                variant="outline-danger" 
                                onClick={() => dispatch(fetchAllData(1))}
                            >
                                Retry
                            </Button>
                        </Alert>
                    )}

                    {data && data.length > 0 ? (
                        <>
                            <Row>
                                {data.map((flat, index) => (
                                    <Col key={flat._id || index} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                                        <Card className="property-card h-100 border-light">
                                            <Card.Header className="bg-dark text-light">
                                                <Card.Title className="mb-0 text-truncate">
                                                    {flat.SOCIETY_NAME || 'Property Name Not Available'}
                                                </Card.Title>
                                                <small className="text-muted">
                                                    📍 {flat.location || flat.CITY || 'Location not specified'}
                                                </small>
                                            </Card.Header>
                                            
                                            <Card.Body className="d-flex flex-column">
                                                {/* Price Section */}
                                                <div className="price-section mb-3">
                                                    <div className="price-main">
                                                        <strong className="text-success fs-5">
                                                            {formatPrice(flat.PRICE)}
                                                        </strong>
                                                        {flat.PRICE_PERSQFT && (
                                                            <small className="text-muted d-block">
                                                                ₹{flat.PRICE_PERSQFT}/sqft
                                                            </small>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Property Details */}
                                                <div className="property-details mb-3">
                                                    <Row className="g-2">
                                                        <Col xs={6}>
                                                            <div className="detail-item">
                                                                <span className="detail-label">🏠 BHK:</span>
                                                                <span className="detail-value">{flat.BEDROOM_NUM || 'N/A'}</span>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div className="detail-item">
                                                                <span className="detail-label">📐 Area:</span>
                                                                <span className="detail-value">{formatArea(flat.AREA)}</span>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div className="detail-item">
                                                                <span className="detail-label">🏢 Floor:</span>
                                                                <span className="detail-value">{flat.FLOOR_NUM || 'N/A'}</span>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div className="detail-item">
                                                                <span className="detail-label">🚿 Bath:</span>
                                                                <span className="detail-value">{flat.WASHROOM_NUM || 'N/A'}</span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                {/* Amenities */}
                                                <div className="amenities-section mb-3">
                                                    <div className="amenities-list">
                                                        {flat.Swimming_Pool && <span className="amenity-tag">🏊 Pool</span>}
                                                        {flat.playground && <span className="amenity-tag">🏀 Playground</span>}
                                                        {flat.security && <span className="amenity-tag">🛡️ Security</span>}
                                                        {flat.park && <span className="amenity-tag">🌳 Park</span>}
                                                        {flat.parking && <span className="amenity-tag">🚗 Parking</span>}
                                                    </div>
                                                </div>

                                                {/* Property Status */}
                                                <div className="status-section mb-3">
                                                    <div className="status-badges">
                                                        {flat.PROPERTY_AGE && (
                                                            <span className="status-badge age-badge">
                                                                🕐 {flat.PROPERTY_AGE}
                                                            </span>
                                                        )}
                                                        {flat.FURN && (
                                                            <span className="status-badge furnish-badge">
                                                                🏠 {flat.FURN}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-auto">
                                                    <div className="action-buttons d-grid gap-2">
                                                        <Button 
                                                            variant="primary" 
                                                            size="sm"
                                                            onClick={(e) => handleContactClick(e, flat.CONTACT)}
                                                        >
                                                            📞 Contact
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Load More Button */}
                            {data.length >= 20 && (
                                <Row className="mt-4">
                                    <Col className="text-center">
                                        <Button 
                                            variant="outline-primary" 
                                            onClick={handleLoadMore}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        className="me-2"
                                                    />
                                                    Loading More...
                                                </>
                                            ) : (
                                                'Load More Properties'
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        !loading && (
                            <Alert variant="info" className="text-center">
                                <Alert.Heading>No Properties Available</Alert.Heading>
                                <p>There are currently no properties to display. Please check back later.</p>
                            </Alert>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AllFlats;