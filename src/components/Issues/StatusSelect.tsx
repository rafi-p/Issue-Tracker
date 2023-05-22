import React, { ChangeEvent } from 'react';

export const possibleStatus = [
    { id: "backlog", label: "Backlog" },
    { id: "todo", label: "To-do" },
    { id: "inProgress", label: "In Progress" },
    { id: "done", label: "Done" },
    { id: "cancelled", label: "Cancelled" },
];

export function StatusSelect({ value, onChange, noEmptyOption = false }: { value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void, noEmptyOption?: boolean }) {
    
    return (
        <select value={value} onChange={onChange} className='status-select'>
            {noEmptyOption ? null : <option value="">Select status to filter</option>}
            {possibleStatus.map((status) => (
                <option key={status.id} value={status.id}>{status.label}</option>
            ))}
        </select>
    );
}
