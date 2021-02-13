import {
  ImageLinks,
  IndustryIdentifiersEntity,
} from "./bookSearchResponse.interface";

export interface Book {
  title: string;
  googleBooksId: string;
  subtitle?: null;
  authors?: string[] | null;
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers?: IndustryIdentifiersEntity[] | null;
  categories?: string[] | null;
  maturityRating: string;
  imageLinks: ImageLinks;
}
