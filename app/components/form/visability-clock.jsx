import { useState } from 'react';

import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';

import { addPhysicalClock, removePhysical } from "../../services/data";

const VisabilityClock = ({ setFormData, formData }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        let clockId = formData.clockId;

        if (value === 'wall') {
            clockId = await addPhysicalClock(formData.creator);
            setFormData({
                ...formData,
                clockId: clockId,
                clockWallPos: "wall"
            });
        } else {
            console.log('online');
            if (clockId) {
                removePhysical(clockId);
            }

            setFormData({
                ...formData,
                clockId: '',
                clockWallPos: 'online'
            });
        }
    }

    const handleBack = (clockId) => {
        if (clockId) {
            removePhysical(clockId);
        }

        setFormData({
            ...formData,
            clockId: '',
            clockWallPos: '',
        });
    }

    return (
        <>
            <div className="container--form">
                <div className="progress__container">
                    {
                        formData.flow === 'planNow'
                            // flow planNow
                            ? <ButtonBack
                                formData={formData}
                                setFormData={setFormData}
                                onClick={() => handleBack(formData.clockId)}>Terug
                            </ButtonBack>
                            // flow now
                            : <ButtonBack
                                formData={formData}
                                setFormData={setFormData}
                                link={"qrCode"}
                                onClick={() => handleBack(formData.clockId)}>Terug
                            </ButtonBack>
                    }
                    <div className="progress">
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--active--planned"></div>
                        <div className="progress__circle progress__circle--future"></div>
                        <div className="progress__circle progress__circle--future"></div>
                    </div>
                </div>

                <Title extraClass="form__title">Wil je je moment delen met anderen?</Title>
                {
                    formData.clockWallPos === 'wall'
                        ? <p className='foodnote'>Je klokje begint meteen te lopen en verschijnt op de klokjesmuur in Abby.</p>
                        : ""
                }
                {
                    formData.clockWallPos === 'online'
                        ? <p className='foodnote'>Je moment wordt op de site én op de momentenmuur in Abby getoond.</p>
                        : ""
                }

                <div className='visuals'>
                    <label className='visual__btn' htmlFor='wall' >
                        <input type="radio"
                            id="wall"
                            name="visability"
                            value="wall"
                            checked={formData.clockWallPos === "wall"}
                            onChange={handleChange}
                            onFocus={() => {
                                setTouched(true);
                            }}
                            // disabled = {!formData.isFree}
                            required
                        />
                        Op de klokjes muur
                        {/* <label htmlFor="wall">Op de klokjes muur</label> */}
                    </label>

                    <label className='visual__btn' htmlFor='online'>
                        <input type="radio"
                            id="online"
                            name="visability"
                            value="online"
                            checked={formData.clockWallPos === 'online'}
                            onChange={handleChange}
                            onFocus={() => {
                                setTouched(true);
                            }}
                            required
                        />
                        Online op de website
                        {/* <label htmlFor="online">Online op de website</label> */}
                    </label>
                </div>

                {
                    <ButtonNext
                        extraClass="next__btn btn__text purple__bg"
                        formData={formData}
                        setFormData={setFormData}
                        disabled={!touched}
                    > Volgende stap </ButtonNext>
                }
            </div>
        </>
    )
};

export default VisabilityClock;