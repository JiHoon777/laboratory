import { IDOBaseStore } from "./IDOBaseStore";

export interface IGQLObject {}

export interface IDOBase<
  DATA extends IGQLObject,
  ID_TYPE extends string | number
> {
  readonly store: IDOBaseStore<DATA, ID_TYPE, IDOBase<DATA, ID_TYPE>>;
  readonly id: ID_TYPE;

  rawData: Partial<DATA>;

  merge(data: Partial<DATA>): void;
}
