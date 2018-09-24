import React from "react";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import Loader from "./Loader";

const CommandMine = (props) => {
    return (
        <div>
            <h4>Mine a Block</h4>
            {props.currentlyMining ? (
                <Container>
                    <Row>
                        <Col sm="4">
                            <Loader mine={true} />
                        </Col>
                        <Col sm="8" className="d-flex flex-column justify-content-center">
                            <Alert className="mt-2" color="success">
                                Mining in progress...
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Button color="success" onClick={props.startMining}>
                    Mine!
                </Button>
            )}
            {props.mineStatus ? (
                <Alert className="mt-2 mb-0 p-0" color="success" toggle={props.dismissMineMessage}>
                    <h4 className="alert-heading pt-2 pl-2">{props.mineStatus.message}</h4>
                    <pre className="m-0">
                        {JSON.stringify(
                            {
                                index: props.mineStatus.index,
                                previous_proof: props.mineStatus.previous_proof,
                                proof: props.mineStatus.proof,
                                previous_hash: props.mineStatus.previous_hash,
                                transactions_in_block: props.mineStatus.transactions.length,
                            },
                            null,
                            2
                        )}
                    </pre>
                </Alert>
            ) : null}
        </div>
    );
};

export default CommandMine;
