// src/Components/Home/AllFlats.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllData, resetData } from '../../RTK/Slices/allDataSlice'; // Remove loadSampleData
import { addToCart } from '../../RTK/Slices/cartSlice';
import './AllFlats.css';

const AllFlats = () => {
  const dispatch = useDispatch();
  const { data, loading, error, totalPages, currentPage } = useSelector((state) => state.allData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllData(page));
  }, [dispatch, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleAddToCart = (flat) => {
    dispatch(addToCart(flat));
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          Error loading properties: {error}
        </div>
        <Button variant="primary" onClick={() => dispatch(fetchAllData(page))}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Properties</h2>
      
      {data.length === 0 ? (
        <div className="text-center">
          <p>No properties found.</p>
          <Button variant="primary" onClick={() => dispatch(fetchAllData(1))}>
            Load Properties
          </Button>
        </div>
      ) : (
        <>
          <Row>
            {data.map((flat) => (
              <Col key={flat._id} md={6} lg={4} className="mb-4">
                <Card className="h-100 flat-card">
                  <Card.Img 
                    variant="top" 
                    src={flat.Image || 'https://via.placeholder.com/300x200?text=Property+Image'} 
                    alt={flat.SOCIETY_NAME}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{flat.SOCIETY_NAME}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {flat.location}, {flat.CITY}<br/>
                      <strong>Price:</strong> ₹{flat.PRICE?.toLocaleString() || 'N/A'}<br/>
                      <strong>Area:</strong> {flat.AREA} sq.ft.<br/>
                      <strong>Bedrooms:</strong> {flat.BEDROOM_NUM}<br/>
                      <strong>Bathrooms:</strong> {flat.BATHROOM_NUM || 'N/A'}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      className="mt-auto"
                      onClick={() => handleAddToCart(flat)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First 
                  onClick={() => handlePageChange(1)} 
                  disabled={page === 1} 
                />
                <Pagination.Prev 
                  onClick={() => handlePageChange(page - 1)} 
                  disabled={page === 1} 
                />
                
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                
                <Pagination.Next 
                  onClick={() => handlePageChange(page + 1)} 
                  disabled={page === totalPages} 
                />
                <Pagination.Last 
                  onClick={() => handlePageChange(totalPages)} 
                  disabled={page === totalPages} 
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AllFlats;