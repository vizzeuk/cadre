/**
 * Sanity Studio Post Schema
 * Copy this into your Sanity Studio project (schemas/post.ts).
 * This file is documentation-only in the Next.js app context.
 */

export const postSchema = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (R: { required: () => unknown }) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R: { required: () => unknown }) => R.required(),
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Máx 60 caracteres. Aparece en la pestaña del navegador y Google.",
      validation: (R: { max: (n: number) => unknown }) => R.max(60),
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Máx 160 caracteres. Aparece como snippet en Google.",
      validation: (R: { max: (n: number) => unknown }) => R.max(160),
    },
    {
      name: "geoTarget",
      title: "GEO Target",
      type: "string",
      description: "Ciudad o región para SEO Local (ej: Santiago, Chile).",
      initialValue: "Santiago, Chile",
    },
    {
      name: "mainImage",
      title: "Imagen Principal",
      type: "image",
      options: { hotspot: true },
      validation: (R: { required: () => unknown }) => R.required(),
      fields: [
        {
          name: "alt",
          title: "Texto Alternativo (Alt)",
          type: "string",
          description: "Describe la imagen para accesibilidad y SEO.",
          validation: (R: { required: () => unknown }) => R.required(),
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Publicado el",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [{ title: "URL", name: "href", type: "url" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "geoTarget" },
  },
};
