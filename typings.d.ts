export type footerColumnContent = {
  label: string;
  url: string;
};

export type footerColumn = {
  title: string;
  content: footerColumnContent[];
  align: string;
};

export type crumb = {
  label: string;
  slug: string;
  routes: string[];
};

export type ImageWithLink = {
  src: string;
  alt: string;
  url: string;
};

export type FeaturedPage = {
  title: string;
  icon: string;
  url: string;
  text: string;
};

export type document = {
  title: string;
  description: string;
  url: string;
  type: string;
  release_date: string;
  cover: any;
};
export type layersData = {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: any[];
};

export type pointData = {
  key: string;
  latitude: number;
  longitude: number;
  popup?: any;
  size?: number;
  color?: string;
};

export type city = {
  name: string;
  population: number;
  area: number;
  id: number;
  reviews: any[];
};
