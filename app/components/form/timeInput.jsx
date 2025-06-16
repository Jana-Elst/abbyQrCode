//https://daypicker.dev/guides/timepicker

//style sheet
import "./form.css"
import "./picker.css"

//react
import React, { ChangeEventHandler, useState } from "react";

//external imports
import { setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";

//functions
import { getISOLocalString, getDate, nextDay, isMonday } from "../../services/clock";

const TimeInput = ({ formData, setFormData, extraClass }) => {
    let time = getDate(formData.scheduledStartTime);

    const [selected, setSelected] = useState(time.day);
    const [timeValue, setTimeValue] = useState(`${time.hour}:${time.minutes}`);
    

    const handleTimeChange = (e) => {
        const time = e.target.value;
        if (!selected) {
            setTimeValue(time);
            return;
        }
        const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
        const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
        setSelected(newSelectedDate);
        setTimeValue(time);
        setFormData({
            ...formData,
            scheduledStartTime: new Date(newSelectedDate).toISOString()
        });
    };

    const handleDaySelect = (date) => {
        if (!timeValue || !date) {
            setSelected(date);
            return;
        }
        const [hours, minutes] = timeValue
            .split(":")
            .map((str) => parseInt(str, 10));
        const newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes
        );
        setSelected(newDate);
        setFormData({
            ...formData,
            scheduledStartTime: new Date(newDate).toISOString()
        });
    };

    return (
        <div className={extraClass}>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDaySelect}

                //extra settings
                navLayout="around"
                disabled={[
                    {before: new Date()},
                    {dayOfWeek: [1]}
                ]}
                weekStartsOn={1}
            />
            <label>
                <input type="time" value={timeValue} onChange={handleTimeChange} />
            </label>
        </div>
    );
}

export default TimeInput;
