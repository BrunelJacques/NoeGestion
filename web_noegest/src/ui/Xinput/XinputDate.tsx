// src/ui/variants/XinputDate.tsx
import { Xinput } from "./index.tsx";
import * as dt from "../../utils/dates.ts";
import * as sc from "../xcommon.css.ts";
import {useLayoutEffect, useRef, useState, useEffect} from "react";
import {useFormValidation} from "../../contexts/FormContext.tsx";


interface Props {
    jour?: Date | null,
    onChange?: (value: Date | null) => void,
    altClassName?: string,
    label?: string,
    error?: string | null,
    showReset?: boolean,
    disabled?: boolean,
    value?: string | undefined,
    autoComplete?: string
}

export function XinputDate({ jour, onChange, ...props }: Props) {

    const [dateFr, setDateFr] = useState(dt.dateToStringFr(jour??null));

    const isValid = dateFr === "" || dt.isValidDateFr(dateFr);

    const isValidRef = useRef(isValid); // si plusieurs instances il faut identifier

    useEffect(() => {
        isValidRef.current = isValid;
    }, [isValid]);

    // Connexion au système de validation parent
    const validation = useFormValidation();

    useEffect(() => {
        if (!validation || !props.label) return;

        // On retourne la fonction qui sera exécutée lors du Submit global
        return  validation.registerValidator(props.label, () => {
            return isValid;
        });

    }, [validation, props.label, isValid]); // Recalculé si isValid change

    const inputRef = useRef<HTMLInputElement>(null);

    const cursorPosRef = useRef<number | null>(null);

    const handleBackSpace = () => {  // sauter le slash automatiquement sinon il sera remis par le formatage
        const pos = cursorPosRef.current ?? 0;
        const carAtPos = dateFr.charAt(pos);
        if (carAtPos === "/") {
            setDateFr(dateFr.slice(0, carAtPos === "/" ? pos - 1 : pos) + dateFr.slice(pos));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.disabled) return;

        const el = e.target;

        // sauvegarde de la position du curseur
        cursorPosRef.current = el.selectionStart ?? null;

        // Formatage
        const formatted = dt.stringToFormatted(el.value);


        // Mise à jour du state pour input.value
        setDateFr(formatted);

        // callback parent
        if (onChange) {
            onChange(dt.stringToDate(formatted));
        }
    };

    // Restauration du curseur après rerender
    useLayoutEffect(() => {
        const el = inputRef.current;
        let pos = cursorPosRef.current;
        console.log("rerender LayoutEffect",pos, "/", el, dateFr);
        if (!el) return;

        // Ajustement si curseur derrière un "/" ajouté automatiquement
        if (pos && dateFr[pos - 1] === "/" && [2, 5].includes(pos)) {
            pos -= 1;
        } else {
            if (pos && (dateFr[pos] === "/" || [3, 6].includes(pos))) {
                pos += 1;
            }
        }
        el.setSelectionRange(pos, pos);
    }, [dateFr]);

    return (
        <div className={sc.wrapperV}>
            <Xinput
                {...props}
                ref={inputRef}
                value={dateFr}
                maxLength={11}
                onChange={handleChange}
                onBackSpace={handleBackSpace}
                placeholder="jjmmaaaa"
                error={!isValid ? "Date invalide" : null}
            />
        </div>
    );
}
