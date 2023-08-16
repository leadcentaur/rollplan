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
import SuccessAlert from "../../components/SuccessAlert";
import { toDateTimeLocal } from "@/utils/utils";
import EventNameInputField from "./EventNameInputField";
import EventTypeInputField from "./EventTypeInputField";

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
    onEventCreated: (event: Event) => Event;
    selectedDate: string,
    isOpen: boolean;
}

export const createEventSchema = yup.object().shape({
    eventName: yup.string().required(),
    evemtType: yup.string().required(),
    eventDescription: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    academyReferenceId: yup.string().required(),
})

type CreateEventData = yup.InferType<typeof createEventSchema>;

export default function AddEventModal({onDismiss, onEventCreated, selectedDate, isOpen}: AddEventModalProps) {

    const [errorText, setErrorText] = useState<string|null>();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CreateEventData>({
        resolver: yupResolver(createEventSchema),
    });

    const selectedDateLo = toDateTimeLocal(selectedDate);

    const [eventName, setEventName] = useState<string|undefined>();
    const [startDate, setStartDate] = useState<string|undefined>(selectedDateLo);
    const [endDate, setEndDate] = useState<string|undefined>(selectedDateLo);
    

    async function onSubmit(eventData: CreateEventData) {

        const eventName = eventData.eventName;
        const startDate = eventData.startDate;
        const endDate = eventData.endDate;

        try {
            onEventCreated({
                eventName,
                startDate,
                endDate,
            })
        } catch (error) {
           if (error instanceof UnauthorizedError) {
                setErrorText(error.message.toString());
           } else {
            alert(error);
           }
           console.log(error);
        }
    }
    

    return (
        <div className='bg-black-200 bg-opacity-80 flex justify-center items-start md:items-center lg:items-center xl:items-center w-screen h-screen fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]' data-aria-modal="hidden">
        <div className="w-full max-w-lg fixed z-10">
        <div className={clsx(`${isOpen ? 'animate-fade transform transition-all duration-500 delay-100 ease-in translate-y-10 relative bg-white-500 rounded-lg shadow dark:bg-gray-700' : 'relative bg-white-500 rounded-lg shadow dark:bg-gray-700'}`)}>
            <button type="button" onClick={onDismiss} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8 ">
                <h3 className="mb-4 text-xl font-medium border-b border-stroke pb-3 text-gray-900 dark:text-white">Create event</h3>
                           

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col sm:flex-row gap-1 pr-none md:pr-3 lg:pr-3 xl:pr-3 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">               
                            <EventNameInputField
                                register={register("eventName", {required: true})}
                                error={errors.eventName}
                            />

                            <EventTypeInputField/>

                    </div>

                        <div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                Start date  
                                </label>    
                                <div className="relative">
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(startDate) => setStartDate(startDate.target.value)}
                                    className="custom-input-date custom-input-date-2 pl-12 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <Icon className="pl-2 text-red-500 text-lg opacity-20" icon={faCalendarCheck}/>
                                     </div>
                                </div>


                                <label className="mb-3 mt-3 block text-black dark:text-white">
                                End date  
                                </label>    
                                <div className="relative">
                                <input
                                    type="datetime-local"
                                    value={toDateTimeLocal(selectedDate)}
                                    onChange={(endDate) => setEndDate(toDateTimeLocal(endDate.target.value))}
                                    className="custom-input-date custom-input-date-2 pl-12 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <Icon className="pl-2 text-red-500 text-lg opacity-20" icon={faCalendarCheck}/>
                                     </div>
                                </div>
                            </div>
                        </div>

                    <div>
                <label className="mb-3 block text-black dark:text-white">
                  Event details
                </label>
                <div className="relative">
                    <textarea
                    rows={6}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                    
                </div>
              </div>
                    

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