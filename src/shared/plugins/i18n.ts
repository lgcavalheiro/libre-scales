import { ref, provide, inject, Ref } from "vue";

interface I18nConfig {
  locale: string;
  messages: Record<string, any>;
}

interface I18n {
  locale: Ref<string>;
  messages: Record<string, any>;
  t: Function;
}

const getNestedI18n = (
  keys: string[],
  messages: Record<string, any>,
  originalKey: string
): string => {
  const key = keys.shift();

  if (messages[key!] && typeof messages[key!] === "string")
    return messages[key!];
  else if (!messages[key!]) return originalKey;

  return getNestedI18n(keys, messages[key!], originalKey);
};

const createI18n = (config: I18nConfig) => ({
  locale: ref(config.locale),
  messages: config.messages,
  t(key: string) {
    if (!key.includes(".")) return this.messages[this.locale.value][key] || key;

    return getNestedI18n(key.split("."), this.messages[this.locale.value], key);
  },
});

const i18nSymbol = Symbol();

export function provideI18n(i18nConfig: I18nConfig) {
  const i18n = createI18n(i18nConfig);
  provide(i18nSymbol, i18n);
}

export function useI18n(): I18n {
  const i18n = inject(i18nSymbol);
  if (!i18n) throw new Error("i18n not provided");

  return i18n as I18n;
}
