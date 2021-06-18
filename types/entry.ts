import { Sys } from 'types/sys';
import { ImageTypes } from 'types/image';

export interface EntryType {
  fields: {
    description: string;
    features: string;
    gallery: ImageTypes[];
    productImage: ImageTypes;
    link: {};
    new: boolean;
    price: number;
    slug: string;
    title: string;
  };
  metadata: {};
  sys: Sys;
}

export type EntryWithoutLink = Omit<EntryType, 'fields.link'>;
