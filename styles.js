var text = new ol.style.Text({
	text: '',
	font: '15px sans-serif',
	fill: new ol.style.Fill({
		color: 'white'
	})
});

var styles = {
	'country': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 2.5
    })
	}),
	'regions': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 2
    })
  }),
	'districts': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1.5
    })
  }),
	'councils': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1
    })
  }),
	'settlements': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 0.5
    })
  }),
	'label': new ol.style.Style({
    text: text
  })
};

function style_boundaries(feature, resolution) {
	var stylesArray = [];
	var place = feature.get('place');
	var admin_level = feature.get('admin_level');
	var admin_centre = feature.get('admin_centre');
	switch (admin_level){
		case '2':
			if (objects.country){
				stylesArray.push(styles.country);
			}
			break;
		case '4':
			if (objects.regions){
				stylesArray.push(styles.regions);
			}
			break;
		case '6':
			if (objects.districts){
				stylesArray.push(styles.districts);
			}
			break;
		case '8':
			if (objects.councils){
				stylesArray.push(styles.councils);
			}
			break;
	}
	if (place && objects.settlements){
		stylesArray.push(styles.settlements);
		var zoom = map.getView().getZoom();
		if (((admin_level ==4 || admin_level ==6) && zoom >= 6) ||
			(admin_level == 8 && zoom >= 7) ||
			(admin_centre == 8 && zoom >= 9) ||
			(!admin_level && zoom >= 11)){
			text.setText(feature.get('name'));
			var style = styles.label.clone();
			if (feature.get('label')){
				style.setGeometry('label');
			}
			stylesArray.push(style);
			
		}
	}
	return stylesArray;
}

function style_country(feature, resolution) {
  var zoom = map.getView().getZoom();
  var name = (feature.get('name')).toString();
  var geom = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 2.5
    })
  });
  var label = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '40px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  if (zoom == 6 || zoom == 7) {
    return [geom, label];
  } else {
    return [geom];
  }
}

function style_regions(feature, resolution) {
  var zoom = map.getView().getZoom();
  var name = (feature.get('name')).toString();
  var geom = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 2
    })
  });
  var label = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '15px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      }),
      offsetY: 15
    })
  });
  var label2 = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '15px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  var label3 = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '15px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      }),
      offsetY: 25
    })
  });
  if (zoom == 6) {
    if (name == 'Минск') {
      return [geom, label];
    } else {
      return [geom, label2];
    }
  } else if (zoom == 7) {
    if (name == 'Минск') {
      return [geom, label3];
    } else {
      return [geom, label2];
    }
  } else {
    return [geom];
  }
}

function style_districts(feature, resolution) {
  var zoom = map.getView().getZoom();
  var name = (feature.get('name')).toString();
  var geom = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1
    })
  });
  var geom2 = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1
    }),
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  var label = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  if (zoom == 8 || zoom == 9) {
    if (feature.get('label') == undefined) {
      return [geom2];
    } else {
      return [geom, label];
    }
  } else {
    return [geom];
  }
}

function style_councils(feature, resolution) {
  var zoom = map.getView().getZoom();
  var name = (feature.get('name')).toString();
  var geom = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1
    })
  });
  var geom2 = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1
    }),
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  var label = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  if (zoom == 10 || zoom == 11) {
    if (feature.get('label') == undefined) {
      return [geom2];
    } else {
      return [geom, label];
    }
  } else {
    return [geom];
  }
}

function style_rurals(feature, resolution) {
  var zoom = map.getView().getZoom();
  var name = (feature.get('name')).toString();
  var geom = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 0.5
    })
  });
  var geom2 = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 0.5
    }),
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  var label = new ol.style.Style({
    geometry: 'label',
    text: new ol.style.Text({
      text: name,
      font: '17px sans-serif',
      fill: new ol.style.Fill({
        color: 'grey'
      })
    })
  });
  if (zoom >= 12) {
    if (feature.get('label') == undefined) {
      return [geom2];
    } else {
      return [geom, label];
    }
  } else {
    return [geom];
  }
}
