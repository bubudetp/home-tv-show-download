import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }
    navigate(`/results?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleQuickView = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie or show name");
      return;
    }
    navigate(`/details/${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyPress = () => {
    handleSearch();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="hero-section text-center px-4 py-5 mb-4">
            <h1 className="display-4 mb-3">
              <i className="bi bi-film me-3"></i>
              Movie & TV Library
            </h1>
            <p className="lead text-muted mb-0">
              Discover and explore your favorite movies and TV shows
            </p>
          </div>

          <div className="card shadow-lg mb-4">
            <div className="card-body p-4">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleKeyPress}
                placeholder="Search for movies or TV shows..."
                label="Search"
                showSearchIcon={true}
              />
              
              <div className="d-flex gap-3 mt-3">
                <Button
                  label={<><i className="bi bi-search me-2"></i>Search Library</>}
                  onClick={handleSearch}
                  variant="primary"
                  className="flex-grow-1"
                />
                <Button
                  label={<><i className="bi bi-lightning-fill me-2"></i>Quick View</>}
                  onClick={handleQuickView}
                  variant="info"
                />
              </div>
              
              <div className="mt-3 p-3" style={{ backgroundColor: 'rgba(0, 164, 220, 0.1)', borderRadius: '6px' }}>
                <small className="text-muted d-block">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Tip:</strong> Use "Search Library" to browse all matches, or "Quick View" for instant details
                </small>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-warning shadow" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="bi bi-search display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Smart Search</h5>
                  <p className="text-muted small">Find any movie or TV show instantly</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="bi bi-star-fill display-4 text-warning mb-3"></i>
                  <h5 className="card-title">Ratings & Reviews</h5>
                  <p className="text-muted small">See IMDb ratings and critic scores</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="bi bi-info-circle-fill display-4 text-info mb-3"></i>
                  <h5 className="card-title">Full Details</h5>
                  <p className="text-muted small">Cast, plot, and everything you need</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;