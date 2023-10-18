import './dashboard.scss';

import React from 'react';

const Dashboard: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div>
      <div className="image-grid">
        {images && images.length > 0 ? (
          images.map((imageUrl, index) => {
            // Extract the filename from the image URL
            const filenameWithExtension = imageUrl.split('/').pop();
            if (filenameWithExtension == null) {
              return null;
            }
            // Remove the file extension from the filename
            const filename = filenameWithExtension.split('.')[0];

            return (
              <div key={index} className="image-card">
                <h3>{filename}</h3>
                <img src={imageUrl} alt={filenameWithExtension} />
              </div>
            );
          })
        ) : (
          <p>No images to display</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
