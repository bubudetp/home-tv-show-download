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
          <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 h5">Loading details...</p>
        </div>
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-lg" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error instanceof Error ? error.message : 'Could not load details'}
        </div>
        <div className="d-flex gap-2">
          <Button label={<><i className="bi bi-arrow-left me-2"></i>Go Back</>} onClick={() => navigate(-1)} variant="secondary" />
          <Button label={<><i className="bi bi-house me-2"></i>Home</>} onClick={() => navigate('/')} variant="primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Navigation */}
      <div className="d-flex gap-2 mb-4">
        <Button 
          label={<><i className="bi bi-arrow-left me-2"></i>Go Back</>}
          onClick={() => navigate(-1)} 
          variant="secondary"
        />
        <Button 
          label={<><i className="bi bi-search me-2"></i>New Search</>}
          onClick={() => navigate('/')} 
          variant="primary"
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0">
            <img
              src={details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              className="card-img-top"
              alt={details.Title}
              style={{ borderRadius: '8px 8px 0 0' }}
            />
          </div>
          
          <div className="card mt-3 shadow-lg border-0">
            <div className="card-body text-center p-4">
              <h5 className="card-title mb-3">IMDb Rating</h5>
              <div className="display-3 mb-2">
                <i className="bi bi-star-fill text-warning me-2"></i>
                <span style={{ color: 'var(--jellyfin-warning)' }}>{details.imdbRating}</span>
              </div>
              <p className="text-muted mb-0">
                <i className="bi bi-people-fill me-1"></i>
                {details.imdbVotes} votes
              </p>
            </div>
          </div>

          {details.Ratings && details.Ratings.length > 0 && (
            <div className="card mt-3 shadow-lg border-0">
              <div className="card-body">
                <h6 className="card-title mb-3">
                  <i className="bi bi-star me-2"></i>
                  Other Ratings
                </h6>
                {details.Ratings.map((rating, index) => (
                  <div key={index} className="mb-3 pb-3" style={{ borderBottom: index < details.Ratings.length - 1 ? '1px solid var(--jellyfin-border)' : 'none' }}>
                    <small className="text-muted">{rating.Source}</small>
                    <div className="fw-bold h6 mb-0 mt-1">{rating.Value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-md-8">
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <h1 className="display-5 mb-3">{details.Title}</h1>
              
              <div className="mb-3">
                <span className="badge bg-primary me-2 px-3 py-2">{details.Type.toUpperCase()}</span>
                <span className="badge bg-secondary me-2 px-3 py-2">{details.Rated}</span>
                {details.totalSeasons && (
                  <span className="badge bg-info px-3 py-2">
                    <i className="bi bi-collection-play me-1"></i>
                    {details.totalSeasons} Seasons
                  </span>
                )}
              </div>

              <div className="d-flex flex-wrap gap-3 text-muted">
                <div>
                  <i className="bi bi-calendar3 me-2"></i>
                  <strong>Year:</strong> {details.Year}
                </div>
                <div>
                  <i className="bi bi-clock me-2"></i>
                  <strong>Runtime:</strong> {details.Runtime}
                </div>
                <div>
                  <i className="bi bi-calendar-event me-2"></i>
                  <strong>Released:</strong> {details.Released}
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">
                <i className="bi bi-book me-2"></i>
                Plot Summary
              </h5>
              <p className="card-text" style={{ lineHeight: '1.8' }}>{details.Plot}</p>
            </div>
          </div>

          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <h5 className="mb-3">
                <i className="bi bi-tags-fill me-2"></i>
                Genres
              </h5>
              <div>
                {details.Genre.split(', ').map((genre, index) => (
                  <span key={index} className="badge bg-dark me-2 mb-2 px-3 py-2">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body p-4">
                  <h6 className="card-title mb-3">
                    <i className="bi bi-person-video3 me-2"></i>
                    Director
                  </h6>
                  <p className="card-text mb-0">{details.Director}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body p-4">
                  <h6 className="card-title mb-3">
                    <i className="bi bi-pen-fill me-2"></i>
                    Writer
                  </h6>
                  <p className="card-text mb-0">{details.Writer}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <h6 className="card-title mb-3">
                <i className="bi bi-people-fill me-2"></i>
                Cast
              </h6>
              <p className="card-text mb-0">{details.Actors}</p>
            </div>
          </div>

          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body p-4">
              <h6 className="card-title mb-3">
                <i className="bi bi-info-circle-fill me-2"></i>
                Additional Information
              </h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong className="text-primary">Language:</strong> 
                  <span className="ms-2">{details.Language}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong className="text-primary">Country:</strong> 
                  <span className="ms-2">{details.Country}</span>
                </div>
                {details.BoxOffice && details.BoxOffice !== 'N/A' && (
                  <div className="col-md-6 mb-3">
                    <strong className="text-primary">Box Office:</strong> 
                    <span className="ms-2">{details.BoxOffice}</span>
                  </div>
                )}
                {details.DVD && details.DVD !== 'N/A' && (
                  <div className="col-md-6 mb-3">
                    <strong className="text-primary">DVD Release:</strong> 
                    <span className="ms-2">{details.DVD}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {details.Awards && details.Awards !== 'N/A' && (
            <div className="alert alert-success shadow-lg" role="alert">
              <i className="bi bi-trophy-fill me-2"></i>
              <strong>Awards:</strong> {details.Awards}
            </div>
          )}

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Button
              label={<><i className="bi bi-bookmark-plus me-2"></i>Add to Watchlist</>}
              onClick={() => console.log('Add to watchlist:', details.imdbID)}
              variant="success"
            />
            <Button
              label={<><i className="bi bi-check-circle me-2"></i>Mark as Watched</>}
              onClick={() => console.log('Mark as watched:', details.imdbID)}
              variant="info"
            />

            <a
              href={`https://www.imdb.com/title/${details.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning"
            >
              <i className="bi bi-box-arrow-up-right me-2"></i>
              View on IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;