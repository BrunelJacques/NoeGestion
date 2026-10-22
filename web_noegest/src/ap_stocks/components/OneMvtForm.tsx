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

export function OneMvtForm({ fields,mvtPatch, ...prp}:Props) {

  const [mvtActif, setMvtActif] = useState<Mouvement>({ ...mvtPatch }); // affiché
  console.log("Form mvtPatch->actif", (mvtPatch != mvtActif),mvtPatch);
  useEffect(() => {
    setMvtActif({ ...mvtPatch });
  }, [mvtPatch]);

  const idMvt=mvtPatch.id
  const disabledFields = new Set(["couttot","coutun","pxun","nomcourt","pxstock","qtestock"])
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
      disabled: disabledFields.has(stdLabel),
      value: sens? Number(val) * sens :val, // value : number|string, val:string
    };
  });

  return (
    <div className={s.wrapForm}>
      <Form
        id="oneMvtForm"
        key={prp.formKey}
        //onSubmit={prp.handleSubmit}
      >
        <div className={s.formStyle}>
          {/* ------- déroulé des champs par map ------- */}
          {champs.map((fld) => {
            const currentFieldValue = mvtActif[fld.fieldName as keyof typeof mvtActif];
            const key = `fld-${idMvt}-${fld.stdLabel}`;
            //console.log(`>>>>>>>>> ${fld.label},${fld.value}`)
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
/*
                      if (typeof art?.id === "number") {
                        const modifs = await ChangeArticle(art,mvtPatch)
                        modifs.map((modif) => (
                          prp.updateField(modif[0], modif[1])
                        ))
                      }
*/
                      if (typeof art?.id === "number") {
                        const patch = await changementArticle(art, mvtPatch)
                        setMvtActif(patch)
                      }
                    }}
                  />

                ) : (fld.fieldName === "fournisseur") ?(
                  <FieldFournisseur
                    id={mvtPatch.fournisseur}
                    updateField={
                      (fourn) => prp.updateField("fournisseur", fourn ? Number(fourn) : null)
                    }
                  />
                ) : (fld.fieldName === "service") ?(
                  <FieldService
                    id={mvtPatch.service}
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
                      const targetKey = fld.fieldName as keyof Mouvement;
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
  )
}

