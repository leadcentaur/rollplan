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

interface EditEventModalProps {
    onDismiss?: () => void;
    editEventClickArg: EventClickArg,
    onEventUpdated: (text: string) => void;
    isOpen: boolean,
}

export const editEventSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    type: yup.mixed<eventType>(),
    start: yup.string(),
    end: yup.string(),
})

type UpdateEventData = yup.InferType<typeof editEventSchema>;

export default function EditEventModal({ onDismiss, editEventClickArg, onEventUpdated }: EditEventModalProps) {

    
    const [startDate, setStartDate] = useState<string|undefined>(editEventClickArg.event.startStr);
    const [endDate, setEndDate] = useState<string|undefined>(editEventClickArg.event.endStr);
    const [errorText, setErrorText] = useState<string|null>();
    const [successText, setSuccessText] = useState<string|null>();

    const eventExtendedProps = editEventClickArg.event.extendedProps;
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<UpdateEventData>();


    const title = editEventClickArg.event.title;
    const type = eventExtendedProps.type;
    const eventId = eventExtendedProps._id;

    const description = eventExtendedProps.description;
    const start = editEventClickArg.event.startStr;
    const end = editEventClickArg.event.endStr;

    async function handleEventDeletion(eventId: string) {
        try {
          
        } catch (error) {
          
        }
    }

    async function onSubmit({title, description, type, start, end}: UpdateEventData) {
        if (!title && !description && !type && !start && !end) return;
        try {
          const updatedEvent = await EventApi.updateCalendarEvent({title, description, type, start, end}, eventId)
          onEventUpdated("The event has been updated sucessfully, Members have been notified");
        } catch (error) {
          if (error instanceof BadRequestError) {
            setErrorText("An Error has occured")
          }
        }
    }

    return (
        <div className="z-40 fixed sm:text-sm md:text-md lg:text-md xl:text-md 2xl:text-md top-0 left-0 w-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
        <div className="sm:h-[calc(100%-4rem)] bg-white-500 rounded-lg max-w-lg  my-6 mx-auto relative w-auto pointer-events-none">
          <div
            className="max-h-full overflow-hidden border-none shadow-lg  relative mt-30 flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-row opacity-60 flex-shrink-0 items-center justify-between border-stroke rounded border-b p-4 ">
              
                <div className="">

                  <Icon className="text-red-200 mr-2" icon={faPencilAlt}/> Edit Event
                </div>
                <div>

                </div>
                <div>
                <Icon onClick={onDismiss} className="text-red-200 text-2xl hover:text-red-400 transition ease-in-out delay-20 transition-duration-20" icon={faXmarkCircle}/>
                </div>
              
            </div>
            <div className="flex-auto overflow-y-auto relative p-4">
             <div className="flex-auto overflow-y-auto relative p-4">
              <form className="space-y-5 " onSubmit={handleSubmit(onSubmit)}>
                    <EventTypeInputField
                        register={register("type")}
                        error={errors.type}
                        editEventValue={type}
                    />

                    <EventNameInputField
                        register={register("title")}
                        error={errors.title}
                        editEventValue={title}
                    />

                    <EventDetailsInputField
                        register={register("description")}
                        error={errors.description}
                        editEventValue={description}
                    />
                <div className="flex flex-row gap-4 ">
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

                </div>
                <div
              className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 pr-3 border-gray-200 rounded-b-md">
              <button type="button"
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