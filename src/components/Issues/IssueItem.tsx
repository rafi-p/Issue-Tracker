import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Issue } from '../../interfaces';
import { GoIssueOpened, GoIssueClosed, GoComment} from 'react-icons/go'

export function IssueItem(issue: Issue) {
    return (
        <li>
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
                            <span key={label} className="label red">{label}</span>
                        ))
                    }
                </span>
                <small>
                    #{issue.number} opened {issue.createdDate} by {issue.createdBy}
                </small>
            </div>
            {
                issue.assignee 
                ? <div>{issue.assignee}</div>
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
