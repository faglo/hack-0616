import { FC, SyntheticEvent } from "react"
import { RadioButtonProps } from "./RadioButton.d"
import styles from './RadioButton.module.scss'

export const RadioButton: FC<RadioButtonProps> = ({children, checked, onChange}) => {
  return (
    <label htmlFor="dark" className={styles.radioComponent}>
      <input
        className={styles.radioInput}
        type="radio"
        name="dark"
        id="dark"
        value="dark"
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  )
}