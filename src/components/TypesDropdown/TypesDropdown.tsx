import React, { FC } from 'react'
import Dropdown from 'react-dropdown';
import { TypesDropdownProps } from './TypesDropdown.d'
import styles from './TypesDropdown.module.scss'
import chevron from '@/assets/chevron.svg'

export const TypesDropdown: FC<TypesDropdownProps> = ({
  types,
  onChange,
  selectedType
}) => {
  return (
    <div>
      <Dropdown 
        options={types} 
        onChange={onChange} 
        placeholder="Select an option" 
        value={selectedType}
        controlClassName={styles.ddControl}
        className={styles.root}
        menuClassName={styles.ddMenu}
        arrowOpen={<img src={chevron as string} 
          style={{
            transition: 'transform 0.2s ease-in-out'
          }}
        />}
        arrowClosed={<img src={chevron as string} style={{
          transform: 'rotate(180deg)',
          transition: 'transform 0.2s ease-in-out'
        }} />}
      />
    </div>
  )
}
