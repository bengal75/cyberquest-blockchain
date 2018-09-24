import React from "react";
import { Col } from "reactstrap";
import CommandMine from "./CommandMine";
import CommandSend from "./CommandSend";
import CommandTransactions from "./CommandTransactions";

const CommandPanel = (props) => {
    return (
        <Col sm="5" className="column-height column-overflow p-3">
            <h3 className="heading">Commands</h3>
            <CommandMine {...props.mine} />
            <hr />
            <CommandSend {...props.send} />
            <hr />
            <CommandTransactions {...props.transactions} />
        </Col>
    );
};

export default CommandPanel;
