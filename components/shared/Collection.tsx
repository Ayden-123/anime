import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import { getImages } from '@/models/image';

const Collection = ({ lang, dict, images }: { lang: string; dict: any; images: Image[] }) => {
  return (
    <div className="mt-5">
      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image: Image, idx: number) => (
            <Card image={image} lang={lang} key={image.id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

    </div>
  )
}

const Card = ({ image, lang }: { image: Image; lang: string }) => {
  return (
    <li>
      <a href={`/${lang}/detail/${image.id}`} target="_self" className="flex flex-1 flex-col gap-5 rounded-[16px] border-2 bg-white p-4">
        <div>
          <Image
            src={image.imageUrl}
            alt={image.prompt}
            width='500'
            height='500'
            loading="lazy"
            className="h-52 w-full rounded-[10px] object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
          <div className="flex-between">
            <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
              {image.prompt}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Collection
