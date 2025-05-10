import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

const FantasyMovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<FantasyMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const stored = localStorage.getItem("fantasyMovies");
      if (stored) {
        try {
          const parsed: FantasyMovie[] = JSON.parse(stored);
          const found = parsed.find((m) => m.id === id);
          setMovie(found || null);
        } catch (error) {
          console.error("Error parsing fantasyMovies:", error);
        }
      }
      // Add slight delay for transition effect
      setTimeout(() => setLoading(false), 300);
    };
    
    fetchMovie();
  }, [id]);

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

  if (!movie) {
    return (
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.5s ease-out',
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#dc2626',
          marginBottom: '1rem',
        }}>Movie not found</h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#4b5563',
          lineHeight: '1.6',
        }}>
          The movie with ID <strong>{id}</strong> could not be found.
        </p>
        <Link to="/fantasy" style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease',
        }}>
          Back to Movie List
        </Link>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
      display: 'flex',
      flexDirection: 'column',
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
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .cast-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .back-button:hover {
          background-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>

      {/* Hero section with poster and title overlay */}
      <div style={{
        position: 'relative',
        height: '300px',
        width: '100%',
        overflow: 'hidden',
      }}>
        {movie.poster && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${movie.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) brightness(0.7)',
            zIndex: 1,
          }} />
        )}
        
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem',
          zIndex: 2,
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          }}>{movie.title}</h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '500',
          }}>Created on: {new Date(movie.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Content section */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
      }}>
        {/* Poster and details flex container */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}>
          {/* Poster with frame effect */}
          {movie.poster && (
            <div style={{
              flexShrink: 0,
              position: 'relative',
              marginTop: '-6rem',
              zIndex: 3,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
            }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: '220px',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Movie details */}
          <div style={{
            flex: '1',
            minWidth: '280px',
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1e3a8a',
              marginBottom: '1.5rem',
              position: 'relative',
              paddingBottom: '0.75rem',
            }}>Cast & Characters</h3>
          </div>
        </div>

        {/* Cast list */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {movie.cast.map((member, index) => (
            <div 
              key={index} 
              className="cast-item"
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                animation: `slideIn 0.5s ease-out ${0.1 * index}s both`,
                height: '100%',
              }}
            >
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#3b82f6',
                marginBottom: '0.5rem',
              }}>{member.actorName}</h4>
              
              <p style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: '0.75rem',
                fontStyle: 'italic',
              }}>as {member.roleName}</p>
              
              <p style={{
                fontSize: '0.95rem',
                color: '#4b5563',
                lineHeight: '1.5',
              }}>{member.roleDescription}</p>
            </div>
          ))}
        </div>

        {/* Back button */}
        <Link 
          to="/fantasy" 
          className="back-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            marginTop: '1rem',
          }}
        >
          <span style={{ 
            display: 'inline-block', 
            marginRight: '6px',  
            fontSize: '1.2rem' 
          }}>←</span> 
          Back to Movie List
        </Link>
      </div>
    </div>
  );
};

export default FantasyMovieDetail;