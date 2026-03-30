// Xbutton.tsx  (fancy style button)

import { ReactNode,  ButtonHTMLAttributes } from 'react'
import * as s from './index.css.ts'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Xbutton({children, ...props}: ButtonProps) {
  return (
    <button  className={s.buttonStyle} {...props}>
        {children}
    </button>
  )
}
