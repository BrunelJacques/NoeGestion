// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../types/mvtFormFields.ts";
import type { Mouvement } from "../types/mouvement.ts";
import {Xinput} from "../../ui/Xinput";
import {SpanCell} from "../../ui/SpanCell";
import type { SyntheticEvent } from "react";
import {getCellValue} from "../../utils/getCellValue.tsx";
import {dicCalculs} from "../utils/calculs.tsx";
import FieldArticle from "./FieldArticle.tsx";
//import { getProp } from "../../../utils/getProp.tsx";

interface Props {
  formKey: number,
  fields: MvtFormField[],
  draft: Mouvement,
  updateField: <K extends keyof MvtFormField>(fieldName: K,
                                           value: MvtFormField[K]) => void,
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>,
}


export default function FormOneMvt({ ...prp}:Props) {


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
          const val = getCellValue(prp.draft, fld, dicCalculs);
          const isEditable = Boolean(
            fld.fieldName &&
            !fld.subFieldName &&
            !fld.calcul
          );

          return (
            <div
              key={`field-${prp.draft.id}-${fld.label}`}
            >
              { fld.fieldName === "article" ?(
                <FieldArticle
                  nom={fld.subFieldName}
                  updateField={(art) => prp.updateField(`article`, art)}
                />
                ) : (isEditable && fld.fieldName) ? (
                <Xinput
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(prp.draft[fld.fieldName] ?? "")}
                  showReset={false}
                  onChange={(evt) => {
                    const nextValue =
                      fld.type === "number"
                        ? Number(evt.target.value)
                        : evt.target.value;

                    prp.updateField(
                      fld.fieldName!,
                      nextValue as Mouvement[typeof fld.fieldName]
                    );
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