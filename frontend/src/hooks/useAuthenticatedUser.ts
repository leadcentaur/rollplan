import * as UsersApi from "@/network/api/users";
import { NotFoundError, UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";
import { useRouter } from "next/router";


export default function useAuthenticatedUser() {
    const router = useRouter();
    const { data, isLoading, error, mutate } = useSWR("user",
        async () => {
            try {
                const authenticatedUser = await UsersApi.getAuthenticatedUser();
                return authenticatedUser;
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    return null;
                } 
                if (error instanceof NotFoundError) {
                    return null;
                }
                else {
                    throw error;
                }
            }
        }
    );

    return {
        user: data,
        academy: data?.academyReferenceId,
        userLoading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
    }
}