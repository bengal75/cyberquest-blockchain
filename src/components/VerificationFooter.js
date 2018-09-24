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
            <div className="footer px-0 pt-3 pb-1 bg-dark text-white">
                <Container fluid>
                    <Row>
                        <Col sm="1" className="d-flex align-items-center">
                            <h6 className="heading">Check</h6>
                        </Col>
                        <Col sm="11" className="d-flex align-items-center">
                            <Container fluid>
                                <Row>
                                    <Col sm="12">
                                        SHA256 hash of (&nbsp;
                                        <input
                                            type="text"
                                            id="verifyPreviousProof"
                                            className="mono-font"
                                            value={this.state.verifyPreviousProof}
                                            placeholder={"previous_proof"}
                                            onInput={this.handleVerifyChange}
                                            size={15}
                                        />
                                        &nbsp;+&nbsp;
                                        <input
                                            type="text"
                                            id="verifyProof"
                                            className="mono-font"
                                            value={this.state.verifyProof}
                                            placeholder={"proof"}
                                            onInput={this.handleVerifyChange}
                                            size={15}
                                        />
                                        &nbsp;+&nbsp;
                                        <input
                                            type="text"
                                            id="verifyPreviousHash"
                                            className="mono-font"
                                            value={this.state.verifyPreviousHash}
                                            placeholder={"previous_hash"}
                                            onInput={this.handleVerifyChange}
                                            size={70}
                                        />
                                        &nbsp;)
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" className="py-3">
                                        =&nbsp;
                                        <input
                                            type="text"
                                            className="mono-font"
                                            disabled
                                            value={this.state.verifyProofHash}
                                            size={70}
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
