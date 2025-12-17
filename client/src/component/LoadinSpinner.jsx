import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingSpinner = () => {
    return (
        <div className="video-cards">
          <Skeleton height={200} />
          <Skeleton height={20} style={{ marginTop: '8px' }} />
          <Skeleton height={16} style={{ marginTop: '4px' }} />
          <Skeleton height={16} style={{ marginTop: '4px' }} />
          <Skeleton height={100} style={{ marginTop: '8px' }} />
          <Skeleton height={40} style={{ marginTop: '8px' }} />
        </div>
  );
};

export default LoadingSpinner;
