export const PLATAFORM_HOME_PAGE = "https://cms.ameciclo.org/plataforma-de-dados"
export const DOCUMENTS_PAGE = "https://cms.ameciclo.org/documentos"
export const DOCUMENTS_DATA = "https://cms.ameciclo.org/documents"
export const COUNTINGS_PAGE_DATA =`https://cms.ameciclo.org/contagens`
export const IDECICLO_PAGE_DATA = `https://cms.ameciclo.org/ideciclo`
export const PERFIL_PAGE_DATA = `https://cms.ameciclo.org/perfil`

export const IDECICLO_DATA = `https://api.ideciclo.ameciclo.org/reviews`
export const IDECICLO_STRUCTURES_DATA = `https://api.ideciclo.ameciclo.org/structures`
export const IDECICLO_FORMS_DATA = `https://api.ideciclo.ameciclo.org/forms`
export const PERFIL_DATA = `https://api.perfil.ameciclo.org/v1/cyclist-profile/summary/`

export const COUNTINGS_SUMMARY_DATA =`https://api.garfo.ameciclo.org/cyclist-counts`     
export const COUNTINGS_DATA =`https://api.garfo.ameciclo.org/cyclist-counts/edition`

export const OBSERVATORY_DATA =`https://api.garfo.ameciclo.org/cyclist-infra/relationsByCity`
export const OBSERVATORY_DATA_WAYS =`https://api.garfo.ameciclo.org/cyclist-infra/ways`
export const OBSERVATORY_DATA_ALL_WAYS = `https://api.garfo.ameciclo.org/cyclist-infra/ways/all-ways`
export const OBSERVATORY_DATA_WAYS_SUMMARY =`https://api.garfo.ameciclo.org/cyclist-infra/ways/summary`
export const CITIES_DATA =`https://api.garfo.ameciclo.org/cities`

export const SINISTROS_SUMMARY_DATA =`https://api.garfo.ameciclo.org/traffic-crashes/summary`
export const SINISTROS_GEOJSON_DATA =`https://api.garfo.ameciclo.org/traffic-crashes/geojson`
export const SINISTROS_VEHICLES_DATA =`https://api.garfo.ameciclo.org/traffic-crashes/vehicles`
export const SINISTROS_STREETS_SUMMARY_DATA =`https://api.garfo.ameciclo.org/traffic-crashes/streets-summary`

// Endpoints para o Observatório de Sinistros Fatais (DATASUS)
export const DATASUS_SUMMARY_DATA =`https://api.garfo.ameciclo.org/datasus-deaths/summary`
export const DATASUS_CITIES_BY_YEAR_DATA =`https://api.garfo.ameciclo.org/datasus-deaths/cities-by-year`
export const DATASUS_FILTROS_DATA =`https://api.garfo.ameciclo.org/datasus-deaths/filtros`
export const DATASUS_MATRIX_DATA =`https://api.garfo.ameciclo.org/datasus-deaths/matrix`
export const DATASUS_CAUSAS_SECUNDARIAS_DATA =`https://api.garfo.ameciclo.org/datasus-deaths/causas-secundarias`

// Endpoint do Strapi específico para o Observatório de Sinistros Fatais
export const OBSERVATORIO_SINISTROS_PAGE_DATA = `https://do.strapi.ameciclo.org/api/plataformas-de-dados?filters[title][$eq]=Observatório de Sinistros Fatais&populate[0]=supportfiles&populate[1]=supportfiles.file&populate[2]=supportfiles.cover&populate[3]=cover&populate[4]=explanationbox`

// Endpoint do Strapi para dados das plataformas (mantido para compatibilidade)
export const PLATAFORMAS_PAGE_DATA = `https://do.strapi.ameciclo.org/api/plataformas-de-dados?populate=*`
