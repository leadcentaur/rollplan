import FirstNameInputField from "@/components/site/form/memberSignup/FirstNameInputField";
import Icon from "@/components/site/ui/iconography/Icon";
import { Event } from "@/models/event";
import { BadRequestError, UnauthorizedError } from "@/network/http-errors";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck, faCalendarStar, faHouse, faInfoCircle, faPencilAlt, faSign, faSignHanging, faStar, faUniformMartialArts, faX, faXmarkCircle } from "@fortawesome/pro-solid-svg-icons";
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
import { CalendarApi, DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { createEventId } from "@/utils/event-utils";
import ErrorAlert from "../../components/ErrorAlert";
import { faTrashCan } from "@fortawesome/sharp-regular-svg-icons";
import { eventType } from "@/types/user-types";
import Spinner from "@/components/site/ui/typography/Spinner";
import { ColorRing } from "react-loader-spinner";
import EventLocationField from "./EventLocationInputField";
import CheckboxOne from "../../components/CheckBox";

interface EditEventModalProps {
    onDismiss?: () => void;
    editEventClickArg: EventClickArg,
    onEventUpdated: (text: string) => void;
    onEventDeleted: () => void;
    isOpen: boolean,
}

export const editEventSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    location: yup.string(),
    type: yup.mixed<eventType>(),
    start: yup.string(),
    end: yup.string(),
})

type UpdateEventData = yup.InferType<typeof editEventSchema>;

export default function EditEventModal({ onDismiss, editEventClickArg, onEventUpdated, onEventDeleted }: EditEventModalProps) {

    
  
    const [startDate, setStartDate] = useState<string|undefined>(editEventClickArg.event.startStr);
    const [endDate, setEndDate] = useState<string|undefined>(editEventClickArg.event.endStr);
    const [errorText, setErrorText] = useState<string|null>();
    const [successText, setSuccessText] = useState<string|null>();
    const [isLoading, setIsLoading] = useState<boolean|undefined>();

    const eventExtendedProps = editEventClickArg.event.extendedProps;
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<UpdateEventData>();


    const title = editEventClickArg.event.title;
    const type = eventExtendedProps.type;
    const eventId = eventExtendedProps._id;

    const description = eventExtendedProps.description;
    const location = eventExtendedProps.location;
    const start = editEventClickArg.event.startStr;
    const end = editEventClickArg.event.endStr;

    async function handleEventDeletion() {
        try {

          setIsLoading(true);
          const deletedEvent = await EventApi.deleteEvent(eventId);
          editEventClickArg.event.remove();
          setIsLoading(false);
          onEventDeleted();

        } catch (error) {
          setErrorText("An Error has occured")
        }
    }

    async function onSubmit({title, description, location, type, start, end}: UpdateEventData) {
        if (!title && !description && !location && !type && !start && !end) return;
        try {
          const updatedEvent = await EventApi.updateCalendarEvent({title, description, location, type, start, end}, eventId)
          editEventClickArg.event.remove();
          
          onEventUpdated("The event has been updated sucessfully, Members have been notified");
        } catch (error) {
          if (error instanceof BadRequestError) {
            setErrorText("An Error has occured")
          }
        }
    }

    return (
      <div className="z-9 text-sm ml-none md:ml-72 lg:ml-72 xl:ml-72 md:text-sm lg:text-sm fixed top-0 left-0 w-full bg-black-200 bg-opacity-30 h-none xs:h-full sm:h-none mt-18 xs:pb-10 outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
      <div className="bg-white-500 ml-none md:ml-70 xl:ml-70 lg:ml-70 rounded-md max-w-lg my-6 mx-auto relative w-auto pointer-events-none">
        <div className="max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
          <div className="flex flex-row flex-shrink-0 items-center justify-between border-stroke rounded border-b p-4 ">
                <div>
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                    <Icon className="text-red-200 mr-2" icon={faCalendarStar}/> Edit Event
                  </h5>
                </div>
                <div>
                </div>
                <div>
                  <Icon onClick={onDismiss} className="text-red-200 text-2xl hover:text-red-400 transition ease-in-out delay-20 transition-duration-20" icon={faXmarkCircle}/>
                </div>
              
            </div>
            <div className="flex-auto overflow-y-auto relative p-4">
             <div className="flex-auto overflow-y-auto relative p-4">
              <form className="space-y-2 md:space-y-2 lg:space-y-2 xl:space-y-2 2xl:space-y-5 " onSubmit={handleSubmit(onSubmit)}>
                    <EventTypeInputField
                        register={register("type")}
                        error={errors.type}
                        editEventValue={type}
                    />

                    <div className="flex flex-col sm:flex-row gap-1 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">  
                      <EventNameInputField
                          register={register("title")}
                          error={errors.title}
                          editEventValue={title}
                      />

                      <EventLocationField
                          register={register("location")}
                          error={errors.title}
                          editEventValue={location}
                      />
                    </div>

                    <EventDetailsInputField
                        register={register("description")}
                        error={errors.description}
                        editEventValue={description}
                    />

                        <EventDateInputField
                                register={register("start")}
                                label="Start Date"
                                setGeneralDate={(date) => {setStartDate(date)}}
                                error={errors.start}
                                editEventValue={start}
                            />
                            
                            <EventDateInputField
                                register={register("end")}
                                label="End Date"
                                setGeneralDate={(date) => {setEndDate(date)}}
                                editEventValue={end}
                            />

<CheckboxOne/>

                          <div
                            className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 pr-3 border-gray-200 rounded-b-md">
                            <button type="button" disabled={isLoading || isSubmitting} onClick={handleEventDeletion}
                              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                              data-bs-dismiss="modal">

                              Delete <Icon className="text-red-200 ml-2" icon={faTrashCan}/>
                            </button>
                            <button type="submit"
                              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                              Submit
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