chcp 1251
cd /d F:\gsdata\www\qgis
set psql=psql -U postgres -w -d osm -c
cd /d "C:\Program Files\osmosis\script"
%psql% "\i pgsimple_schema_0.6.sql"
cd /d F:\gsdata\www\qgis
call osmosis --read-pbf file=BY.osm.pbf --log-progress --write-pgsimp database=osm user=postgres password=1
%psql% "\i ����������.txt"
%psql% "\i �������.txt"
%psql% "\i ���������.txt"


@cmd /k