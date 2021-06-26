import { Sys } from 'types/sys';
import { ImageTypes } from 'types/image';

export interface FeaturesType {
  content: {
    content: {
      data: {};
      marks: [];
      nodeType: string;
      value: string;
    }[];
    data: {};
    nodeType: string;
  }[];
  data: {};
}

export interface EntryType {
  fields: {
    description: string;
    features: FeaturesType;
    gallery: ImageTypes[];
    productImage: ImageTypes;
    link: {
      content: {
        content: [];
        data: {
          target: EntryWithoutLink;
        };
        nodeType: string;
      }[];
      data: {};
      nodeType: string;
    };
    new: boolean;
    price: number;
    slug: string;
    title: string;
    inTheBox: {
      content: {
        content: {
          data: {};
          marks: {}[];
          nodeType: string;
          value: string;
        }[];
      }[];
    };
  };
  metadata: {};
  sys: Sys;
}

export type EntryWithoutLink = Omit<EntryType, 'fields.link'>;
