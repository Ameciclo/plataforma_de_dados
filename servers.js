import { server } from "./config/index";

const CMS = `https://cms.ameciclo.org`

// SINGLE PAGE DATA - LIKE COVER AND DOCS
export const PLATAFORM_HOME_PAGE = `${CMS}/plataforma-de-dados`;
export const COUNTINGS_PAGE_DATA = `${CMS}/contagens`;
export const DOCUMENTS_PAGE = `${CMS}/documentos`;
export const IDECICLO_PAGE_DATA = `${CMS}/ideciclo`;
export const PERFIL_PAGE_DATA = `${CMS}/perfil`;

// DATA
export const COUNTINGS_DATA_API = `/api/cyclists-counts-editions`;
export const COUNTINGS_SUMMARY_DATA_NEW = `${server}/api/cyclist-count`;
export const COUNTINGS_DATA_NEW = `${server}${COUNTINGS_DATA_API}`;

// APIS ANTIGAS
export const COUNTINGS_SUMMARY_DATA = `https://api.contagem.ameciclo.org/v1/cyclist-count/metadata`;
export const COUNTINGS_DATA = `https://api.contagem.ameciclo.org/v1/cyclist-count/`;
export const IDECICLO_DATA = `https://api.ideciclo.ameciclo.org/reviews`;
export const IDECICLO_STRUCTURES_DATA = `https://api.ideciclo.ameciclo.org/structures`;
export const IDECICLO_FORMS_DATA = `https://api.ideciclo.ameciclo.org/forms`;
export const PERFIL_DATA = `https://api.perfil.ameciclo.org/v1/cyclist-profile/summary/`;
