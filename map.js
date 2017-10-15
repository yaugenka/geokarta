var map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults().extend([new ol.control.ScaleLine()]),
  view: new ol.View({
    center: ol.proj.transform([28.049, 53.542], 'EPSG:4326', 'EPSG:3857'),
    extent: ol.proj.transformExtent([23.178, 51.257, 32.762, 56.172], 'EPSG:4326', 'EPSG:3857'),
    zoom: 6,
    minZoom: 6,
    maxZoom: 17
  })
});

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
          map.addLayer(window[node.key]);
        }
      } else {
        map.removeLayer(window[node.key]);
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
          map.addLayer(window[node.getParent().key]);
        }
      } else {
        delete objects[node.key];
        if (p == false) {
          map.removeLayer(window[node.getParent().key]);
        }
      }
			boundaries.changed();
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
        map.removeLayer(window[node.key]);
      } else {
        var layergroup = map.getLayerGroup();
        var layers = map.getLayers();
        layers.insertAt(0, window[node.key]);
        layergroup.setLayers(layers);
        map.setLayerGroup(layergroup);
      }
    }
  }
});

$("#ltree").fancytree('getTree').getNodeByKey('country').setSelected();
$("#itree").fancytree('getTree').getNodeByKey('mapboxsat').setActive();
