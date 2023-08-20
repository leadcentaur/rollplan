import * as UsersApi from "@/network/api/users";
import * as EventsApi from "@/network/api/event";

import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";

export default function useAcademyEvents() {
    const { data, isLoading, error, mutate } = useSWR("events",
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
    );

    return {
        academyEvents: data,
        academyEventsLoading: isLoading,
        academyEventsLoadingError: error,
        mutateAcademyEvents: mutate,
    }
}