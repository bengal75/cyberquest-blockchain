import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Loader from "./Loader";

const ChainPanel = (props) => {
    return (
        <Col id="chain-display" sm="7" className="column-height py-3">
            <Container fluid>
                <Row>
                    <Col sm="12" className="px-1 column-chrome">
                        <h3>Chain</h3>
                    </Col>
                </Row>
                <Row>
                    <Col id="chain-pre" sm="12" className="panel-height column-overflow px-0 well well-success">
                        <pre className="my-0">{JSON.stringify(props.chain, null, 2)}</pre>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="py-3 px-0 column-chrome">
                        {props.loading ? (
                            <Loader />
                        ) : (
                            <Button color="success" onClick={props.reload}>
                                Update the chain
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </Col>
    );
};

export default ChainPanel;
