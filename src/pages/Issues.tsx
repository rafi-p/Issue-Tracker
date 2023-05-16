import React from 'react'
import { IssuesList } from '../components/Issues/IssuesList'
import { LabelList } from "../components/Issues/LabelList"
import { StatusSelect } from '../components/Issues/StatusSelect'

export default function Issues () {
    const [labels, setLabels] = React.useState<string[]>([])
    const [status, setStatus] = React.useState<string>("")

    return (
        <div>
            <main>
                <section>
                    <h1>Issues</h1>
                    <IssuesList 
                        labels={labels}
                        status={status}
                    />
                </section>

                <aside>
                    <LabelList 
                        selected={labels} 
                        toggle={
                            (label) => setLabels(currentLabels =>  currentLabels.includes(label) 
                            ? currentLabels.filter(currentLabel => currentLabel !== label) 
                            : currentLabels.concat(label)
                        )}
                    />
                    <h3>Status</h3>
                    <StatusSelect 
                        value={status}
                        onChange={(e) => {setStatus(e.target.value)}}
                    />
                </aside>
            </main>
        </div>
    )
}


