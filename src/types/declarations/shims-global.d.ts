import type { GlobalEnv } from '../../../config/build/types';

declare global {
  const APP_MODE: GlobalEnv['APP_MODE'];
}
