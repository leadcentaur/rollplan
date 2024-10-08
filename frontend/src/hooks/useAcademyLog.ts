
import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import * as UsersApi from "../network/api/users";
import * as EventLogApi from "../network/api/log-event";
import useSWR from "swr";

interface LogProps {
    pageNumber: number;
}

export default function useAcademyLog({pageNumber}: LogProps) {
    const { data, isLoading, error, mutate } = useSWR("log",
    async () => {
        try {
            const authenticatedUser = await UsersApi.getAuthenticatedUser()
            if (!authenticatedUser.academyReferenceId) {
                //academy does not have valid reference Id;
                return null;
            }
            return await EventLogApi.getLogEvents(authenticatedUser.academyReferenceId, pageNumber);
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
    })
    return {
        academyLog: data,
        academyLogLoading: isLoading,
        academyLogLoadingError: error,
        mutateLogEvents: mutate,
    }
}