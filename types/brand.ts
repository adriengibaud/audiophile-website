import { Sys } from 'types/sys';
import { ImageTypes } from 'types/image';

export interface BrandType {
  fields: {
    catchingPhrase: string;
    description: string;
    desktopImage: ImageTypes;
    mobileImage: ImageTypes;
    tabletImage: ImageTypes;
  };
  metadata: {};
  sys: Sys;
}
