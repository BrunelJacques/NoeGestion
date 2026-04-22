//src/stocks/components/CardFiltre/index.tsx

export interface CardFiltreProps  {
  altClassName?: string;
}

export default function CardFiltre(props: CardFiltreProps) {
  return (
    <div className={props.altClassName}>
      <span>Card Filtre  ___________________ ___________</span>
      <span>AAAA AA</span>
      <span>bbbb bbb</span>
      <span>aaaaa a_______bb bbbbb</span>
    </div>
  );
}

