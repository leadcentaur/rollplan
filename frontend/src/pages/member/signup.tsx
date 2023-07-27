
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { NotFoundError } from "@/network/http-errors";
import * as AcademyApi from "../../network/api/academys";
import { aI } from "@fullcalendar/core/internal-common";
import { Academy } from "@/models/academy";
import { useParams } from "next/navigation";

interface MemberSignPageProps {
    academy: Academy,
}

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
      if (error instanceof NotFoundError) {
        return { notFound: true }
      } else {
        console.log("error!")
        throw error
      }
    }
  }

export default function MemberSignupPage({academy}: MemberSignPageProps) {

    const params = useSearchParams();
    console.log("Signup Params: " + params)

    return (
        <div>
            <h1>Member signup page</h1>
            { academy &&
                <h1>{academy.academy_name}</h1>
            }
        </div>
    )
}