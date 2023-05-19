import { UseQueryResult, useQuery } from "react-query";
import { customFetch } from "./customFetch";
import { User } from "../interfaces";

export function useUserData(userId: string) {
    
        const userData: UseQueryResult<User, Error> = useQuery<User, Error>(
            ["users", userId],
            ({signal}) => customFetch<User>(`/api/users/${userId}`, {signal}),
            {
                enabled: !!userId,
                staleTime: 1000 * 60 * 5
            }
        );
        return userData
}



