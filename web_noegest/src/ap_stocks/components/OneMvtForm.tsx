// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../types/mvtFormFields.ts";
import type { Mouvement} from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import type { SyntheticEvent } from "react";
import {getCellValue} from "../../utils/getCellValue.tsx";
import FieldArticle from "./FieldArticle.tsx";
import FieldFournisseur from "./FieldFournisseur.tsx";
import FieldService from "./FieldService.tsx";
import { standardize } from "../../utils/string.ts";
import {dicCalculs} from "../utils/calculs.tsx";

interface Props {
  formKey: number,
  fields: MvtFormField[],
  mouvement: Mouvement,
  updateField: (field: keyof Mouvement, value?: Mouvement[keyof Mouvement]|null) => void,
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>,
}

export function OneMvtForm({ fields,mouvement, ...prp}:Props) {
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
                    updateField={
                      (art) => prp.updateField(`article`, art?.id)
                    }
                  />
                ) : (fld.fieldName === "fournisseur") ?(
                <FieldFournisseur
                  id={mouvement.fournisseur}
                  updateField={
                    (art) => prp.updateField(`fournisseur`, art)
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
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(fld.value ?? "")}
                  label={fld.name}
                  showReset={true}
                  onChange={(evt) => {
                    const nextValue =
                      fld.type === "number"
                        ? Number(evt.target.value)
                        : evt.target.value;

                    prp.updateField(fld.fieldName!, nextValue as Mouvement[typeof fld.fieldName]);
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