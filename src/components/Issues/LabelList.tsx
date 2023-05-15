import React from 'react';
import { useLabelsData } from '../../helpers/useLabelsData';
import { Label } from '../../interfaces/index'


export function LabelList({selected, toggle}: {selected: string[], toggle: (label: string) => void}) {
    const labelsQuery = useLabelsData();
    return (
        <div className='labels'>
            <h3>Labels</h3>
            {labelsQuery.isLoading
                ? <p>Loading...</p>
                : labelsQuery.isError
                    ? <p>{labelsQuery.error.message}</p>
                    : (
                        <ul>
                            {labelsQuery.data?.map((label) => (
                                <li key={label.id}>
                                    <button onClick={() => toggle(label.id)}  className={`label ${selected.includes(label.id) ? 'selected' : ''} ${label.color}`}>{label.name}</button>
                                </li>
                            ))}
                        </ul>
                    )}
        </div>
    );
}
