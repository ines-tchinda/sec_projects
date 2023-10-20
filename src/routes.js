import Index from "views/Index.js";
import AcceuilProjet from "views/examples/AcceuilProjet";
import Register from "views/examples/Register.js";
import ListeProjet from "views/examples/ListeProjet.js";
import AnalyseRisques from "views/examples/AnalyseRisques.js";
import Icons from "views/examples/Icons.js";
import StepperForm from "views/examples/stepperForm.js";
import IdentifierActif from "views/examples/IdentifierActif";
import ProjectView from "views/ProjectDashboard/ProjectView";
import Checklist from "views/examples/Checklist";

var routes = [
 
  {
    path: "/AcceuilProjet",
    name: "Liste de vos Projets",
    icon: "ni ni-bullet-list-67 text-white",
    component: <AcceuilProjet />,
    layout: "/grisk",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-white",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/ListeProjet",
    name: "ListeProjet",
    icon: "ni ni-bullet-list-67 text-white",
    component: <ListeProjet />,
    layout: "/admin",
  },
  {
    path: "/stepperForm",
    name: "Créer un nouveau projet",
    icon: "ni ni-folder-17 text-white",
    component: <StepperForm />,
    layout: "/projet",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-white",
    component: <Register />,
    layout: "/auth",
    displayToSidebar: false,
  },
  {
    path: "/AnalyseRisques",
    name: "Analyse des risques",
    icon: "ni ni-circle-08 text-white",
    component: <AnalyseRisques />,
    layout: "/projet",
    displayToSidebar: false,
  },
  {
    path: "/IdentifierActif",
    name: "Identifier un actif",
    icon: "ni ni-circle-08 text-white",
    component: <IdentifierActif />,
    layout: "/projet",
    displayToSidebar: false,
  },

  {
    path: "/Checklist",
    name: "checklist du projet",
    icon: "ni ni-circle-08 text-white",
    component: <Checklist />,
    layout: "/projet",
    displayToSidebar: false,
  },
  {
    path: "/ProjectView",
    name: "suivi du projet",
    icon: "ni ni-circle-08 text-white",
    component: <ProjectView />,
    layout: "/projet",
    displayToSidebar: false,
  },
];
export default routes;
