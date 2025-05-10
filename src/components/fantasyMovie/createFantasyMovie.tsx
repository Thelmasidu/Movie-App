import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { saveFantasyMovies, getFantasyMovies } from "../../utils/localStorageUtils";

type CastMember = {
  actorName: string;
  roleName: string;
  roleDescription: string;
};

const CreateFantasyMovie = () => {
  const [title, setTitle] = useState("");
  const [cast, setCast] = useState<CastMember[]>([
    { actorName: "", roleName: "", roleDescription: "" },
  ]);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleCastChange = (
    index: number,
    field: keyof CastMember,
    value: string
  ) => {
    const updatedCast = [...cast];
    updatedCast[index][field] = value;
    setCast(updatedCast);
  };

  const addCastMember = () => {
    setCast([...cast, { actorName: "", roleName: "", roleDescription: "" }]);
  };

  const removeCastMember = (index: number) => {
    if (cast.length > 1) {
      const updatedCast = [...cast];
      updatedCast.splice(index, 1);
      setCast(updatedCast);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      setPreview(URL.createObjectURL(file));
      setPosterUrl("");
    }
  };

  useEffect(() => {
    if (posterUrl) {
      setPreview(posterUrl);
      setPosterFile(null);
    }
  }, [posterUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movie = {
      id: uuidv4(),
      title,
      cast,
      poster: posterFile ? preview : posterUrl,
      createdAt: new Date().toISOString(),
    };

    const existingMovies = getFantasyMovies();
    saveFantasyMovies([...existingMovies, movie]);

    navigate("/fantasy");
  };

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "2rem auto",
      padding: "2.5rem",
      borderRadius: "16px",
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        marginBottom: "1.5rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.5px",
      }}>Create Your Fantasy Movie</h2>

      <div style={{
        width: "100%",
        height: "4px",
        background: "linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899)",
        marginBottom: "2rem",
        borderRadius: "2px",
      }}></div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ position: "relative" }}>
          <label 
            htmlFor="movieTitle" 
            style={{
              display: "block",
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#1F2937",
              transition: "color 0.3s ease",
            }}
          >
            Movie Title
          </label>
          <input
            id="movieTitle"
            type="text"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "1.1rem",
              border: "2px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease",
              backgroundColor: "#F9FAFB",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
            }}
            placeholder="Enter an epic movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
            onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            required
          />
        </div>

        <div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#4F46E5",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.5rem",
              fontSize: "0.875rem",
            }}>1</span>
            Cast Members
          </h3>

          {cast.map((member, index) => (
            <div 
              key={index} 
              style={{
                padding: "1.25rem",
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                border: "1px solid #E5E7EB",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.02)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h4 style={{ color: "#4F46E5", fontWeight: "600" }}>Cast Member #{index + 1}</h4>
                {cast.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCastMember(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#EF4444",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FEE2E2"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label
                    style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem", color: "#4B5563" }}
                  >
                    Actor Name
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "2px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      transition: "border-color 0.3s ease",
                    }}
                    placeholder="e.g. Tom Hanks"
                    value={member.actorName}
                    onChange={(e) => handleCastChange(index, "actorName", e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
                <div>
                  <label
                    style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem", color: "#4B5563" }}
                  >
                    Role Name
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.625rem 0.75rem",
                      border: "2px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      transition: "border-color 0.3s ease",
                    }}
                    placeholder="e.g. Captain Jack"
                    value={member.roleName}
                    onChange={(e) => handleCastChange(index, "roleName", e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                    onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.25rem", color: "#4B5563" }}
                >
                  Role Description
                </label>
                <textarea
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.75rem",
                    border: "2px solid #E5E7EB",
                    borderRadius: "6px",
                    minHeight: "80px",
                    resize: "vertical",
                    fontSize: "0.95rem",
                    transition: "border-color 0.3s ease",
                    lineHeight: "1.5",
                  }}
                  placeholder="Describe the character and their story arc..."
                  value={member.roleDescription}
                  onChange={(e) => handleCastChange(index, "roleDescription", e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addCastMember}
            style={{
              backgroundColor: "transparent",
              color: "#4F46E5",
              border: "2px dashed #A5B4FC",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.95rem",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              transition: "all 0.3s ease",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#EEF2FF";
              e.currentTarget.style.borderColor = "#4F46E5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#A5B4FC";
            }}
          >
            <span style={{ marginRight: "0.5rem", fontSize: "1.25rem" }}>+</span> Add Another Cast Member
          </button>
        </div>

        <div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#4F46E5",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.5rem",
              fontSize: "0.875rem",
            }}>2</span>
            Movie Poster
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: preview ? "1fr 1fr" : "1fr",
            gap: "1.5rem",
            alignItems: "start",
          }}>
            <div style={{ 
              backgroundColor: "#F9FAFB", 
              padding: "1.5rem", 
              borderRadius: "12px",
              border: "1px solid #E5E7EB"
            }}>
              <div style={{
                border: "2px dashed #A5B4FC",
                borderRadius: "8px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                marginBottom: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: "#F5F7FF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4F46E5";
                e.currentTarget.style.backgroundColor = "#EEF2FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#A5B4FC";
                e.currentTarget.style.backgroundColor = "#F5F7FF";
              }}
              onClick={() => document.getElementById("posterUpload")?.click()}
              >
                <div style={{ 
                  fontSize: "2rem",
                  color: "#6366F1",
                  marginBottom: "0.5rem" 
                }}>
                  +
                </div>
                <p style={{ color: "#4B5563", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Click to upload movie poster
                </p>
                <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                  Supported formats: JPG, PNG, WebP
                </p>
                <input
                  id="posterUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <p style={{ 
                  textAlign: "center", 
                  color: "#6B7280", 
                  margin: "1rem 0",
                  fontSize: "0.875rem", 
                  fontWeight: "500" 
                }}>
                  OR
                </p>

                <label 
                  htmlFor="posterUrl" 
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                    color: "#4B5563"
                  }}
                >
                  Paste Poster URL
                </label>
                <input
                  id="posterUrl"
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    fontSize: "0.95rem",
                    border: "2px solid #E5E7EB",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                  }}
                  placeholder="https://example.com/movie-poster.jpg"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                  onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
            </div>

            {preview && (
              <div style={{
                position: "relative",
                width: "100%",
                height: "300px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  src={preview}
                  alt="Movie Poster Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: isHovering ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  padding: "1rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                  color: "white",
                  fontWeight: "600",
                  textAlign: "center",
                  opacity: isHovering ? 1 : 0.7,
                  transition: "opacity 0.3s ease",
                }}>
                  Poster Preview
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(79, 70, 229, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
          }}
        >
          Create Your Fantasy Movie
        </button>
      </form>
    </div>
  );
};

export default CreateFantasyMovie;