import { UseQueryResult, useQuery } from "react-query";
import { customFetch } from "./customFetch";
import { Label } from "../interfaces";



export function useLabelsData() {
    const labelsQuery: UseQueryResult<Label[], Error> = useQuery<Label[], Error>(
        ["labels"],
        ({signal}) => customFetch<Label[]>(`/api/labels`, {signal}),
        {
            staleTime: 1000 * 60 * 60
        }
    );

    return labelsQuery
}
