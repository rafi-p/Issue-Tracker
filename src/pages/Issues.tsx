import React from 'react'
import { IssuesList } from '../components/Issues/IssuesList'

export default function Issues () {
    return (
        <div>
            <main>
                <section>
                    <h1>Issues</h1>
                    <IssuesList />
                </section>

                <aside>
                    <h3>LabelList</h3>
                </aside>
            </main>
        </div>
    )
}

