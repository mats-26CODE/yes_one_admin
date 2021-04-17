import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';

//-> component imports
import Home from './home/Home';
import Development from './development/Development';
import Design from './design/Design';
import Team from './team/Team';
import Careers from './careers/Careers';

//-> react icons imports
import { RiAdminLine, RiPenNibLine,  } from 'react-icons/ri';
import { GoHome } from 'react-icons/go';
import { GiTeamIdea, GiBriefcase } from 'react-icons/gi';
import { IoCodeSlashSharp } from 'react-icons/io5';


const Main = () => {
    return (
        <BrowserRouter>
            <div className={'main_container'}>
                <div className={'app_view_container'}>
                    <div className={'nav_container'}>
                        {/* Navbar */}
                        <div className={'nav_bar'}>
                            <ul>
                                <li><NavLink to ="/"><GoHome size={'1.8em'}/></NavLink></li>
                                <li><NavLink to ="/development"><IoCodeSlashSharp size={'1.8em'}/></NavLink></li>
                                <li><NavLink to ="/design"><RiPenNibLine size={'1.8em'}/></NavLink></li>
                                <li><NavLink to ="/team"><GiTeamIdea size={'1.8em'}/></NavLink></li>
                                <li><NavLink to ="/careers"><GiBriefcase size={'1.8em'}/></NavLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className={'body_container'}>
                        {/* Body */}
                        <div className={'body_top_bar'}><RiAdminLine size={'1em'} color={'#f2f5ff'}/><h4>Hola!, Admin</h4></div>
                        <div className={'body_content'}>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/development' component={Development} />
                            <Route exact path='/design' component={Design} />
                            <Route exact path='/team' component={Team} />
                            <Route exact path='/careers' component={Careers} />
                        </div>
                        <div className={'body_bottom_bar'}><p>&copy; Copyright 2021, Yes Productions </p></div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Main;
