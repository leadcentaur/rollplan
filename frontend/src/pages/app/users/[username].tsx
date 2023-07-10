
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
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
              <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                  fill="white"
                  />
                  <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                  fill="white"
                  />
                  </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
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
            
    

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 gap-4 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Classes attended</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-md text-black dark:text-white">
    
                </span>
                <span className="text-sm font-semibold text-black dark:text-white">  { loggedInUser?.createdAt &&
                  "Joined, " + utils.toHumanDate(loggedInUser.createdAt)
                } </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  2K
                </span>
                <span className="text-sm">Following</span>
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

  const { register, handleSubmit, formState : { isSubmitting } } = useForm<UpdateUserProfileFormData>();

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
            type="text"
          />

          <FormInputField
            wrapperStyle="w-full sm:w-1/2"
            register={register("lastname")}
            label="Last name"
            placeholder="Doe"
            htmlFor="lastName"
            type="text"
          />
        </div>

          <EmailInputField
            register={register("belt")}
            label="Email"
          />
       
    
        <TextAreaInputField
            register={register("about")}
            placeholder="About"
            label="Bio"
            id="about"
        />

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
  );
}