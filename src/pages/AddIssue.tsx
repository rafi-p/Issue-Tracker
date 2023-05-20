import React, { FormEvent, SyntheticEvent } from 'react';
import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { customFetch } from '../helpers/customFetch';
import { Issue } from '../interfaces';
import { useNavigate } from 'react-router-dom';


export default function AddIssue() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const addIssue: UseMutationResult<Issue, Error, {comment: string, title: string}> = useMutation(
        (issueBody) => customFetch(`/api/issues`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(issueBody)
        }),
        {
            onSuccess: (data) => {

                queryClient.invalidateQueries(["issues"], {exact: true})
                queryClient.setQueryData(["issues", data.number.toString()], data)
                navigate(`/issue/${data.number}`)

            }
        }
    )
    return (
        <div className="add-issue">
            <h2>Add Issue</h2>
            <form
                onSubmit={(e: SyntheticEvent) => {
                    e.preventDefault()
                    if(addIssue.isLoading) return
                    const target = e.target as typeof e.target & {
                        comment: {value: string},
                        title: {value: string}
                    }
                    addIssue.mutate({
                        comment: target.comment.value,
                        title: target.title.value
                    })
                }}
            >
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Title' name='title'/>
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" placeholder='Comment'/>
                <button type='submit' disabled={addIssue.isLoading}>
                    {addIssue.isLoading ? 'Adding Issue...' : 'Add Issue'}
                </button>
            </form>
        </div>
    );
}
