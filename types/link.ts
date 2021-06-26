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
    content: [];
    data: {
      target: EntryWithoutLink;
    };
    nodeType: string;
  }[];
  data: {};
  nodeType: string;
}
