// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../types/mvtFormFields.ts";
import type { Mouvement, MvtActif} from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import {useState, type SyntheticEvent } from "react";
import {getCellValue} from "../../utils/getCellValue.tsx";
import FieldArticle, {ChangeArticle} from "./FieldArticle.tsx";
import FieldFournisseur from "./FieldFournisseur.tsx";
import FieldService from "./FieldService.tsx";
import { standardize, fmtLabel } from "../../utils/string.ts";
import {calculsMvt} from "../utils/calculs.tsx";



interface Props {
  formKey: number;
  fields: MvtFormField[];
  mouvement: Mouvement;
  updateField: <K extends keyof MvtActif>(
    field: K,
    value?: MvtActif[K] | null
  ) => void;
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  id:string;
}

export function OneMvtForm({ fields,mouvement, ...prp}:Props) {

  const [mvtActif, setMvtActif] = useState<MvtActif>({
    ...mouvement,
  }); // affiché
  const idMvt=mouvement.id
  const disabledFields = new Set(["couttot","coutun","pxun","nomcourt","pxstock","qtestock"])
  const minusable = new Set(["qte","couttot"])
  const article = mouvement.article

  const champs=fields.map(fld => {
    const stdLabel = standardize(fld.label)
    const sens = (minusable.has(stdLabel)) ? mouvement.sens : 1;
    const val = getCellValue(mouvement, fld, calculsMvt)
    return {
      ...fld,
      stdLabel: stdLabel,
      label:  fmtLabel(fld.label), // Ajoute un espace entre minus & maj
      disabled: disabledFields.has(stdLabel),
      value: sens? +val * sens :val, // value : number|string, val:string
    };
  });
  if (mouvement != mvtActif) {
    console.log("mouvement en actif",mouvement);
    setMvtActif(mouvement);
  }

return (
  <div className={s.wrapForm}>
    <Form
      id={prp.id}
      key={prp.formKey}
      onSubmit={prp.onSubmit}
    >
      <div className={s.formStyle}>
        {/* ------- déroulé des champs par map ------- */}
        {champs.map((fld) => {
          const currentFieldValue = mvtActif[fld.fieldName as keyof typeof mvtActif];
          const key = `fld-${idMvt}-${fld.stdLabel}`;
          console.log(`>>>>>>>>> ${fld.label},${fld.stdLabel},${fld.value}`)
          return (
             /*------- affichage d'un champ selon sa nature -------*/
            <div key={key} >
              { (fld.disabled) ?( // champs non modifiables
                <Xinput
                  value= {fld.value}
                  disabled= {true}
                  label= {fld.label}
                />
              ) : (fld.fieldName === "article") ?(
                <FieldArticle
                  nomArt= {article?.nom}
                  updateField={async (art) => {
                    if (typeof art?.id === "number") {
                      const modifs = await ChangeArticle(art,mouvement)
                      modifs.map((modif) => (
                        prp.updateField(modif[0], modif[1])
                      ))
                    }
                  }}
                />
              ) : (fld.fieldName === "fournisseur") ?(
                <FieldFournisseur
                  id={mouvement.fournisseur}
                  updateField={
                    (fourn) => prp.updateField("fournisseur", fourn ? Number(fourn) : null)
                  }
                />
              ) : (fld.fieldName === "service") ?(
                <FieldService
                  id={mouvement.service}
                  updateField={
                    (serv) => prp.updateField(`service`, serv)
                  }
                />
              ) : (fld.fieldName) ? ( // autres champs modifiables
                <Xinput
                  key={fld.fieldName}
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(currentFieldValue ?? "")}
                  label={fld.label}
                  showReset={true}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    const targetKey = fld.fieldName as keyof MvtActif;
                    const rawVal = evt.target.value;
                    const nextValue = fld.type === "number"
                      ? (rawVal === "" ? "" : Number(rawVal))
                      : rawVal;
                    prp.updateField(targetKey, nextValue as any);
                  }}
                />
              ) : typeof fld.value === "number" ? (
                <SpanCell
                  value={fld.value}
                  justify={fld.justify}
                  nbDecimals={fld.nbDecimals}
                  width={fld.width}
                />
              ) : (
                <SpanCell
                  value={String(fld.value)}
                  justify={fld.justify}
                  width={fld.width}
                />
              )}
            </div>
          );
        })}
      </div>
    </Form>
  </div>
)}