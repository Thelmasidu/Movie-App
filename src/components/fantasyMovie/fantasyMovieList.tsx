import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CastMember = {
  actorName: string;
  roleName: string;
  roleDescription: string;
};

type FantasyMovie = {
  id: string;
  title: string;
  cast: CastMember[];
  poster: string;
  createdAt: string;
};

const FantasyMovieList = () => {
  const [movies, setMovies] = useState<FantasyMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const stored = localStorage.getItem("fantasyMovies");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setMovies(parsed);
          }
        } catch (error) {
          console.error("Failed to parse fantasyMovies from localStorage:", error);
        }
      }
      // Add slight delay for transition effect
      setTimeout(() => setLoading(false), 300);
    };
    
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}>
        <div style={{
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
        }}></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '0',
      borderRadius: '16px',
      backgroundColor: '#f8fafc',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      animation: 'fadeIn 0.6s ease-out',
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .movie-card {
          transition: all 0.3s ease;
        }
        
        .movie-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.15);
        }
        
        .movie-poster-container {
          overflow: hidden;
          transition: all 0.4s ease;
        }
        
        .movie-poster {
          transition: all 0.5s ease;
        }
        
        .movie-card:hover .movie-poster {
          transform: scale(1.08);
        }
        
        .create-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px -3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
      
      {/* Header with gradient background */}
      <div style={{
        padding: '2.5rem 2rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 40%)',
          zIndex: 1,
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            margin: 0,
          }}>Fantasy Movies</h2>
          
          <Link to="/fantasy/create" style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }} className="create-button">
            <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>+</span>
            Create New
          </Link>
        </div>
      </div>
      
      {/* Content section */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
      }}>
        {movies.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            borderRadius: '12px',
            border: '1px dashed #d1d5db',
            backgroundColor: '#f9fafb',
          }}>
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#9ca3af" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ margin: '0 auto 1.5rem' }}
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
            </svg>
            
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#4b5563',
              marginBottom: '1rem',
            }}>No fantasy movies saved yet</h3>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '400px',
              margin: '0 auto 1.5rem',
            }}>
              Create your first fantasy movie by clicking the button above.
            </p>
            
            <Link to="/fantasy/create" style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }} className="create-button">
              <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>+</span>
              Create New
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {movies.map((movie, index) => (
              <Link
                key={movie.id}
                to={`/fantasy/${movie.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div 
                  className="movie-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    animation: `slideIn 0.4s ease-out ${0.1 * index}s both`,
                  }}
                >
                  {movie.poster ? (
                    <div className="movie-poster-container" style={{
                      width: '100px',
                      height: '150px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      flexShrink: 0,
                    }}>
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-poster"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '100px',
                      height: '150px',
                      borderRadius: '8px',
                      backgroundColor: '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg 
                        width="30" 
                        height="30" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#9ca3af" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      </svg>
                    </div>
                  )}
                  
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1e3a8a',
                        marginBottom: '0.5rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>{movie.title}</h3>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '16px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      }}>
                        {movie.cast.length} {movie.cast.length === 1 ? 'cast member' : 'cast members'}
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '1rem',
                    }}>
                      Created on {new Date(movie.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                    }}>
                      {movie.cast.slice(0, 3).map((member, i) => (
                        <div key={i} style={{
                          backgroundColor: '#f3f4f6',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap',
                        }}>
                          {member.actorName}
                        </div>
                      ))}
                      
                      {movie.cast.length > 3 && (
                        <div style={{
                          backgroundColor: '#f3f4f6',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap',
                        }}>
                          +{movie.cast.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div style={{
                    color: '#3b82f6',
                  }}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        transition: 'transform 0.3s ease',
                      }}
                      className="arrow-icon"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FantasyMovieList;