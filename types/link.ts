import { Sys } from './sys';
import { EntryWithoutLink } from './entry';

export interface TargetType extends EntryWithoutLink {
  link: {
    content: [];
    data: {};
    nodeType: string;
  };
}

export interface LinkTypes {
  content: {
    content: {
      content: [];
      data: {
        target: {
          fields: TargetType;
          metadata: {};
          sys: Sys;
        };
      };
      nodeType: string;
    }[];
    data: {
      target: {};
    };
    nodeType: string;
  }[];
  metaData: {};
  sys: Sys;
}
