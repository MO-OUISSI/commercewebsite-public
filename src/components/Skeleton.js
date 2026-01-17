import React from 'react';

const Skeleton = ({ width, height, borderRadius, className = '', style = {} }) => {
    const skeletonStyle = {
        width: width || '100%',
        height: height || '1rem',
        borderRadius: borderRadius || '0.25rem',
        ...style
    };

    return (
        <div
            className={`skeleton ${className}`}
            style={skeletonStyle}
        />
    );
};

export default Skeleton;
