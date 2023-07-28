

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import * as AcademyApi from "@/network/api/academys";
import SiteFormInputField from "../form/SiteFormInputField";
import PasswordInputField from "../form/PasswordInputField";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useState } from "react";
import { BadRequestError, ConflictError } from "@/network/http-errors";
import * as yup from "yup";
import { academyLocationSchema, academyNameSchema, academyOwnerSchema, emailSchema, firstNameSchema, lastnameNameSchema, passwordSchema, usernameSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Academy } from "@/models/academy";

import LogoDark from "../../app/images/logo/logo-dark.svg"
import Logo from "../../app/images/logo/logo.svg";
import FirstNameInputField from "../form/memberSignup/FirstNameInputField";
import LastNameInputField from "../form/memberSignup/LastNameInputField";

const validationSchema = yup.object({
  username: usernameSchema.required("Required"),
  email: emailSchema.required("Required"),
  password: passwordSchema.required("Required"),
  academy_name: academyNameSchema.required("Required"),
  academy_location: academyLocationSchema.required("Required"),
  firstname: firstNameSchema.required("Required"),
  lastname: lastnameNameSchema.required("Required"),
})

type SignUpFormData = yup.InferType<typeof validationSchema>;


interface SignUphtmlFormProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpForm({onDismiss, onLoginInsteadClicked}: SignUphtmlFormProps) {

    const { mutateUser } = useAuthenticatedUser();
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpFormData>({
      resolver: yupResolver(validationSchema)
    });

    async function onSubmit(credentials: SignUpFormData) {
        try {
            setErrorText(null);
            const newUser = await UsersApi.signUp(credentials);
            mutateUser(newUser);

            const newUserId = newUser._id;
            
            const newAcademy: Academy = await AcademyApi.createAcademy({
              academy_name: credentials.academy_name,
              academy_location: credentials.academy_location,
              academy_owner: newUserId,
            });
            
            const newAcademyId = newAcademy._id;

            const updateUser = await UsersApi.setAcademyReferenceId({
              userId: newUserId,
              academyReferenceId: newAcademyId
            });

        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError) {
              setErrorText(error.message);
            } else {
              console.error(error);
              alert(error);
            } 
          }
    }
  

  return (
    <div className="rounded-sm  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center bg-cover bg-[url('/uploads/site-pictures/roll3.jpg')]">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
             
        
            </div>
          </div>

          <div className="w-full border-stroke bg-[#f5f5f7] dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Get started with rollplan today
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <SiteFormInputField
                      register={register("academy_name", {required: "Required"})}
                      type="academy_name"
                      label="Academy name"
                      placeholder="10th planet Ju-jitsu, Austin"
                      maxLength={72}

                      bodyClass="mb-4"
                      error={errors.academy_name}
                    />

                  <SiteFormInputField
                      register={register("academy_location", {required: "Required"})}
                      type="academy_location"
                      label="Academy location"
                      placeholder="Austin, texas"
                      maxLength={72}
                      bodyClass="mb-4"
                      error={errors.academy_name}
                    />

                <label htmlFor="billing-address" className="mt-4 mb-2 block font-medium">Account details</label>
                  <div className="flex flex-col sm:flex-row gap-1 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">  
                        
                        <FirstNameInputField
                            register={register("firstname", {required: "Required"})}
                            forType="firstname"
                            label="firstname"
                        />
                        
                        <LastNameInputField
                            register={register("lastname", {required: "Required"})}
                            forType="firstname"
                            label="firstname"
                        />
                        
                    </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>


                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button 
                    type="submit"
                    className="w-full text-white-500 cursor-pointer rounded-lg  bg-red-500 p-4 text-white transition hover:bg-opacity-90"
                  >
                    Create account
                  </button>
              
                </div>

                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}
