import { Sys } from 'types/sys';

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
