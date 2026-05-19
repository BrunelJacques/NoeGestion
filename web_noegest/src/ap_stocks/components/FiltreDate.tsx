//src/ap_stocks/components/FiltreDate.tsx

import { XinputDate } from "../../ui/variants/XinputDate";

interface Props {
  value: Date | null;
  updateField: (value: Date |null) => void;
}

export default function FiltreDate({ updateField }: Props) {
  return (
    <>
      <XinputDate
        label="Date"
        name="date"
        onChange={updateField}
      />
    </>
  );
}

