import React from "react";

const Description = (props) => {
    // console.log(props);
  return (
    <>
      <h4>
        <a href={props.website}>{props.companyName}</a>
      </h4>
      <p>{props.description}</p>
    </>
  );
};

export default Description;
