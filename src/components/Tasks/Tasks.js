import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudUpload from '@material-ui/icons/CloudUpload';

// core components
import styles from "assets/jss/tasksStyle.js";
import AjoutEvidence from "views/examples/AjoutEvidence";
import GestionEvidence from "views/examples/GestionEvidence";
import { useProject } from 'components/app/Contexts/ProjectContext';

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const [open,setOpen] = React.useState(false);
  const [open2,setOpen2] = React.useState(false);
  const {mesureProjectId} = useProject();
  const handleToggle = async (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
  
    // Si l'élément n'est pas déjà coché, cochez-le
    if (currentIndex === -1) {
      newChecked.push(value);
      setChecked(newChecked);
      // Mettez à jour le statut du mesureProject avec l'API
      await updateMesureProjectStatus(mesureProjectId, 1); // 1 pour statut cochée
    } else {
      // Si l'élément est déjà coché, décochez-le
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
      // Mettez à jour le statut du mesureProject avec l'API
      await updateMesureProjectStatus(mesureProjectId, 0); // 0 pour statut décochée
    }
  };
  
  const updateMesureProjectStatus = async (mesureProjectId, newStatus) => {
    try {
      const response = await axios.put(
        `https://localhost:7119/api/MesureProject/mesureProjectId?id=${mesureProjectId}`,
        { statut: newStatus }
      );
      console.log('Statut du mesureProject mis à jour avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut du mesureProject :', error);
    }
  };
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const updateOpenState = (newValue) => {
    setOpen(newValue);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const updateOpenState2 = (newValue) => {
    setOpen2(newValue);
  };

  const { tasksIndexes, tasks} = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <>
    <Table className={classes.table}>
      <TableBody>
        {tasksIndexes.map((value) => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                onClick={() => handleToggle(value)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root,
                }}
              />
            </TableCell>
            <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Ajouter une évidence"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="CloudUpload"
                  className={classes.tableActionButton}
                  onClick={handleClickOpen}
                >
                  <CloudUpload
                    className={
                      classes.tableActionButtonIcon + " " + classes.CloudUpload
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Consulter/Supprimer les évidences"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="MoreVertIcon"
                  className={classes.tableActionButton}
                  onClick={handleClickOpen2}
                >
                  <MoreVertIcon
                    className={
                      classes.tableActionButtonIcon + " " + classes.MoreVertIcon
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <AjoutEvidence open={open} updateOpenState={updateOpenState}/>
    <GestionEvidence open2={open2} updateOpenState2={updateOpenState2}/>
    </>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  checkedIndexes: PropTypes.array,
};
