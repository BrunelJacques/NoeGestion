// src/ap_stocks/hooks/contextMouvement/MouvementProvider.tsx
import {useMemo, useState, type ReactNode } from "react";
import type { Mouvement } from "../../types/mouvement";
import { MouvementContext, MvtPatchContext, ArticleContext } from "./MouvementContext";
import {ART0, type Article } from "../../types/article";


export const MouvementProvider = ({ children, initialMouvement }: { children: ReactNode; initialMouvement: Mouvement }) => {

  const [mouvement, setMouvement] = useState<Mouvement>(initialMouvement);
  const [mvtPatch, setMvtPatch] = useState<Mouvement>(mouvement);
  const [article, setArticle] = useState<Article>(ART0);

  const [formKey, setFormKey] = useState(0);

  const resetPatch = () => {
    setMvtPatch(mouvement);
    setFormKey((prevKey) => prevKey + 1);
  }

  const clearArticle = () => {
    setArticle(ART0);
  }

  // Mémoïsation pour éviter les re-renders inutiles
  const mvtValue = useMemo(() => ({
    mouvement,
    setMouvement,
    resetPatch
  }), [mouvement]);

  const mvtPatchValue = useMemo(() => ({
    mvtPatch,
    setMvtPatch,
    resetPatch,
    formKey
  }), [mvtPatch, formKey]);

  const articleValue = useMemo(() => ({
    article,
    setArticle,
    clearArticle,
  }), [article]);
  return (
    <MouvementContext.Provider value={mvtValue}>
      <MvtPatchContext.Provider value={mvtPatchValue}>
        <ArticleContext.Provider value={articleValue}>
          {children}
        </ArticleContext.Provider>
      </MvtPatchContext.Provider>
    </MouvementContext.Provider>
  );
};