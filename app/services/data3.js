
import { supabase } from "../supabaseClient";
import { totalClocks } from "./museumData";

/*
Handful of helper functions to be called from route loaders and actions
and insert or delete things from the database
*/

export const getUserId = async () => {
    const { data: { user }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return user?.id;
};

//------------------- Get or update things from the database -------------------//
//------------ Main function ------------//
const getOrUpdateClocks = async (query) => {
    try {
        let { data, error } = await query;
        return data
    } catch (error) {
        console.error("Error fetching museum clocks:", error);
        throw error;
    }
}

//------------ GET ------------//
//--- CLOCKS ---//
// Main function to get clocks
export const getClocks = async ({ select = '*', joins = [], filters = [], or = null, order = { column: 'scheduledStartTime', ascending: false } } = {}) => {
    //create query
    let query = supabase.from('clocks').select(select);
    joins.forEach(join => {
        query = query.select(join);
    });
    filters.forEach(({ method, column, value }) => {
        query = query[method](column, value);
    });
    if (or) {
        query = query.or(or);
    }
    if (order) {
        query = query.order(order.column, { ascending: order.ascending });
    }

    return await getOrUpdateClocks(query);
};


//get all clocks
export const getAllClocks = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}

//get just one clock by ID
export const getClock = async (id) => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .eq('id', id)
    );
    return data
}

//--- active clocks
//get all clocks in the museum
export const getMuseumClocks = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .neq('clockWallPos', null)
            .order('startTime', { ascending: false })
    );
    return data
}

export const getOtherActiveClocks = async () => {
    const userId = await getUserId();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select(`*, clockProfile!inner (profile_id)`)
            .neq('clockProfile.profile_id', userId)
            .neq('startTime', null)
            .is('startTime', null)
            .order('startTime', { ascending: false }));
    return data
}

export const getActiveClocksUser = async () => {
    const userId = await getUserId();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select(`*, clockProfile!inner (profile_id)`)
            .eq('clockProfile.profile_id', userId)
            .neq('startTime', null)
            .is('startTime', null)
            .order('startTime', { ascending: false }));
    return data
}

//--- scheduled clocks
//all scheduled clocks
export const getScheduledClocks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .is('startTime', null)
            .gte('scheduledStartTime', todayISO)
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}

//scheduled clocks user --> user = creator
export const getScheduledCreator = async () => {
    const userId = await getUserId();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .eq('creator', userId)
            .eq('startTime', null)
            .gte('scheduledStartTime', todayISO)
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}

//scheduled clocks user --> user =! creator
export const getScheduledParticipant = async () => {
    const userId = await getUserId();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select(`*, clockProfile!inner (profile_id)`)
            .eq('clockProfile.profile_id', userId)
            .neq('creator', userId)
            .eq('startTime', null)
            .gte('scheduledStartTime', todayISO)
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}

//--- past clocks
//past clocks user --> user = creator
export const getPastCreator = async () => {
    const userId = await getUserId();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select('*')
            .eq('creator', userId)
            .or(`
                stopTime.not.is.null,
                scheduledStartTime.lt.${todayISO}
                `)
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}

//past clocks user --> user =! creator
export const getPastParticipant = async () => {
    const userId = await getUserId();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .select(`*, clockProfile!inner (profile_id)`)
            .eq('clockProfile.profile_id', userId)
            .or(`
                stopTime.not.is.null,
                scheduledStartTime.lt.${todayISO}
                `)
            .order('scheduledStartTime', { ascending: false })
    );
    return data
}


//--- CLOCKPROFILE ---//
//get all profiles and clockIds
export const getClockProfile = async () => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .select('*')
    );
    return data
}

//get all clockID's from one user
export const getClocksUser = async () => {
    const userId = await getUserId();

    const data = await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .select('*')
            .eq('profile_id', userId)
    );
    return data
}

//------------ UPDATE ------------//
//--- CLOCKS ---//
//update clock from physical to digital
export const updatePhysicalToDigital = async (id) => {
    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                clockWallPos: null,
            })
            .eq('id', id)
    );
    return data
}

//update clock from physical to digital
export const updateDigitalToPhysical = async (id) => {
    const time = getTimeNow();
    const clockNumber = await getRandomClockNumber();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                clockWallPos: clockNumber,
                startTime: time,
            })
            .eq('id', id)
    );
    return data
}

//update clock & start it
export const startWallClock = async (id, name, description, prive, location) => {
    const time = getTimeNow();

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                name: name,
                description: description,
                startTime: time,
                scheduledStartTime: time,
                private: prive,
                location: location
            })
            .eq('id', id)
    );
    return data
}

//stop clock
export const stopClock = async (id) => {
    const time = getTimeNow();
    console.log(id, time);

    const data = await getOrUpdateClocks(
        supabase
            .from('clocks')
            .update({
                stopTime: time,
                // scheduledStopTime: time,
            })
            .eq('id', id)
    );
    return data
}

//------------------- Insert new row -------------------//
//--- CLOCKPROFILE ---//
const addRow = async (query, userId) => {
    try {
        let { data } = await query;
        let joinQuery = supabase
            .from('clockprofile')
            .insert({ profile_id: userId, clock_id: data.id });
        await joinQuery;

        return data;
    } catch (error) {
        console.error("Error inserting clock:", error);
        throw error;
    }
}

//--- CLOCKS ---//
//add a new planned clock
export const addScheduledClock = async (userId, name, description, scheduledStartTime, prive, location) => {
    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                name: name,
                description: description,
                scheduledStartTime: new Date(scheduledStartTime).toISOString(),
                private: prive,
                location: location,
                creator: userId
            }).select()
            .single(),
        userId
    )

    return data
}

//add clock for now online
export const startOnlineClock = async (userId, name, description, prive, location) => {
    const time = getTimeNow();

    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                name: name,
                description: description,
                scheduledStartTime: time,
                startTime: time,
                private: prive,
                location: location,
                creator: userId
            }).select()
            .single(),
        userId
    )

    return data
}

//add clock for now physical
export const addPhysicalClock = async (userId) => {
    const time = getTimeNow();
    const clockNumber = await getRandomClockNumber();

    const data = await addRow(
        supabase
            .from('clocks')
            .insert({
                clockWallPos: clockNumber,
                creator: userId,
                scheduledStartTime: time,
                startTime: time
            }).select()
            .single(),
        userId
    );

    return data.id
}

//join activity
export const joinClock = async (userId, clockId) => {
    try {
        const { data, error } = await supabase
            .from('clockprofile')
            .insert({
                profile_id: userId,
                clock_id: clockId
            })
            .select()
            .single();

        if (error) {
            console.error("Error inserting clock:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error in joinClock:", error);
        throw error;
    }
}

//------------------- DELETE ROW -------------------//
export const leaveClock = async (userId, clockId) => {
    await getOrUpdateClocks(
        supabase
            .from('clockprofile')
            .delete()
            .eq('profile_id', userId)
            .eq('clock_id', clockId)
    );
}

//------------------- FILTERS JS -------------------//
export const getParticipants = (clock, clockProfile) => {
    const participants = clockProfile.filter(cp => cp.clock_id === clock[0].id).map(cp => cp.profile_id);
    return participants;
}

/*
Some functions to get a random free clock
*/
//------------------- get a random clock -------------------//
//get time in correct time zone
//aanpassen???!!!!!!
export const getTimeNow = () => {
    return new Date(Date.now()).toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
}

export const getDateNow = () => {
    let date = new Date();
    date = date.toISOString().split('T')[0];
    return date;
}

export const timeDifference = (time) => {
    const timeDiff = (getTimeNow() - time)
    return timeDiff;
}

//create an array of all the free clocks
const addFreeClocks = async () => {
    let freeClocks = [];
    let occupiedClocks = [];

    const clocks = await getMuseumClocks();

    clocks.forEach(clock => {
        if (
            clock.startTime && !clock.stopTime
            || timeDifference(clock.startTime) < (100 * 60 * 60)
        ) {
            occupiedClocks.push(clock.clockWallPos);
        }
    });

    for (let i = 1; i <= totalClocks; i++) {
        if (!occupiedClocks.includes(i)) {
            freeClocks.push(i);
        }
    }
    return freeClocks;
}

//get a random clock out of the free clocks
const getRandomClockNumber = async () => {
    const freeClocks = await addFreeClocks();

    const clockId = Math.floor(Math.random() * freeClocks.length);
    const clock = freeClocks[clockId];
    return clock;
}

/*
Some other functions to get the right buttons & clocks
*/
//------------------- get a random clock -------------------//
export const clockLinkedWithUser = (clock, participants, userId) => {
    const clockId = clock.id;

    if (participants) {
        const participant = participants.find(p => p.profile_id === userId && p.clock_id === clockId);
        if (participant) {
            return true;
        }
    } else {
        return false;
    }
}