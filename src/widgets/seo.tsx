import { Head } from "vite-react-ssg";

const SITE = "https://kora.onl";
const IMAGE =
  "https://res.cloudinary.com/doqholno8/image/upload/v1770776920/5/project/1770776886044_kora.png";

type SeoProps = { title: string; description: string; path: string; noindex?: boolean };

const Seo = ({ title, description, path, noindex }: SeoProps) => {
  const url = `${SITE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kora" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE} />
    </Head>
  );
};

export default Seo;