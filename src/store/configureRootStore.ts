import React from "react";
import { LabRootStore } from "./LabRootStore";

export const rootStore = new LabRootStore();
export const RootStoreContext = React.createContext(rootStore);
export const useLabStore = () => React.useContext(RootStoreContext);
