import { GlobalEnv } from '@build/types';

declare global {
  declare const __APP_MODE__: GlobalEnv['__APP_MODE__'];
}
