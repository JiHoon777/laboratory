import { computed, makeObservable } from "mobx";
import { IBaseProject } from "./IBaseProject";

export class BaseProjectStore {
  projectName: string;
  projectDesc: string;

  constructor(projectName: string, projectDesc: string) {
    this.projectName = projectName;
    this.projectDesc = projectDesc;

    makeObservable(this, {
      getNameAndDesc: computed,
    });
  }

  get getNameAndDesc(): IBaseProject {
    return {
      projectName: this.projectName,
      projectDesc: this.projectDesc,
    };
  }
}
