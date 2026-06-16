// src/ap_stocks/components/StMenu/FormOneMvt.tsx
import * as s from "../../pages/OneMvt/index.css.ts";
import {Form} from "react-router-dom";
import type { MvtFormField } from "../../types/mvtFormFields.ts";
import type { Mouvement } from "../../types/mouvement.ts";
import {Xinput} from "../../../ui/Xinput";
import {SpanCell} from "../../../ui/SpanCell";
import type { SyntheticEvent } from "react";
import {getCellValue} from "../../../utils/getCellValue.tsx";
import {dicCalculs} from "../../utils/calculs.tsx";

interface Props {
  formKey: number,
  fields: MvtFormField[],
  draft: Mouvement,
  updateField: <K extends keyof Mouvement>(fieldName: K,
                                           value: Mouvement[K]) => void,
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>,
}


export default function FormOneMvt({ ...p}:Props) {


return (
  <div className={s.wrapForm}>
    <Form
      id="oneMvtForm"
      key={p.formKey}
      onSubmit={p.handleSubmit}
    >
      <div className={s.formStyle}>
        {/* ------- déroulé des champs par map ------- */}
        {p.fields.map((fld) => {
          const val = getCellValue(p.draft, fld, dicCalculs);
          const isEditable = Boolean(
            fld.fieldName &&
            !fld.subFieldName &&
            !fld.calcul
          );

          return (
            <div
              key={`field-${p.draft.id}-${fld.label}`}
            >
              {isEditable && fld.fieldName ? (
                <Xinput
                  type={fld.type === "number" ? "number" : fld.type === "date" ? "date" : "text"}
                  value={String(p.draft[fld.fieldName] ?? "")}
                  showReset={false}
                  onChange={(evt) => {
                    const nextValue =
                      fld.type === "number"
                        ? Number(evt.target.value)
                        : evt.target.value;

                    p.updateField(
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