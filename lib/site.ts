const baseSiteConfig = {
    url: "https://anime-maker.com",
    metadataBase: new URL("https://anime-maker.com"),
    authors: [
      {
        name: "Ayden",
        url: "https://anime-maker.com",
      }
    ],
    creator: '@Ayden',
    icons: {
      icon: "/favicon.ico",
    },
    ogImage: "https://anime-maker.com/og.png",
    links: {
      twitter: "https://twitter.com/Ayden990804",
      github: "https://github.com/Ayden-123/anime",
    },
  }
  
  
  export const siteConfig: SiteConfig = {
    ...baseSiteConfig,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseSiteConfig.url,
      title: "Anime Maker",
      description: "Use AI to create anime characters and unleash your creativity.",
      siteName: "Anime Maker",
    },
    twitter: {
      card: "summary_large_image",
      title: "Anime Maker",
      description: "Use AI to create anime characters and unleash your creativity.",
      images: [`${baseSiteConfig.url}/og.png`],
      creator: baseSiteConfig.creator,
    },
  }