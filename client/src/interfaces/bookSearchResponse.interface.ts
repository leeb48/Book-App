export interface BookSearchResponse {
  kind: string;
  totalItems: number;
  items?: ItemsEntity[] | null;
}
export interface ItemsEntity {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}
export interface VolumeInfo {
  title: string;
  subtitle?: null;
  authors?: string[] | null;
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers?: IndustryIdentifiersEntity[] | null;
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories?: string[] | null;
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
export interface IndustryIdentifiersEntity {
  type: string;
  identifier: string;
}
export interface ReadingModes {
  text: boolean;
  image: boolean;
}
export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: null;
  retailPrice?: null;
  buyLink?: null;
  offers?: null;
}
export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubOrPdf;
  pdf: EpubOrPdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
export interface EpubOrPdf {
  isAvailable: boolean;
  acsTokenLink?: null;
}
export interface SearchInfo {
  textSnippet: string;
}
