chcp 1251
cd /d F:\gsdata\www\qgis
del BY.osm.pbf
del BY.osm.pbf.meta
curl -LO http://data.gis-lab.info/osm_dump/dump/latest/BY.osm.pbf.meta
type BY.osm.pbf.meta
curl -LO http://data.gis-lab.info/osm_dump/dump/latest/BY.osm.pbf
set psql=psql -U postgres -w -d osm -c
cd /d "C:\Program Files\osmosis\script"
%psql% "\i pgsimple_schema_0.6.sql"
cd /d F:\gsdata\www\qgis
call osmosis --read-pbf file=BY.osm.pbf --log-progress --write-pgsimp database=osm user=postgres password=1
%psql% "\i подготовка.txt"
%psql% "\i границы.txt"


@cmd /k