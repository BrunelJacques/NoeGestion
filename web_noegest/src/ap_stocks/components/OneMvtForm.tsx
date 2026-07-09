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
import type { Article } from "../types/article.ts";
import FieldFournisseur from "./FieldFournisseur.tsx";
import { standardize } from "../../utils/string.ts";
import {dicCalculs} from "../utils/calculs.tsx";
//import { getProp } from "../../utils/getProp.tsx";

interface Props {
  formKey: number,
  fields: MvtFormField[],
  mouvement: Mouvement,
  article: Article,
  updateField: (field: keyof Mouvement, value?: Mouvement[keyof Mouvement]|null) => void,
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>,
}


export function OneMvtForm({ fields,mouvement,article, ...prp}:Props) {
  const idMvt=mouvement.id
  const disabledFields = new Set(["couttot","coutun","pxun","nomlong","pxstock","qtestock"])
  console.log("OneMvt",mouvement)

  const champs=fields.map(fld => {
    const name = standardize(fld.label);
    return {
      ...fld,
      name: name,
      disabled: disabledFields.has(name),
      value: getCellValue(mouvement, fld, dicCalculs),
    };
  });

return (
  <div className={s.wrapForm}>
    <Form
      id="oneMvtForm"
      key={prp.formKey}
      onSubmit={prp.handleSubmit}
    >
      <div className={s.formStyle}>
        {/* ------- déroulé des champs par map ------- */}
        {champs.map((fld) => {

          const key = `fld-${idMvt}-${fld.name}`;

          //console.log("OneField",key,fld.value,fld)
          return (
             /*------- affichage d'un champ selon sa nature -------*/
            <div key={key} >
              { (fld.disabled) ?(
                <Xinput
                  value= {fld.value}
                  disabled= {true}
                  label= {fld.label}
                />
              ) : (fld.fieldName === "article") ?(
                  <FieldArticle
                    value={article.nom}
                    updateField={
                      (art) => prp.updateField(`article`, art?.id)
                    }
                  />
                ) : (fld.fieldName === "fournisseur") ?(
                <FieldFournisseur
                  value={mouvement.fournisseur}
                  updateField={
                    (art) => prp.updateField(`fournisseur`, art)
                  }
                />
                ) : (fld.fieldName) ? (
                <Xinput
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(mouvement[fld.fieldName] ?? "")}
                  showReset={false}
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