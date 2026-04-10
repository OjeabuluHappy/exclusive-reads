import { createClient } from "next-sanity";
// Changed from the default import to the named import
import { createImageUrlBuilder } from "@sanity/image-url"; 

export const client = createClient({
  projectId: "o1le3cg8", 
  dataset: "production",
  apiVersion: "2024-04-09",
  useCdn: true,
});

// Updated to use the new builder name
const builder = createImageUrlBuilder(client); 

export function urlFor(source: any) { 
  return builder.image(source); 
}