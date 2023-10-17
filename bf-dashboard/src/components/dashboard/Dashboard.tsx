import React from 'react';

const Dashboard: React.FC<{ images: string[] }> = ({ images }) => {
  console.log(images);
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="image-grid">
        {images && images.length > 0 ? (
          images.map((imageUrl, index) => (
            <div key={index} className="image-card">
              <img src={imageUrl} alt={`Image ${index}`} />
            </div>
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
