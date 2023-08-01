
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { BadRequestError, ConflictError, NotFoundError, TooManyRequestsError } from "@/network/http-errors";
import * as AcademyApi from "../../network/api/academys";
import { Academy } from "@/models/academy";
import { useParams } from "next/navigation";
import Link from "next/link";
import FormInputField from "@/components/app/form/AppFormInputField";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import FirstNameInputField from "@/components/site/form/memberSignup/FirstNameInputField";
import { emailSchema, firstNameSchema, lastnameNameSchema, passwordSchema, requiredStringSchema, usernameSchema } from "@/utils/validation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LastNameInputField from "@/components/site/form/memberSignup/LastNameInputField";
import EmailInputField from "@/components/site/form/memberSignup/EmailInputField";
import BJJLogo from "../../components/app/images/logo/bjj_logo.jpg"
import BJJCork from "../../assets/images/placeholders/profile-pic-placeholder.png"
import UsernameInputField from "@/components/site/form/memberSignup/UsernameInputField";
import VerificationCodeInputField from "@/components/site/form/memberSignup/VerificationCodeInputField";
import { useRouter } from "next/router";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useState } from "react";
import * as UsersApi from "@/network/api/users";
import useCountdown from "@/hooks/useCountdown";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import ErrorAlert from "@/components/app/components/ErrorAlert";
import WarningAlert from "@/components/app/components/WarningAlert";
import Spinner from "@/components/site/ui/typography/Spinner";
import PasswordInputField from "@/components/site/form/PasswordInputField";
import GoogleSignButton from "@/components/site/auth/GoogleSignInButton";

interface MemberSignPageProps {
    academy: Academy,
}

const validationSchema = yup.object({
  username: usernameSchema.required("Required"),
  email: emailSchema.required("Required"),
  password: passwordSchema.required("Required"),
  firstname: firstNameSchema.required("Required"),
  lastname: lastnameNameSchema.required("Required"),
  verificationCode: requiredStringSchema,
})

type MemberSignUpFormData = yup.InferType<typeof validationSchema>;


export const getServerSideProps: GetServerSideProps<MemberSignPageProps> = async ({query}) => {

    try {

        const aid = query?.aid?.toString();
        if (!aid) {
            return { notFound: true }
        }

        const academy = await AcademyApi.getAcademyByID(aid!);
        console.log("The academy: " + academy);
        return {
            props: { academy }
        }
        
    } catch (error) {
      return { notFound: true }
    }
  }

export default function MemberSignupPage({academy}: MemberSignPageProps) {

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

    const { register, handleSubmit, getValues, trigger, formState: {errors, isSubmitting} } = useForm<MemberSignUpFormData>({
        resolver: yupResolver(validationSchema)
     });

     async function onSubmit(credentials: MemberSignUpFormData) {
        
      try {
          setErrorText(null);
          setIsProcessing(true);
          setShowVerificationCodeSentText(false);
          
          if (passwordCompare != passwordOriginal) {
            setPasswordsmatch(false);
            throw Error(
              "Passwords do not match!"
            )
          } else {
            setPasswordsmatch(true);
          }
        
          const validateEmail = credentials.email;
          const validateUsername = credentials.username;

          const memberValidation = await UsersApi.memberValidator({
                email: validateEmail, 
                username: validateUsername,
          });

          if (memberValidation) {

              const credentialsObject: UsersApi.SignUpValues = {
                    email: credentials.email,
                    password: credentials.password,
                    username: credentials.username,
                    firstname: credentials.firstname,
                    lastname: credentials.lastname,
                    verificationCode: credentials.verificationCode,
                    userType: "member",
                    numberOfStripes: "1",
                    belt:"white",
              }
  
              const newUser = await UsersApi.signUp(credentialsObject);
              
              if (!newUser) {
                throw Error(
                  "Failed to create user."
                )
              } else {
                mutateUser(newUser);
              }

              const memberAcademyId = academy._id;
              const updateUser = await UsersApi.setAcademyReferenceId({
                userId: newUser._id,
                academyReferenceId: memberAcademyId,
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
              <div className="flex flex row">
                <div className="flex-none">
                  <Image src={BJJLogo} alt="bjj" height={110} width={110} className="mr-3 rounded-full border border-stroke"/>
                </div>
                <div className="ml-3">
                <span className="mb-1.5 block font-medium mt-4 ">Member signup</span>
                      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        {"Join " + " " + academy.academy_name}
                      </h2>
                </div>
              </div>
              

              <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="billing-address" className="mt-4 mb-2 block font-medium">Account details</label>
                <div className="flex flex-col sm:flex-row gap-1 md:gap-3 lg:gap-3 xl:gap-3 flex-shrink-0 ">  
                        <FirstNameInputField
                            register={register("firstname", {required: "Required"})}
                            forType="firstname"
                            label="firstname"
                            error={errors.firstname}
                        />  
                        <LastNameInputField
                            register={register("lastname", {required: "Required"})}
                            forType="lastname"
                            label="lastname"
                            error={errors.lastname}
                        />
                </div>

                    <UsernameInputField
                      register={register("username", {required: "Required"})}
                      error={errors.lastname}
                    />
                    <EmailInputField
                        register={register("email", {required: "Required"})}
                        error={errors.email}
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

                <GoogleSignButton/>

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
    )
}