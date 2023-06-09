
export interface Issue {
    assignee: string;
    comments: string[];
    completedDate: string | null;
    createdBy: string;
    createdDate: string;
    dueDate: string;
    id: string;
    labels: string[];
    number: number;
    status: string;
    title: string;
}

export interface User {
    id: string
    name: string
    profilePictureUrl: string
}

export interface SearchIssue {
    count: number,
    items: Issue[]
}

export interface Label {
    color: string
    id: string
    name: string
}
export interface Comment {
    id: string
    comment: string
    createdBy: string
    createdDate: string
}

