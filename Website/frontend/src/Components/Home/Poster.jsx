import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../Images/image1.jpeg';
import image2 from '../../Images/image2.jpeg';
import image3 from '../../Images/image3.jpg';

const Poster = () => {
  const overlayStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    zIndex: 1
  };

  const imgContainerStyle = {
    height: '600px',
    position: 'relative',
    overflow: 'hidden'
  };

  const imgStyle = {
    height: '600px',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 6s ease'
  };

  const captionStyle = {
    zIndex: 2,
    animation: 'fadeIn 2s ease',
    textShadow: '0 2px 10px rgba(0,0,0,0.7)'
  };

  return (
    <>
      <style>{`
        .carousel-item:hover img {
          transform: scale(1.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Carousel interval={5000} fade>
        {/* Slide 1 */}
        <Carousel.Item>
          <div style={imgContainerStyle}>
            <img className="d-block w-100" src={image1} alt="First slide" style={imgStyle}/>
            <div style={overlayStyle}/>
            <Carousel.Caption style={captionStyle}>
              <h2 className="fw-bold display-5 mb-3">Embrace the Moment</h2>
              <p className="lead">
                Pause and savor the beauty of the present, where joy can be found in life’s simplest pleasures.
                <br/>Cherish each fleeting moment and create lasting memories.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div style={imgContainerStyle}>
            <img className="d-block w-100" src={image2} alt="Second slide" style={imgStyle}/>
            <div style={overlayStyle}/>
            <Carousel.Caption style={captionStyle}>
              <h2 className="fw-bold display-5 mb-3">Nature's Splendor</h2>
              <p className="lead">
                Immerse yourself in the breathtaking artistry of nature, from vibrant sunsets to serene forests.
                <br/>Celebrate and protect the wonders that nourish our spirit.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div style={imgContainerStyle}>
            <img className="d-block w-100" src={image3} alt="Third slide" style={imgStyle}/>
            <div style={overlayStyle}/>
            <Carousel.Caption style={captionStyle}>
              <h2 className="fw-bold display-5 mb-3">Chasing Dreams</h2>
              <p className="lead">
                Pursue your aspirations with passion and determination, knowing that every step counts.
                <br/>Embrace the journey, for it’s the chase that makes life extraordinary.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Poster;
