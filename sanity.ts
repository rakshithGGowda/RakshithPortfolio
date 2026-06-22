import createImageUrlBuilder from '@sanity/image-url'
import { createClient, SanityClient } from 'next-sanity'; 

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',
};

// Only create a real client if we have a valid projectId
export const sanityClient: SanityClient = (
    config.projectId !== 'placeholder'
        ? createClient(config)
        : new Proxy({} as SanityClient, {
            get() {
                throw new Error('Sanity client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID.');
            }
        })
);

export const urlFor = (source: any) => createImageUrlBuilder(config).image(source);