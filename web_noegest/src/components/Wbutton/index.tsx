import { ButtonHTMLAttributes } from 'react'
import * as styles from './index.css.ts'


type buttonPropsType = ButtonHTMLAttributes<HTMLButtonElement>

export function Wbutton(props: buttonPropsType) {
  return (
    <button 
      className={styles.fancyButton} {...props}>
        {props.children}
    </button>
  )
}
