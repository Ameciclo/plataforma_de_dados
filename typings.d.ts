export type Series = {
  name: string | undefined;
  data: number[];
  visible?: boolean
};

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
  type?: string;
};

export type city = {
  name: string;
  population: number;
  area: number;
  id: number;
  reviews: any[];
};

export interface CountEditionSummary {
  max_hour: number;
  total_cyclists: number;
  total_cargo: number;
  total_helmet: number;
  total_juveniles: number;
  total_motor: number;
  total_ride: number;
  total_service: number;
  total_shared_bike: number;
  total_sidewalk: number; 
  total_women: number;
  total_wrong_way: number;
}

export interface CountEditionCoordinates {
  point: {
    x: number;
    y: number;
  };
  type: string;
  name: string;
}

export interface CountEditionSession {
  start_time: string;
  end_time: string;
  total_cyclists: number;
  characteristics: {
    [key: string]: number;
  };
  quantitative: {
    [key: string]: number;
  };
}

export interface CountEditionDirections {
  origin: string;
  destin: string;
  origin_cardinal: string;
  destin_cardinal: string;
}

export interface CountEdition {
  id: number;
  slug: string;
  name: string;
  date: string;
  summary: CountEditionSummary;
  coordinates: CountEditionCoordinates[];
  sessions: {
    [key: string]: CountEditionSession;
  };
  directions: {
    [key: string]: CountEditionDirections;
  };
}
