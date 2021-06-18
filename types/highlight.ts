import { Sys } from './sys';
import { ImageTypes } from './image';

export interface HighlightTypes {
  fields: {
    image: ImageTypes;
    slug: string;
    subtitle: string;
    title: string;
    category: string;
    link: {
      content: {
        content: [];
        data: {
          target: {
            fields: {};
          };
        };
        nodeType: string;
      }[];
      data: {};
    };
  };
  metaData: {};
  sys: Sys;
}

export type HighlightNoTextTypes = Omit<HighlightTypes, 'subtitle'>;
