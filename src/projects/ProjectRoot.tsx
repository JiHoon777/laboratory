import React from "react";
import { observer } from "mobx-react";
import { useMatch } from "react-router-dom";
import { SiteUrls } from "../utils/SiteUrls";
import { ProjectEnum } from "../store/projects/projectEnum";
import { ContextMenu } from "./contextMenu/ContextMenu";

interface IProjectRootProps {}

export const ProjectRoot: React.FC<IProjectRootProps> = observer((props) => {
  const match = useMatch(SiteUrls.Main.Project);

  const isContextMenu = match?.params.project === ProjectEnum.ContextMenu;
  return (
    <div className={"flex flex-col flex-1"}>
      {isContextMenu && <ContextMenu />}
    </div>
  );
});
