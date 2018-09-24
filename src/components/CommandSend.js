import React from "react";
import { Button, Alert } from "reactstrap";
import Loader from "./Loader";

const CommandSend = (props) => {
    return (
        <div>
            <h4>Send Some Coins</h4>
            <div>
                Send{" "}
                <input
                    type="text"
                    id="amount"
                    className="mono-font"
                    value={props.sendAmount}
                    placeholder="some"
                    onChange={props.handleAmountChange}
                    size={10}
                />{" "}
                coins to{" "}
                <input
                    type="text"
                    id="recipient"
                    className="mono-font"
                    value={props.sendRecipient}
                    placeholder="someone"
                    onChange={props.handleRecipientChange}
                />{" "}
                &nbsp;
                {props.currentlySending ? (
                    <Loader />
                ) : (
                    <Button color="success" onClick={props.startSending}>
                        Send
                    </Button>
                )}
            </div>
            <Alert
                className="mt-2 mb-0"
                color={props.sendError ? "danger" : "success"}
                isOpen={Boolean(props.sendStatus)}
                toggle={props.dismissSendMessage}
            >
                {props.sendStatus}
            </Alert>
        </div>
    );
};

export default CommandSend;
