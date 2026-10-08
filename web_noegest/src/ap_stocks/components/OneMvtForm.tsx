// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../types/mvtFormFields.ts";
import type { MvtPatch, Mouvement} from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import {type SyntheticEvent } from "react";
import {getCellValue} from "../../utils/getCellValue.tsx";
import FieldArticle from "./FieldArticle.tsx";
import FieldFournisseur from "./FieldFournisseur.tsx";
import FieldService from "./FieldService.tsx";
import { standardize } from "../../utils/string.ts";
import {dicCalculs} from "../utils/calculs.tsx";

type MvtPatchObj = NonNullable<MvtPatch>;

interface Props {
  formKey: number;
  fields: MvtFormField[];
  mouvement: Mouvement;
  updateField: <K extends keyof MvtPatchObj>(
    field: K,
    value?: MvtPatchObj[K] | null
  ) => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  activeMouvement: any;
}

export function OneMvtForm({ fields,mouvement,activeMouvement, ...prp}:Props) {

  const idMvt=mouvement.id
  const disabledFields = new Set(["couttot","coutun","pxun","nomcourt","pxstock","qtestock"])
  const minusable = new Set(["qte","couttot"])
  const article = mouvement.article

  const champs=fields.map(fld => {
    const name = standardize(fld.label);
    const sens = (minusable.has(name)) ? mouvement.sens : null;
    const val = getCellValue(mouvement, fld, dicCalculs)
    return {
      ...fld,
      name: name,
      disabled: disabledFields.has(name),
      value: sens? +val * sens :val, // value : number|string, val:string
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
          const currentFieldValue = activeMouvement[fld.fieldName as keyof typeof activeMouvement];
          const key = `fld-${idMvt}-${fld.name}`;

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
                  id={article.nom}
                  updateField={(art) => {
                    if (typeof art?.id === "number") {
                      prp.updateField("IdArticle", art.id);
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
                  label={fld.name}
                  showReset={true}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    const targetKey = fld.fieldName as keyof MvtPatchObj;
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