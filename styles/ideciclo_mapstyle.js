const layers = {
    ciclovia: {
        id: 'ciclovias',
        type: 'line',
        paint: {
        'line-color': "#E02F31",
        'line-width': 1.5,
        },
        filter: ['==', 'Tipo', 'Ciclovia']
    },
    ciclofaixa: {
        id: 'ciclofaixas',
        type: 'line',
        paint: {
        'line-color': "#E02F31",
        'line-width': 1.5,
        'line-dasharray': [2,.5],
        },
        filter: ['==', 'Tipo', 'Ciclofaixa']
    },
    ciclorrota: {
        id: 'ciclorrota',
        type: 'line',
        paint: {
        'line-color': "#E02F31",
        'line-width': 2,
        'line-dasharray': [1,2.5],
        },
        filter: ['==', 'Tipo', 'Ciclorrota']
    },
    };
  
const navControlStyle= {
    right: 10,
    top: 10
  };

const mapStyle = {
    navControlStyle: navControlStyle,
    layers: layers,
}
  
export default mapStyle;