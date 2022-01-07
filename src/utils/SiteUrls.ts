import { ProjectEnum } from "../store/projects/projectEnum";

export const SiteUrls = {
  Main: {
    Root: "/main",
    Project: "/main/project/:project",
  },
};

export const makeProjectUrl = (prName: ProjectEnum) => {
  return `/main/project/${prName}`;
};
