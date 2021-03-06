import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

//->component imports
import Input from "../common/Input";
import Button from "../common/Button";
import { storage } from "../firebase";
import {
  notifyDynamicSuccess,
  notifyDynamicError,
  notifyingLoading,
} from "../notifications/NotificationAlerts";
import FormInput from "../common/FormInput";
import "./css/Careers.css";
import JobPost from "./subComponents/JobPost";
import PulseSpinner from "../common/PulseSpinner";
import { GiTrashCan } from "react-icons/gi";

const Careers = () => {
  const [careerHeader, setCareerHeader] = useState("");
  const [careerIntro, setCareerIntro] = useState("");
  const [careerPostHeader, setCareerPostHeader] = useState("");
  const [careerPostSkills, setCareerPostSkills] = useState("");
  const [careerPostOutro, setCareerPostOutro] = useState("");
  const [careerPostLink, setCareerPostLink] = useState("");
  const [careerJoinHeader, setCareerJoinHeader] = useState("");
  const [careerLoveOne, setCareerLoveOne] = useState("");
  const [careerLoveTwo, setCareerLoveTwo] = useState("");
  const [careerLoveThree, setCareerLoveThree] = useState("");
  const [careerSpot, setCareerSpot] = useState("");
  const [careerImage, setCareerImage] = useState(null);
  const [careerProgress, setCareerProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const buttonLoading = () => {
    if (loading) {
      notifyingLoading({ message: "Updating....." });
    }
  };

  //-> handle image file inputs
  const handleCareerImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      careerImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setCareerImage(e.target.files[0]);
    }
  };

  //-> saving to db actions using firebase hooks
  const saveCareerHeader = (e) => {
    e.preventDefault();

    if (careerHeader !== "") {
      db.collection("careers")
        .doc("careerHeaderIntro")
        .collection("info")
        .doc("careerHeader")
        .set({
          careerHeader: careerHeader,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Career Page header" });
    }
    setCareerHeader("");
  };

  const saveCareerIntro = (e) => {
    e.preventDefault();

    if (careerIntro !== "") {
      db.collection("careers")
        .doc("careerHeaderIntro")
        .collection("info")
        .doc("careerIntro")
        .set({
          careerIntro: careerIntro,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Intro Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Career Page intro" });
    }
    setCareerIntro("");
  };

  const saveJobPost = (e) => {
    e.preventDefault();

    if (careerPostHeader && careerPostSkills && careerPostOutro) {
      //-> post a timestamp in db ( job post date and time posted )
      const datePosted = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("careers")
        .doc("careerJobPosts")
        .collection("info")
        .add({
          careerPostHeader: careerPostHeader,
          careerPostSkills: careerPostSkills,
          careerPostOutro: careerPostOutro,
          careerPostLink: careerPostLink,
          datePosted: datePosted,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Job Posted Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in Career Job Post fields" });
    }
    setCareerPostHeader("");
    setCareerPostSkills("");
    setCareerPostOutro("");
    setCareerPostLink("");
  };

  const saveCareerJoinHeader = (e) => {
    e.preventDefault();

    if (careerJoinHeader) {
      db.collection("careers")
        .doc("careerJoin")
        .collection("info")
        .doc("careerJoinHeader")
        .update({
          careerJoinHeader: careerJoinHeader,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Page Join Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Career Page Join Header" });
    }
    setCareerJoinHeader("");
  };

  const saveCareerLoveOne = (e) => {
    e.preventDefault();
    if (careerLoveOne) {
      db.collection("careers")
        .doc("careerLove")
        .update({
          careerLoveOne: careerLoveOne,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in first topic love" });
    }
    setCareerLoveOne("");
  };
  const saveCareerLoveTwo = (e) => {
    e.preventDefault();
    if (careerLoveTwo) {
      db.collection("careers")
        .doc("careerLove")
        .update({
          careerLoveTwo: careerLoveTwo,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in second topic love" });
    }
    setCareerLoveTwo("");
  };
  const saveCareerLoveThree = (e) => {
    e.preventDefault();
    if (careerLoveThree) {
      db.collection("careers")
        .doc("careerLove")
        .update({
          careerLoveThree: careerLoveThree,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in third topic love" });
    }
    setCareerLoveThree("");
  };

  const saveCareerSpot = (e) => {
    e.preventDefault();
    if (careerSpot) {
      db.collection("careers")
        .doc("careerSpot")
        .update({
          careerSpot: careerSpot,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Career Position Spot Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the spot field" });
    }
  };

  const saveCareerImage = (e) => {
    e.preventDefault();
    if (careerImage) {
      const careerImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`careerImages/${careerImageID}`)
        .put(careerImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const careerProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setCareerProgress(careerProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("careerImages")
            .child(careerImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("careers")
                .doc("careerHeaderIntro")
                .collection("illustration")
                .doc("image")
                .set({
                  careerImage: url,
                  careerImageID: careerImageID,
                });
              setCareerProgress(0);
              setCareerImage(null);
              notifyDynamicSuccess({
                message: "Career image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const deleteCareerImage = () => {
    if (careerImageDetails?.data().careerImageID) {
      const imageID = careerImageDetails?.data().careerImageID;

      db.collection("careers")
        .doc("careerHeaderIntro")
        .collection("illustration")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`careerImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Career image deleted successfully",
              });
            });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "No image to delete" });
    }
  };

  //-> retrieve data from firestore database using firebase hooks
  const [headerDetails] = useDocument(
    db
      .collection("careers")
      .doc("careerHeaderIntro")
      .collection("info")
      .doc("careerHeader")
  );
  const [introDetails] = useDocument(
    db
      .collection("careers")
      .doc("careerHeaderIntro")
      .collection("info")
      .doc("careerIntro")
  );
  const [jobPosts] = useCollection(
    db
      .collection("careers")
      .doc("careerJobPosts")
      .collection("info")
      .orderBy("datePosted", "desc")
  );
  const [joinHeaderDetails] = useDocument(
    db
      .collection("careers")
      .doc("careerJoin")
      .collection("info")
      .doc("careerJoinHeader")
  );
  const [careerLoveDetails] = useDocument(
    db.collection("careers").doc("careerLove")
  );
  const [careerSpotDetails] = useDocument(
    db.collection("careers").doc("careerSpot")
  );
  const [careerImageDetails] = useDocument(
    db
      .collection("careers")
      .doc("careerHeaderIntro")
      .collection("illustration")
      .doc("image")
  );

  return (
    <div className={"career__container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page header and introduction ]</h4>
          <div className={"career__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter career page header"}
              value={careerHeader}
              onChange={(e) => setCareerHeader(e.target.value)}
              onClick={saveCareerHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter career page intro"}
              value={careerIntro}
              onChange={(e) => setCareerIntro(e.target.value)}
              onClick={saveCareerIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>
            [ Page header and introduction current details ]
          </h4>
          <div className={"header__intro_box"}>
            {headerDetails?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {headerDetails?.data().careerHeader ? (
                  headerDetails?.data().careerHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {introDetails?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {introDetails?.data().careerIntro ? (
                  introDetails?.data().careerIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Career Image here]</h4>
          <div>
            <Input
              type={"file"}
              placeholder={"Enter careers image"}
              onChange={handleCareerImage}
              accept={"image/*"}
            />
            {careerProgress > 0 ? (
              <div className={"upload__progress_bar"}>
                <progress value={careerProgress} max="100" />
              </div>
            ) : (
              <Button onClick={saveCareerImage} text={"Add"} type={"submit"} />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>[Career image details here ]</h4>
          <div className={"header__intro_box"}>
            <div className={"section__image_box"}>
              {careerImageDetails?.data() ? (
                careerImageDetails?.data().careerImage &&
                careerImageDetails?.data().careerImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={careerImageDetails?.data().careerImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteCareerImage()}
                    />
                  </div>
                ) : (
                  <PulseSpinner />
                )
              ) : (
                <p id={"label"}> No image set</p>
              )}
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page Job Posts ]</h4>
          <form type={"submit"}>
            <Input
              type={"text"}
              placeholder={"Enter job post header"}
              value={careerPostHeader}
              onChange={(e) => setCareerPostHeader(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder={"Enter job post skills"}
              value={careerPostSkills}
              onChange={(e) => setCareerPostSkills(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder={"Enter job post outro"}
              value={careerPostOutro}
              onChange={(e) => setCareerPostOutro(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder={"Enter job post link e.g linkedin"}
              value={careerPostLink}
              onChange={(e) => setCareerPostLink(e.target.value)}
            />
            <Button onClick={saveJobPost} text={"Post"} type={"submit"} />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>[ Page Current Job Posts ]</h4>
          <div className={"job__posts"}>
            {jobPosts?.docs ? (
              jobPosts?.docs.map((doc) => {
                const {
                  careerPostHeader,
                  careerPostLink,
                  careerPostOutro,
                  careerPostSkills,
                  datePosted,
                } = doc.data();

                return (
                  <JobPost
                    key={doc.id}
                    jobPostId={doc.id}
                    careerPostHeader={careerPostHeader}
                    careerPostLink={careerPostLink}
                    careerPostOutro={careerPostOutro}
                    careerPostSkills={careerPostSkills}
                    datePosted={datePosted}
                  />
                );
              })
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page Join Header ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter career page join header"}
              value={careerJoinHeader}
              onChange={(e) => setCareerJoinHeader(e.target.value)}
              onClick={saveCareerJoinHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeaderDetails"}>
            [ Page Current Join Header Details ]
          </h4>

          <div className={"header__intro_box"}>
            {joinHeaderDetails?.data() ? (
              <h4>
                <span id={"label"}>Current join team header:</span>{" "}
                {joinHeaderDetails?.data().careerJoinHeader ? (
                  joinHeaderDetails?.data().careerJoinHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page Career Love ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter career love one"}
              value={careerLoveOne}
              onChange={(e) => setCareerLoveOne(e.target.value)}
              onClick={saveCareerLoveOne}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter career love two"}
              value={careerLoveTwo}
              onChange={(e) => setCareerLoveTwo(e.target.value)}
              onClick={saveCareerLoveTwo}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter career love three"}
              value={careerLoveThree}
              onChange={(e) => setCareerLoveThree(e.target.value)}
              onClick={saveCareerLoveThree}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeaderDetails"}>
            [ Page Current Career Love Details ]
          </h4>
          <div className={"header__intro_box"}>
            {careerLoveDetails?.data() ? (
              <h4>
                <span id={"label"}>Career love one:</span>{" "}
                {careerLoveDetails?.data().careerLoveOne ? (
                  careerLoveDetails?.data().careerLoveOne
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {careerLoveDetails?.data() ? (
              <h4>
                <span id={"label"}>Career love two:</span>{" "}
                {careerLoveDetails?.data().careerLoveTwo ? (
                  careerLoveDetails?.data().careerLoveTwo
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {careerLoveDetails?.data() ? (
              <h4>
                <span id={"label"}>Career love three:</span>{" "}
                {careerLoveDetails?.data().careerLoveThree ? (
                  careerLoveDetails?.data().careerLoveThree
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page Career Spot Availability ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter career position spot availability"}
              value={careerSpot}
              onChange={(e) => setCareerSpot(e.target.value)}
              onClick={saveCareerSpot}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeaderDetails"}>
            [ Page Current Career Spot Availability Details ]
          </h4>
          <div className={"header__intro_box"}>
            {careerSpotDetails?.data() ? (
              <h4>
                <span id={"label"}>Current career spot availability: </span>{" "}
                {careerSpotDetails?.data().careerSpot ? (
                  careerSpotDetails?.data().careerSpot
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Careers;
