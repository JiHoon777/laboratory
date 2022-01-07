import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SiteUrls } from "./utils/SiteUrls";
import { MainLayout } from "./common/MainLayout";

function App() {
  return (
    <div>
      {/*<MoveGraphContainer />*/}
      <BrowserRouter>
        <Routes>
          <Route path={SiteUrls.Main.Root} element={<MainLayout />} />
          <Route path={"*"} element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
