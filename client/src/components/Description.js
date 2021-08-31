import React from "react";

const Description = (props) => {
    // console.log(props);
  return (
    <>
    <div style={{padding:20}}>
      <h4>
        <a href={props.website}>{props.companyName}</a>
      </h4>
      <p>{props.description}</p>
      </div>
    </>
  );
};

export default Description;
