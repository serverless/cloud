import {
  S2Cell,
  S2CellId,
  S2LatLng,
  S2Region,
  S2RegionCoverer,
  S2LatLngRect,
} from "nodes2ts";

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface Rect {
  sw: GeoPoint;
  ne: GeoPoint;
}

function hash(lat, long) {
  const latLng = S2LatLng.fromDegrees(lat, long);
  const cell = S2Cell.fromLatLng(latLng);
  const cellId = cell.id;
  return cellId.toToken();
}

function coverRegion(region: S2Region): S2CellId[] {
  return new S2RegionCoverer().getCoveringCells(region);
}

function coverCircle(center: GeoPoint, radius: number): S2CellId[] {
  return new S2RegionCoverer().getCoveringCells(
    getBoundingRectForCircle({
      radius,
      center,
    })
  );
}

function getBoundingRectForCircle({
  center,
  radius,
}: {
  radius: number;
  center: GeoPoint;
}): S2LatLngRect {
  const centerLatLng = S2LatLng.fromDegrees(center.lat, center.lon);

  const latReferenceUnit = center.lat > 0.0 ? -1.0 : 1.0;
  const latReferenceLatLng = S2LatLng.fromDegrees(
    center.lat + latReferenceUnit,
    center.lon
  );
  const lngReferenceUnit = center.lon > 0.0 ? -1.0 : 1.0;
  const lngReferenceLatLng = S2LatLng.fromDegrees(
    center.lat,
    center.lon + lngReferenceUnit
  );

  const latForRadius =
    radius / centerLatLng.getEarthDistance(latReferenceLatLng);

  const lngForRadius =
    radius / centerLatLng.getEarthDistance(lngReferenceLatLng);

  const minLatLng = S2LatLng.fromDegrees(
    center.lat - latForRadius,
    center.lon - lngForRadius
  );
  const maxLatLng = S2LatLng.fromDegrees(
    center.lat + latForRadius,
    center.lon + lngForRadius
  );

  return S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
}

function region(rect: Rect) {
  const minLatLng = S2LatLng.fromDegrees(rect.sw.lat, rect.sw.lon);
  const maxLatLng = S2LatLng.fromDegrees(rect.ne.lat, rect.ne.lon);
  return S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
}

function point(lat, lon) {
  return S2LatLng.fromDegrees(lat, lon);
}

function pointInCircle(
  point: GeoPoint,
  center: GeoPoint,
  radius: number
): boolean {
  const centerLatLng = S2LatLng.fromDegrees(center.lat, center.lon);
  const latLng: S2LatLng = S2LatLng.fromDegrees(point.lat, point.lon);
  return centerLatLng.getEarthDistance(latLng) <= radius;
}

export const geo = {
  hash,
  coverCircle,
  coverRegion,
  region,
  point,
  pointInCircle,
};
