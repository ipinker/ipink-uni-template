/// <reference types="vite/client" />
import { ComponentCustomProperties } from "@vue/runtime-core";
import type { VueI18nTranslation, Messages, Locales } from "vue-i18n";

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $system: proxy;
    $tr: VueI18nTranslation<Messages, Locales>;
  }
}

export default ComponentCustomProperties;
