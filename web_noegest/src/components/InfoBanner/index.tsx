// src/components/InfoBanner/index.tsx
import * as s from './index.css.ts';

export default function InfoBanner(info:string, titre?:string) {
  const annonce = titre ?? "Attention"
  return (
    <div className={s.title}>
      ⚠️ <strong>{annonce} :</strong> {info}
    </div>
  );
}

