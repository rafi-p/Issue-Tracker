import React from 'react';
import { useLabelsData } from '../../helpers/useLabelsData';
import { GoGear } from 'react-icons/go';
import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { Issue } from '../../interfaces';
import { customFetch } from '../../helpers/customFetch';



export default function IssueLabels({ labels, issueNumber }: { labels: string[]; issueNumber: string; }) {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const labelsQuery = useLabelsData()

    const queryClient = useQueryClient()
    const setLabels: UseMutationResult<Issue, Error, {labelId: string}> = useMutation(
        ({labelId}) => {
            const newLabels = labels.includes(labelId) ? labels.filter(currentLabel => currentLabel !== labelId) : [...labels, labelId]
            return customFetch(`/api/issues/${issueNumber}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({labels: newLabels})
            }
        )},
        {
            onMutate: ({labelId}) => {
                const prevData = queryClient.getQueryData<Issue>(["issues", issueNumber])
                if(prevData) {
                    const newLabels = prevData.labels.includes(labelId) ? prevData.labels.filter(currentLabel => currentLabel !== labelId) : [...prevData.labels, labelId]
                    queryClient.setQueryData<Issue>(
                        ["issues", issueNumber], 
                        {
                            ...prevData,
                            labels: newLabels
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
                <span>Labels</span>
                {
                    labelsQuery.isLoading 
                    ? null 
                    : labels.map(label => {
                        const labelObject = labelsQuery.data?.find(queryLabel => queryLabel.id === label)
                        if(!labelObject) return null
                        return (
                            <span
                                key={label}
                                className={`label ${labelObject?.color}`}
                            >
                                {labelObject?.name}
                            </span>
                        )
                    })
                }
            </div>
            <GoGear onClick={() => !labelsQuery.isLoading  && setMenuOpen((value) => !value)} />
            {
                menuOpen && (
                    <div className="picker-menu labels">
                        {
                            labelsQuery.data?.map(label => {
                                const selected = labels.includes(label.id)
                                return (
                                    <div 
                                        key={label.id}
                                        className={selected ? 'selected' : ''}
                                        onClick={() => {
                                            setLabels.mutate({labelId: label.id})
                                        }}

                                    >
                                        <span className="label-dot" style={{backgroundColor: label.color}}>
                                        </span>
                                        {label.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}
