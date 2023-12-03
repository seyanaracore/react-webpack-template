import type { Entries, KeysOfUnion } from 'type-fest';
import type { GlobalEnv } from '../../../config/build/types';

declare global {
  const APP_MODE: GlobalEnv['APP_MODE'];
  const BASE_URL: GlobalEnv['BASE_URL'];

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ObjectConstructor {
    keys<T>(obj: T): KeysOfUnion<T>;
    entries<T>(o: T): Entries<T>;
  }
}
