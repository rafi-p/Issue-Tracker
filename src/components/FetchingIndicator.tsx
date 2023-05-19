import React from 'react';
import { useIsFetching } from 'react-query';
import { default as LoadingSpinner } from './Loading';

export default function FetchingIndicator() {
    const isFetching = useIsFetching();
    if (!isFetching)
        return null;
    return (
        <div className="fetching-indicator">
            <LoadingSpinner />
        </div>
    );
}
