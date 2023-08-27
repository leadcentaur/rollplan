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
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/network/http-errors";
import { Academy } from "@/models/academy";
import SettingsAcademyNameInputField from "@/components/app/form/settings/SettingsAcademyNameInputField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ErrorAlert from "@/components/app/components/ErrorAlert";
import SettingsAcademyPhoneNumberInputField from "@/components/app/form/settings/SettingsAcademyPhoneNumberField";
import SettingsAcademyLocationInputField from "@/components/app/form/settings/SettingsAcademyLocationInputField";
import SettingsAcademyEmailInputField from "@/components/app/form/settings/SettingsAcademyEmailInputField";
import SettingsAcademyOnboardingURLInputField from "@/components/app/form/settings/SettingsAcademyOnboardingURLInputField";
import SettingsAcademyDescriptionInputField from "@/components/app/form/settings/SettingsAcademyDescriptionInputField";
import SettingsAcademyLogoInputField from "@/components/app/form/settings/SettingsAcademyLogoInputField";
import Spinner from "@/components/site/ui/typography/Spinner";
import { ColorRing } from "react-loader-spinner";
import SuccessAlert from "@/components/app/components/SuccessAlert";


interface UserProfilePageProps {
  academy: Academy,
}



export default function Settings() {

    const {academy, academyLoading, academyLoadingError, mutateAcademy} = useUserAcademy();
    const [userAcademy, setUserAcademy] = useState(academy);

    function handleAcademyUpdated(updatedAcademy: Academy) {
      mutateAcademy(updatedAcademy);
      setUserAcademy(updatedAcademy);
    }


    return !academyLoading ? (
      <DefaultLayout>
        { !academyLoading &&
          <UpdateAcademyInfoSection onAcademyUpdated={handleAcademyUpdated} userAcademy={academy}/>
        }
        { academyLoading &&
            <Spinner/>
        }
    </DefaultLayout>
    ) : <Spinner/>
  }

const validationSchema = yup.object({
    academyDescription: yup.string(),
    academy_name: yup.string(),
    academy_location: yup.string(),
    academyEmail: yup.string(),
    academyPhone: yup.string(),
    academyLogo: yup.mixed<FileList>(),
})

type UpdateAcademyInfoSectionData = yup.InferType<typeof validationSchema>;

interface UpdateAcademyInfoSectionProps {
    onAcademyUpdated: (updatedAcademy: Academy) => void,
    userAcademy?: Academy,
}

function UpdateAcademyInfoSection({onAcademyUpdated, userAcademy}: UpdateAcademyInfoSectionProps) {

  
  const academyId = userAcademy?._id;
  
  const [errorText, setErrorText] = useState<string|null>();
  const [successText, setSuccessText] = useState<string|null>();
  const { register, handleSubmit, formState : { isSubmitting, errors } } = useForm<UpdateAcademyInfoSectionData>();

  async function onSubmit({academy_name, academy_location, academyPhone, academyEmail, academyDescription, academyLogo} : UpdateAcademyInfoSectionData) {
    if (!academyId && !academy_name && !academyDescription && !academyEmail && !academy_location && (!academyLogo || academyLogo.length === 0)) return;
    // only if one of these valuees exists we make the api request to update the academy
    try {
      
      const updatedAcademy = await AcademyApi.updateAcademy({academyId, academy_name, academyPhone, academy_location, academyDescription, academyEmail, academyLogo: academyLogo?.item(0) || undefined})
      onAcademyUpdated(updatedAcademy);
      setSuccessText("Academy details have been updated successfully.")
      setErrorText(null);

    } catch (error) {
      if (error instanceof NotFoundError) {
        setErrorText("The academy to be updated could not be found.")
        return { notFound: true }
      } 
      if (error instanceof BadRequestError) {
        setErrorText(error.message);
      }
      else {
        setErrorText("An submission error has occurred. Please ensure your grips are tighther and you're uploading .PNG or JPEG files.")
      }
    }
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Academy Settings

                  {errorText && 
                    <div className="m-5">
                        <ErrorAlert errorText={errorText} errorTextHeading="Submission Error"/>
                    </div>
                  }

                  {successText &&
                      <div className="m-5">
                      <SuccessAlert successText={successText} successTextHeading="Academy Updated Successfully"/>
                  </div>
                  }


                </h3>
              </div>
              <div className="p-7">
                      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <SettingsAcademyNameInputField register={register("academy_name")} academy_name={userAcademy?.academy_name}/>
                          <SettingsAcademyPhoneNumberInputField register={register("academyPhone")} academyPhone={userAcademy?.academyPhone}/>
                      </div>
                        <SettingsAcademyLocationInputField register={register("academy_location")} academy_location={userAcademy?.academy_location}/>
                        <SettingsAcademyEmailInputField register={register("academyEmail")} academyEmail={userAcademy?.academyEmail}/>
                        <SettingsAcademyDescriptionInputField register={register("academyDescription")} academy_description={userAcademy?.academyDescription}/>

                      <div className="flex justify-end gap-4.5">

                        <button
                          className="flex justify-center rounded bg-red-400 py-2 px-6 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                  </div>
                </div>
              </div>
              <SettingsAcademyLogoInputField register={register("academyLogo")} userAcademy={userAcademy}/>
            </div>
          </div>

          </form>
  );
}
  