import { UseQueryResult, useQuery } from "react-query";
import { customFetch } from "./customFetch";
import { Label } from "../interfaces";
import { defaultLabels } from "./defaultData";

export function useLabelsData() {
    const labelsQuery: UseQueryResult<Label[], Error> = useQuery<Label[], Error>(
        ["labels"],
        ({signal}) => customFetch<Label[]>(`/api/labels`, {signal}),
        {
            staleTime: 1000 * 60 * 60,
            placeholderData: defaultLabels
        }
    );

    return labelsQuery
}
