import FirstNameInputField from "@/components/site/form/memberSignup/FirstNameInputField";
import Icon from "@/components/site/ui/iconography/Icon";
import { Event } from "@/models/event";
import { UnauthorizedError } from "@/network/http-errors";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck, faCalendarStar, faHouse, faInfoCircle, faSign, faSignHanging, faStar, faUniformMartialArts, faXmarkCircle } from "@fortawesome/pro-solid-svg-icons";
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
import ErrorAlert from "../../components/ErrorAlert";
import { C } from "@fullcalendar/core/internal-common";
import EventLocationField from "./EventLocationInputField";

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
    onEventCreatedSuccessfully: () => void,
    errorString?: string,
    referenceId: string,
    calendarApi: CalendarApi,
    selectedDate: string,
    isOpen: boolean;
}

export const createEventSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    type: yup.string().required(),
    start: yup.string().required(),
    end: yup.string().required(),
})

type CreateEventData = yup.InferType<typeof createEventSchema>;

export default function ExampleModal({selectedDate, onDismiss, onEventCreatedSuccessfully, errorString, referenceId,  calendarApi, isOpen}: AddEventModalProps) {

    const [errorText, setErrorText] = useState<string|null>();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CreateEventData>({
        resolver: yupResolver(createEventSchema),
    });
    
    const selectedDateLo = toDateTimeLocal(selectedDate);

    const [title, setTitle] = useState<string|undefined>();
    const [startDate, setStartDate] = useState<string|undefined>(selectedDateLo);
    const [endDate, setEndDate] = useState<string|undefined>(selectedDateLo);
    const [academyReferenceId, setAcademyReferenceId] = useState<string|null>(referenceId);
    

    async function onSubmit(eventData: CreateEventData) {

        const title = eventData.title;
        const startDate = eventData.start;
        const endDate = eventData.end;
        const description = eventData.description;
        const location = eventData.location;
        const type = eventData.type;
        const referenceId = academyReferenceId;

        console.log(referenceId);

        const sd = new Date(startDate);
        const ed = new Date(endDate);

        const differenceInTime = ed.getTime() - sd.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays > 7) {
            console.log("An event cannot last longer than 7 days.")
            setErrorText("An event cannot last longer than 7 days. ");
            return null;
        }

        if (endDate < startDate) {
            setErrorText("You cannot have a date end before it starts.");
            return null;
        }

        if (endDate == startDate) {
            setErrorText("An event cannot start the same time it ends.");
            return null;
        }

        calendarApi.addEvent({
            id: createEventId(),
            title: title,
            start: startDate,
            end: endDate,
            extendedProps: {
                "description": description,
                "location": location,
                "type": type,
                "referenceId": referenceId,
                "registerCount": 0
            }
        })
    }
    return (
      <div className="z-9 text-sm ml-none md:ml-72 lg:ml-72 xl:ml-72 md:text-sm lg:text-sm fixed top-0 left-0 w-full bg-black-200 bg-opacity-30 h-none xs:h-full sm:h-none mt-18 xs:pb-10 outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
        <div className="bg-white-500 ml-none md:ml-70 xl:ml-70 lg:ml-70 rounded-md max-w-lg my-6 mx-auto relative w-auto pointer-events-none">
          <div className="max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-row flex-shrink-0 items-center justify-between border-stroke rounded border-b p-4 ">
              <div>
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                  <Icon className="text-red-200 mr-2" icon={faCalendarStar}/> Create Event
                </h5>
              </div>
              <div>

              </div>
              <div>
                <Icon onClick={onDismiss} className="text-red-200 text-2xl hover:text-red-400 transition ease-in-out delay-20 transition-duration-20" icon={faXmarkCircle}/>
              </div>
            </div>
            <div className="flex-auto overflow-y-auto relative p-4">
            { errorText &&
                  <ErrorAlert errorText={errorText} errorTextHeading="An error occured"/>
              }
             <div className="flex-auto ooverflow-y-auto relative p-4">
              <form className="s`pace-y-2 md:space-y-2 lg:space-y-2 xl:space-y-2 2xl:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <EventTypeInputField
                        register={register("type")}
                        error={errors.type}
                    />

                    <div className="flex flex-col sm:flex-row gap-1 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">  
                      <EventNameInputField
                          register={register("title")}
                          error={errors.title}
                      />

                      <EventLocationField
                        register={register("location")}
                        error={errors.location}
                      />
                    </div>


                    <EventDetailsInputField
                        register={register("description")}
                        error={errors.description}
                    />
                
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

                <div
              className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 pr-3 border-gray-200 rounded-b-md">
              <button type="submit"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                Create event
              </button>
            </div>
                
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
}