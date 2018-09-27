import React from "react";
import { Container, Row, Col } from "reactstrap";
import sha256 from "../util/sha256";

class VerificationFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyPreviousProof: "",
            verifyProof: "",
            verifyPreviousHash: "",
            verifyProofHash: "",
        };
    }

    promiseState = async (state) => new Promise((resolve) => this.setState(state, resolve));

    handleVerifyChange = () => {
        Promise.all([
            this.promiseState({ verifyPreviousProof: document.getElementById("verifyPreviousProof").value }),
            this.promiseState({ verifyProof: document.getElementById("verifyProof").value }),
            this.promiseState({ verifyPreviousHash: document.getElementById("verifyPreviousHash").value }),
        ]).then(() => {
            const verifyProofHash = sha256(
                this.state.verifyPreviousProof + this.state.verifyProof + this.state.verifyPreviousHash
            );
            this.setState({ verifyProofHash });
        });
    };

    render() {
        return (
            <div className="footer p-0 bg-dark text-white">
                <Container fluid>
                    <Row>
                        <Col sm="1" className="d-flex align-items-center justify-content-center footer">
                            <h4 className="mx-3 my-0">Check</h4>
                        </Col>
                        <Col sm="11" className="d-flex align-items-center footer">
                            <Container fluid>
                                <Row className="d-flex align-items-center half-footer">
                                    <Col sm="12">
                                        SHA256 hash of (
                                        <input
                                            type="text"
                                            id="verifyPreviousProof"
                                            className="mono-font"
                                            value={this.state.verifyPreviousProof}
                                            placeholder={"previous_proof"}
                                            onInput={this.handleVerifyChange}
                                            size={14}
                                        />
                                        +
                                        <input
                                            type="text"
                                            id="verifyProof"
                                            className="mono-font"
                                            value={this.state.verifyProof}
                                            placeholder={"proof"}
                                            onInput={this.handleVerifyChange}
                                            size={14}
                                        />
                                        +
                                        <input
                                            type="text"
                                            id="verifyPreviousHash"
                                            className="mono-font"
                                            value={this.state.verifyPreviousHash}
                                            placeholder={"previous_hash"}
                                            onInput={this.handleVerifyChange}
                                            size={66}
                                        />
                                        )
                                    </Col>
                                </Row>
                                <Row className="d-flex align-items-center half-footer">
                                    <Col sm="12">
                                        =&nbsp;
                                        <input
                                            type="text"
                                            className="mono-font"
                                            disabled
                                            value={this.state.verifyProofHash}
                                            size={66}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default VerificationFooter;
