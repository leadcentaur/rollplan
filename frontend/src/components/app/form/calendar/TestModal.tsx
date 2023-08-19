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
import EventDateInputField from "./DateInputField";
import EventDetailsInputField from "./EventDetailsInputField";

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


export const createEventSchema = yup.object().shape({
    eventName: yup.string().required(),
    eventType: yup.string().required(),
    eventDescription: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    academyReferenceId: yup.string().required(),
})

type CreateEventData = yup.InferType<typeof createEventSchema>;

export default function TestModal() {

    return (


<div id="authentication-modal"  aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white-500 rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form className="space-y-6" action="#">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 

    );
}