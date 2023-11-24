
import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import * as UsersApi from "../network/api/users";
import * as EventLogApi from "../network/api/event-log";
import useSWR from "swr";

export default function useEventLog() {
    const { data, isLoading, error, mutate } = useSWR("logevents",
    async () => {
        try {
            const authenticatedUser = await UsersApi.getAuthenticatedUser()
            if (!authenticatedUser.academyReferenceId) {
                //academy does not have valid reference Id;
                return null;
            }
            return await EventsApi.getAcademyEventsById(authenticatedUser.academyReferenceId!)
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
}