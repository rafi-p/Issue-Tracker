import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Issue } from '../../interfaces';
import { GoIssueOpened, GoIssueClosed, GoComment} from 'react-icons/go'
import { relativeDate } from '../../helpers/relativeDate';
import { useUserData } from '../../helpers/useUserData';
import { Label } from './Label';
import { useQueryClient } from 'react-query';
import { customFetch } from '../../helpers/customFetch';

export function IssueItem(issue: Issue) {
    const queryClient = useQueryClient()
    const assigneeUser = useUserData(issue.assignee) 
    const createdByUser = useUserData(issue.createdBy)
    return (
        <li
            onMouseEnter={() => {
                queryClient.prefetchQuery(["issues", issue.number.toString()], ({signal}) => customFetch<Issue>(`/api/issues/${issue.number}`, {signal}))
                queryClient.prefetchInfiniteQuery(["issue", issue.number.toString(), "comments"], ({signal}) => customFetch<Comment[]>(`/api/issues/${issue.number}/comments?page=1`, {signal}))
            }}
        >
            <div>
                {
                    issue.status === 'done' || issue.status === 'cancelled' 
                    ? (
                        <GoIssueClosed style={{color: 'red'}} />
                    ) 
                    : (
                        <GoIssueOpened style={{color: 'green'}} />
                    )
                }
            </div>
            <div className="issue-content">
                <span>
                    <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
                    {
                        issue.labels.map(label => (
                            <Label key={label} label={label} />
                        ))
                    }
                </span>
                <small>
                    #{issue.number} opened {relativeDate(issue.createdDate)} {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : null}
                </small>
            </div>
            {
                issue.assignee 
                ? <img src={assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""} className='assigned-to' alt={`Assigned to ${assigneeUser.isSuccess ? assigneeUser.data?.name : 'Avatar'}`}/>
                : null
            }
            <span className="comment-count">
                {
                    issue.comments.length > 0
                    ? <>
                        <GoComment /> {issue.comments.length}
                    </> 
                    : null
                }
            </span>
        </li>
    );
}

