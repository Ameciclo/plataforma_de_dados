import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export function ImageWithLink({
    url,
    alt,
    src,
    aspectRatio = 16 / 9,
    width = 400,
    target = "_blank",
  }) {
    return (
      <Link href={url} target={target}>
        <div className="relative h-0" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
          <Image
            className="absolute top-0 left-0 w-full h-full"
            alt={alt}
            src={src}
            width={width}
            height={width/aspectRatio}
          />
        </div>
      </Link>
    );
  }
  
