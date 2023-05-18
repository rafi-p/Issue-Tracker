import React from 'react';
import { Issue as IssueInt } from '../../interfaces';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { possibleStatus } from '../Issues/StatusSelect';
import { useUserData } from '../../helpers/useUserData';
import { relativeDate } from '../../helpers/relativeDate';

export function IssueHeader({ title, number, status = "todo", createdBy, createdDate, comments }: IssueInt) {
    const statusObject = possibleStatus.find((pstatus) => pstatus.id === status);

    const createdUser = useUserData(createdBy);
    return (
        <header>
            <h2>{title} <span>#{number}</span></h2>
            <div>
                <span className={status === "done" || status === "canceled" ? "closed" : "open"}>
                    {status === 'done' || status === 'cancelled'
                        ? (
                            <GoIssueClosed />
                        )
                        : (
                            <GoIssueOpened />
                        )}
                    {statusObject?.label}
                </span>
                <span className='created-by'>
                    {createdUser.isLoading ? "..." : createdUser.data?.name}
                </span>{" "}
                opened this issue {relativeDate(createdDate)} · {comments.length}{" "}comments
            </div>
        </header>
    );
}
