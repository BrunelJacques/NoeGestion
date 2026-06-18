// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../types/mvtFormFields.ts";
import type { MvtPatch } from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import type { SyntheticEvent } from "react";
import {getCellValue} from "../../utils/getCellValue.tsx";
import FieldArticle from "./FieldArticle.tsx";
import type { Article } from "../types/article.ts";
//import { getProp } from "../../../utils/getProp.tsx";

interface Props {
  formKey: number,
  fields: MvtFormField[],
  mvtPatch: MvtPatch,
  article: Article,
  updateField: (field: keyof MvtPatch, value?: MvtPatch[keyof MvtPatch]|null) => void,
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>,
}


export default function OneMvtForm({ ...prp}:Props) {

return (
  <div className={s.wrapForm}>
    <Form
      id="oneMvtForm"
      key={prp.formKey}
      onSubmit={prp.handleSubmit}
    >
      <div className={s.formStyle}>
        {/* ------- déroulé des champs par map ------- */}
        {prp.fields.map((fld) => {
          const val = getCellValue(prp.mvtPatch, fld);
          const isEditable = Boolean(
            fld.fieldName &&
            !fld.subFieldName &&
            !fld.calcul
          );

          return (
            <div
              key={`field-${prp.mvtPatch.id}-${fld.label}`}
            >
              { fld.fieldName === "article" ?(
                <FieldArticle
                  nom={fld.subFieldName}
                  updateField={
                    (art) => prp.updateField(`article`, art?.id)
                  }
                />
                ) : (isEditable && fld.fieldName) ? (
                <Xinput
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(prp.mvtPatch[fld.fieldName] ?? "")}
                  showReset={false}
                  onChange={(evt) => {
                    const nextValue =
                      fld.type === "number"
                        ? Number(evt.target.value)
                        : evt.target.value;

                    prp.updateField(fld.fieldName!, nextValue as MvtPatch[typeof fld.fieldName]);
                  }}
                />
              ) : typeof val === "number" ? (
                <SpanCell
                  value={val}
                  justify={fld.justify}
                  nbDecimals={fld.nbDecimals}
                  width={fld.width}
                />
              ) : (
                <SpanCell
                  value={String(val)}
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