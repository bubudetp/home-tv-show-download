import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useMovieDetails } from '../hooks/useMovieDetails';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: details, isLoading, isError, error } = useMovieDetails(id || '');

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading details...</p>
        </div>
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error instanceof Error ? error.message : 'Could not load details'}
        </div>
        <div className="d-flex gap-2">
          <Button label="Go Back" onClick={() => navigate(-1)} variant="secondary" />
          <Button label="Home" onClick={() => navigate('/')} variant="primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex gap-2 mb-4">
        <Button 
          label="Go Back" 
          onClick={() => navigate(-1)} 
          variant="secondary"
        />
        <Button 
          label="New Search" 
          onClick={() => navigate('/')} 
          variant="primary"
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src={details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
            className="img-fluid rounded shadow"
            alt={details.Title}
          />
          
          <div className="card mt-3 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">IMDb Rating</h5>
              <div className="display-4 text-warning">
                <i className="bi bi-star-fill me-2"></i>
                {details.imdbRating}
              </div>
              <p className="text-muted mb-0">{details.imdbVotes} votes</p>
            </div>
          </div>

          {details.Ratings && details.Ratings.length > 0 && (
            <div className="card mt-3 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Other Ratings</h6>
                {details.Ratings.map((rating, index) => (
                  <div key={index} className="mb-2">
                    <small className="text-muted">{rating.Source}</small>
                    <div className="fw-bold">{rating.Value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-md-8">
          <h1 className="display-5 mb-2">{details.Title}</h1>
          
          <div className="mb-3">
            <span className="badge bg-primary me-2">{details.Type.toUpperCase()}</span>
            <span className="badge bg-secondary me-2">{details.Rated}</span>
            {details.totalSeasons && (
              <span className="badge bg-info">{details.totalSeasons} Seasons</span>
            )}
          </div>

          <div className="row g-2 mb-4">
            <div className="col-auto">
              <i className="bi bi-calendar me-1"></i>
              <strong>Year:</strong> {details.Year}
            </div>
            <div className="col-auto">
              <i className="bi bi-clock me-1"></i>
              <strong>Runtime:</strong> {details.Runtime}
            </div>
            <div className="col-auto">
              <i className="bi bi-calendar-event me-1"></i>
              <strong>Released:</strong> {details.Released}
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-book me-2"></i>
                Plot
              </h5>
              <p className="card-text">{details.Plot}</p>
            </div>
          </div>

          <div className="mb-4">
            <h5><i className="bi bi-tags me-2"></i>Genre</h5>
            <div>
              {details.Genre.split(', ').map((genre, index) => (
                <span key={index} className="badge bg-dark me-2 mb-2">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">
                    <i className="bi bi-person-video me-2"></i>
                    Director
                  </h6>
                  <p className="card-text">{details.Director}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">
                    <i className="bi bi-pen me-2"></i>
                    Writer
                  </h6>
                  <p className="card-text">{details.Writer}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-people me-2"></i>
                Cast
              </h6>
              <p className="card-text">{details.Actors}</p>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Additional Information
              </h6>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Language:</strong> {details.Language}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Country:</strong> {details.Country}
                </div>
                {details.BoxOffice && details.BoxOffice !== 'N/A' && (
                  <div className="col-md-6 mb-2">
                    <strong>Box Office:</strong> {details.BoxOffice}
                  </div>
                )}
                {details.DVD && details.DVD !== 'N/A' && (
                  <div className="col-md-6 mb-2">
                    <strong>DVD Release:</strong> {details.DVD}
                  </div>
                )}
              </div>
            </div>
          </div>

          {details.Awards && details.Awards !== 'N/A' && (
            <div className="alert alert-success" role="alert">
              <i className="bi bi-trophy me-2"></i>
              <strong>Awards:</strong> {details.Awards}
            </div>
          )}

          <div className="d-flex gap-2 mt-4">
            <Button
              label="Add to Watchlist"
              onClick={() => console.log('Add to watchlist:', details.imdbID)}
              variant="success"
            />
            <Button
              label="Mark as Watched"
              onClick={() => console.log('Mark as watched:', details.imdbID)}
              variant="info"
            />

            <a
              href={`https://www.imdb.com/title/${details.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning"
            >
              <i className="bi bi-box-arrow-up-right me-1"></i>
              View on IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;