import { Event } from "@/models/event";
import { UnauthorizedError } from "@/network/http-errors";
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
        <div className='bg-black-200 bg-opacity-80 flex justify-center items-center w-screen h-screen fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]' data-aria-modal="hidden">
        <div className="relative w-full max-w-md max-h-full mt-5 fixed z-10">
        <div className={clsx(`${isOpen ? 'animate-fade transform transition-all duration-500 delay-100 ease-in translate-y-10 relative bg-white-500 rounded-lg shadow dark:bg-gray-700' : 'relative bg-white-500 rounded-lg shadow dark:bg-gray-700'}`)}>
            <button type="button" onClick={onDismiss} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Event
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">


              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Event title
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Default textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Date start
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Date End
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </div>
    </div>   
    );
}