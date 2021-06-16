import React from "react";
import db from "../../firebase";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  notifyDynamicError,
  notifyDynamicSuccess,
} from "../../notifications/NotificationAlerts";

//-> react icons imports
import { GiTrashCan } from "react-icons/gi";

const Project = ({
  projectID,
  projectDescription,
  projectImage,
  projectImageID,
}) => {
  const deleteProject = (projectID) => {
    if (projectID && projectImageID) {
      db.collection("home")
        .doc("homeProjects")
        .collection("all")
        .doc(projectID)
        .delete()
        .then(() => {
          firebase
            .storage()
            .ref(`homeProjectsImages/${projectImageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Project deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    }
  };

  return (
    <div className={'products__detail_container'}>
      <div>
        <GiTrashCan
          size={"1.5rem"}
          className={"trash__icon"}
          onClick={() => deleteProject(projectID)}
        />
      </div>
      <div>
        <div>
          <p>
            <span id={"label"}>Project Description:</span> {projectDescription}
          </p>
        </div>
        <div className={"section__image_box"}>
          <img src={projectImage} alt={"project pic"} />
        </div>
      </div>
    </div>
  );
};

export default Project;
