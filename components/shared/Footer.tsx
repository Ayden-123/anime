export default function ({ lang, dict }: { lang: string; dict: any }) {
    return (
      <section>
        <div className="w-screen flex-col bg-black px-6 py-20 text-white lg:flex lg:px-10 xl:px-24 mt-20">
          <div className="lg:flex lg:flex-row lg:justify-between">
            <div>
              <a href="/en" className="inline-block max-w-full">
                AnimeMaker
              </a>
              <p className="font-inter mt-4 max-w-[350px] text-base font-light text-gray-400">
                Generate beautiful Anime with AI.
              </p>
              <div className="mb-8 mt-6 flex flex-row">
                {/* <Social /> */}
              </div>
            </div>
            <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <div className="font-inter font-medium">INTRODUCTION</div>
                {/* <a
                  href="https://openai.com/sora?utm_source=sora.fm"
                  target="_blank"
                  className="font-inter font-light text-gray-500"
                >
                  What's Sora
                </a> */}
              </div>
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <div className="font-inter font-medium">FRIENDS</div>
                {/* <a
                  href="https://gpts.works?utm_source=sora.fm"
                  target="_blank"
                  className="font-inter font-light text-gray-500"
                >
                  GPTs Works
                </a> */}
              </div>
              <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
                <div className="font-inter font-medium">CREDIT TO</div>
                {/* <a
                  href="https://sora.fm"
                  target="_blank"
                  className="font-inter font-light text-gray-500"
                >
                  Sora.FM
                </a> */}
                
              </div>
            </div>
          </div>
          <div className="mx-auto w-full border border-gray-800 lg:my-5"></div>
          <div>
            <p className="font-inter lg: text-center text-sm text-gray-500">
              © Copyright 2024.{" "}
              <a href="/en" target="_blank" className="text-orange-500 font-bold">
                AnimeMaker
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </section>
    );
  }
  