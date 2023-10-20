import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
 import ArrowUpward from "@material-ui/icons/ArrowUpward";
 import AccessTime from "@material-ui/icons/AccessTime";
//import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { bugs} from "variables/general.js";
import { orange } from '@material-ui/core/colors';
import { Progress} from "reactstrap";



import styles from "assets/jss/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ProjectView () {
  const classes = useStyles();
  return (
    <div >
      <GridContainer >
        <GridItem xs={12} sm={12} md={4}>
          <Card className="mr-5" chart style={{ width: '950px', height:"78%" }} >
            <CardBody>
              <div className="row pt-1">
              <div className="col mr-5 pt-3">
              <h4>Niveau de conformité</h4>
              <LocalPoliceIcon
              style={{ fontSize: 60, marginBottom: '16px', color: orange[600] }}
               />
                <span className="mr-2">60%</span>
              <Progress
                            max="100"
                            value="60"
                            barClassName={'bg-gradient-warning'}/>
             </div>
             <div className="col mr-5 ml-5">
              <div className="row">
             <div className="vr bg-danger mb-1" style={{ height: '50px' ,width:'5px', color:'' }}></div>
              <div className="col-7 mr-6">
              <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>
              <h5>Risques mineurs</h5>
              </div>
              </div> 
              <div className="row">
             <div className="vr bg-info mb-1 mt-1" style={{ height: '50px' ,width:'5px', color:'' }}></div>
             <div className="col-7 mr-6">
             <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 35%
                </span>
              <h5>Risques Majeurs</h5>
              </div> 
              </div>
              <div className="row">
             <div className=" vr bg-success mt-1" style={{ height: '50px' ,width:'5px', color:'' }}></div> 
             <div className="col-7 mr-6">
             <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 10%
                </span>
              <h5>Risques critiques</h5>
              </div>
              </div> 
               </div>
             <div className="col ml-5"></div>
             </div>        
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> projet Eshop
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Risques résiduels",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
             ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning"
            style={{ height: '70px' }}>
              <h3 className={classes.cardTitleWhite}>PLAN D'ACTION
              </h3>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Mesure", "delai", "porteur"]}
                tableData={[
                  ["1", "", "", ""],
                  ["2", "", "", ""],
                  ["3", "", "", ""],
                  ["4", "", "", ""],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
