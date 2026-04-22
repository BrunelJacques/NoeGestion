//src/stocks/components/MenuFiltre/index.tsx



export interface FiltresProps  {
  altClassName?: string;
}

export default function MenuFiltre(props: FiltresProps) {
  return (
    <div className={props.altClassName}>
      <span>Menu Filtre test</span>
      <span>Menu</span>
      <span>Filtre</span>
      <span>Menu_______Filtre</span>
    </div>
  );
}
