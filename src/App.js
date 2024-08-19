import React, { useState } from "react";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]); // Stores the URLs input by the user
  const [metadata, setMetadata] = useState([]); // Stores the metadata fetched from the backend
  const [error, setError] = useState(""); // Error state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if there are at least 3 URLs
    if (urls.length < 3) {
      setError("Please provide at least 3 URLs.");
      return;
    }

    // Send POST request to backend
    fetch("http://localhost:5000/fetch-metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls }), // Send the URLs as an array in the body
    })
      .then((response) => response.json())
      .then((data) => {
        setMetadata(data); // Set the fetched metadata in state
        console.log(data);
        setError(""); // Clear any error messages
      })
      .catch((error) => {
        console.error("Error fetching metadata:", error);
        setError("Error fetching metadata. Please try again.");
      });
  };

  // Handle input change
  const handleInputChange = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const removeURL = (index) => {
    let newURLs = [...urls.slice(0, index), ...urls.slice(index + 1)];
    setUrls(newURLs);
  };

  return (
    <div className="app-container">
      <h1 className="title">Metadata Fetcher</h1>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              className="input-field"
              placeholder={`Enter URL #${index + 1}`}
              value={url || ""}
              onChange={(e) => handleInputChange(e, index)}
            />
            <button type="button" className="remove-btn" onClick={() => removeURL(index)}>
              Remove URL
            </button>
          </div>
        ))}
        <button
          type="button"
          className="form-btn"
          onClick={() => setUrls([...urls, ""])} // Add new input field
        >
          Add URL
        </button>
        <button type="submit" className="form-btn">
          Fetch Metadata
        </button>
      </form>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="metadata-container">
          {metadata.map((data, i) => (
            <div key={i} className="metadata">
              <h5> URL #{i + 1}</h5>
              <h1>{data.error || !data.title ? "Error" : data.title}</h1>
              <p>
                {data.error || !data.description
                  ? `${data.error} from ${data.url}`
                  : data.description}
              </p>
              {!data.image ? (
                <p style={{ color: "red" }}>Failed to retrieve image</p>
              ) : (
                <img
                  src={data.image}
                  alt={"img"}
                  style={{ maxWidth: "300px" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
