import React from "react";
import { Col } from "reactstrap";

const Office = (props) => {

  return (
    <div className="office-container">
      <Col
        className={props.empty ? "office selecoffice-office" : "office"}
        onClick={_ => {
          props.empty
            ? props.selectOffice(props.name, props.id)
            : console.log("Tried to select a full office");
        }}
      >

        <p className="text-center office-name">{props.name}</p>
        <p className="text-center office-name"> {props.empty ? <><i className="far fa-circle"></i> Available</> : <><i className="fas fa-circle"></i> Unavailable</>}</p>
      </Col>
    </div>
  );
};

export default Office;