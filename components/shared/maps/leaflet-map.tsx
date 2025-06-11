'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type Props = {
  onSelect?: (lat: number, lng: number) => void;
  initialPosition?: [number, number] | null;
  readonly?: boolean;
};

function LocationMarker({
  onSelect,
  readonly,
  initialPosition,
}: {
  onSelect?: Props['onSelect'];
  readonly?: boolean;
  initialPosition?: [number, number] | null;
}) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition ?? null
  );
  const { toast } = useToast();
  const map = useMapEvents({
    click(e) {
      if (!readonly) {
        const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPosition(coords);
        onSelect?.(coords[0], coords[1]);
      }
    },
    locationfound(e) {
      if (!readonly && !initialPosition) {
        const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPosition(coords);
        onSelect?.(coords[0], coords[1]);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
    locationerror(e) {
      toast({
        title: 'Error',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (!readonly && !initialPosition) {
      map.locate({
        setView: false,
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  }, [map, readonly, initialPosition]);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
      map.flyTo(initialPosition, map.getZoom());
    }
  }, [initialPosition, map]);

  return position ? <Marker position={position} /> : null;
}

export default function LeafletMap({
  onSelect,
  initialPosition = null,
  readonly = false,
}: Props) {
  return (
    <MapContainer
      center={initialPosition ?? [6.5244, 3.3792]}
      zoom={13}
      scrollWheelZoom={!readonly}
      dragging={!readonly}
      touchZoom={!readonly}
      doubleClickZoom={!readonly}
      zoomControl={!readonly}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        onSelect={onSelect}
        initialPosition={initialPosition}
        readonly={readonly}
      />
    </MapContainer>
  );
}
