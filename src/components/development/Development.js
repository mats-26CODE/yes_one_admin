import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

//->component imports
import Input from "../common/Input";
import Button from "../common/Button";
import {
  notifyDynamicSuccess,
  notifyDynamicError,
  notifyingLoading,
} from "../notifications/NotificationAlerts";
import FormInput from "../common/FormInput";
import PulseSpinner from "../common/PulseSpinner";
import "./css/Development.css";

//-> react icon imports
import { GiTrashCan } from "react-icons/gi";

const Development = () => {
  const [devHeader, setDevHeader] = useState("");
  const [devIntro, setDevIntro] = useState("");

  //-> sections states
  const [sectionOneHeader, setSectionOneHeader] = useState("");
  const [sectionOneIntro, setSectionOneIntro] = useState("");
  const [sectionOneImage, setSectionOneImage] = useState(null);
  const [sectionOneProgress, setSectionOneProgress] = useState(0);

  const [sectionTwoHeader, setSectionTwoHeader] = useState("");
  const [sectionTwoIntro, setSectionTwoIntro] = useState("");
  const [sectionTwoImage, setSectionTwoImage] = useState(null);
  const [sectionTwoProgress, setSectionTwoProgress] = useState(0);

  const [sectionThreeIntro, setSectionThreeIntro] = useState("");
  const [sectionThreeHeader, setSectionThreeHeader] = useState("");
  const [sectionThreeImage, setSectionThreeImage] = useState(null);
  const [sectionThreeProgress, setSectionThreeProgress] = useState(0);

  const [sectionFourIntro, setSectionFourIntro] = useState("");
  const [sectionFourHeader, setSectionFourHeader] = useState("");
  const [sectionFourImage, setSectionFourImage] = useState(null);
  const [sectionFourProgress, setSectionFourProgress] = useState(0);

  const [devQuote, setDevQuote] = useState("");
  const [devQuotee, setDevQuotee] = useState("");
  const [devQuoteImage, setDevQuoteImage] = useState(null);
  const [devQuoteProgress, setDevQuoteProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const buttonLoading = () => {
    if (loading) {
      notifyingLoading({ message: "Updating....." });
    }
  };

  const handleSectionOneImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionOneImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionOneImage(e.target.files[0]);
    }
  };
  const handleSectionTwoImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionTwoImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionTwoImage(e.target.files[0]);
    }
  };
  const handleSectionThreeImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionThreeImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionThreeImage(e.target.files[0]);
    }
  };
  const handleSectionFourImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setSectionFourImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setSectionFourImage(e.target.files[0]);
    }
  };
  const handleDevQuoteImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 3e6) {
      setDevQuoteImage(null);
      notifyDynamicError({ message: "Image selected should not exceed 3MB" });
    } else {
      setDevQuoteImage(e.target.files[0]);
    }
  };

  //=> save dev header
  const saveDevHeader = (e) => {
    e.preventDefault();

    if (devHeader !== "") {
      db.collection("development")
        .doc("devHeaderIntro")
        .collection("info")
        .doc("devHeader")
        .set({
          devHeader: devHeader,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Development Header Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Development Page header" });
    }
    setDevHeader("");
  };
  //=> save dev intro
  const saveDevIntro = (e) => {
    e.preventDefault();

    if (devIntro !== "") {
      db.collection("development")
        .doc("devHeaderIntro")
        .collection("info")
        .doc("devIntro")
        .set({
          devIntro: devIntro,
        })
        .then(() => {
          notifyDynamicSuccess({
            message: "Yes, Development Intro Updated Successfully",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
          setLoading(false);
        });
    } else {
      notifyDynamicError({ message: "Fill in the Development Page header" });
    }
    setDevIntro("");
  };

  //-> save section one
  const saveSectionOneHeader = (e) => {
    e.preventDefault();

    if (sectionOneHeader) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionOne")
        .doc("header")
        .set({ sectionOneHeader: sectionOneHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section one header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionOneHeader("");
  };
  const saveSectionOneIntro = (e) => {
    e.preventDefault();

    if (sectionOneIntro) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionOne")
        .doc("intro")
        .set({ sectionOneIntro: sectionOneIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section one intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionOneIntro("");
  };
  const saveSectionOneImage = (e) => {
    e.preventDefault();

    if (sectionOneImage) {
      const sectionOneImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`devSectionImages/${sectionOneImageID}`)
        .put(sectionOneImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionOneProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionOneProgress(sectionOneProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("devSectionImages")
            .child(sectionOneImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("development")
                .doc("devSections")
                .collection("sectionOne")
                .doc("image")
                .set({
                  sectionOneImage: url,
                  sectionOneImageID: sectionOneImageID,
                });
              setSectionOneProgress(0);
              setSectionOneImage(null);
              notifyDynamicSuccess({
                message: "Development section one image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  //-> save section two
  const saveSectionTwoImage = (e) => {
    e.preventDefault();

    if (sectionTwoImage) {
      const sectionTwoImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`devSectionImages/${sectionTwoImageID}`)
        .put(sectionTwoImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionTwoProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionTwoProgress(sectionTwoProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("devSectionImages")
            .child(sectionTwoImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("development")
                .doc("devSections")
                .collection("sectionTwo")
                .doc("image")
                .set({
                  sectionTwoImage: url,
                  sectionTwoImageID: sectionTwoImageID,
                });
              setSectionTwoProgress(0);
              setSectionTwoImage(null);
              notifyDynamicSuccess({
                message: "Development section two image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionTwoHeader = (e) => {
    e.preventDefault();
    if (sectionTwoHeader) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionTwo")
        .doc("header")
        .set({ sectionTwoHeader: sectionTwoHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section two header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionTwoHeader("");
  };
  const saveSectionTwoIntro = (e) => {
    e.preventDefault();
    if (sectionTwoIntro) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionTwo")
        .doc("intro")
        .set({ sectionTwoIntro: sectionTwoIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section two intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionTwoIntro("");
  };

  //-> section three
  const saveSectionThreeImage = (e) => {
    e.preventDefault();

    if (sectionThreeImage) {
      const sectionThreeImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`devSectionImages/${sectionThreeImageID}`)
        .put(sectionThreeImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionThreeProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionThreeProgress(sectionThreeProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("devSectionImages")
            .child(sectionThreeImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("development")
                .doc("devSections")
                .collection("sectionThree")
                .doc("image")
                .set({
                  sectionThreeImage: url,
                  sectionThreeImageID: sectionThreeImageID,
                });
              setSectionThreeProgress(0);
              setSectionThreeImage(null);
              notifyDynamicSuccess({
                message: "Development section three image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionThreeHeader = (e) => {
    e.preventDefault();
    if (sectionThreeHeader) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionThree")
        .doc("header")
        .set({ sectionThreeHeader: sectionThreeHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section three header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionThreeHeader("");
  };
  const saveSectionThreeIntro = (e) => {
    e.preventDefault();
    if (sectionThreeIntro) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionThree")
        .doc("intro")
        .set({ sectionThreeIntro: sectionThreeIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section three intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionThreeIntro("");
  };

  //-> section four
  const saveSectionFourImage = (e) => {
    e.preventDefault();

    if (sectionFourImage) {
      const sectionFourImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`devSectionImages/${sectionFourImageID}`)
        .put(sectionFourImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const sectionFourProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSectionFourProgress(sectionFourProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("devSectionImages")
            .child(sectionFourImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("development")
                .doc("devSections")
                .collection("sectionFour")
                .doc("image")
                .set({
                  sectionFourImage: url,
                  sectionFourImageID: sectionFourImageID,
                });
              setSectionFourProgress(0);
              setSectionFourImage(null);
              notifyDynamicSuccess({
                message: "Development section four image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  const saveSectionFourHeader = (e) => {
    e.preventDefault();
    if (sectionFourHeader) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionFour")
        .doc("header")
        .set({ sectionFourHeader: sectionFourHeader })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section four header updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionFourHeader("");
  };
  const saveSectionFourIntro = (e) => {
    e.preventDefault();
    if (sectionFourIntro) {
      db.collection("development")
        .doc("devSections")
        .collection("sectionFour")
        .doc("intro")
        .set({ sectionFourIntro: sectionFourIntro })
        .then(() => {
          notifyDynamicSuccess({
            message: "Section four intro updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionFourIntro("");
  };

  //-> save dev quote
  const saveDevQuote = (e) => {
    e.preventDefault();

    if (devQuote) {
      db.collection("development")
        .doc("devCurveQuote")
        .collection("info")
        .doc("devQuote")
        .set({ devQuote: devQuote })
        .then(() => {
          notifyDynamicSuccess({
            message: "Development quote updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setDevQuote("");
  };
  const saveDevQuotee = (e) => {
    e.preventDefault();

    if (devQuotee) {
      db.collection("development")
        .doc("devCurveQuote")
        .collection("info")
        .doc("devQuotee")
        .set({ devQuotee: devQuotee })
        .then(() => {
          notifyDynamicSuccess({
            message: "Development quotee updated successfully!",
          });
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
    } else {
      notifyDynamicError({ message: "Fill section header field" });
    }
    setSectionOneIntro("");
  };
  const saveDevQuoteImage = (e) => {
    e.preventDefault();

    if (devQuoteImage) {
      const devQuoteImageID = Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

      const uploadTask = storage
        .ref(`devQuoteImages/${devQuoteImageID}`)
        .put(devQuoteImage);

      //-> This code gets you the progress of the image upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const devQuoteProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setDevQuoteProgress(devQuoteProgress);
        },
        (error) => {
          //error function
          console.log(error);
          notifyDynamicError({ message: error });
        },
        () => {
          // complete upload function
          storage
            .ref("devQuoteImages")
            .child(devQuoteImageID)
            .getDownloadURL()
            .then((url) => {
              //-> post the image in the database
              db.collection("development")
                .doc("devCurveQuote")
                .collection("info")
                .doc("devQuoteBackgroundImage")
                .set({
                  devQuoteImage: url,
                  devQuoteImageID: devQuoteImageID,
                });
              setDevQuoteProgress(0);
              setDevQuoteImage(null);
              notifyDynamicSuccess({
                message: "Development quote image updated successfully",
              });
            });
        }
      );
    } else {
      notifyDynamicError({ message: "Choose an image to upload" });
    }
  };

  // Delete Section images
  const deleteSectionOneImage = () => {
    if (devSectionOneImage?.data().sectionOneImageID) {
      const imageID = devSectionOneImage?.data().sectionOneImageID;

      db.collection("development")
        .doc("devSections")
        .collection("sectionOne")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`devSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section one image deleted successfully",
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
  const deleteSectionTwoImage = () => {
    if (devSectionTwoImage?.data().sectionTwoImageID) {
      const imageID = devSectionTwoImage?.data().sectionTwoImageID;

      db.collection("development")
        .doc("devSections")
        .collection("sectionTwo")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`devSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section two image deleted successfully",
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
  const deleteSectionThreeImage = () => {
    if (devSectionThreeImage?.data().sectionThreeImageID) {
      const imageID = devSectionThreeImage?.data().sectionThreeImageID;

      db.collection("development")
        .doc("devSections")
        .collection("sectionThree")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`devSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section three image deleted successfully",
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
  const deleteSectionFourImage = () => {
    if (homeSectionFourImage?.data().sectionFourImageID) {
      const imageID = homeSectionFourImage?.data().sectionFourImageID;

      db.collection("development")
        .doc("devSections")
        .collection("sectionFour")
        .doc("image")
        .delete()
        .then(() => {
          storage
            .ref(`devSectionImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Section four image deleted successfully",
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

  const deleteDevQuoteImage = () => {
    if (devQuoteImageDetails?.data().devQuoteImageID) {
      const imageID = devQuoteImageDetails?.data().devQuoteImageID;

      db.collection("development")
        .doc("devCurveQuote")
        .collection("info")
        .doc("devQuoteBackgroundImage")
        .delete()
        .then(() => {
          storage
            .ref(`devQuoteImages/${imageID}`)
            .delete()
            .then(() => {
              notifyDynamicSuccess({
                message: "Development quote image deleted successfully",
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
      .collection("development")
      .doc("devHeaderIntro")
      .collection("info")
      .doc("devHeader")
  );
  const [introDetails] = useDocument(
    db
      .collection("development")
      .doc("devHeaderIntro")
      .collection("info")
      .doc("devIntro")
  );
  const [devSectionOneHeader] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionOne")
      .doc("header")
  );
  const [devSectionOneIntro] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionOne")
      .doc("intro")
  );
  const [devSectionOneImage] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionOne")
      .doc("image")
  );
  const [devSectionTwoHeader] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionTwo")
      .doc("header")
  );
  const [devSectionTwoIntro] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionTwo")
      .doc("intro")
  );
  const [devSectionTwoImage] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionTwo")
      .doc("image")
  );
  const [devSectionThreeHeader] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionThree")
      .doc("header")
  );
  const [devSectionThreeIntro] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionThree")
      .doc("intro")
  );
  const [devSectionThreeImage] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionThree")
      .doc("image")
  );
  const [homeSectionFourHeader] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionFour")
      .doc("header")
  );
  const [homeSectionFourIntro] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionFour")
      .doc("intro")
  );
  const [homeSectionFourImage] = useDocument(
    db
      .collection("development")
      .doc("devSections")
      .collection("sectionFour")
      .doc("image")
  );

  const [devQuoteDetails] = useDocument(
    db
      .collection("development")
      .doc("devCurveQuote")
      .collection("info")
      .doc("devQuote")
  );
  const [devQuoteeDetails] = useDocument(
    db
      .collection("development")
      .doc("devCurveQuote")
      .collection("info")
      .doc("devQuotee")
  );
  const [devQuoteImageDetails] = useDocument(
    db
      .collection("development")
      .doc("devCurveQuote")
      .collection("info")
      .doc("devQuoteBackgroundImage")
  );

  return (
    <div className={"development__container"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Page header and introduction ]</h4>
          <div className={"development__box_fill"}>
            <FormInput
              type={"text"}
              placeholder={"Enter developmet page header"}
              value={devHeader}
              onChange={(e) => setDevHeader(e.target.value)}
              onClick={saveDevHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter development page intro"}
              value={devIntro}
              onChange={(e) => setDevIntro(e.target.value)}
              onClick={saveDevIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"sectionHeaderDetails"}>
            [ Development Page header and introduction current details ]
          </h4>
          <div className={"header__intro_box"}>
            {headerDetails?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {headerDetails?.data().devHeader ? (
                  headerDetails?.data().devHeader
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
                {introDetails?.data().devIntro ? (
                  introDetails?.data().devIntro
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

      {/* section one */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Development Section One ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section one header"}
              value={sectionOneHeader}
              onChange={(e) => setSectionOneHeader(e.target.value)}
              onClick={saveSectionOneHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section one intro"}
              value={sectionOneIntro}
              onChange={(e) => setSectionOneIntro(e.target.value)}
              onClick={saveSectionOneIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section one image"}
                onChange={handleSectionOneImage}
                accept={"image/*"}
              />
              {sectionOneProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionOneProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionOneImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Development section one details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section one info here */}
            {devSectionOneHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {devSectionOneHeader?.data().sectionOneHeader ? (
                  devSectionOneHeader?.data().sectionOneHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {devSectionOneIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {devSectionOneIntro?.data().sectionOneIntro ? (
                  devSectionOneIntro?.data().sectionOneIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {devSectionOneImage?.data() ? (
                devSectionOneImage?.data().sectionOneImage &&
                devSectionOneImage?.data().sectionOneImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={devSectionOneImage?.data().sectionOneImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionOneImage()}
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

      {/* section two */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Development Section Two ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section two header"}
              value={sectionTwoHeader}
              onChange={(e) => setSectionTwoHeader(e.target.value)}
              onClick={saveSectionTwoHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section two intro"}
              value={sectionTwoIntro}
              onChange={(e) => setSectionTwoIntro(e.target.value)}
              onClick={saveSectionTwoIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section two image"}
                onChange={handleSectionTwoImage}
                accept={"image/*"}
              />
              {sectionTwoProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionTwoProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionTwoImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Development section two details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section two info here */}
            {devSectionTwoHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {devSectionTwoHeader?.data().sectionTwoHeader ? (
                  devSectionTwoHeader?.data().sectionTwoHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {devSectionTwoIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {devSectionTwoIntro?.data().sectionTwoIntro ? (
                  devSectionTwoIntro?.data().sectionTwoIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {devSectionTwoImage?.data() ? (
                devSectionTwoImage?.data().sectionTwoImage &&
                devSectionTwoImage?.data().sectionTwoImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={devSectionTwoImage?.data().sectionTwoImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionTwoImage()}
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

      {/* section three */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Development Section Three ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section three header"}
              value={sectionThreeHeader}
              onChange={(e) => setSectionThreeHeader(e.target.value)}
              onClick={saveSectionThreeHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section three intro"}
              value={sectionThreeIntro}
              onChange={(e) => setSectionThreeIntro(e.target.value)}
              onClick={saveSectionThreeIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section three image"}
                onChange={handleSectionThreeImage}
                accept={"image/*"}
              />
              {sectionThreeProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionThreeProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionThreeImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Development section three details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section three info here */}
            {devSectionThreeHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {devSectionThreeHeader?.data().sectionThreeHeader ? (
                  devSectionThreeHeader?.data().sectionThreeHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {devSectionThreeIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {devSectionThreeIntro?.data().sectionThreeIntro ? (
                  devSectionThreeIntro?.data().sectionThreeIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {devSectionThreeImage?.data() ? (
                devSectionThreeImage?.data().sectionThreeImage &&
                devSectionThreeImage?.data().sectionThreeImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={devSectionThreeImage?.data().sectionThreeImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionThreeImage()}
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

      {/* section four */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"homeSectionHeader"}>[ Development Section Four ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter section four header"}
              value={sectionFourHeader}
              onChange={(e) => setSectionFourHeader(e.target.value)}
              onClick={saveSectionFourHeader}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter section four intro"}
              value={sectionFourIntro}
              onChange={(e) => setSectionFourIntro(e.target.value)}
              onClick={saveSectionFourIntro}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter section four image"}
                onChange={handleSectionFourImage}
                accept={"image/*"}
              />
              {sectionFourProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={sectionFourProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveSectionFourImage}
                  text={"Add"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Development section four details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section three info here */}
            {homeSectionFourHeader?.data() ? (
              <h4>
                <span id={"label"}>Current header set:</span>{" "}
                {homeSectionFourHeader?.data().sectionFourHeader ? (
                  homeSectionFourHeader?.data().sectionFourHeader
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {homeSectionFourIntro?.data() ? (
              <h4>
                <span id={"label"}>Current intro set:</span>{" "}
                {homeSectionFourIntro?.data().sectionFourIntro ? (
                  homeSectionFourIntro?.data().sectionFourIntro
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {homeSectionFourImage?.data() ? (
                homeSectionFourImage?.data().sectionFourImage &&
                homeSectionFourImage?.data().sectionFourImageID ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={homeSectionFourImage?.data().sectionFourImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteSectionFourImage()}
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

      {/* development quote */}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h4 id={"sectionHeader"}>[ Development Quote ]</h4>
          <div>
            <FormInput
              type={"text"}
              placeholder={"Enter Quote"}
              value={devQuote}
              onChange={(e) => setDevQuote(e.target.value)}
              onClick={saveDevQuote}
              buttonType={"submit"}
              buttonText={"Update"}
            />
            <FormInput
              type={"text"}
              placeholder={"Enter Quotee"}
              value={devQuotee}
              onChange={(e) => setDevQuotee(e.target.value)}
              onClick={saveDevQuotee}
              buttonType={"submit"}
              buttonText={"Update"}
            />

            <div>
              <Input
                type={"file"}
                placeholder={"Enter Quote Background"}
                onChange={handleDevQuoteImage}
                accept={"image/*"}
              />
              {devQuoteProgress > 0 ? (
                <div className={"upload__progress_bar"}>
                  <progress value={devQuoteProgress} max="100" />
                </div>
              ) : (
                <Button
                  onClick={saveDevQuoteImage}
                  text={"Save"}
                  type={"submit"}
                />
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <h4 id={"homeSectionHeaderDetails"}>
            [ Development Quote details here ]
          </h4>
          <div className={"header__intro_box"}>
            {/* display section one info here */}
            {devQuoteDetails?.data() ? (
              <h4>
                <span id={"label"}>Current Quote set:</span>{" "}
                {devQuoteDetails?.data().devQuote ? (
                  devQuoteDetails?.data().devQuote
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            {devQuoteeDetails?.data() ? (
              <h4>
                <span id={"label"}>As quoted from:</span>{" "}
                {devQuoteeDetails?.data().devQuotee ? (
                  devQuoteeDetails?.data().devQuotee
                ) : (
                  <PulseSpinner />
                )}
              </h4>
            ) : (
              <PulseSpinner />
            )}

            <div className={"section__image_box"}>
              {devQuoteImageDetails?.data() ? (
                devQuoteImageDetails?.data().devQuoteImage &&
                devQuoteImageDetails?.data().devQuoteImage ? (
                  // devSectionOneImage?.data().sectionOneImage
                  <div>
                    <img
                      src={devQuoteImageDetails?.data().devQuoteImage}
                      alt={"section pic"}
                    />
                    <GiTrashCan
                      size={"1.5rem"}
                      className={"trash__icon"}
                      onClick={() => deleteDevQuoteImage()}
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
    </div>
  );
};

export default Development;
