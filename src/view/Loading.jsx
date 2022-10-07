import React, { useState, useEffect } from 'react';

const Loading = ({ isLoading }) => {
    return (
        <>
            {
                isLoading &&
                <div className='w-100 vh-100 loading'>
                    <div class="spinner-border text-light spinner-icon" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}
export default Loading