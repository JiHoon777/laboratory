import React from "react";
import { Header } from "./Header";
import { observer } from "mobx-react";
import { useLabStore } from "../store/configureRootStore";
import { Route, Routes } from "react-router-dom";
import { makeProjectUrl, SiteUrls } from "../utils/SiteUrls";
import { ProjectRoot } from "../projects/ProjectRoot";
import { ProjectEnum } from "../store/projects/projectEnum";

interface IMainLayoutProps {}

export const MainLayout: React.FC<IMainLayoutProps> = observer((props) => {
  const store = useLabStore();

  const projectList = store.getProjects;
  return (
    <div className={"flex flex-col w-screen h-screen overflow-hidden"}>
      <Header projectList={projectList} />
      <Routes>
        <Route path={SiteUrls.Main.Project} element={<ProjectRoot />} />
        <Route
          path={makeProjectUrl(projectList[0].projectName as ProjectEnum)}
          element={<ProjectRoot />}
        />
      </Routes>
    </div>
  );
});
