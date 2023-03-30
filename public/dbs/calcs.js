import pdc from "./PDC-2023.02.01.json"
//import ciclomapa from "./ciclomapa.json"
import ciclomapa from "./new_ciclomapa.json"
import utils from "../utils"

const MUNICIPIOS = ['Jaboatão dos Guararapes', 'Olinda', 'Paulista', 'Igarassu', 'Abreu e Lima', 'Camaragibe', 'Cabo de Santo Agostinho', 'São Lourenço da Mata', 'Araçoiaba', 'Ilha de Itamaracá', 'Ipojuca', 'Moreno', 'Itapissuma', 'Recife']

function calcs() {

    let ciclos = ciclomapa.features.filter(f => f.properties["ciclomapa:considered"] == "true")
    
    let output = pdc.features.map((f) => {
        return {
            type: f.type,
            id: f.properties.PDC,
            properties: {
                osm_id: "way/"+f.properties.osm_id,
                QGIS_km:  f.properties.PDC_PISTADUPLA == "TRUE" ?  (f.properties.compriment)/2000 : (f.properties.compriment)/1000,
                PDC: f.properties.PDC,
                PDC_TIPOLOGIA: f.properties.PDC_TIPOLOGIA,
                PDC_VIA: f.properties.PDC_VIA,
                PDC_MUNICIPIO: f.properties.PDC_MUNICIPIO,
                STATUS: f.properties.has_cycle == "z_no_cycle" ? "Projeto" : "Realizada",
                TIPOLOGIA: f.properties.has_cycle == "z_no_cycle" ? "SEM ESTRUTURA" : f.properties.has_cycle.split("-")[0],
                PDC_PISTADUPLA: f.properties.PDC_PISTADUPLA,
                KM: f.properties.has_cycle == "z_no_cycle" ? 0 : f.properties.PDC_PISTADUPLA == "TRUE" ? (f.properties.compriment)/2000 : (f.properties.compriment)/1000 
            },
            geometry: f.geometry
        }
    })

  //  const ciclos_ids = ciclos.map((c) => c.id)
/**
    output.forEach(feature => {
        const ciclo_index = ciclos_ids.indexOf(feature.properties.osm_id)
        if(ciclo_index > 0) {
            feature.properties.STATUS = "Realizada"
            ciclos[ciclo_index].properties.id = "DELETE"
            const ciclo = ciclos[ciclo_index]
            feature.properties.TIPOLOGIA = ciclo.properties.type
            feature.properties.UNIDIRECIONAL = ciclo.properties.oneway
            //feature.properties.KM = ciclo.properties["ciclomapa:segment_length"]
        } 
    })
 */
    const not_pdc_ciclos = ciclos//.filter(c => c.properties.id != "DELETE")
    const more_output = not_pdc_ciclos.map((f) => (
         {
            type: f.type,
            id: "NOTPDC" + f.properties.id,
            properties: {
                osm_id: f.properties.id,
                QGIS_km: "N/A",
                PDC: "N/A",
                PDC_TIPOLOGIA: "N/A",
                PDC_VIA: f.properties.name,
                PDC_MUNICIPIO: "Recife",
                STATUS: "NotPDC",
                TIPOLOGIA: f.properties.type,
                KM: f.properties['ciclomapa:segment_length']
            },
            geometry: f.geometry
            }
        ))

    const kms_municipios = MUNICIPIOS.map((m) => {
        const pdc_total = output.filter(o => o.properties.PDC_MUNICIPIO == m).filter(o => o.properties.STATUS != "NotPDC")
        const pdc_done = pdc_total.filter(o => o.properties.STATUS == "Realizada")
        const out_pdc = more_output.filter(o => o.properties.PDC_MUNICIPIO == m)
        const struc_by_id = utils.group_by(pdc_total, "id")
        let ways = []
        Object.keys(struc_by_id).forEach(id => {
            const struct = struc_by_id[id]
            const struct_properties = struct.map(s => s.properties)
            const struct_by_id_by_tipology = utils.group_by(struct_properties, "TIPOLOGIA")
            Object.keys(struct_by_id_by_tipology).forEach(tipology_type => {
                const tipology = struct_by_id_by_tipology[tipology_type]
                ways.push({
                    name: "(" + id + ") " + tipology[0].PDC_VIA,
                    pdc_tipos: tipology[0].PDC_TIPOLOGIA == "CICLOMETRO" ? "CICLOVIA" : tipology[0].PDC_TIPOLOGIA,
                    ciclo_tipos: tipology_type.toUpperCase(),
                    pdc_kms: tipology.reduce((acc,crr) => acc + crr.QGIS_km, 0),
                    ciclo_kms: tipology.reduce((acc,crr) => acc + crr.KM, 0),
                })
            })
        })
        return {
            name: m,
            vias: ways,
            pdc_total: pdc_total.reduce((acc,crr) => acc + crr.properties.QGIS_km, 0),
            pdc_feito: pdc_done.reduce((acc,crr) =>  acc + crr.properties.QGIS_km , 0),    
            out_pdc: out_pdc.reduce((acc,crr) => acc + crr.properties.KM, 0)
        }
    })

    const kms = {
        pdc_total: kms_municipios.reduce((acc,crr) => acc + crr.pdc_total, 0),
        pdc_feito: kms_municipios.reduce((acc,crr) => acc + crr.pdc_feito, 0),    
        out_pdc: kms_municipios.reduce((acc,crr) => acc + crr.out_pdc, 0),
        municipios: kms_municipios
    }

    const all_ciclos = {
        "type": "FeatureCollection",
        "name": "PDC+CICLOMAPA",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: output.concat(more_output)
      } 

      return {
        map: all_ciclos,
        kms: kms
        }
}

export default calcs