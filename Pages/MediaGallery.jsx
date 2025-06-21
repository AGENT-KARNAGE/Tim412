import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import './MediaGallery.css'; // 👈 Import the CSS file

const MediaGallery = ({ user }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.email !== "admin@example.com") return;

    const fetchMedia = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'uploads');
      try {
        const res = await listAll(listRef);
        const urlPromises = res.items.map(itemRef => getDownloadURL(itemRef));
        const urls = await Promise.all(urlPromises);
        setUrls(urls);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMedia();
  }, [user]);

  if (!user || user.email !== "admin@example.com") {
    return <p className="media-message">Only admins can view the media gallery.</p>;
  }

  return (
    <div className="media-container">
      <h2>📸 Media Gallery</h2>
      {loading ? (
        <p>Loading media...</p>
      ) : (
        <div className="media-grid">
          {urls.map((url, i) => (
            <div key={i} className="media-item">
              {url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i) ? (
                <img src={url} alt="media" className="media-media" />
              ) : (
                <video src={url} controls className="media-media"></video>
              )}
              <a href={url} target="_blank" rel="noopener noreferrer">View</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
