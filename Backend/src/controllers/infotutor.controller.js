import Tutor from '../models/infotutor.model.js';
import Task from '../models/task.model.js';
export const createTutorClass = async (req, res) => {
    const tutorData = req.body;
    if (!tutorData) {
        return res.status(400).json({message: "not data"});
    }
    try {
        const tutor = new Tutor(tutorData);
        await tutor.save();
        res.status(201).json({message: 'Tutor information was created successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Error'});
    }
};
/**
 * Handle request to some endpoint
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
//wann ist verfügbar den Tutor :) seinen terminen (tutor Profil)
export const getAvailibility = async (req, res) => {

    try {
        if (!req.user.username) {

            return res.status(400).json({message: "Chyba autentikace."});
        } else {
            const availibity = await Tutor.find({tutorName: req.user.username});
            console.log({availibity})
            res.json(availibity);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//filter for the studenten (my Booking form) hir kann er die Tutor suchen und reservation booken
export const getTutors = async (req, res) => {
    try {


        const preDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const toDay = new Date();
        const toDayWoche = toDay.getDay();

        const tutors = await Tutor.find().lean();
         tutors.map((tutor) =>
            tutor.availability.map((days) => {

                const dayIndex = preDay.indexOf(days.day);
                const difference = dayIndex - toDayWoche;

                const futureDate = new Date(toDay);
                const [hours, minutes] = days.time.split(":");
                futureDate.setHours(hours);
                futureDate.setMinutes(minutes);
                futureDate.setSeconds(0);
                futureDate.setMilliseconds(0);

                if (difference < 0) {
                    futureDate.setDate(toDay.getDate() + difference + 7);
                } else if (difference === 0) {

                    return (days.date = futureDate.toISOString());
                } else {
                    futureDate.setDate(toDay.getDate() + difference);
                }
                days.date = futureDate.toISOString();
            })

        );
        const OnCheckTerminDates = await Task.find().lean();
        tutors.map(tutor => {
            // Pro každý termín v availability
            tutor.availability.map(termin => {
                // Zkontrolujeme, jestli se tento termín nachází v OnCheckTermin
                if (OnCheckTerminDates.map(task => task.date.toISOString().split('T')[0]).includes(termin.date.split('T')[0]) &&OnCheckTerminDates.map(task => task.tutor).includes(tutor.tutorName)) {
                    // Pokud ano, přidáme k tomuto termínu isreserviert: true
                    termin.isreserviert = true;
                }
                else {
                    // Pokud ne, přidáme k tomuto termínu isreserviert: false
                    termin.isreserviert = false;
                }
            });
        });


res.json({tutors});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

