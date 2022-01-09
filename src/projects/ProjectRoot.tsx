import React from "react";
import { observer } from "mobx-react";
import { useMatch } from "react-router-dom";
import { SiteUrls } from "../utils/SiteUrls";
import { ProjectEnum } from "../store/projects/projectEnum";
import { ContextMenu } from "./contextMenu/ContextMenu";
import { InfiniteScroll } from "./infiniteScroll/InfiniteScroll";
import { ScrollSpy } from "./scrollSpy/ScrollSpy";

interface IProjectRootProps {}

export const ProjectRoot: React.FC<IProjectRootProps> = observer((props) => {
  const match = useMatch(SiteUrls.Main.Project);

  const isContextMenu = match?.params.project === ProjectEnum.ContextMenu;
  const isInfinite = match?.params.project === ProjectEnum.Infinite;
  const isScrollSpy = match?.params.project === ProjectEnum.ScrollSpy;
  return (
    <>
      {isContextMenu && <ContextMenu />}
      {isInfinite && <InfiniteScroll />}
      {isScrollSpy && <ScrollSpy />}
    </>
  );
});
