"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from "react";
import Image from 'next/image'
const Collection = () => {
    const [images, setImages] = useState([])
    async function getImages() {
        try {
            const uri = "/api/v1/getImages"
            const resp = await fetch(uri, {
                method: "GET",
            })
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                    setImages(res.data)
                    console.log('collections获取的data为', res.data)
                }
            } else {
                setImages([])
            }
        } catch (e) {
            console.log('getImages failed', e)
        }
    }

    useEffect(() => {
        getImages()
    }, [])

  return (
    <div className="mt-5">
      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image.id} />
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

const Card = ({ image }: { image: Image }) => {
    return (
      <li>
        <Link href={``} className="flex flex-1 flex-col gap-5 rounded-[16px] border-2 bg-white p-4">
          <Image
            src={image.imageUrl}
            alt='alt'
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
        </Link>
      </li>
    );
  };

export default Collection
