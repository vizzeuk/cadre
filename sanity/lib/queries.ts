import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    seoDescription,
    geoTarget,
    publishedAt,
    mainImage { asset, alt }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    geoTarget,
    publishedAt,
    mainImage { asset, alt },
    content
  }
`;

export const allSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;
