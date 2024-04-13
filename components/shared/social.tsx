import React from 'react'
import { FaProductHunt } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { useParams } from "next/navigation";
import { BsBook, BsGithub, BsTwitterX } from "react-icons/bs";
const Social = ({ lang, dict }: { lang: string; dict: any }) => {
  return (
    <div className="mx-auto flex flex-row items-center">
      <a
        href="https://github.com/Ayden-123/anime"
        target="_blank"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsGithub className="text-lg" />
      </a>
      <a
        href="https://twitter.com/Ayden990804"
        target="_blank"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsTwitterX className="text-lg" />
      </a>
      <a
        href="https://ko-fi.com/ayden123?utm_source=anime-maker.com"
        target="_blank"
        className="mx-3 hidden md:flex max-w-[24px] flex-col items-center justify-center"
      >
        <SiBuymeacoffee className="text-lg" />
      </a>
    </div>
  )
}

export default Social
