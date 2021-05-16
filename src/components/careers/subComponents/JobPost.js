import React from "react";
import { FcBriefcase } from "react-icons/fc";
import { GiTrashCan } from "react-icons/gi";
import db from "../../firebase";
import { notifyDynamicError, notifyDynamicSuccess } from "../../notifications/NotificationAlerts";

const JobPost = ({
  careerPostHeader,
  careerPostLink,
  careerPostOutro,
  careerPostSkills,
  datePosted,
  jobPostId,
}) => {
  const deleteJobPost = (jobPostId) => {
    if(jobPostId){
        db.collection('careers').doc('careerJobPosts').collection('info').doc(jobPostId)
        .delete()
        .then(() => {
            notifyDynamicSuccess({ message: 'Job post deleted successfully'});
        })
        .catch((error) => {
            notifyDynamicError({ message: error });
        })
    }
  };
  return (
    <div className={"job__post_container"}>
      <div>
        <FcBriefcase size={"2rem"} />
        <GiTrashCan
          size={"1.5rem"}
          color={"#F5A522"}
          style={{ cursor: "pointer" }}
          onClick={() => deleteJobPost(jobPostId)}
        />
      </div>
      <p>
        <span id={"label"}>Job:</span> {careerPostHeader}
      </p>
      <p>
        <span id={"label"}>Skills:</span> {careerPostSkills}
      </p>
      <p>
        <span id={"label"}>Outro:</span> {careerPostOutro}
      </p>
      <p>
        <span id={"label"}>Link:</span> {careerPostLink}
      </p>
      <p>
        <span id={"label"}>Posted on:</span>{" "}
        {new Date(datePosted?.toDate()).toLocaleString()}
      </p>
    </div>
  );
};

export default JobPost;
