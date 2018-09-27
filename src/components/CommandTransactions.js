import React from "react";
import { Button } from "reactstrap";
import Loader from "./Loader";

const CommandTransactions = (props) => {
    return (
        <div>
            <h5>Unconfirmed Transactions</h5>
            <pre className="well">{JSON.stringify(props.transactions, null, 2)}</pre>
            {props.currentlyGettingTransactions ? (
                <Loader />
            ) : (
                <Button color="success" onClick={props.getTransactions}>
                    Update the transaction list
                </Button>
            )}
        </div>
    );
};

export default CommandTransactions;
