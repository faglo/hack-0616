import { FC, useEffect, useState } from 'react'
import styles from './Notifications.module.scss'
import stats from '@/assets/stats.svg'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { mapStore, useAppDispatch, useAppSelector } from '@/store';
import { ISteetPred } from '@/API/models/street';
import { getAllStreetsWithTraffic, getAllStreetsWithTrafficByStreeet } from '@/API';

export const Notifications: FC = () => {
  const streetID = useAppSelector(mapStore).streetID
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    getAllStreetsWithTrafficByStreeet(streetID!).then((streets) => {
      setData(streets.data.map(street => ({
        prediction: street[0].predictions,
        name: street[0].date,
        title: street[0].street
      })))
      console.log(
        streets.data.map(street => ({
          prediction: Math.floor(street[0].predictions),
          name: street[0].date
        }))
      ) 
    })
  }, [streetID])
  if (!streetID || !data.length) {
    return null
  }
  return (
    <div className={styles.root} style={{
      display: streetID ? 'flex' : 'none'
    }}>
      <div className={styles.title}>
        Рекомендации
      </div>
      <div className={styles.stats}>
        <div className={styles.top}>
          <div className={styles.title}>
            Статистика {data[0].title}
          </div>
        </div>
        <div>
        <BarChart data={data} width={400} height={400}>
            <Bar dataKey="prediction" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis/>
          </BarChart>
        </div>
        {/* <img src={stats as string} alt="stats" className={styles.statsImg}/> */}
        <div className={styles.desc}>
          <span>9</span> баллов
        </div>
      </div>
    </div>
  )
}
