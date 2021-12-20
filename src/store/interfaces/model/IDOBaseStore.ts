import { IDOBase, IGQLObject } from "./IDOBase";
import { ILABRootStore } from "../ILABRootStore";
import { LABBaseType } from "./LABBaseType";

export interface IDOBaseStore<
  DATA extends IGQLObject,
  ID_TYPE extends string | number,
  DO extends IDOBase<DATA, ID_TYPE>
> {
  rootStore: ILABRootStore;
  typename: LABBaseType;

  getById(id: ID_TYPE): DO;
  merge(data: Partial<DATA>): DO;
}
