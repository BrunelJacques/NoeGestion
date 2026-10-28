// src/ap_stocks/components/StMenu/OneMvtForm.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import {useEffect, useState, type SyntheticEvent} from "react";
import type {MvtFormField} from "../types/mvtFormFields.ts";
import type {Mouvement} from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import {getCellValue} from "../../utils/getCellValue.tsx";
import FieldArticle, {changementArticle} from "./FieldArticle.tsx";
import FieldFournisseur from "./FieldFournisseur.tsx";
import FieldService from "./FieldService.tsx";
import {standardize, fmtLabel} from "../../utils/string.ts";
import {calculsMvt} from "../utils/calculs.tsx";
import { useFiltres } from "../hooks/contextFiltres/useFiltres.tsx";

// Affichage du formulaire pour la gestion d'un enregistrement mouvement

interface Props {
  formKey: number;
  fields: MvtFormField[];
  mvtPatch: Mouvement;
  setMvtPatch: (mvtPatch: Mouvement) => void;
  updateField: <K extends keyof Mouvement>(
    field: K,
    value?: Mouvement[K] | null
  ) => void;
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  id:string;
}

export function OneMvtForm({ fields,mvtPatch, ...props}:Props) {
  const [mvtActif, setMvtActif] = useState<Mouvement>({ ...mvtPatch }); // affiché
  useEffect(() => {
    setMvtActif({ ...mvtPatch });
  }, [mvtPatch]);

  const { filtres } = useFiltres();
  const idMvt=mvtPatch.id
  const minusable = new Set(["qte","couttot"])
  const article = mvtPatch.article

  const champs=fields.map(fld => {
    const stdLabel = standardize(fld.label)
    const sens = (minusable.has(stdLabel)) ? mvtPatch.sens : null;
    const val = getCellValue(mvtPatch, fld, calculsMvt)
    return {
      ...fld,
      stdLabel: stdLabel,
      label:  fmtLabel(fld.label), // Ajoute un espace entre minus & maj
      value: sens? Number(val) * sens :val, // value : number|string, val:string
    };
  });
  return (
    <div className={s.wrapForm}>
      <Form
        id="oneMvtForm"
        key={props.formKey}
        //onSubmit={props.handleSubmit}
      >
        <div className={s.formStyle}>
          {/* ------- déroulé des champs par map ------- */}
          {champs.map((fld) => {
            const currentFieldValue = mvtActif[fld.fieldName as keyof typeof mvtActif];
            const key = `fld-${idMvt}-${fld.stdLabel}`;
            return (
              /*------- affichage d'un champ selon sa nature -------*/
              <div key={key} >
                {
                  ((fld.label) === "Article") ?(
                    <FieldArticle
                        nomArt= {article?.nom}
                        updateField={async (artItem) => {
                          if (typeof artItem?.id === "number") {
                            const patch = await changementArticle(artItem, mvtPatch, filtres)
                            props.setMvtPatch(patch)
                          }
                        }}
                        required={fld.required}
                    />
                  ):
                  (fld.label === "Fournisseur") ?(
                    <FieldFournisseur
                        id={mvtPatch.fournisseur}
                        updateField={
                          (fourn) => props.updateField("fournisseur", fourn ? Number(fourn) : null)
                        }
                        required={fld.required}
                      />
                    ): (fld.label === "Service") ?(
                      <FieldService
                        id={mvtPatch.service}
                        updateField={
                          (serv) => props.updateField(`service`, serv)
                        }
                      />
                    ): (fld.disabled) ?( // champs non modifiables
                      <Xinput
                        value= {fld.value}
                        label= {fld.label}
                        disabled= {true}
                        required={fld.required}
                      />
                    ): (fld.fieldName) ?( // autres champs modifiables
                      <Xinput
                        key={fld.fieldName}
                        type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                        value={String(currentFieldValue ?? "")}
                        label={fld.label}
                        showReset={true}
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                          const targetKey = fld.fieldName as keyof Mouvement;
                          const rawVal = evt.target.value;
                          const nextValue = fld.type === "number"
                            ? (rawVal === "" ? "" : Number(rawVal))
                            : rawVal;
                          console.log("nextValue dans",mvtPatch)
                          props.updateField(targetKey, nextValue);
                        }}
                        required={fld.required}
                      />
                    ): typeof fld.value === "number" ?(
                      <SpanCell
                        value={fld.value}
                        justify={fld.justify}
                        nbDecimals={fld.nbDecimals}
                        width={fld.width}
                      />
                    ): (
                      <SpanCell
                        value={String(fld.value)}
                        justify={fld.justify}
                        width={fld.width}
                      />
                    )
                }
              </div>
            );
          })}
        </div>
      </Form>
    </div>
  )
}

