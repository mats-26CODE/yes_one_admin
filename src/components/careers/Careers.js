import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import db from '../firebase';
import './css/Careers.css';

//->component imports
import Input from '../common/Input';
import Button from '../common/Button';
import { notifySuccess, notifyError } from '../notifications/NotificationAlerts';

const Careers = () => {
    const [careerHeader, setCareerHeader ] = useState('');
    const [careerIntro, setCareerIntro ] = useState('');
    const [careerPostHeader, setCareerPostHeader ] = useState('');
    const [careerPostSkills, setCareerPostSkills ] = useState('');
    const [careerPostOutro, setCareerPostOutro ] = useState('');
    const [careerPostLink, setCareerPostLink ] = useState('');
    const [careerJoinHeader, setCareerJoinHeader ] = useState('');
    const [careerLove, setCareerLove ] = useState('');
    const [careerLoveTwo, setCareerLoveTwo ] = useState('');
    const [careerLoveThree, setCareerLoveThree ] = useState('');
    const [careerSpot, setCareerSpot ] = useState('');

    //-> fetching state
    const [ careerSnap, setCareerSnap ] = useState([]);

    // useEffect(() => {
    //     db.collection('careers').onSnapshot((snapshot) => 
    //         setCareerSnap(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
    //     );
    // }, [])

    //->save data to firebase firestore db
    const saveCareerHeader = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('intro').collection('header').doc('info').update({
            careerHeader: careerHeader
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerHeader('');
    };
    const saveCareerIntro = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('intro').collection('header').doc('info').update({
            careerIntro: careerIntro
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerIntro('');
    };
    const saveCareerPost = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('jobPost').collection('posts').add({
            careerPostHeader: careerPostHeader,
            careerPostSkills: careerPostSkills,
            careerPostOutro: careerPostOutro,
            careerPostLink: careerPostLink,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerPostHeader('');
        setCareerPostSkills('');
        setCareerPostOutro('');
    };
    const saveCareerJoin = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('outro').collection('join').doc('info').update({
            careerJoinHeader: careerJoinHeader
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerJoinHeader('');
    }
    const saveCareerLove = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('outro').collection('love').doc('info').update({
            careerLove: careerLove
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerLove('');
    }
    const saveCareerLoveTwo = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('outro').collection('love').doc('info').update({
            careerLoveTwo: careerLoveTwo
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerLoveTwo('');
    }
    const saveCareerLoveThree = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('outro').collection('love').doc('info').update({
            careerLoveThree: careerLoveThree
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerLoveThree('');
    }
    const saveCareerSpot = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('careers').doc('outro').collection('spot').doc('info').update({
            careerSpot: careerSpot
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCareerSpot('');
    }

    return (
        <div className={'career__container'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'career__box_fill'}>
                        <Input 
                            value={careerHeader}
                            onChange={e => setCareerHeader(e.target.value)}
                            type='text'
                            placeholder='your career page header intro'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerHeader}
                            text={'update'}
                        />
                    </div>
                    <div>
                        {/* render db data here */}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Input 
                            value={careerIntro}
                            onChange={e => setCareerIntro(e.target.value)}
                            type='text'
                            placeholder='your career page paragraph intro'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerIntro}
                            text={'update'}
                        />
                    </div>
                </Grid>
            </Grid>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Input 
                            value={careerPostHeader}
                            onChange={e => setCareerPostHeader(e.target.value)}
                            type='text'
                            placeholder='your job post header'
                        />
                        <Input 
                            value={careerPostSkills}
                            onChange={e => setCareerPostSkills(e.target.value)}
                            type='text'
                            placeholder='your job post skills'
                        />
                        <Input 
                            value={careerPostOutro}
                            onChange={e => setCareerPostOutro(e.target.value)}
                            type='text'
                            placeholder='your job post call'
                        />
                        <Input 
                            value={careerPostLink}
                            onChange={e => setCareerPostLink(e.target.value)}
                            type='text'
                            placeholder='your job post link / linkedin url'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerPost}
                            text={'update'}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Input 
                            value={careerJoinHeader}
                            onChange={e => setCareerJoinHeader(e.target.value)}
                            type='text'
                            placeholder='your career join header'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerJoin}
                            text={'update'}
                        />
                    </div>
                </Grid>
            </Grid>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Input 
                            value={careerLove}
                            onChange={e => setCareerLove(e.target.value)}
                            type='text'
                            placeholder='your career love one'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerLove}
                            text={'update'}
                        />
                    </div>
                    <div>
                        <Input 
                            value={careerLoveTwo}
                            onChange={e => setCareerLoveTwo(e.target.value)}
                            type='text'
                            placeholder='your career love two'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerLoveTwo}
                            text={'update'}
                        />
                    </div>
                    <div>
                        <Input 
                            value={careerLoveThree}
                            onChange={e => setCareerLoveThree(e.target.value)}
                            type='text'
                            placeholder='your career love three'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerLoveThree}
                            text={'update'}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Input 
                            value={careerSpot}
                            onChange={e => setCareerSpot(e.target.value)}
                            type='text'
                            placeholder='your career spot'
                        />
                        <Button 
                            type={'submit'}
                            onClick={saveCareerSpot}
                            text={'update'}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Careers;
