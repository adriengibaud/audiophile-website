import { Sys } from './sys';
import { ImageTypes } from './image';

export interface HighlightTypes {
  fields: {
    image: ImageTypes;
    slug: string;
    subtitle: string;
    title: string;
  };
  metaData: {};
  sys: Sys;
}
