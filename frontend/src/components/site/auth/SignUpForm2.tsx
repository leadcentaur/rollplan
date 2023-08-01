

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/users";
import * as AcademyApi from "@/network/api/academys";
import SiteFormInputField from "../form/SiteFormInputField";
import PasswordInputField from "../form/PasswordInputField";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import React, { useState } from "react";
import { BadRequestError, ConflictError, TooManyRequestsError } from "@/network/http-errors";
import * as yup from "yup";
import { academyLocationSchema, academyNameSchema, academyOwnerSchema, emailSchema, firstNameSchema, lastnameNameSchema, passwordSchema, requiredStringSchema, usernameSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Academy } from "@/models/academy";

import LogoDark from "../../app/images/logo/logo-dark.svg"
import Logo from "../../app/images/logo/logo.svg";
import FirstNameInputField from "../form/memberSignup/FirstNameInputField";
import LastNameInputField from "../form/memberSignup/LastNameInputField";
import EmailInputField from "../form/memberSignup/EmailInputField";
import UsernameInputField from "../form/memberSignup/UsernameInputField";
import AcademyLocationInputField from "../form/academySignup/AcademyLocationInputField";
import AcademyNameInputField from "../form/academySignup/AcademyNameInputField";
import Icon from "../ui/iconography/Icon";
import { faBadgeCheck, faClipboard, faCode, faKey } from "@fortawesome/pro-solid-svg-icons";
import ErrorAlert from "@/components/app/components/ErrorAlert";
import Spinner from "../ui/typography/Spinner";
import { useRouter } from "next/router";
import { constrainPoint } from "@fullcalendar/core/internal";
import WarningAlert from "@/components/app/components/WarningAlert";
import FormInputField from "../form/SiteFormInputField";
import VerificationCodeInputField from "../form/memberSignup/VerificationCodeInputField";
import useCountdown from "@/hooks/useCountdown";

const validationSchema = yup.object({
  username: usernameSchema.required("Required"),
  email: emailSchema.required("Required"),
  password: passwordSchema.required("Required"),
  academy_name: academyNameSchema.required("Required"),
  academy_location: academyLocationSchema.required("Required"),
  firstname: firstNameSchema.required("Required"),
  lastname: lastnameNameSchema.required("Required"),
  verificationCode: requiredStringSchema,
})

type SignUpFormData = yup.InferType<typeof validationSchema>;


interface SignUphtmlFormProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpForm({onDismiss, onLoginInsteadClicked}: SignUphtmlFormProps) {

    const router = useRouter();
    const { mutateUser } = useAuthenticatedUser();
    const [errorText, setErrorText] = useState<string | null>(null);

    const [verificationCodeRequestPending, setVerificationCodeRequestPending] = useState(false);
    const [showVerificationCodeSentText, setShowVerificationCodeSentText] = useState(false);
    const { secondsLeft: verificationCodeCooldownSecondsLeft, start: startVerificationCodeCooldown } = useCountdown();

    const [passwordOriginal, setPasswordOriginal] = useState<string|null>(null);
    const [passwordCompare, setPasswordCompare] = useState<string|null>(null);
    const [passwordsMatch, setPasswordsmatch] = useState<boolean>();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { register, handleSubmit, getValues, trigger, formState: {errors, isSubmitting} } = useForm<SignUpFormData>({
      resolver: yupResolver(validationSchema)
    });

    async function onSubmit(credentials: SignUpFormData) {
        
        try {
            setErrorText(null);
            setIsProcessing(true);
            setShowVerificationCodeSentText(false);
            
            console.log("password original: " + passwordOriginal);
            console.log("password compare: " + passwordCompare);


            if (passwordCompare != passwordOriginal) {
              setPasswordsmatch(false);
              throw Error(
                "Passwords do not match!"
              )
            } else {
              console.log("Passwords match!")
              setPasswordsmatch(true);
            }
          
            const validateEmail = credentials.email;
            const validateUsername = credentials.username;
            const validateAcademyname = credentials.academy_name;

            const customerValidation = await UsersApi.customerValidator({
                  email: validateEmail, 
                  username: validateUsername,
                  academy_name: validateAcademyname
            });
            if (customerValidation) {

                const username = credentials.username;
                const email = credentials.email;
                const password = credentials.password;
                const firstname = credentials.firstname;
                const lastname = credentials.lastname;

                const numberOfStripes = "1"
                const userType = "owner";
                const belt = "black";
           

                const newUser = await UsersApi.signUp(credentials);
                
                if (!newUser) {
                  console.log("Failed to create user.")
                } else {
                  console.log("User created successfully.");
                  mutateUser(newUser);
                }

                console.log("Academy name: " + credentials.academy_name);
                console.log("Academy location: " + credentials.academy_location)
                console.log("Academy owner: " + newUser._id);
                
                const newAcademy = await AcademyApi.createAcademy({
                  academy_name: credentials.academy_name,
                  academy_location: credentials.academy_location,
                  academy_owner: newUser._id,
                })

                if (!newAcademy) { 
                  console.log("Failed to create new academy")
                } else {
                  console.log("Academy created successfully.");
                }
                
                const newAcademyId = newAcademy._id;
                const updateUser = await UsersApi.setAcademyReferenceId({
                  userId: newUser._id,
                  academyReferenceId: newAcademyId
                });

                router.push("/app")
            
            } else {
              console.log("We hit this section")
              throw Error(
                "An unkown error has occured"
              )
            }
        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError) {
              setErrorText(error.message);
            }
            if (error instanceof TooManyRequestsError) {
              setErrorText("You are trying to often please try again leter");
            } else {
              if (passwordCompare != passwordOriginal) {
                setErrorText("Passwords do not match")
              } else {
                console.log("ERROR: " + error);
                setErrorText("An unkown error has occurred.");
              }
            }
          } finally {
            setIsProcessing(false);
          }

    }

    
    async function requestVerificationCode() {
      const validEmailInput = trigger("email");
      if (!validEmailInput) return;
      const emailInput = getValues("email");
      setErrorText(null);
      setShowVerificationCodeSentText(false);
      setVerificationCodeRequestPending(true);

      try {
        await UsersApi.requestEmailVerificationCode(emailInput);
        setShowVerificationCodeSentText(true);
        startVerificationCodeCooldown(60);

      } catch (error) {
        if (error instanceof ConflictError) {
          setErrorText(error.message);
        } else {
          console.error(error);
          alert(error);
        } 
      } finally {
        setVerificationCodeRequestPending(false);
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

                  <AcademyNameInputField
                    register={register("academy_name", {required: "Required"})}
                    error={errors.academy_name}
                    maxLength={72}
                  />

                  <AcademyLocationInputField
                    register={register("academy_location", {required: "Required"})}
                    error={errors.academy_location}
                    maxLength={100}
                  />

                <label htmlFor="billing-address" className="mt-4 mb-2 block font-medium">
                  Account details
          
                  </label>
                  <div className="flex flex-col sm:flex-row gap-1 pr-none md:pr-3 lg:pr-3 xl:pr-3 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">               
                        <FirstNameInputField
                            register={register("firstname", {required: "Required"})}
                            forType="firstname"
                            label="firstname"
                            error={errors.firstname}
                            maxLength={100}
                        />        
                        <LastNameInputField
                            register={register("lastname", {required: "Required"})}
                            forType="firstname"
                            label="firstname"
                            error={errors.lastname}
                            maxLength={72}
                        />          
                    </div>

                <EmailInputField
                  register={register("email", {required: "Required"})}
                  error={errors.email}
                />

                <UsernameInputField
                  register={register("username", {required: "Required"})}
                  error={errors.username}
                />

                <PasswordInputField
                  register={register("password", {required: "Required"})}
                  placeholder="Please enter your password"
                  passwordCompare={(originalpassword: string) => setPasswordOriginal(originalpassword)}
                  error={errors.password}
                />

                
                <PasswordInputField
                  placeholder="Please re-enter your password"
                  label="Re-type password"
                  onChange={(passwordcompare: React.ChangeEvent<HTMLInputElement>) => setPasswordCompare(passwordcompare.target.value)}
                />

            <VerificationCodeInputField
              register={register("verificationCode")}
              placeholder="Verification code"
              handleSendClick={requestVerificationCode}
              verificationCodeRequestPending={verificationCodeRequestPending || verificationCodeCooldownSecondsLeft > 0}
              secondsLeft={verificationCodeCooldownSecondsLeft}
              label="Verification code"
              bodyClass="mb-4"
              icon={faBadgeCheck}
            />

                { errorText &&
                  <ErrorAlert errorText={errorText}/>
                }

                { showVerificationCodeSentText &&
                  <WarningAlert warningText="We sent you a verification code. Please check your inbox."/>
                }

                <div className="mb-5">
                    { isProcessing ? (
                      <Spinner/>
                    ) : (
                      <button 
                        type="submit"
                        className="w-full text-white-500 cursor-pointer rounded-lg  bg-red-500 p-4 text-white transition hover:bg-opacity-90"
                        >
                        Create account
                      </button>
                    )}
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
