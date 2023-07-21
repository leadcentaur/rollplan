
import Breadcrumb from "@/components/app/components/Breadcrumb";
import DefaultLayout from "@/components/app/layout/DefaultLayout";
import CoverOne from "@/components/app/images/cover/cover-01.png"
import userSix from  "@/components/app/images/user/user-01.png";
import profilePicPlaceHolder from "@/assets/images/profile-pic-placeholder.png"
import Image from "next/image";
import { User } from "@/models/user";
import { GetServerSideProps } from "next";
import * as UsersApi from "@/network/api/users";
import * as AcademyApi from "@/network/api/academys";
import { useState } from "react";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as utils from "@/utils/utils";
import cameraIcon from "@/assets/images/camera-icon.svg"
import * as yup from "yup";
import { Form, useForm } from "react-hook-form";
import Link from "next/link";
import TextAreaInputField from "@/components/app/form/TextAreaInputField";
import ProfilePictureInputField from "@/components/app/form/ProfilePictureInputField";
import LoadingButton from "@/components/app/components/LoadingButton";
import { isSetIterator } from "util/types";
import useUserAcademy from "@/hooks/useCurrentAcademy";
import { Academy } from "@/models/academy";
import FormInputField from "@/components/app/form/FormInputField";
import DropDownInputField from "@/components/app/form/DropDownInputField";
import { ColorRing } from "react-loader-spinner";
import EmailInputField from "@/components/app/form/EmailInputField";
import PhoneNumbertInputField from "@/components/app/form/PhoneNumberInputField";
import { Reem_Kufi } from "next/font/google";
import Icon from "@/components/site/ui/iconography/Icon";
import { faCalendarCircleExclamation, faCalendarClock, faStar, faUniformMartialArts } from "@fortawesome/pro-solid-svg-icons";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import NoGiIcon from "../../../assets/images/NoGi.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({params}) => {
  const username = params?.username?.toString();
  if (!username) throw Error("username missing");

  const user = await UsersApi.getUserByUsername(username);
  console.log(user.academyReferenceId);

  console.log("The username: " + user.username);
  return {
    props: { user }
  }
}

interface UserProfilePageProps {
  user: User,
}

export default function UserProfilePage({user}: UserProfilePageProps) {

  /*
    We put the user in a state because then we can update the page
    even though the page is fetched serverside
  
  */
    const { user: loggedInUser, mutateUser: mutateLoggedInUser, userLoading } = useAuthenticatedUser(); 

    const [profileUser, setProfileUser] = useState(user);
    const profileUserIsLoggedInUser = (loggedInUser && (loggedInUser._id === profileUser._id)) || false;

    function handleUserUpdated(updatedUser: User) {
        mutateLoggedInUser(updatedUser);
        setProfileUser(updatedUser);
    }

    return !userLoading ? (
        <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <Image 
                  src={loggedInUser?.profilePicUrl || profilePicPlaceHolder} 
                  alt="User profile pic :)"
                  className="rounded-full"
                  width={200}
                  height={200}
                  priority
                />
             
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  {loggedInUser?.firstname + ", " + loggedInUser?.lastname}
            </h3>
            <p className="font-sm">

              { loggedInUser?.belt && loggedInUser.numberOfStripes &&
                utils.capitalizeFirstLetter(loggedInUser?.belt) + " Belt " + utils.romanize(loggedInUser.numberOfStripes)
              }

            </p>
            
    
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Gi classes</span>
                <span>
                    <Icon icon={faUniformMartialArts}/>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  129K
                </span>
                <span className="text-sm">No-gi classes</span>
                <span>
                  <NoGiIcon/>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  July 2023
                </span>
                <span className="text-sm">Joined</span>
                <span>
                  <Icon icon={faCalendarClock}/>  
                </span>
              </div>
            </div>
              
      
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                {loggedInUser?.about}
              </p>
            </div>

            <div className="mx-auto max-w-180 mt-5">
                          
            </div>

           <div className="mt-6.5">
              <UpdateUserProfileSection onUserUpdated={handleUserUpdated}/>
           </div>
          </div>
          
        </div>
        
      </div>
    </DefaultLayout>
    ) : <ColorRing wrapperClass="h-screen m-auto" colors={['#e15b64','#e15b64','#e15b64','#e15b64','#e15b64']}/>
}

const validationSchema = yup.object({
    about: yup.string(),
    firstname: yup.string(),
    belt: yup.string(),
    lastname: yup.string(),
    profilePic: yup.mixed<FileList>(),
})

type UpdateUserProfileFormData = yup.InferType<typeof validationSchema>;

interface UpdateUserProfileSectionProps {
    onUserUpdated: (updatedUser: User) => void,
}

function UpdateUserProfileSection({onUserUpdated}: UpdateUserProfileSectionProps) {

  const { register, handleSubmit, formState : { isSubmitting, errors } } = useForm<UpdateUserProfileFormData>();

  async function onSubmit({about, profilePic, firstname, lastname} : UpdateUserProfileFormData) {
    if (!about && !firstname && !lastname && (!profilePic || profilePic.length === 0)) return;
    // only if one of these valuees exists we make the api request to update the user
    try {
      
      const updatedUser = await UsersApi.updateUser({firstname, lastname, about, profilePic: profilePic?.item(0) || undefined})
      onUserUpdated(updatedUser);

    } catch (error) {
      
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default w-3/4 m-auto dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        Personal Information
      </h3>
    </div>
    <div className="p-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <FormInputField
            wrapperStyle="w-full sm:w-1/2"
            register={register("firstname")}
            label="First name"
            placeholder="John"
            htmlFor="firstName"
            error={errors.firstname}
            type="text"
          />
          <div>
            {errors.firstname?.message?.toString()}
          </div>

          <FormInputField
            wrapperStyle="w-full sm:w-1/2"
            register={register("lastname")}
            label="Last name"
            placeholder="Doe"
            htmlFor="lastName"
            error={errors.lastname}
            type="text"
          />
        </div>


        <EmailInputField
          register={register("belt")}
          error={errors.belt}
          disabled
          label="Belt"
        />
           
        <TextAreaInputField
            register={register("about")}
            placeholder="About"
            error={errors.about}
            label="Bio"
            id="about"
        />

        <ProfilePictureInputField
          register={register("profilePic")}
          placeholder="Upload"
          error={errors.profilePic}
          label="Profile pic"
          id="Profile pic"
        />
  
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Cancel
          </button>
          <button
            className="flex justify-center rounded bg-red-400 py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}