import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './building.png';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="brand">
            <img src={logo} alt="Logo" style={{ height: '30px' }} />
            <span>PriceMyProperty</span>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto nav-links">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-animated">
                <i className="fa-solid fa-home"></i>&nbsp; Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/predict">
              <Nav.Link className="nav-link-animated">
                <i className="fa-solid fa-cloud"></i>&nbsp; Predict
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/analysis">
              <Nav.Link className="nav-link-animated">
                <i className="fa-solid fa-chart-simple"></i>&nbsp; Analysis
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/wishlist">
              <Nav.Link className="nav-link-animated">
                <i className="fa-solid fa-heart"></i>&nbsp; Wishlists
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/Project_DEtails">
              <Nav.Link className="nav-link-animated">
                <i className="fa-solid fa-clipboard-question"></i>&nbsp; Project Details
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .custom-navbar {
          background-color: #0e1117;
          border-radius: 20px;
          margin: 10px auto;
          width: 95%;
          padding: 0.5rem 1rem;
          animation: slideDown 0.8s ease forwards;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-navbar.scrolled {
          background-color: rgba(14,17,23,0.9);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #fff;
          font-size: 1.2rem;
        }
        .nav-links {
          align-items: center;
          gap: 20px;
        }
        .nav-link-animated {
          color: #ffffff !important;
          position: relative;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .nav-link-animated:hover {
          color: #00c2ff !important;
          transform: scale(1.1);
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Navbar>
  );
}

export default NavBar;
