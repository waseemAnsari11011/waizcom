import React from 'react';

const LineItem = ({ category, description, highlightText, color, isShown }) => {
    const iconStyle = {
        height: '20px',
        width: '20px',
        display: 'inline-block',
        marginRight: '10px'
    };

   

    // Split the description into parts, before, highlight, and after the highlight text
    const [beforeHighlight, afterHighlight] = description.split(highlightText);

    return (
        <div className='flex flex-col mb-10'>
            <div className='flex items-center'>
                {isShown && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" style={iconStyle}>
                        <path d="M0 11l2-2 5 5L17 3l2 2L7 21z"/>
                    </svg>
                )}
                <p className='font-bold'>{category}</p>
            </div>

            <p className='mt-2 text-sm'>
                {beforeHighlight}
                <span className="gradient-text">
                    {highlightText}
                </span>
                {afterHighlight}
            </p>
        </div>
    );
};

export default LineItem;
