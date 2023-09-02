import FirstNameInputField from "@/components/site/form/memberSignup/FirstNameInputField";
import Icon from "@/components/site/ui/iconography/Icon";
import { Event } from "@/models/event";
import { BadRequestError, UnauthorizedError } from "@/network/http-errors";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faArrowsToDot, faCalendarCheck, faCalendarStar, faHouse, faInfoCircle, faPencilAlt, faSign, faSignHanging, faStar, faUniformMartialArts, faX, faXmarkCircle } from "@fortawesome/pro-solid-svg-icons";
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
import * as utils from "@/utils/utils";

interface MemberEventModalProps {
    onDismiss?: () => void;
    editEventClickArg: EventClickArg,
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

export default function MemberEventModal({ onDismiss, editEventClickArg }: MemberEventModalProps) {

    
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


    async function onSubmit({title, description, type, start, end}: UpdateEventData) {
        if (!title && !description && !type && !start && !end) return;
        try {
          // submission of this modal should make a register call
        } catch (error) {
          if (error instanceof BadRequestError) {
            setErrorText("An Error has occured")
          }
        }
    }

    return (
        <div className="z-40 text-sm md:text-sm lg:text-sm fixed top-0 left-0 w-full bg-black-200 bg-opacity-30 h-none xs:h-full sm:h-none mt-18 xs:pb-10 outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
        <div className="bg-white-500 rounded-md max-w-lg my-6 mx-auto relative w-auto pointer-events-none">
          <div
            className="max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
            <div className="flex flex-row flex-shrink-0 items-center justify-between border-stroke rounded border-b p-4 ">
                <div>
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                    <Icon className="text-red-200 mr-2" icon={faCalendarStar}/> {title}
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

                    <div className="">
                      <span>
                        <h3 className="font-semibold m-2">Event Details</h3>
                        <div className="flex flex-col">
                            <span className="mb-1 ml-8">Date:<p className="pl-4">{utils.toHumanDate(start)}</p></span>
                            <span className="mb-1 ml-8">Time:<p className="pl-4">{utils.toHumanDate(end)}</p></span>
                        </div>
                      </span>
                    </div>


                    <EventDetailsInputField
                        register={register("description")}
                        error={errors.description}
                        editEventValue={description}
                    /> 

                    

                        {/* <EventDateInputField
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
                            /> */}

  
                <div
              className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 pr-3 border-gray-200 rounded-b-md">
              <button type="submit"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                Register <Icon className="text-red-200 ml-2" icon={faStar}/>
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