import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import db from '../firebase';
import './css/Home.css';

//-> component imports
import Input from '../common/Input';
import Button from '../common/Button';
import { notifySuccess, notifyError } from '../notifications/NotificationAlerts';

const Home = () => {
    // -> intro states
    const [ homeIntro, setHomeIntro ] = useState('');
    const [ homeProductOneIntro, setHomeProductOneIntro ] = useState('');
    const [ homeProductTwoIntro, setHomeProductTwoIntro ] = useState('');

    // -> cards states
    const [ cardHeadings, setCardHeadings ] = useState([]);
    const [ cardFeatures, setCardFeatures ] = useState([]);

    const [cardOneHeading, setCardOneHeading] = useState('');
    const [cardOneFeatureOne, setCardOneFeatureOne] = useState('');
    const [cardOneFeatureTwo, setCardOneFeatureTwo] = useState('');
    const [cardOneFeatureThree, setCardOneFeatureThree] = useState('');
    const [cardOneFeatureFour, setCardOneFeatureFour] = useState('');

    const [cardTwoHeading, setCardTwoHeading] = useState('');
    const [cardTwoFeatureOne, setCardTwoFeatureOne] = useState('');
    const [cardTwoFeatureTwo, setCardTwoFeatureTwo] = useState('');
    const [cardTwoFeatureThree, setCardTwoFeatureThree] = useState('');

    const [cardThreeHeading, setCardThreeHeading] = useState('');
    const [cardThreeFeatureOne, setCardThreeFeatureOne] = useState('');
    const [cardThreeFeatureTwo, setCardThreeFeatureTwo] = useState('');
    const [cardThreeFeatureThree, setCardThreeFeatureThree] = useState('');
    const [cardThreeFeatureFour, setCardThreeFeatureFour] = useState('');

    //-> sections states
    const [ sectionOneHeading, setSectionOneHeading ] = useState('');
    const [ sectionTwoHeading, setSectionTwoHeading ] = useState('');
    const [ sectionThreeHeading, setSectionThreeHeading ] = useState('');
    const [ sectionOneIntro, setSectionOneIntro ] = useState('');
    const [ sectionTwoIntro, setSectionTwoIntro ] = useState('');
    const [ sectionThreeIntro, setSectionThreeIntro ] = useState('');

    //-> live server data rendering
    useEffect(() => {
        db.collection('homeCardsHeadings').onSnapshot( (snapshot) => 
            setCardHeadings(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
        );
    }, []);
    
    const saveHomeIntro = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeintro').add({
            homeIntro: homeIntro,
            homeProductOneIntro: homeProductOneIntro,
            homeProductTwoIntro: homeProductTwoIntro,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setHomeIntro('');
        setHomeProductOneIntro('');
        setHomeProductTwoIntro('');
    };

    const saveCardHeadings = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeCardsHeadings').set({
            cardOneHeading: cardOneHeading,
            cardTwoHeading: cardTwoHeading,
            cardThreeHeading: cardThreeHeading,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCardOneHeading('');
        setCardTwoHeading('');
        setCardThreeHeading('');
    };  

    const saveCardOneFeatures = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeCardsFeatures').doc('cardOneFeatures').set({
            cardOneFeatureOne: cardOneFeatureOne,
            cardOneFeatureTwo: cardOneFeatureTwo,
            cardOneFeatureThree: cardOneFeatureThree,
            cardOneFeatureFour: cardOneFeatureFour,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCardOneFeatureOne('');
        setCardOneFeatureTwo('');
        setCardOneFeatureThree('');
        setCardOneFeatureFour('');
    };

    const saveCardTwoFeatures = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeCardsFeatures').doc('cardTwoFeatures').set({
            cardTwoFeatureOne: cardTwoFeatureOne,
            cardTwoFeatureTwo: cardTwoFeatureTwo,
            cardTwoFeatureThree: cardTwoFeatureThree,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCardTwoFeatureOne('');
        setCardTwoFeatureTwo('');
        setCardTwoFeatureThree('');
    };

    const saveCardThreeFeatures = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeCardsFeatures').doc('cardThreeFeatures').set({
            cardThreeFeatureOne: cardThreeFeatureOne,
            cardThreeFeatureTwo: cardThreeFeatureTwo,
            cardThreeFeatureThree: cardThreeFeatureThree,
            cardThreeFeatureFour: cardThreeFeatureFour,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setCardThreeFeatureOne('');
        setCardThreeFeatureTwo('');
        setCardThreeFeatureThree('');
        setCardThreeFeatureFour('');
    };

    const saveSectionHeadings = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeSections').doc('sectionHeadings').set({
            sectionOneHeading: sectionOneHeading,
            sectionTwoHeading: sectionTwoHeading,
            sectionThreeHeading: sectionThreeHeading,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setSectionOneHeading('');
        setSectionTwoHeading('');
        setSectionThreeHeading('');
    };

    const saveSectionIntros = (e) => {
        e.preventDefault();
        //-> do some database stuff
        db.collection('homeSections').doc('sectionIntros').set({
            sectionOneIntro: sectionOneIntro,
            sectionTwoIntro: sectionTwoIntro,
            sectionThreeIntro: sectionThreeIntro,
        })
        .then((docRef) => {
            console.log("saved to db");
            notifySuccess();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            notifyError();
        });
        setSectionOneIntro('');
        setSectionTwoIntro('');
        setSectionThreeIntro('');
    };

    return (
        <div className={'home__container'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'home__into_box'}>
                        <div><h4>HOME INTRO INFO</h4></div>
                        <form>
                            <Input 
                                value={homeIntro}
                                onChange={e => setHomeIntro(e.target.value)}
                                type='text'
                                placeholder='your home page intro'
                            />
                            <Input 
                                value={homeProductOneIntro}
                                onChange={e => setHomeProductOneIntro(e.target.value)}
                                type='text'
                                placeholder='services or products you develop or offer ?'
                            />

                            <Input 
                                value={homeProductTwoIntro}
                                onChange={e => setHomeProductTwoIntro(e.target.value)}
                                type='text'
                                placeholder='services or products you develop or offer ?'
                            />

                            <Button 
                                type={'submit'}
                                onClick={saveHomeIntro}
                                text={'update'}
                            />
                        </form>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'home__into_box'}>
                        <div><h4>HOME CARDS HEADINGS</h4></div>
                        {
                            cardHeadings.map( (heading) => {
                                <div key = {heading.id} style={{backgroundColor: 'red'}}>
                                    <div><p>{heading.data.cardOneHeading}</p></div>
                                    <div><p>{heading.data.cardTwoHeading}</p></div>
                                    <div><p>{heading.data.cardThreeHeading}</p></div>
                                </div>
                            })
                        }
                        <form>
                            <Input 
                                value={cardOneHeading}
                                onChange={e => setCardOneHeading(e.target.value)}
                                type='text'
                                placeholder='card one heading'
                            />
                            <Input 
                                value={cardTwoHeading}
                                onChange={e => setCardTwoHeading(e.target.value)}
                                type='text'
                                placeholder='card two heading'
                            />
                            <Input 
                                value={cardThreeHeading}
                                onChange={e => setCardThreeHeading(e.target.value)}
                                type='text'
                                placeholder='card three heading'
                            />

                            <Button 
                                type={'submit'}
                                onClick={saveCardHeadings}
                                text={'update'}
                            />
                        </form>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'home__into_box'}>
                        <div><h4>HOME CARDS FEATURES</h4></div>
                        <div className={'card__features_box'}>
                            <form>
                                <Input 
                                    value={cardOneFeatureOne}
                                    onChange={e => setCardOneFeatureOne(e.target.value)}
                                    type='text'
                                    placeholder='card one features'
                                />
                                <Input 
                                    value={cardOneFeatureTwo}
                                    onChange={e => setCardOneFeatureTwo(e.target.value)}
                                    type='text'
                                    placeholder='card one features'
                                />
                                <Input 
                                    value={cardOneFeatureThree}
                                    onChange={e => setCardOneFeatureThree(e.target.value)}
                                    type='text'
                                    placeholder='card one features'
                                />
                                <Input 
                                    value={cardOneFeatureFour}
                                    onChange={e => setCardOneFeatureFour(e.target.value)}
                                    type='text'
                                    placeholder='card one features'
                                />
                                <Button 
                                    type={'submit'}
                                    onClick={saveCardOneFeatures}
                                    text={'update'}
                                />
                            </form>

                            <form>
                                <Input 
                                    value={cardTwoFeatureOne}
                                    onChange={e => setCardTwoFeatureOne(e.target.value)}
                                    type='text'
                                    placeholder='card two features'
                                />
                                <Input 
                                    value={cardTwoFeatureTwo}
                                    onChange={e => setCardTwoFeatureTwo(e.target.value)}
                                    type='text'
                                    placeholder='card two features'
                                />
                                <Input 
                                    value={cardTwoFeatureThree}
                                    onChange={e => setCardTwoFeatureThree(e.target.value)}
                                    type='text'
                                    placeholder='card two features'
                                />
                                <Button 
                                    type={'submit'}
                                    onClick={saveCardTwoFeatures}
                                    text={'update'}
                                />
                            </form>

                            <form>
                                <Input 
                                    value={cardThreeFeatureOne}
                                    onChange={e => setCardThreeFeatureOne(e.target.value)}
                                    type='text'
                                    placeholder='card three features'
                                />
                                <Input 
                                    value={cardThreeFeatureTwo}
                                    onChange={e => setCardThreeFeatureTwo(e.target.value)}
                                    type='text'
                                    placeholder='card three features'
                                />
                                <Input 
                                    value={cardThreeFeatureThree}
                                    onChange={e => setCardThreeFeatureThree(e.target.value)}
                                    type='text'
                                    placeholder='card three features'
                                />
                                <Input 
                                    value={cardThreeFeatureFour}
                                    onChange={e => setCardThreeFeatureFour(e.target.value)}
                                    type='text'
                                    placeholder='card three features'
                                />
                                <Button 
                                    type={'submit'}
                                    onClick={saveCardThreeFeatures}
                                    text={'update'}
                                />
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'home__into_box'}>
                        <div><h4>HOME SECTION HEADINGS</h4></div>
                        <form>
                            <Input 
                                value={sectionOneHeading}
                                onChange={e => setSectionOneHeading(e.target.value)}
                                type='text'
                                placeholder='section one heading'
                            />
                            <Input 
                                value={sectionTwoHeading}
                                onChange={e => setSectionTwoHeading(e.target.value)}
                                type='text'
                                placeholder='section two heading'
                            />
                            <Input 
                                value={sectionThreeHeading}
                                onChange={e => setSectionThreeHeading(e.target.value)}
                                type='text'
                                placeholder='section three heading'
                            />
                            <Button 
                                type={'submit'}
                                onClick={saveSectionHeadings}
                                text={'update'}
                            />
                        </form>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div className={'home__into_box'}>
                        <div><h4>HOME SECTION INTROs</h4></div>
                        <form>
                            <Input 
                                value={sectionOneIntro}
                                onChange={e => setSectionOneIntro(e.target.value)}
                                type='text'
                                placeholder='section one intro'
                            />
                            <Input 
                                value={sectionTwoIntro}
                                onChange={e => setSectionTwoIntro(e.target.value)}
                                type='text'
                                placeholder='section two intro'
                            />
                            <Input 
                                value={sectionThreeIntro}
                                onChange={e => setSectionThreeIntro(e.target.value)}
                                type='text'
                                placeholder='section three intro'
                            />
                            <Button 
                                type={'submit'}
                                onClick={saveSectionIntros}
                                text={'update'}
                            />
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;
