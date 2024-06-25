export interface INews {
  headline: string; // headline
  contentHeading: string; // metadata.excerpt
  imageURL: string; // hero-image-s3-key
  reportLink: string; // url
  publishedAt: number; // published-at
  tags: string[]; // tags
  newsLocation: {
    division: string;
    district: string;
    upazila: string;
  };
}
