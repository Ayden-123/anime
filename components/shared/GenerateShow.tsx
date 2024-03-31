"use client"
import React from 'react'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
    // return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
const GenerateShow = () => {
  return (
    <div>
        hh
      <Image
        // loader={myLoader}
        src="https://replicate.delivery/pbxt/TpfLeUPc7zqORUnLmK7WH8nQZ8lw6bhtN0U8ht5NG7rPK1kSA/out-0.png"
        alt="Picture of the author"
        width={500}
        height={500}
        />
    </div>
  )
}

export default GenerateShow
