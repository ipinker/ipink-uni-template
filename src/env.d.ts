/// <reference types="vite/client" />
import { ComponentCustomProperties } from "@vue/runtime-core";
import type { VueI18nTranslation, Messages, Locales } from "vue-i18n";
import { UniNamespace as UniApp } from "@dcloudio/types"

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $system: UniApp.GetSystemInfoResult;
    $tr: any;
  }
}

export default ComponentCustomProperties;
