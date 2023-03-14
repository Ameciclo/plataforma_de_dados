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

export type dataPartner = {
  src: string;
  alt: string;
  url: string;
};
