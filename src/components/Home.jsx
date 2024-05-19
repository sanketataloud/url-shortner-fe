import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortenedUrl('');

    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4005/short', { url });
      
      if (response.status === 200) {
        setShortenedUrl(response.data.data);
        setShowModal(true);
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='url'>Enter URL to shorten:</label>
            <input
              type='url'
              id='url'
              value={url}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type='submit'>Shorten URL</button>
        </form>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>Shortened URL:</p>
              <a href={shortenedUrl} target='_blank' rel='noopener noreferrer'>
                {shortenedUrl}
              </a>
            </div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Home;
