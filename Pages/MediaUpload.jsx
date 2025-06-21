// src/components/MediaUpload.jsx
import React, { useState } from 'react';
import { db, storage } from "../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import './MediaUpload.css'; // 👈 Link to external CSS

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setUrl('');
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");
    setUploading(true);

    const imageId = uuidv4();
    const storagePath = `thisWeekImages/${imageId}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (error) => {
        alert("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);

        const imagesRef = collection(db, "thisWeekImages");
        const q = query(imagesRef, orderBy("timestamp", "asc"));
        const snapshot = await getDocs(q);

        if (snapshot.size >= 8) {
          const oldest = snapshot.docs[0];
          const oldPath = oldest.data().storagePath;
          if (oldPath) {
            const oldRef = ref(storage, oldPath);
            await deleteObject(oldRef);
          }
          await deleteDoc(doc(db, "thisWeekImages", oldest.id));
        }

        await addDoc(imagesRef, {
          url: downloadURL,
          timestamp: Date.now(),
          storagePath: storagePath
        });

        setUploading(false);
        setFile(null);
        alert("✅ Image uploaded successfully!");
      }
    );
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload This Week Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-input"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {progress > 0 && <p className="upload-progress">Progress: {progress}%</p>}
      {url && (
        <div className="upload-result">
          <p><strong>Image URL:</strong></p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
