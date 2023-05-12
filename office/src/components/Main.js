import React from "react";
import { Row, Col, Button } from "reactstrap";

const Book = props =>{
    return (
        <div>
            <Row noGutters className="g-0 text-center align-item-center office-cta">
                <Col>
                    <p className="looking-for-office">
                        If you are looking for great office.
                    </p>

                    <Button
                        color="none"
                        className="book-office-btn"
                        onClick={ _ => {
                            props.setPage(1);
                        }

                        }
                    >
                        Book a Office Now
                    </Button>
                
                </Col>
            </Row>

            <Row noGutters className="g-0 text-center big-img-container">
                <Col>
                        <img 
                            src={require("../images/office.jpg")}
                            alt="cafe"
                            className="big-img"
                        />
                </Col>
            </Row>
        </div>
    )
}

export default Book;