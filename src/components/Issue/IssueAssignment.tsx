import React from 'react';
import { useUserData } from '../../helpers/useUserData';
import { GoGear } from 'react-icons/go';
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { customFetch } from '../../helpers/customFetch';
import { Issue, User } from '../../interfaces';


export default function IssueAssignment({assignee, issueNumber}: {assignee: string, issueNumber: string}) {
    const  [menuOpen, setMenuOpen] = React.useState(false)
    const user = useUserData(assignee)
    const usersQuery: UseQueryResult<User[], Error> = useQuery<User[], Error>(
        ["users"],
        () => customFetch<User[]>(`/api/users`)
    )

    const queryClient = useQueryClient()
    const setAssignee: UseMutationResult<User, Error, {assignee: string}> = useMutation(
        ({assignee}) => customFetch(`/api/issues/${issueNumber}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({assignee})
        }),
        {
            onMutate: ({assignee}) => {
                const prevData = queryClient.getQueryData<Issue>(["issues", issueNumber])
                if(prevData) {
                    queryClient.setQueryData<Issue>(
                        ["issues", issueNumber], 
                        {
                            ...prevData,
                            assignee
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
                <span>Assignment</span>
                {
                    user.isSuccess && (
                        <div>
                            <img src={user.data.profilePictureUrl}/>
                            {user.data.name}
                        </div>
                    )
                }
            </div>
            <GoGear 
                onClick={() => {!usersQuery.isLoading && setMenuOpen((value) => !value)}}
            />
            {
                menuOpen && (
                    <div className="picker-menu">
                        {
                            usersQuery.data!.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => {
                                        setAssignee.mutate({assignee: user.id})
                                    }}
                                >
                                    <img src={user.profilePictureUrl}/>
                                    {user.name}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
