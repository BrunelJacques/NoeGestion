//src/ap_stocks/components/FiltreService.tsx
import { Services } from "../stConstants";
import { Xselect } from "../../ui/Xselect";
import { useSelectObject } from "../hooks/useSelectObject";


interface Props {
  id: number;
  updateField: (value: number) => void;
}


//un seul param pour une fonction donc on encadre {}
export default function FiltreService({ id: T, updateField }: Props) {

  const service = useSelectObject(Services, T);
 
  // On intercepte le changement pour notifier le parent
  const handleChange = (newValue: string | number) => {
    service.onChange(newValue); // Met à jour l'affichage local du select
    updateField(Number(newValue)); // Remonte l'info au parent
  };
  
  return (
    <>
      <Xselect<string|number>
        label="Service"
        name="service"
        value={service.value}
        onChange={handleChange}
        options={service.options}
      />
    </>
  );
}

