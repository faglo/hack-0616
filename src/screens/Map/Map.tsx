import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import styles from './Map.module.scss'
import { Polyline } from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks'
import { useEffect, useState } from 'react';
import { TypesDropdown } from '@/components/TypesDropdown/TypesDropdown';
import { Add, Remove, Rotate90DegreesCcw } from '@mui/icons-material';
import L from 'leaflet'
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { TrackDetails } from 'keen-slider';
import BorderColorIcon from '@mui/icons-material/EditOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dropdown from 'react-dropdown';
import TrafficIcon from '@mui/icons-material/TrafficOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined';
import { createPoint, getAllPoints, getAllStreets, getAllStreetsWithTraffic } from '@/API';
import { ISteet, ISteetPred } from '@/API/models/street';
import { useAppSelector, useAppDispatch, mapStore } from '@/store';
import { setEditType, setStreetID } from '@/store/map';
import { IPoint } from '@/API/models/point';
import trafficLightIconSVG from '@/assets/traffic-light.svg'
import { Notifications } from '@/components/Notifications';
import { useDebounce } from 'use-debounce';

const trafficLightIcon = L.icon({
  iconUrl: trafficLightIconSVG as string,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const MapEditState = (props: {
  setUpdate: (update: boolean) => void,
  update: boolean
}) => {
  const dispatch = useAppDispatch()
  const mapState = useAppSelector(mapStore)
  useMapEvents({
    click: (e) => {
      const { latlng } = e
      const { lat, lng } = latlng
      if (mapState.editType === 'traffic_light') {
        createPoint({
          point: [[lat, lng]],
          type: 'simple',
          radius: 0,
          description: 'traffic_light',
          fromTime: new Date().toISOString().replace('Z', ''),
          toTime: new Date().toISOString().replace('Z', ''),
        }).then(() => {
          props.setUpdate(true)
          dispatch(setEditType(null))
        })
      }
    },
  })
  return null
}

const Streets = (props: {
  streets: {
    predictions: number,
    street: string,
    point: number[][],
    id: number
  }[],
  weight: number,
  date: number
}) => {
  const dispatch = useAppDispatch()
  const getPrevText = () => {
    const now = new Date().getDate()
    if (now < props.date) {
      return 'Прогноз загруженности: '
    }
    if (now > props.date) {
      return 'Записанная загруженность: '
    }
    return 'Текущая загруженность: '
  }
  const getColor = (predictions: number) => {
    if (predictions < 70) {
      return 'green'
    }
    if (predictions < 100) {
      return 'yellow'
    }
    return 'red'
  }
  return (
    <>
      {props.streets.map((street, index) => (
        <Polyline pathOptions={{ 
          color: getColor(street.predictions) ,
          className: styles.polyline,
          weight: props.weight,
          }} 
          positions={street.point} 
          key={index} 
          eventHandlers={{
            click: (e) => {
              dispatch(setStreetID(street.id))
            }
          }}
        >
          <Tooltip sticky offset={[0, 20]}>
            <span>{street.street}</span>
            <br/>
            {getPrevText()} <b>{Math.floor(street.predictions)}</b> машин
          </Tooltip>
        </Polyline>
      ))}
    </>
  )
}

const MapZoom = () => {
  const map = useMap()
  return (
    <div className={styles.mapZoomContainer}>
      <div onClick={() => map.setZoom(map.getZoom() + 1)}>
        <Add
          fontSize='large'
        />
      </div>
      <div onClick={() => map.setZoom(map.getZoom() - 1)}>
        <Remove
          fontSize='large'
        />
      </div>
    </div>
  )
}

const BottomTimeContainer = (props: {
  setValue(value: number): void,
}) => {
  const [details, setDetails] = useState<TrackDetails | null>(null);
  
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 7,
      spacing: -10,
    },
    initial: new Date().getHours()-3,
    mode: 'free-snap',
    loop: true,
    dragSpeed: 5,
    detailsChanged(s) {
      setDetails(s.track.details)
    }
  })
  
  const times = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30'
  ]

  useEffect(() => {
    if (!details) return;
    props.setValue(parseInt(times[details.rel]))
  }, [details])

  function scaleStyle(idx: number) {
    if (!details) return {};

    if (idx === details.rel+3) {
      return {
        height: '120px',
        zIndex: 10,
      };
    }
    if (idx === details.rel+2 || idx === details.rel+4) {
      return {
        height: '100px',
        zIndex: 9,
      };
    }
    if (idx === details.rel+1 || idx === details.rel+5) {
      return {
        height: '85px',
        zIndex: 8,
      };
    }
    if (idx === details.rel || idx === details.rel+6) {
      return {
        height: '70px',
        zIndex: 7,
      };
    }

    return {};
  }

  return(
    <div className={styles.BottomTimeContainer}>
      <div ref={ref} className="keen-slider">
        {
          times.map((time, index) => (
            <div 
              className={`${styles.slide} keen-slider__slide`} 
              style={scaleStyle(index)} 
              key={index}
            >
              {time}-06
            </div>
          ))
        }
      </div>
    </div>
  )
}

const Info = (props: {
  onTrafficLightClick?: () => void
  onNotifyClick?: () => void
}) => {
  const mapState = useAppSelector(mapStore)
  return (
    <div className={styles.infoContainer}>
      <div className={styles.trjam}>
        6
      </div>
      <Dropdown
        options={[
          <TrafficIcon key={1} />,
          <AddHomeOutlinedIcon key={2}/>, 
          <AddRoadOutlinedIcon key={3}/>
        ] as any}
        onChange={(e) => {
          if (e.label?.key === "1") {
            if (props.onTrafficLightClick) props.onTrafficLightClick()
          }
        }}
        placeholder={''}
        controlClassName={styles.ddControl}
        menuClassName={styles.ddMenu}
        value={''}
        arrowClosed={
          <BorderColorIcon
            fontSize='large'
            style={{
              padding: '5px',
              borderRadius: '5px',
              color: mapState.editType ? 'black' : 'white',
              background: mapState.editType ? '#C9FF32' : 'transparent',
            }}
          />
        }
        arrowOpen={
          <BorderColorIcon
            fontSize='large'
            style={{
              background: '#C9FF32',
              padding: '5px',
              borderRadius: '5px',
            }}
          />
        }
      />
      <NotificationsIcon
        fontSize='large'
        onClick={() => {
          if (props.onNotifyClick) props.onNotifyClick()
        }}
        style={{
          padding: '5px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

export const Map = () => {
  const [streets, setStreets] = useState<ISteetPred[]>([])
  const [points, setPoints] = useState<IPoint[]>([])
  const [currentTile, setCurrentTile] = useState(1)
  const [currentDate, setCurrentDate] = useState(new Date().getDay())
  const [update, setUpdate] = useState(false)
  const dispatch = useAppDispatch()

  const [value] = useDebounce(currentDate, 1000)
  
  useEffect(() => {
    getAllStreetsWithTraffic(1).then((resp) => {
      setStreets(resp.data)
    })
    getAllPoints().then((resp) => {
      setPoints(resp.data.filter(point => point.description === 'traffic_light'))
    })
  }, [update])

  useEffect(() => {
    getAllStreetsWithTraffic(value).then((resp) => {
      setStreets(resp.data)
    })
  }, [value])

  const onModalClose = () => {
    dispatch(setStreetID(null))
  }


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
  
  if (!streets.length) return null
  return (
    <>
      <MapContainer 
        center={[45.0264136, 38.9712712]} 
        zoom={14} 
        style={{
          position: 'absolute',
          height: '94vh',
          width: '90vw',
          borderRadius: '20px',
          left: '10vw',
          marginTop: '3vh',
        }}
        className={styles.map}
      >
      <TypesDropdown 
        types={tiles.map(tile => ({
          value: tile.id,
          label: tile.name
        })) as any} 
        onChange={(e) => {
          setCurrentTile(e.value as any as number)
        }} 
        selectedType={tiles.find(t => t.id === currentTile)?.name as any} 
      />
        <MapEditState setUpdate={setUpdate} update={update} />
        <Info 
          onTrafficLightClick={ () => dispatch(setEditType('traffic_light')) } 
          onNotifyClick={onModalClose}
        />
        <MapZoom />
        <BottomTimeContainer 
          setValue={setCurrentDate}
        />
        <Notifications />
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
        <Streets streets={streets} weight={6} date={currentDate} />
        {
          points.map((point, index) => (
            <Marker
              key={index}
              position={point.point[0]}
              icon={point.description === 'traffic_light' ? trafficLightIcon : null}
            />
          ))
        }
      </MapContainer>
    </>
  )
}