import * as UsersApi from "@/network/api/users";
import { UnauthorizedError } from "@/network/http-errors";
import useSWR from "swr";
import { useRouter } from "next/router";


export default function useAuthenticatedUser() {
    const router = useRouter();
    const { data, isLoading, error, mutate } = useSWR("user",
        async () => {
            try {
                return await UsersApi.getAuthenticatedUser();
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    router.push("/login")
                    return null;
                } else {
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