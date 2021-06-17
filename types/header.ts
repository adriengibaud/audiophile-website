import { Sys } from './sys';
import { ImageTypes } from './image';

export interface HeaderTypes {
  fields: {
    slug: string;
    title: string;
    newProduct: boolean;
    subtitle: string;
    image: ImageTypes;
    category: string;
  };
  metadata: {};
  sys: Sys;
}
