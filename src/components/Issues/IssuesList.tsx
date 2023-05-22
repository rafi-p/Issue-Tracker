import React, { ChangeEvent, ChangeEventHandler, Dispatch, FC, FormEvent, SetStateAction, SyntheticEvent } from 'react';
import { UseQueryResult, useQuery, useQueryClient } from 'react-query';
import { IssueItem } from './IssueItem';
import { Issue, SearchIssue } from '../../interfaces'
import { customFetch } from '../../helpers/customFetch';
import {default as LoadingSpinner} from '../Loading';

export function IssuesList({labels, status, pageNum, setPageNum}: {labels: string[], status: string, pageNum: number, setPageNum: Dispatch<SetStateAction<number>>}) {
    const queryClient = useQueryClient()
    const issuesQuery: UseQueryResult<Issue[], Error> = useQuery<Issue[], Error>(
        ["issues", {labels, status, pageNum}],
        async ({signal}) => {
            const labelsString = labels.map((label) => `labels[]=${label}`).join("&")
            const statusString = status ? `&status=${status}` : ""
            const pageNumString = pageNum ? `&page=${pageNum}` : ""
            const res = await customFetch<Issue[]>(`/api/issues?${labelsString}${statusString}${pageNumString}`, {signal})

            res.forEach(issue => {
                queryClient.setQueryData(["issues", issue.number.toString()], issue)
            })

            return res
        },
        {
            keepPreviousData: true
        }
    )


    const [searchValue, setSearchValue] = React.useState("")

    const searchQuery: UseQueryResult<SearchIssue, Error> = useQuery<SearchIssue, Error>(
        ["issues", "search", searchValue],
        ({signal}) => {
            return customFetch<SearchIssue>(`/api/search/issues?q=${searchValue}`, {signal})
        },
        {
            enabled: searchValue.length > 0
        }
    )

    return (
        <div>
            <form 
                onSubmit={(event: SyntheticEvent) => {
                    event.preventDefault()
                    const target = event.target as typeof event.target & {
                        search: {value: string}
                    }
                    setSearchValue(target.search.value)
                }}
            >
                <label htmlFor="search">Search Issues</label>
                <input 
                    type="search" 
                    placeholder='Search' 
                    name='search' 
                    id='search' 
                    onChange={(event:ChangeEvent<HTMLInputElement>) => {
                        if(event.target.value.length === 0) {
                            setSearchValue('')
                        }
                    }}
                />
            </form>
            <h2>Issue List {issuesQuery.isFetching ? <LoadingSpinner /> : null}</h2>
            {
                issuesQuery.isLoading || issuesQuery.isIdle
                ? <p>Loading...</p>
                : issuesQuery.isError
                    ? <p>{issuesQuery.error.message}</p>
                    : !searchQuery.isLoading && searchQuery.isIdle
                        ? (
                            <>
                                <ul className='issues-list'>
                                    {
                                    issuesQuery.data.map((issue) => (
                                        <IssueItem key={issue.id} {...issue}/>
                                    ))}
                                </ul>
                                <div className="pagination">
                                    <button
                                        onClick={() => {
                                            if(pageNum - 1 > 0) {
                                                setPageNum(value => value - 1)
                                            } 
                                        }}
                                        disabled={pageNum === 1}
                                    >
                                        Previous
                                    </button>
                                    <p>Page {pageNum}{issuesQuery.isFetching ? '...' : ''}</p>
                                    <button
                                        onClick={() => {
                                            if(issuesQuery.data.length !== 0 && !issuesQuery.isPreviousData) {
                                                setPageNum(value => value + 1)
                                            } 
                                        }}
                                        disabled={issuesQuery.data.length === 0 || issuesQuery.isPreviousData}

                                    >
                                        next
                                    </button>
                                </div>
                            </>
                        )
                        :  <>
                            <h2>Search Results</h2>
                            {
                                searchQuery.isLoading || searchQuery.isIdle
                                ? <p>Loading Search...</p>
                                : searchQuery.isError
                                    ? <p>{searchQuery.error.message}</p>
                                    : <>
                                        <p>{searchQuery.data.count} Results</p>
                                        <ul className='issues-list'>
                                            {
                                            searchQuery.data.items.map((search) => (
                                                <IssueItem key={search.id} {...search}/>
                                            ))}
                                        </ul>
                                    </>
                            }
                        </>
                
            }
        </div>
    );
}
