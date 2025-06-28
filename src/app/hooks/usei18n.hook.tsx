import { StorageKeys } from "@/domain/constants/storageKeys.constants";
import { storageInfra } from "@/infra/storage/index.storage.infra";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const storage = storageInfra();

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const choosenLanguage = useMemo(() => {
    let language: string | null;

    if (!i18n.language) {
      language = storage.recover<string>(StorageKeys.i18nextLng) ?? "pt";
    } else {
      language = i18n.language;
    }

    return language;
  }, [i18n.language]);

  return {
    translation: t,
    changeLanguage: i18n.changeLanguage,
    choosenLanguage,
  };
};
