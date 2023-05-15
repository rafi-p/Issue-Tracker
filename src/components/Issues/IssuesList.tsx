import React, { FC } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { IssueItem } from './IssueItem';
import { Issue } from '../../interfaces'
import { customFetch } from '../../helpers/customFetch';

export function IssuesList({labels}: {labels: string[]}) {
    const issuesQuery: UseQueryResult<Issue[], Error> = useQuery<Issue[], Error>(
        ["issues", {labels}],
        () => {
            const labelsString = labels.map((label) => `labels[]=${label}`).join("&")
            return customFetch<Issue[]>(`/api/issues?${labelsString}`)
        }
    )

    return (
        <div>
            <h2>Issues List</h2>
            {
                issuesQuery.isLoading || issuesQuery.isIdle
                ? <p>Loading...</p>
                : issuesQuery.isError
                    ? <p>{issuesQuery.error.message}</p>
                    : <ul className='issues-list'>
                        {
                        issuesQuery.data.map((issue) => (
                            <IssueItem key={issue.id} {...issue}/>
                        ))}
                    </ul>
                
            }
        </div>
    );
}
