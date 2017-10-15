var mapboxsat = new ol.layer.Tile({
  title: 'MapBox',
  source: new ol.source.XYZ({
    attributions: [new ol.Attribution({
      html: 'sat &copy; <a href="https://www.mapbox.com/">MapBox</a>'
    })],
    url: 'http://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' +
      'pk.eyJ1IjoieWF1Z2Vua2EiLCJhIjoiY2lmbGs0Zmt4MDE0cXRqa25kd24weHlicyJ9.oVTbfofa4oE-oON619rkgw'
  })
});

var arcgissat = new ol.layer.Tile({
  title: 'ArcGIS',
  source: new ol.source.XYZ({
    attributions: [new ol.Attribution({
      html: 'sat &copy; <a href="http://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Imagery/MapServer">ArcGIS</a>'
    })],
    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Imagery/MapServer/tile/{z}/{y}/{x}'
  })
});

var bingmaps = new ol.layer.Tile({
  title: 'BingMaps',
  source: new ol.source.BingMaps({
    key: 'AjgM_SeLYJwLhmi-IqbUu6hvDRC83yqhZCbGIrKyP7p-H2OWQ8nUW77zqB_TwVII',
    imagerySet: 'Aerial'
  })
});

var boundaries = new ol.layer.Vector({
  title: 'boundaries',
  source: new ol.source.Vector({
    url: 'http://localhost:8080/geoserver/wfs?service=WFS&' +
      'version=2.0.0&request=GetFeature&typeNames=by:boundaries&' +
      'outputFormat=GML3',
    format: new ol.format.WFS()
  }),
	style: style_boundaries
});
