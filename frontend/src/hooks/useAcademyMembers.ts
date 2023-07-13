
import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import * as UsersApi from "../network/api/users";
import * as AcademyApi from "../network/api/academys";
import useSWR from "swr";

export default function useAcademyMembers() {
    const { data, isLoading, error, mutate } = useSWR("members",
        async () => {
            try {
                const authenticatedUser = await UsersApi.getAuthenticatedUser()
                if (!authenticatedUser.academyReferenceId) {
                    console.log("Authentictaed user referende ID == null")
                    return null;
                }
                console.log("The authentictaed user: " + authenticatedUser._id);
                const members = await AcademyApi.getAcademyMembers("64af22e02bd23047f45c8861");
                console.log("Members from SWR: " + JSON.stringify(members));

                return members;

            } catch (error) {
                if(error instanceof NotFoundError){
                    return null;
                }
                if (error instanceof UnauthorizedError) {
                    return null;
                } else {
                    throw error;
                }
            }
        }
    );

    return {
        members: data,
        membersLoading: isLoading,
        membersLoadingError: error,
        mutateMembers: mutate,
    }
}