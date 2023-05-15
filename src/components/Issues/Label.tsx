import React from 'react';
import { useLabelsData } from '../../helpers/useLabelsData';

export function Label({ label }: { label: string; }) {
    const labelsQuery = useLabelsData();
    if (labelsQuery.isLoading || labelsQuery.isIdle)
        return null;
    if(labelsQuery.isError) ( <p>{labelsQuery.error.message}</p>)
    const labelObj = labelsQuery.data && labelsQuery.data.find(queryLabel => queryLabel.id === label);
    if (!labelObj)
        return null;
    return (
        <span className={`label ${labelObj.color}`}>
            {labelObj.name}
        </span>
    );
}


