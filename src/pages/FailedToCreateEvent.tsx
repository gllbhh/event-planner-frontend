import React from "react";

const FailedToCreateEvent = () => {
    return (  
    <div className="text-center mt-5">
    <h2>Event Creation Failed</h2>
    <p>Sorry, we couldn't create your event. Please try again later.</p>
    <a href="/create" className="btn btn-primary mt-3">Try Again</a>
  </div>
  );
};
  
  export default FailedToCreateEvent;