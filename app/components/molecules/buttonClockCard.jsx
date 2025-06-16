import arrow from "../../src/assets/arrow-right.svg";

const ButtonClockCard = ({ userId, clock, participants }) => {
    //--- different buttons
    //creator
    if (userId === clock.creator) {
        return <p className="btn__card purple__bg btn__text"> Jouw Abbymoment  <img className='btn__icon btn__card__arrow' src={arrow} alt="een pijl" /> </p>
    }

    //made by Abby
    if (clock.abbyMade) {
        return <p className={(participants.includes(userId)) ? ' btn__card bg-img__green' : 'btn__card bg-img__none'}> <span className="btn__text btn__card__abby"> made by <svg className="btn__card__logo" xmlns="http://www.w3.org/2000/svg" width="624" height="213" viewBox="0 0 624 213" fill="none">
            <path d="M624.025 0H564.665L538.634 110.174L511.793 0H453.118L515.273 144.65V212.722H561.871V144.688L624.025 0ZM457.636 62.6026C457.636 28.0293 429.601 0 395.018 0H340.836V212.722H408.066C442.65 212.722 470.685 184.693 470.685 150.12C470.685 129.51 460.696 111.267 445.32 99.8639C453.056 89.4545 457.636 76.5658 457.636 62.5995V62.6026ZM417.681 62.6026C417.681 74.616 407.941 84.3526 395.924 84.3526H380.807V40.8557H395.924C407.941 40.8557 417.681 50.5923 417.681 62.6026ZM429.801 150.095C429.801 162.105 420.061 171.845 408.044 171.845H380.807V128.345H408.044C420.061 128.345 429.801 138.085 429.801 150.095ZM301.009 99.867C308.745 89.4576 313.325 76.569 313.325 62.6026C313.325 28.0293 285.29 0 250.706 0H196.525V212.722H263.755C298.339 212.722 326.376 184.693 326.376 150.12C326.376 129.51 316.385 111.267 301.012 99.8639L301.009 99.867ZM273.37 62.6026C273.37 74.616 263.63 84.3526 251.613 84.3526H236.496V40.8557H251.613C263.627 40.8557 273.37 50.5923 273.37 62.6026ZM285.49 150.095C285.49 162.105 275.75 171.845 263.733 171.845H236.493V128.345H263.733C275.747 128.345 285.49 138.085 285.49 150.095ZM126.36 212.725H187.34L122.114 0L66.0878 0.0840972L0.892578 212.725H61.8754L94.1163 39.2827L126.36 212.722V212.725Z" fill="#fbfbfb" />
        </svg></span>  <img className='btn__icon btn__card__arrow' src={arrow} alt="een pijl" /> </p>
    }

    //normal
    else {
        return <p className={(participants.includes(userId)) ? 'btn__card green__bg' : 'btn__card'}> <img className='btn__icon btn__card__arrow' src={arrow} alt="een pijl" /></p>
    }
};

export default ButtonClockCard;