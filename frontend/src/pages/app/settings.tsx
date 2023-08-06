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
import SettingsAcademyPhoneNumberInputField from "@/components/app/form/SettingsAcademyPhoneNumberField";
import SettingsAcademyLocationInputField from "@/components/app/form/SettingsAcademyLocationInputField";
import SettingsAcademyEmailInputField from "@/components/app/form/SettingsAcademyEmailInputField";
import SettingsAcademyOnboardingURLInputField from "@/components/app/form/SettingsAcademyOnboardingURLInputField";
import SettingsAcademyDescriptionInputField from "@/components/app/form/SettingsAcademyDescriptionInputField";
import SettingsAcademyLogoInputField from "@/components/app/form/SettingsAcademyLogoInputField";


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
                <div className="mx-auto w-full">
        <div className=" gap-8">
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

                    <SettingsAcademyNameInputField/>
                    <SettingsAcademyPhoneNumberInputField/>
                    
                  </div>

                  <SettingsAcademyLocationInputField/>
                  <SettingsAcademyEmailInputField/>
                  <SettingsAcademyOnboardingURLInputField userAcademy={userAcademy}/>
                  <SettingsAcademyDescriptionInputField/>

                  <SettingsAcademyLogoInputField />
                 

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex text-red-500 text-lg opacity-90 justify-center rounded bg-red-500 py-2 px-6 font-medium text-white-500 hover:shadow-1"
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
  