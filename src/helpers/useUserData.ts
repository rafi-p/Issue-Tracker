import { UseQueryResult, useQuery } from "react-query";
import { customFetch } from "./customFetch";
import { User } from "../interfaces";



export function useUserData(userId: string) {
    if(userId) {
        const userData: UseQueryResult<User, Error> = useQuery<User, Error>(
            ["users", userId],
            () => customFetch<User>(`/api/users/${userId}`)
        );
        return userData
    }

    return null
}
