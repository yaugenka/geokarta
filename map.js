var map = L.map('map', {
    center: [53.542, 28.049],
    zoom: 6
});

var baseLayers = {
		'Яндекс': yandex,
    'Mapbox': mapbox,
		'ArcGIS': arcgis,
		'BingMaps': bingmaps
};
var overlayMaps = {
    "Границы": boundaries
};
L.control.layers(baseLayers,overlayMaps).addTo(map);

L.control.scale({position: 'topleft'}).addTo(map);

map.addLayer(yandex);
map.addLayer(boundaries);

$('#clickme').click(function() {

});

$('#lbutton').click(function() {
  $('#itree').collapse('hide');
});
$('#ibutton').click(function() {
  $('#ltree').collapse('hide');
});

var ltree = [{
  title: 'Boundaries',
  key: 'boundaries',
  folder: true,
  expanded: true,
  children: [{
    title: 'Country',
    key: 'country'
  }, {
    title: 'Regions',
    key: 'regions'
  }, {
    title: 'Districts',
    key: 'districts'
  }, {
    title: 'Councils',
    key: 'councils'
  }, {
    title: 'Settlements',
    key: 'settlements'
  }]
}];

var objects = {};

$("#ltree").fancytree({
  source: ltree,
  checkbox: true,
  selectMode: 3,
  icon: false,
  beforeSelect: function(e, data) {
    var node = data.node;
    if (node.isFolder()) {
      var p = false;
      if (!node.isSelected()) {
        node.visit(function(n) {
          if (n.isSelected()) {
            p = true;
          } else {
            objects[n.key] = node.key;
          }
        });
        if (p == false) {
          //map.addLayer(window[node.key]);
        }
      } else {
        //map.removeLayer(window[node.key]);
        node.visit(function(n) {
          if (n.isSelected()) {
            delete objects[n.key];
          }
        });
      }
			boundaries.changed();
    }
  },
  select: function(e, data) {
    var node = data.node;
    if (!node.isFolder()) {
      var p = false;
      node.visitSiblings(function(n) {
        if (n.isSelected()) {
          p = true;
          return false;
        }
      });
      if (node.isSelected()) {
        objects[node.key] = node.key;
        if (p == false) {
          //map.addLayer(window[node.getParent().key]);
        }
      } else {
        delete objects[node.key];
        if (p == false) {
          //map.removeLayer(window[node.getParent().key]);
        }
      }
			//boundaries.changed();
    }
  }
});

var itree = [{
  title: 'None',
  selected: true,
  key: 'none'
}, {
  title: 'MapBox',
  key: 'mapboxsat'
}, {
  title: 'ArcGIS',
  key: 'arcgissat'
}, {
  title: 'BingMaps',
  key: 'bingmaps'
}];

$("#itree").fancytree({
  source: itree,
  checkbox: "radio",
  selectMode: 1,
  icon: false,
  activate: function(e, data) {
    var node = data.node;
    node.setSelected();
  },
  select: function(e, data) {
    var node = data.node;
    if (node.key != 'none') {
      if (!node.isSelected()) {
        //map.removeLayer(window[node.key]);
      } else {
        //var layergroup = map.getLayerGroup();
        //var layers = map.getLayers();
        //layers.insertAt(0, window[node.key]);
        //layergroup.setLayers(layers);
        //map.setLayerGroup(layergroup);
      }
    }
  }
});

$("#ltree").fancytree('getTree').getNodeByKey('country').setSelected();
$("#itree").fancytree('getTree').getNodeByKey('mapboxsat').setActive();
