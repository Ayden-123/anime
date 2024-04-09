"use client"
import React, { useState } from 'react'
import { useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";

const Collection = ({ lang, dict}: { lang: string; dict: any }) => {
    const [images, setImages] = useState([])
    async function getImages() {
        try {
          console.log("collection发起请求")
            const uri = "/api/v1/getImages"
            const resp = await fetch(uri, {
                method: "GET",
            })
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                  console.log("collection的res.data为", res.data)
                    setImages(res.data)
                }
            } else {
              console.log("collection失败, resp为", resp)
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
        <Link href={`/${lang}/detail/${image.id}`} className="flex flex-1 flex-col gap-5 rounded-[16px] border-2 bg-white p-4">
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
