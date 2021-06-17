import { SysNoContent } from 'types/sys';

export interface ImageTypes {
  fields: {
    title: string;
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
  };
  metadata: {};
  sys: SysNoContent;
}
