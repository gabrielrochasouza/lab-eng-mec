import React, { useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface ImageWithLoaderProps extends React.ComponentPropsWithoutRef<'img'> {
  className?: string; sizeClassName?: string
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ className, sizeClassName, ...imgProps }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className={`relative ${sizeClassName}`} style={imgProps.style}>
            { isLoading && <Skeleton className={`absolute ${sizeClassName}`} style={imgProps.style} /> }
            <img
                {...imgProps}
                onLoad={() => setIsLoading(false)}
                className={`transition-opacity duration-200  ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
            />
        </div>
    );
};

export default ImageWithLoader;