import type { Entries, KeysOfUnion } from 'type-fest';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ObjectConstructor {
    keys<T>(obj: T): KeysOfUnion<T>;
    entries<T>(o: T): Entries<T>;
  }
}
