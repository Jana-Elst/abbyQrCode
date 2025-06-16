import { NavLink } from "react-router";
import iconHome from "../../src/assets/icon-cross.svg";
import iconAlle from "../../src/assets/icon-smiley.svg";
import iconMaak from "../../src/assets/icon-building.svg";
import iconAccount from "../../src/assets/icon-person.svg";
import iconJouw from "../../src/assets/icon-y.svg";

//root variables
import { useContext } from "react";

//root variables
import { UserContext } from '../../context/UserContext';

import pictureHome from "../../src/assets/nav-blue.jpg";
import pictureMaak from "../../src/assets/nav-yellow.jpg";
import pictureAlle from "../../src/assets/nav-orange.jpg";
import pictureJouw from "../../src/assets/nav-purple.jpg";
import pictureAccount from "../../src/assets/nav-green.jpg";

export default function Nav({ hamburgerOpen, toggleHamburger }) {
    const { userId } = useContext(UserContext);

    return (
        <>
            {!hamburgerOpen &&
                <div className="navigation__container">
                    <ul className="navigation__links">
                        <NavLink onClick={() => (setTimeout(toggleHamburger, 500))} className={"navigation__links__li navigation__blue"} to={`${import.meta.env.BASE_URL}`} end >
                            <div className="links__li__container">
                                <img className="links__li__svg" src={iconHome} alt="startpagina icoontje" />
                                <p className="links__li__p" >Home</p>
                            </div>
                            <img className="links__li__img" src={pictureHome} alt="De Living van Abby" />
                        </NavLink>
                        <NavLink onClick={() => (setTimeout(toggleHamburger, 500))} className={"navigation__links__li navigation__orange"} to={`${import.meta.env.BASE_URL}abbymomenten`}>
                            <div className="links__li__container">
                                <img className="links__li__svg" src={iconAlle} alt="momenten icoontje" />
                                <p className="links__li__p" >Alle momenten</p>
                            </div>
                            <img className="links__li__img" src={pictureAlle} alt="Een rode kerk" />
                        </NavLink>
                        <NavLink onClick={() => (setTimeout(toggleHamburger, 500))} className={"navigation__links__li navigation__purple"} to={`${import.meta.env.BASE_URL}jouw-abbymomenten`}>
                            <div className="links__li__container">
                                <img className="links__li__svg" src={iconJouw} alt="jouw momenten icoontje" />
                                <p className="links__li__p" >Jouw momenten</p>
                            </div>
                            <img className="links__li__img" src={pictureJouw} alt="Een paarse lucht" />
                        </NavLink>
                        <NavLink onClick={() => (setTimeout(toggleHamburger, 500))} className={"navigation__links__li navigation__yellow"} to={`${import.meta.env.BASE_URL}maak-een-abbymoment`}>
                            <div className="links__li__container">
                                <img className="links__li__svg" src={iconMaak} alt="creatie icoontje" />
                                <p className="links__li__p" >Creëer een moment</p>
                            </div>
                            <img className="links__li__img" src={pictureMaak} alt="De Living van Abby" />
                        </NavLink>
                        <NavLink onClick={() => (setTimeout(toggleHamburger, 500))} className={"navigation__links__li navigation__green"} to={`${import.meta.env.BASE_URL}log-in`}>
                            <div className="links__li__container">
                                <img className="links__li__svg" src={iconAccount} alt="account icoontje" />
                                {
                                    userId
                                        ? <p className="links__li__p" >Mijn account</p>
                                        : <p className="links__li__p" >Log in</p>
                                }
                            </div>
                            <img className="links__li__img" src={pictureAccount} alt="De Living van Abby" />
                        </NavLink>
                    </ul>
                    <ul className="navigation__ln">
                        <li className="navigation__ln_li active">NL</li>
                        <li className="navigation__ln_li">FR</li>
                        <li className="navigation__ln_li">ENG</li>
                    </ul>
                </div>
            }
        </>
    )

}