import React from "react";
import { Row, Col } from "reactstrap";

const Book = (_) => {
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Thank You!</p>
          {/* <i className="fa-sharp fa-solid fa-phone-office thank-you-office"></i> */}
          <p className="thanks-subtext">
            You should receive an email with the details of your reservation.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Book;
