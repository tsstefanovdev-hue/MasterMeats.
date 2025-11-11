import { useEffect } from "react";
import i18next from "i18next";
import { useProductStore } from "../stores/useProductStore";

export const useSyncProductsWithLanguage = () => {
  const fetchAllProducts = useProductStore((s) => s.fetchAllProducts);

  useEffect(() => {
    // re-fetch when language changes
    const reload = () => fetchAllProducts();
    i18next.on("languageChanged", reload);

    // cleanup
    return () => i18next.off("languageChanged", reload);
  }, [fetchAllProducts]);
};