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
          <h1 className="text-center mb-4">
            <i className="bi bi-film me-2"></i>
            Movie & TV Show Search
          </h1>
          <p className="text-center text-muted mb-4">
            Search for your favorite movies and TV shows
          </p>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleKeyPress}
                placeholder="Search for movies or TV shows..."
                label="Search"
                showSearchIcon={true}
              />
              
              <div className="d-flex gap-2">
                <Button 
                  label="Search Multiple Results" 
                  onClick={handleSearch}
                  variant="primary"
                  className="flex-grow-1"
                />
                <Button 
                  label="Quick View" 
                  onClick={handleQuickView}
                  variant="success"
                />
              </div>
              
              <small className="text-muted d-block mt-2">
                <i className="bi bi-info-circle me-1"></i>
                Use "Search Multiple Results" to see all matches, or "Quick View" to go directly to a specific title
              </small>
            </div>
          </div>

          {error && (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;