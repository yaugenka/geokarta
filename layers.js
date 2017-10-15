var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoieWF1Z2Vua2EiLCJhIjoiY2lmbGs0Zmt4MDE0cXRqa25kd24weHlicyJ9.oVTbfofa4oE-oON619rkgw'
});

var arcgis = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'sat &copy; <a href="http://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Imagery/MapServer">ArcGIS</a>'
});

var bingmaps = new L.BingLayer('AjgM_SeLYJwLhmi-IqbUu6hvDRC83yqhZCbGIrKyP7p-H2OWQ8nUW77zqB_TwVII', {type: 'Aerial'});

var yandex = new L.Yandex('satellite');

var boundaries = new L.WFS({
    url: 'http://localhost:8080/geoserver/wfs',
		geometryField: 'geom',
    typeNS: 'by',
    typeName: 'boundaries',
    crs: L.CRS.EPSG4326,
    style: {
        color: 'blue',
        weight: 2,
				fill: 0
    }
});

