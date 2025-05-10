import { useEffect, useState } from "react";
import { getSupportArticles, SupportArticle } from "../api/storybook-api";

const StorybookSupportPage = () => {
  const [articles, setArticles] = useState<SupportArticle[]>([]);

  useEffect(() => {
    getSupportArticles().then(setArticles);
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#2c3e50" }}>
         Storybook Support
      </h1>
      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "6px",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ color: "#34495e", marginBottom: "0.5rem" }}>
            {article.title}
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#777" }}>
            <strong>By:</strong> {article.author} | <strong>Date:</strong>{" "}
            {article.date}
          </p>
          <p style={{ margin: "1rem 0", lineHeight: "1.6" }}>
            {article.summary}
          </p>
          {article.tags && (
            <p style={{ fontStyle: "italic", color: "#555" }}>
              <strong>Tags:</strong> {article.tags.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StorybookSupportPage;
