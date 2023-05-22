import React from 'react'
import { IssuesList } from '../components/Issues/IssuesList'
import { LabelList } from "../components/Issues/LabelList"
import { StatusSelect } from '../components/Issues/StatusSelect'
import { Link } from 'react-router-dom'

export default function Issues () {
    const [labels, setLabels] = React.useState<string[]>([])
    const [status, setStatus] = React.useState<string>("")
    const [pageNum, setPageNum] = React.useState<number>(1)

    return (
        <div>
            <main>
                <section>
                    <h1>Issues</h1>
                    <IssuesList 
                        labels={labels}
                        status={status}
                        pageNum={pageNum}
                        setPageNum={setPageNum}
                    />
                </section>

                <aside>
                    <LabelList 
                        selected={labels} 
                        toggle={
                            (label) => {
                                    setLabels(currentLabels =>  currentLabels.includes(label) 
                                        ? currentLabels.filter(currentLabel => currentLabel !== label) 
                                        : currentLabels.concat(label)
                                    )
                                setPageNum(1)
                        }}
                    />
                    <h3>Status</h3>
                    <StatusSelect 
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                            setPageNum(1)
                        }}
                    />
                    <hr />
                    <Link className="button" to="/add">
                        Add Issue
                    </Link>
                </aside>
            </main>
        </div>
    )
}


