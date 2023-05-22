import React from 'react';
import { UseInfiniteQueryResult, UseQueryResult, useInfiniteQuery, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { customFetch } from '../helpers/customFetch';
import { Issue as IssueInt, Comment as CommentInt, Label} from '../interfaces'
import { IssueHeader } from '../components/Issue/IssueHeader';
import { Comment } from '../components/Issue/Comment';
import IssueStatus from '../components/Issue/IssueStatus';
import IssueAssignment from '../components/Issue/IssueAssignment';
import IssueLabels from '../components/Issue/IssueLabels';
import useScrollToBottomAction from '../helpers/useScrollToBottomAction';
import Loading from '../components/Loading';

function useIssueData (issueNumber: string) {
    return useQuery<IssueInt, Error>(
        ["issues", issueNumber],
        ({signal}) => customFetch<IssueInt>(`/api/issues/${issueNumber}`, {signal})
    )
}

function useIssueComments(issueNumber: string) {
    return useInfiniteQuery<CommentInt[], Error>(
        ["issue", issueNumber, "comments"],
        ({signal, pageParam = 1}) => customFetch<CommentInt[]>(`/api/issues/${issueNumber}/comments?page=${pageParam}`, {signal}),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage.length === 0) return
                return pages.length + 1
            }
        }
    )
}

export default function Issue() {
    const {number = ""} = useParams()
    const issueQuery: UseQueryResult<IssueInt, Error> = useIssueData(number)
    const commentsQuery: UseInfiniteQueryResult<CommentInt[], Error>= useIssueComments(number)


    useScrollToBottomAction(document, commentsQuery.fetchNextPage, 100)
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
                                : commentsQuery.data?.pages.map(commentPage => commentPage.map((comment) =>
                                    <Comment key={comment.id} {...comment}/>
                                ))
                            }
                            { commentsQuery.isFetchingNextPage && <Loading />}
                        </section>
                        <aside>
                            <IssueStatus
                                status={issueQuery.data?.status!}
                                issueNumber={issueQuery.data?.number.toString()!}
                            />
                            <IssueAssignment 
                                assignee={issueQuery.data?.assignee!}
                                issueNumber={issueQuery.data?.number.toString()!}
                            />
                            <IssueLabels
                                labels={issueQuery.data?.labels!}
                                issueNumber={issueQuery.data?.number.toString()!}
                            />
                        </aside>
                    </main>
                </>
            }
        </div>
    );
}



