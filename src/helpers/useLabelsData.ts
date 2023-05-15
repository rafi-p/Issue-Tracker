import { UseQueryResult, useQuery } from "react-query";
import { customFetch } from "./customFetch";
import { Label } from "../interfaces";



export function useLabelsData() {
    const labelsQuery: UseQueryResult<Label[], Error> = useQuery<Label[], Error>(
        ["labels"],
        () => customFetch<Label[]>(`/api/labels`)
    );

    return labelsQuery
}
