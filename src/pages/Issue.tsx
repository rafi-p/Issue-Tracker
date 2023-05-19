import React from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { customFetch } from '../helpers/customFetch';
import { Issue as IssueInt, Comment as CommentInt} from '../interfaces'
import { IssueHeader } from '../components/Issue/IssueHeader';
import { Comment } from '../components/Issue/Comment';

function useIssueData (issueNumber: string) {
    return useQuery<IssueInt, Error>(
        ["issues", issueNumber],
        ({signal}) => customFetch<IssueInt>(`/api/issues/${issueNumber}`, {signal})
    )
}

function useIssueComments(issueNumber: string) {
    return useQuery<CommentInt[], Error>(
        ["issue", issueNumber, "comments"],
        ({signal}) => customFetch<CommentInt[]>(`/api/issues/${issueNumber}/comments`, {signal})
    )
}

export default function Issue() {
    const {number = ""} = useParams()
    const issueQuery: UseQueryResult<IssueInt, Error> = useIssueData(number)
    const commentsQuery: UseQueryResult<CommentInt[], Error>= useIssueComments(number)
    return (
        <div className="issue-details">
            {
                issueQuery.isLoading 
                ? <p>Loading issue...</p>
                : <>
                    <IssueHeader {...issueQuery.data!} />

                    <main>
                        <section>
                            {
                                commentsQuery.isLoading
                                ? <p> Loading... </p>
                                : commentsQuery.data!.map(comment => (
                                    <Comment key={comment.id} {...comment}/>
                                ))
                            }
                        </section>
                        <aside></aside>
                    </main>
                </>
            }
        </div>
    );
}


