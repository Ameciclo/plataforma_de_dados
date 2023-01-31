import pdc from "./PDC-2021.07.19.json"
import ciclomapa from "./ciclomapa.json"

const MUNICIPIOS = ['Jaboatão dos Guararapes', 'Olinda', 'Paulista', 'Igarassu', 'Abreu e Lima', 'Camaragibe', 'Cabo de Santo Agostinho', 'São Lourenço da Mata', 'Araçoiaba', 'Ilha de Itamaracá', 'Ipojuca', 'Moreno', 'Itapissuma', 'Recife']

function calcs() {

    let ciclos = ciclomapa.features.filter(f => f.properties["ciclomapa:considered"] == "true")
    
    let output = pdc.features.map((f) => {
                                        return {
                                            type: f.type,
                                            properties: {
                                                osm_id: "way/"+f.properties.osm_id,
                                                QGIS_km: (f.properties.compriment)/1000,
                                                PDC: f.properties.PDC,
                                                PDC_TIPOLOGIA: f.properties.PDC_TIPOLOGIA,
                                                PDC_VIA: f.properties.PDC_VIA,
                                                PDC_MUNICIPIO: f.properties.PDC_MUNICIPIO,
                                                STATUS: f.properties.has_cycle == "z_no_cycle" ? "Projeto" : "Realizada",
                                                TIPOLOGIA: "N/A",
                                                UNIDIRECIONAL: "N/A",
                                                PDC_PISTADUPLA: f.properties.PDC_PISTADUPLA,
                                                KM: 0
                                            },
                                            geometry: f.geometry
                                        }
                                    })
                                    
    const ciclos_ids = ciclos.map(c => c.id)

    output.forEach(feature => {
        const ciclo_index = ciclos_ids.indexOf(feature.properties.osm_id)
        if(ciclo_index > 0) {
            feature.properties.STATUS = "Realizada"
            ciclos[ciclo_index].properties.id = "DELETE"
            const ciclo = ciclos[ciclo_index]
            feature.properties.TIPOLOGIA = ciclo.properties.type
            feature.properties.UNIDIRECIONAL = ciclo.properties.oneway
            feature.properties.KM = ciclo.properties["ciclomapa:segment_length"]
        } 
    })

    const not_pdc_ciclos = ciclos.filter(c => c.properties.id != "DELETE")
    const more_output = not_pdc_ciclos.map((f) => (
         {
            type: f.type,
            properties: {
                osm_id: f.properties.id,
                QGIS_km: "N/A",
                PDC: "N/A",
                PDC_TIPOLOGIA: "N/A",
                PDC_VIA: f.properties.name,
                PDC_MUNICIPIO: "Recife",
                STATUS: "NotPDC",
                TIPOLOGIA: f.properties.type,
                UNIDIRECIONAL: f.properties.oneway,
                KM: f.properties["ciclomapa:segment_length"]
            },
            geometry: f.geometry
            }
        ))

    const all_ciclos = {
        "type": "FeatureCollection",
        "name": "PDC+CICLOMAPA",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: output.concat(more_output)
      }

    const kms_municipios = MUNICIPIOS.map(m => {
        return {
            name: m,
            pdc_total: output.filter(o => o.properties.PDC_MUNICIPIO == m).reduce((acc,crr) => crr.properties.PDC_PISTADUPLA == "FALSE" ? acc + crr.properties.QGIS_km : acc + crr.properties.QGIS_km/2, 0),
            pdc_feito: output.filter(o => o.properties.PDC_MUNICIPIO == m).filter(o => o.properties.STATUS == "Realizada").reduce((acc,crr) => crr.properties.PDC_PISTADUPLA == "FALSE" ? acc + crr.properties.QGIS_km : acc + crr.properties.QGIS_km/2, 0),    
            out_pdc: more_output.filter(o => o.properties.PDC_MUNICIPIO == m).reduce((acc,crr) => acc + crr.properties.KM, 0)
        }
    })

    const kms = {
        pdc_total: output.reduce((acc,crr) => crr.properties.PDC_PISTADUPLA == "FALSE" ? acc + crr.properties.QGIS_km : acc + crr.properties.QGIS_km/2, 0),
        pdc_feito: output.filter(o => o.properties.STATUS == "Realizada").reduce((acc,crr) => crr.properties.PDC_PISTADUPLA == "FALSE" ? acc + crr.properties.QGIS_km : acc + crr.properties.QGIS_km/2, 0),    
        out_pdc: more_output.reduce((acc,crr) => acc + crr.properties.KM, 0),
        municipios: kms_municipios
    }


/**
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

      exportToJsonFile(all_ciclos) */

      return {
        map: all_ciclos,
        kms: kms
        }
}

export default calcs


