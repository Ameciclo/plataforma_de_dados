type footerColumnContent = {
  label: string;
  url: string;
};

type footerColumn = {
  title: string;
  content: footerColumnContent[];
  align: string;
};

type crumb = {
  label: string;
  slug: string;
  routes: string[];
};
