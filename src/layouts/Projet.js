import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import  ProjetNavbar from "components/Navbars/ProjetNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes2 from "routes.js";
import routes from "routes.js";

const Projet = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/projet") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes2.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes2[i].layout + routes2[i].path) !==
        -1
      ) {
        return routes2[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/projet/",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
     
      <div className="main-content" ref={mainContent}>
        <ProjetNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/projet/" replace />} />
      </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Projet;
