//src/stocks/components/MenuFiltre/index.tsx



export interface FiltresProps  {
  className?: string;
}

export default function MenuFiltre(props: FiltresProps) {
  return (
    <div className={props.className}>
      <span>Menu Filtre test</span>
      <span>Menu</span>
      <span>Filtre</span>
      <span>Menu__ xxxxx  __  sssssssssssss ___Filtre</span>
    </div>
  );
}
