chcp 1251
cd /d F:\gsdata\www\qgis
del BY.osm.pbf
del BY.osm.pbf.meta
curl -LO http://data.gis-lab.info/osm_dump/dump/latest/BY.osm.pbf.meta
type BY.osm.pbf.meta
curl -LO http://data.gis-lab.info/osm_dump/dump/latest/BY.osm.pbf

@cmd /k