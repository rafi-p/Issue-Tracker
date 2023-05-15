import React from 'react'
import { IssuesList } from '../components/Issues/IssuesList'
import { LabelList } from "../components/Issues/LabelList"
import { Label } from '../interfaces'

export default function Issues () {
    const [labels, setLabels] = React.useState<string[]>([])

    return (
        <div>
            <main>
                <section>
                    <h1>Issues</h1>
                    <IssuesList labels={labels}/>
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
                </aside>
            </main>
        </div>
    )
}

