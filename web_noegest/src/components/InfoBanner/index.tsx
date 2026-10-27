// src/components/InfoBanner/index.tsx
import * as s from './index.css.ts';

export default function InfoBanner(info:string) {
  return (
    <div className={s.title}>
      ⚠️ {info}
    </div>
  );
}

