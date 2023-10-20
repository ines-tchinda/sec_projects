import { BrowserRouter, Routes,Navigate, Route } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import GriskLayout from "layouts/Grisk.js";
import Projet from "layouts/Projet.js";
import IdentifierActif from "views/examples/IdentifierActif";
import { ProjectProvider } from "components/app/Contexts/ProjectContext";
import { useEffect, useState } from "react";
import keycloak from "config/keycloak";


const App = () => {

  const [authentificated, setAuthentificated] = useState(false);


  useEffect(() => {
    // keycloak.init({
    //   onLoad: "login-required",
    //   checkloginIframe: false,
    //   promiseType: "native"
    // }).then((authentificated) => {
    //   console.log("authentificated", authentificated);
    //   setAuthentificated(authentificated);
    // })
  }, [])
    return (
<ProjectProvider>
<BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/grisk/*" element={<GriskLayout />} />
      <Route path="/projet/*" element={<Projet />} />
      <Route path="/IdentifierActif" element={<IdentifierActif />} />
      <Route path="*" element={<Navigate to="/Auth/Register" replace />} />
    </Routes>
  </BrowserRouter>
  </ProjectProvider>
    );
}

export default App;