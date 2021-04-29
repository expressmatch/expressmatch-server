import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
        <div className="main-text">
            uh oh!
        </div>
        <div className="not-found-logo">
            <i className="fas fa-question-circle"></i>
        </div>
        <div className="sub-text">
            The page you are looking for does not exist.
        </div>
        <div>
            You might have typed in the wrong address or the page has moved.
        </div>
        <div className="go-home">
            <a href="/">
                <button>Go Back Home</button>
            </a>
        </div>
    </div>
  );
};

export default NotFoundPage;
