//react
import { useContext } from "react";

//global variables
import { UserContext } from '../context/UserContext';
import { FormFlowContext } from '../context/FormFlowContext';

//components
import Title from '../components/molecules/title';
import Button from '../components/molecules/button';

//styling
import "./createAbbymomentStart.css";

const Info = () => {
    const { userId } = useContext(UserContext);
    const { formFlow, setFlowForm } = useContext(FormFlowContext);
    console.log(userId);


    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'scheduled') {
            setFlowForm('startScheduled');
        }
    }


    if (formFlow === 'now') {
        return (
            <>
                <Title> Wat wil jij vandaag doen ?</Title >
                {
                    userId
                        ? <div>
                            <div>
                                <input type="radio"
                                    id="scheduled"
                                    name="now"
                                    value="scheduled"
                                    onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor="scheduled">Start een gepland Abbymoment</label>
                            </div>

                            <div>
                                <input type="radio"
                                    id="make"
                                    name="now"
                                    value="make"
                                    onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor="online">Maak een nieuw Abbymoment</label>
                            </div>
                        </div>

                        : <div>
                            <p className="info__note yellow__bg btn__text">Om een Abbymoment the starten moet je ingelogd zijn.</p>
                            <Button link={'log-in'}>Log-in</Button>
                        </div>
                }
            </>
        )

    } else {
        return (
            <div className="info__container">
                <Title className="info__title">Jouw dag, jouw manier bij Abby</Title>

                {
                    userId
                        ? (
                            <>

                                <p className="info__p">Een Abbymoment is een moment voor iets waar jij behoefte aan hebt of zin in hebt, van een gezellige koffiepauze tot een ontspannende yogasessie in de tuin.</p>
                                <p className="info__p">Maak een momentje voor jezelf of laat andere aansluiten bij jouw moment!</p>

                                <div className="info__btn__container">
                                    <Button extraClass="info__btn yellow__bg btn__text" link={'maak-een-abbymoment/formulier'}>Start</Button>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <p className="info__p">Log in om jouw eigen Abbymoment te creëren of mee te doen aan een moment van iemand anders. Geniet zo van meer rust en verbinding in je dag.</p>
                                <div className="info__btn__container">
                                    <p className="info__note">Om een Abby moment te starten moet je ingelogd zijn.</p>
                                    <Button extraClass="info__btn yellow__bg btn__text" link={'log-in'}>Log in</Button>
                                </div>
                            </>
                        )
                }

            </div>
        )
    }
};

export default Info;