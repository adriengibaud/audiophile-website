import { Sys } from 'types/sys';
import { EntryType } from './entry';

export interface CategoryTypes {
  fields: {
    image: {
      fields: {
        file: {
          contentType: string;
          details: {
            image: {
              height: number;
              width: number;
            };
            size: number;
          };
          fileName: string;
          url: string;
        };
        title: string;
      };
      metadata: {};
      sys: {};
      slug: string;
      title: string;
    };
    slug: string;
    title: string;
  };
  metadata: {};
  sys: Sys;
}

export interface CategoryContentTypes {
  includes: {
    Asset: {
      fields: {};
      metadata: {};
      sys: Sys;
    }[];
    Entry: EntryType[];
  };
  items: EntryType[];
  limit: number;
  skip: number;
  total: number;
}
