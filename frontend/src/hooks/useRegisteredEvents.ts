import * as UsersApi from "@/network/api/users";
import * as EventsApi from "@/network/api/event";

import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";

export default function useRegisteredEvents() {
    const { data, isLoading, error, mutate } = useSWR("registeredEvents",
        async () => {
            try {
                const authenticatedUser = await UsersApi.getAuthenticatedUser()
                if (!authenticatedUser.academyReferenceId) {
                    //registered does not have valid reference Id;
                    return null;
                }
                return await EventsApi.getRegisteredEvents();
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
        registeredEvents: data,
        registeredEventsLoading: isLoading,
        registeredEventsLoadingError: error,
        mutateregisteredEvents: mutate,
    }
}