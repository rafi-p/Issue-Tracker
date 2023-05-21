import React, { ChangeEvent } from 'react';
import { StatusSelect } from '../Issues/StatusSelect';
import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { customFetch } from '../../helpers/customFetch';
import { Issue } from '../../interfaces';

export default function IssueStatus({ status, issueNumber }: { status: string; issueNumber: string; }) {
    const queryClient = useQueryClient()
    const setStatus: UseMutationResult<Issue, Error, {status: string}> = useMutation(
        ({status}) => customFetch(`/api/issues/${issueNumber}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({status})
        }),
        {
            onMutate: ({status}) => {
                const prevData = queryClient.getQueryData<Issue>(["issues", issueNumber])
                if(prevData) {
                    queryClient.setQueryData<Issue>(
                        ["issues", issueNumber], 
                        {
                            ...prevData,
                            status
                        }
                    )
                }

                return function rollback () {
                    queryClient.setQueryData<Issue>(["issues", issueNumber], prevData!)
                }
            },
            onError: (error, variables, rollback) => {
                rollback && rollback()
            },
            onSettled: () => {
                queryClient.invalidateQueries<Issue>(["issues", issueNumber], {exact: true})
            }
        }
    )
    return (
        <div className="issue-options">
            <div>
                <span>
                    Status
                </span>
                <StatusSelect
                    value={status}
                    onChange={(e) => {
                        const target = e.target as typeof e.target & {value: string}
                        setStatus.mutate({status: target.value})
                    }}
                    noEmptyOption 
                />
            </div>
        </div>
    );
}
