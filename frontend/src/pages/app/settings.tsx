import Breadcrumb from "@/components/app/components/Breadcrumb";
import MemberList from "@/components/app/components/MembersList";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import academyPlaceholderPic from "@/assets/images/placeholders/academy-pic-placeholder.jpg";
import Image from "next/image";
import React, { useState } from "react";
import useUserAcademy from "@/hooks/useCurrentAcademy";
import AcademyLocationInputField from "@/components/site/form/academySignup/AcademyLocationInputField";
import * as AcademyApi from "../../network/api/academys";
import { GetServerSideProps } from "next";
import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import { Academy } from "@/models/academy";
import SettingsAcademyNameInputField from "@/components/app/form/SettingsAcademyNameInputField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ErrorAlert from "@/components/app/components/ErrorAlert";


interface UserProfilePageProps {
  academy: Academy,
}


export default function Settings() {  

    const {academy: userAcademy, academyLoading, academyLoadingError, mutateAcademy} = useUserAcademy();

    if (academyLoadingError) {
        return (
            <DefaultLayout>
                <Breadcrumb pageName="Settings" />
                <ErrorAlert errorTextHeading="Page Error" errorText="Failed to load academy"/>
            </DefaultLayout>
        );
    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Settings" />
                <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Academy information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        defaultValue="+990 3343 7865"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Location
                    </label>
                    <div className="relative">
                  
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="devidjond45@gmail.com"
                        defaultValue="devidjond45@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="devidjhon24"
                      defaultValue="devidjhon24"
                    />
                  </div>

                  
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Onboarding URL
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="onboarding"
                      id="onboarding"
                      placeholder="devidjhon24"
                      defaultValue={"http://localhost:3000/member/signup?aid=" + userAcademy?._id}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                     

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        placeholder="Write your bio here"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
          
          </div>
        </div>
      </div>
        </DefaultLayout>
    );
  }

const validationSchema = yup.object({
    academyDescription: yup.string(),
    academy_name: yup.string(),
    academy_location: yup.string(),
    academyEmail: yup.string(),
    academyLogo: yup.mixed<FileList>(),
})

type UpdateAcademyInfoSectionData = yup.InferType<typeof validationSchema>;

interface UpdateAcademyInfoSectionProps {
    onAcademyUpdated: (updatedAcademy: Academy) => void,
}

function UpdateAcademyInfoSection({onAcademyUpdated}: UpdateAcademyInfoSectionProps) {

  const { register, handleSubmit, formState : { isSubmitting, errors } } = useForm<UpdateAcademyInfoSectionData>();

  async function onSubmit({academy_name, academy_location, academyEmail, academyDescription, academyLogo} : UpdateAcademyInfoSectionData) {
    if (!academy_name && !academyDescription && !academyEmail && !academy_location && (!academyLogo || academyLogo.length === 0)) return;
    // only if one of these valuees exists we make the api request to update the user
    try {
      
      const updatedAcademy = await AcademyApi.updateAcademy({academy_name, academy_location, academyDescription, academyEmail, academyLogo: academyLogo?.item(0) || undefined})
      onAcademyUpdated(updatedAcademy);


    } catch (error) {
      if (error instanceof NotFoundError) {
        return { notFound: true }
      } else {
      }
    }
  }

  return (
    <div></div>
  );
}
  