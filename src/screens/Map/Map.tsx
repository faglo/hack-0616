import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet';
import styles from './Map.module.scss'
import { LayersControl } from 'react-leaflet/LayersControl'
import { Polyline } from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks'
import { useState } from 'react';
import { RadioButton } from '@/components/RadioButton/RadioButton';


const Streets = (props: {
  streets: {
    name: string,
    paths: number[][]
    }[],
    weight: number
}) => {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      console.log('location found:', location)
    },
    zoomlevelschange: () => {
      console.log(map.getZoom())
    }
  })
  return (
    <>
      {props.streets.map((street, index) => (
        <Polyline pathOptions={{ 
          color: 'red',
          className: styles.polyline,
          weight: props.weight,
          }} 
          positions={street.paths} 
          key={index} 
        />
      ))}
    </>
  )
}
export const Map = () => {
  const streets = [
    {
      name: 'Московская',
      paths: [
        [45.09463, 39.00193],
        [45.07230, 39.00082],
        [45.05138, 39.00292]
      ]
    },
    {
      name: 'Северная',
      paths: [
        [45.04723, 38.93111],
        [45.04058, 38.97247],
        [45.04062, 38.97359],
        [45.0342, 39.0136],
        [45.0345, 39.0185],
        [45.0335, 39.0236],
        [45.0315, 39.0279]
      ]
    },
    {
      name: 'Красная',
      paths: [
        [45.0208, 38.9692],
        [45.03564, 38.97435],
        [45.05874, 38.98375],
      ]
    },
    {
      name: 'Красная 2',
      paths: [
          [45.0208, 38.9692],
          [45.03564, 38.97435],
          [45.03609, 38.97420],
          [45.03609, 38.97420],
          [45.05898, 38.98184]
      ]
    }
  ]
  const tiles = [
    {
      name: "Обычная карта",
      id: 1
    },
    {
      name: "Транспортная карта",
      id: 2
    },
    {
      name: "Топографическая карта",
      id: 3
    }
  ]

  const [currentTile, setCurrentTile] = useState(1)

  return (
    <>
      <div className={styles.control}>
        <div className={styles.title}>
          Вид карты
        </div>
        <div className={styles.radioButtonGroup}>
          {
            tiles.map((tile, index) => (
              <RadioButton
                key={index}
                checked={currentTile === tile.id}
                onChange={() => setCurrentTile(tile.id)}
              >
                {tile.name}
              </RadioButton>
            ))
          }
        </div>
      </div>
      <MapContainer center={[45.0264136, 38.9712712]} zoom={14} scrollWheelZoom style={{
          position: 'absolute',
          height: '98vh',
          width: '90vw',
          borderRadius: '20px',
        }}
        className={styles.map}
      >
        {
          currentTile === 1 &&
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        }
        {
          currentTile === 3 &&
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        }
        {
          currentTile === 2 &&
          <TileLayer
            url='https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}'
            attribution="&copy; OpenStreetMap contributors"
            apikey="69fb814f675e4f2585a88e1e4a0a0007"
          />
        }
        <LayersControl position="topleft"/>
          <Streets streets={streets} weight={6} />
        </MapContainer>
    </>
  )
}