export interface Sys {
  contentType: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  createdAt: string;
  environment: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  id: string;
  locale: string;
  revision: number;
  space: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  type: string;
  updatedAt: string;
}

export type SysNoContent = Omit<Sys, 'contentType'>;
