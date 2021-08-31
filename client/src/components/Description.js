import React from "react";

const Description = (props) => {
  <>
    <h4>
      <a href={props.website}>{props.companyName}</a>
    </h4>
    <p>{props.description}</p>
  </>
};

export default Description;
