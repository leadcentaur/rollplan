import FirstNameInputField from "@/components/site/form/memberSignup/FirstNameInputField";
import Icon from "@/components/site/ui/iconography/Icon";
import { Event } from "@/models/event";
import { UnauthorizedError } from "@/network/http-errors";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck, faCalendarStar, faHouse, faInfoCircle, faSign, faSignHanging, faStar, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import * as EventApi from "@/network/api/event";
import SuccessAlert from "../../components/SuccessAlert";
import { toDateTimeLocal } from "@/utils/utils";
import EventNameInputField from "./EventNameInputField";
import EventTypeInputField from "./EventTypeInputField";
import EventDateInputField from "./DateInputField";
import EventDetailsInputField from "./EventDetailsInputField";
import { CalendarApi, DateSelectArg } from "@fullcalendar/core";
import { createEventId } from "@/utils/event-utils";

export type EventType = 
   | "BJJ Gi (Adult)"
   | "BJJ No-Gi (Adult)"
   | "BJJ Gi (Youth)"
   | "BJJ No-Gi (Youth)"
   | "BJJ Gi Advanced (Adult)"
   | "BJJ Gi Advanced (Youth)"
   | "BJJ No-Gi Advanced (Adult)"
   | "BJJ No-gi Advanced (Youth)"
   | "Open mat Gi"
   | "Open mat No-Gi"
   | "Open mat (Gi/No-Gi)"
   | "Seminar"

interface AddEventModalProps {
    onDismiss: () => void;
    onEventTitle: (eventName: string) => void;
    onEventDescription: (eventDescription: string) => void;
    onEventCreatedSuccessfully: (status: boolean) => void,
    calendarApi: CalendarApi,
    selectedDate: string,
    isOpen: boolean;
}

export const createEventSchema = yup.object().shape({
    title: yup.string().required(),
    eventDescription: yup.string().required(),
    start: yup.string().required(),
    end: yup.string().required(),
})

type CreateEventData = yup.InferType<typeof createEventSchema>;

export default function AddEventModal({onDismiss, calendarApi, onEventTitle, onEventDescription, selectedDate, isOpen}: AddEventModalProps) {

    const [errorText, setErrorText] = useState<string|null>();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CreateEventData>({
        resolver: yupResolver(createEventSchema),
    });

    const selectedDateLo = toDateTimeLocal(selectedDate);

    const [eventName, setEventName] = useState<string|undefined>();
    const [startDate, setStartDate] = useState<string|undefined>(selectedDateLo);
    const [endDate, setEndDate] = useState<string|undefined>(selectedDateLo);
    

    async function onSubmit(eventData: CreateEventData) {

        const eventName = eventData.title;
        const startDate = eventData.start;
        const endDate = eventData.end;
        const eventDescription = eventData.eventDescription;
        const referenceId = "64cb1f4652e0fd8ebe5c7c16"

        console.log("OnSubmit eventName " + eventName + "\n")
        console.log("OnSubmit startDate " + startDate + "\n")
        console.log("OnSubmit endDate " + endDate + "\n")
        console.log("OnSubmit eventDescription " + eventDescription + "\n")
        
        onEventTitle(eventName);
        onEventDescription(eventDescription);

        calendarApi.addEvent({
            id: createEventId(),
            title: eventName,
            start: startDate,
            end: endDate,
            extendedProps: {
                "description": eventDescription,
                "referenceId": referenceId
            }
        })
    }
    

    return (
        <div className='bg-black-200 text-sm bg-opacity-80 flex overflow-hidden justify-center items-start md:items-center m-auto lg:items-center xl:items-center w-screen h-screen fixed z-30 w-full p-4 md:inset-34 h-[calc(100%-1rem)]' data-aria-modal="hidden">
        <div className="w-full max-w-lg fixed z-10">
        <div className={clsx(`${isOpen ? 'animate-fade transform transition-all duration-500 delay-100 ease-in translate-y-10 relative bg-white-500 rounded-lg shadow dark:bg-gray-700' : 'relative bg-white-500 rounded-lg shadow dark:bg-gray-700'}`)}>
            <button type="button" onClick={onDismiss} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8 ">
                <h3 className="mb-4 text-xl font-medium border-b border-stroke pb-3 text-gray-900 dark:text-white">Create event</h3>


                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="flex flex-col sm:flex-row gap-1 pr-none md:pr-3 lg:pr-3 xl:pr-3 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">   */}
                    <div className="flex flex-col">

                            <EventNameInputField
                                register={register("title")}
                                error={errors.title}
                            />

                            {/* <EventTypeInputField
                                register={register("eventType")}
                                error={errors.eventType}
                            /> */}
                    </div>

                        <div>
                            <EventDateInputField
                                register={register("start")}
                                label="Start Date"
                                setGeneralDate={(date) => {setStartDate(date)}}
                                error={errors.start}
                                selectedDate={startDate}
                            />
                            
                            <EventDateInputField
                                register={register("end")}
                                label="End Date"
                                setGeneralDate={(date) => {setEndDate(date)}}
                                selectedDate={endDate}
                            />

                        </div>
                            
                            <EventDetailsInputField
                                register={register("eventDescription")}
                                error={errors.eventDescription}
                            />

                    { errorText &&
                        <div className="pt-5 m-1 text-red-400 text-ital">
                            {errorText}
                        </div>
                    }

                    {/* <SuccessAlert successText="Event has been created successfully" successTextHeading="Submission success"/> */}
                    <button disabled={isSubmitting} type="submit" className="w-full text-white-500 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create event</button>
                    
                </form>
            </div>
        </div>
    </div>
    </div>
    );
}