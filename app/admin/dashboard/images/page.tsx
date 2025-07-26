"use client";

import { useState, useEffect } from 'react';
import Layout from '../../components/page';

export default function Images() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return; // Prevent upload if no file is selected
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    // @ts-ignore
    setImages([...images, data.url]);
  };

  useEffect(() => {
    // Fetch existing images from database
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl mb-6">Image Upload</h1>
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img key={index} src={url} alt="Uploaded" className="w-full h-32 object-cover" />
        ))}
      </div>
    </Layout>
  );
}