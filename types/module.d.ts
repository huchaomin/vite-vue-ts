declare module '*.vue' {
  import { type DefineComponent } from 'vue';

  const Component: DefineComponent<object, object, any>;
  export default Component;
}

declare module '*/signMd5Utils.js' {
  export function getSign(url: string, params: Record<string, any> | undefined): string;
  export function getDateTimeToString(): string;
}
