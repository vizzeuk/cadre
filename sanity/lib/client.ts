import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isConfigured = Boolean(projectId && projectId !== "tu_project_id_aqui");

export const client = createClient({
  projectId: isConfigured ? projectId! : "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  // Disable fetching when not configured — avoids runtime errors in dev
  token: undefined,
});

/** True once NEXT_PUBLIC_SANITY_PROJECT_ID is set to a real value */
export const sanityIsConfigured = isConfigured;
