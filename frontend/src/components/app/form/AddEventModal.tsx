import Icon from "@/components/site/ui/iconography/Icon";
import { Event } from "@/models/event";
import { UnauthorizedError } from "@/network/http-errors";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faCalendarStar, faHouse, faSign, faStar, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"


interface AddEventModalProps {
    onDismiss: () => void;
    onEventCreated?: (event: Event) => void;
    isOpen: boolean;
}

export const createEventSchema = yup.object().shape({
    eventName: yup.string().required(),
    eventDescription: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    academyReferenceId: yup.string().required(),
})

type CreateEventData = yup.InferType<typeof createEventSchema>;

export default function AddEventModal({onDismiss, onEventCreated, isOpen}: AddEventModalProps) {
            
    const [errorText, setErrorText] = useState<string|null>();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CreateEventData>({
        resolver: yupResolver(createEventSchema),
    });
    
    async function onSubmit(eventData: CreateEventData) {
        try {
            
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
        <div className='bg-black-200 lg:ml-30 bg-opacity-80 flex justify-center items-center w-screen h-screen fixed z-50 p-4 md:inset-0 h-[calc(100%-1rem)]' data-aria-modal="hidden">
        <div className="relative w-full max-w-full mr-3 lg:max-w-2xl md:max-w-xl max-h-screen mt-5 fixed z-10">
        <div className={clsx(`${isOpen ? 'animate-fade transform transition-all duration-500 delay-100 ease-in translate-y-10 relative bg-white-500 rounded-lg shadow dark:bg-gray-700' : 'relative bg-white-500 rounded-lg shadow dark:bg-gray-700'}`)}>
            <button type="button" onClick={onDismiss} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-2 py-6 lg:px-2">
                <h3 className="text-lg font-medium border-b pb-2 border-stroke text-gray-900 dark:text-white">Create event</h3>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col sm:flex-row gap-1 pr-none md:pr-3 lg:pr-3 xl:pr-3 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">
                <div className="p-3">
                    <label className="mb-3 block text-black dark:text-white">
                    Event title
                    </label>
                    <input
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div className="p-3">
                    <label className="mb-3 block text-black dark:text-white">
                    Event type
                    </label>
                    <input
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>

            

            </form>

            
        </div>
            
        </div>
        </div> 
    );
}