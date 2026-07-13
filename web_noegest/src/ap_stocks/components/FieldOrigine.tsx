//src/ap_stocks/components/FieldOrigine.tsx
import type {  Origine } from '../constants/origines';
import type { Item } from '../../types/item.ts';
import { Xautocomplete } from '../../ui/Xautocomplete';
import { checkIsValid} from '../../ui/Xautocomplete/fnComplete.tsx';


interface Props {
  id: string | null | undefined;
  updateField: (value: string) => void;
  origineItems?: Origine[];
  allowNull?: boolean
}


// Paramétrage du select pour les origines
export default function FieldOrigine({ id,
                                       updateField,
                                       origineItems=[{ id:  'repas', nom: 'Repas en cuisine' },],
                                       allowNull=false }
                                     : Props) {

  // Un changement des origineItems, doit écraser value et provoqura un test de validité
  const value = checkIsValid(id??"",origineItems,true)? id : "";

  const fetchOrigines =  (search?: string) => {
    const query = search ?? ""; // search si null ou undefined, sinon ""
    return [
      ...origineItems
        .filter((u: Origine) => u.nom && u.nom.toLowerCase().includes(query.toLowerCase())
        )
        .map((u: Origine) => ({
          id: u.id,
          nom: u.nom
        }))
    ];
  };


  const handleChange = (item: Item | string) => {
      const id =
        typeof item === "object" && item !== null && "id" in item
          ? String(item.id)
          : String(item);
      
      updateField(id);
    };

  return (
      <>
        <Xautocomplete
          label="Origine"
          name="origine"
          value={value ?? ""}
          fetchItems={fetchOrigines}
          onSelect={handleChange}
          required={!allowNull}

        />
      </>
  );
}

