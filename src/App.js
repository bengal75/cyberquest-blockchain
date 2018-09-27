import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import UsernameModal from "./components/UsernameModal";
import StatusBarHeader from "./components/StatusBarHeader";
import ChainPanel from "./components/ChainPanel";
import CommandPanel from "./components/CommandPanel";
import VerificationFooter from "./components/VerificationFooter";
import backgroundClass from "./util/cyberquest-background";
import "./inc/App.css";

import { api, mineDelay, usernameRegexp } from "./config";

class App extends Component {
    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
        this.fetchChain = this.fetchChain.bind(this);
        this.fetchTransactions = this.fetchTransactions.bind(this);
        this.mine = this.mine.bind(this);
        this.send = this.send.bind(this);
        this.recalculateBalance = this.recalculateBalance.bind(this);

        this.state = {
            user: null,
            usernameError: false,
            usernameErrorMessage: "",
            nodes: [],
            balance: 0,
            chain: { chain: [] },
            transactions: { unconfirmed_transactions: [] },
            mineStatus: null,
            sendStatus: null,
            sendError: false,
            sendAmount: "",
            sendRecipient: "",
            sendRequestInFlight: false,
            mineRequestInFlight: false,
            transactionRequestInFlight: false,
            chainRequestInFlight: false,
            userRequestInFlight: false,
        };
    }

    recalculateBalance() {
        const chain = this.state.chain.chain;
        const transactionList = chain.reduce((accumulator, block) => {
            return [...accumulator, ...block.transactions];
        }, []);
        const creditTransactions = transactionList.filter((transaction) => transaction.recipient === this.state.user);
        const debitTransactions = transactionList.filter((transaction) => transaction.sender === this.state.user);
        const creditAmount = creditTransactions.reduce(
            (accumulator, transaction) => accumulator + transaction.amount,
            0
        );
        const debitAmount = debitTransactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
        const balance = creditAmount - debitAmount;
        this.setState({ balance });
    }

    setUser() {
        const username = document.getElementById("userEntry").value;
        if (!usernameRegexp.test(username)) {
            this.setState({ usernameError: true, usernameErrorMessage: "Letters and numbers only - no spaces" });
            return false;
        }
        this.setState({ userRequestInFlight: true });
        fetch(`${api}/nodes/register`, {
            method: "POST",
            body: JSON.stringify({ address: username }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.message === "New node has been added") {
                    this.setState({
                        user: username,
                        usernameError: false,
                        nodes: jsonResponse.nodes,
                        userRequestInFlight: false,
                    });
                    this.fetchChain();
                    // Implement refactored background animation
                    backgroundClass();
                    return true;
                } else {
                    this.setState({
                        usernameError: true,
                        usernameErrorMessage: "That name is already taken",
                        userRequestInFlight: false,
                    });
                    return false;
                }
            });
    }
    handleAmountChange = (e) => {
        this.setState({ sendAmount: e.target.value });
    };
    handleRecipientChange = (e) => {
        this.setState({ sendRecipient: e.target.value });
    };

    fetchChain() {
        this.setState({ chainRequestInFlight: true });
        fetch(`${api}/chain`)
            .then((response) => response.json())
            .then((chain) => this.setState({ chain, chainRequestInFlight: false }))
            .then(() => {
                const divRef = document.getElementById("chain-pre");
                divRef.scrollTop = divRef.scrollHeight;
            })
            .then(this.recalculateBalance);
    }
    fetchTransactions() {
        this.setState({ transactionRequestInFlight: true });
        fetch(`${api}/transactions`)
            .then((response) => response.json())
            .then((transactions) => this.setState({ transactions, transactionRequestInFlight: false }));
    }
    mine() {
        this.setState({ mineStatus: null, mineRequestInFlight: true });
        fetch(`${api}/mine`, {
            method: "POST",
            body: JSON.stringify({ requester: this.state.user }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => new Promise((resolve) => setTimeout(() => resolve(response), 1000 * mineDelay))) // Manual delay
            .then((mineStatus) => this.setState({ mineStatus, mineRequestInFlight: false }))
            .then(() => {
                this.fetchChain();
                this.fetchTransactions();
            });
    }
    send() {
        this.setState({ sendError: false, sendStatus: null });
        if (!(Number(this.state.sendAmount) > 0)) {
            this.setState({ sendError: true, sendStatus: "You haven't entered a valid number" });
            return false;
        }
        if (Number(this.state.sendAmount) > this.state.balance) {
            this.setState({ sendError: true, sendStatus: "You don't have this many coins! Try mining to get some." });
            return false;
        }
        if (this.state.sendRecipient === "") {
            this.setState({ sendError: true, sendStatus: "Who do you want to send these coins to?" });
            return false;
        }
        if (!usernameRegexp.test(this.state.sendRecipient)) {
            this.setState({ sendError: true, sendStatus: "This is not a valid name to send coins to" });
            return false;
        }
        if (this.state.sendRecipient === this.state.user) {
            this.setState({ sendError: true, sendStatus: "You are trying to send coins to yourself..." });
            return false;
        }
        this.setState({ sendRequestInFlight: true });
        fetch(`${api}/transactions/new`, {
            method: "POST",
            body: JSON.stringify({
                sender: this.state.user,
                recipient: this.state.sendRecipient,
                amount: Number(this.state.sendAmount),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((sendStatus) =>
                this.setState({ sendError: false, sendStatus: sendStatus.message, sendRequestInFlight: false })
            )
            .then(() => this.fetchTransactions());
    }

    render() {
        return (
            <div className="App-root d-flex flex-column justify-content-between">
                <div className="cyberquest-background" />
                <UsernameModal
                    showModal={this.state.user === null}
                    showAlert={this.state.usernameError}
                    showLoader={this.state.userRequestInFlight}
                    alertMessage={this.state.usernameErrorMessage}
                    closeAlert={() => this.setState({ usernameError: false, usernameErrorMessage: "" })}
                    saveUser={this.setUser}
                />
                <StatusBarHeader balance={this.state.balance} user={this.state.user} />
                <Container fluid className="main-content flex-grow-1 flex-shrink-0">
                    <Row>
                        <ChainPanel
                            chain={this.state.chain.chain}
                            loading={this.state.chainRequestInFlight}
                            reload={this.fetchChain}
                        />
                        <CommandPanel
                            mine={{
                                currentlyMining: this.state.mineRequestInFlight,
                                startMining: this.mine,
                                mineStatus: this.state.mineStatus,
                                dismissMineMessage: () => this.setState({ mineStatus: null }),
                            }}
                            send={{
                                currentlySending: this.state.sendRequestInFlight,
                                startSending: this.send,
                                sendAmount: this.state.sendAmount,
                                handleAmountChange: this.handleAmountChange,
                                sendRecipient: this.state.sendRecipient,
                                handleRecipientChange: this.handleRecipientChange,
                                sendError: this.state.sendError,
                                sendStatus: this.state.sendStatus,
                                dismissSendMessage: () =>
                                    this.setState({ sendStatus: null, sendAmount: "", sendRecipient: "" }),
                            }}
                            transactions={{
                                transactions: this.state.transactions.unconfirmed_transactions,
                                currentlyGettingTransactions: this.state.transactionRequestInFlight,
                                getTransactions: this.fetchTransactions,
                            }}
                        />
                    </Row>
                </Container>
                <VerificationFooter />
            </div>
        );
    }
}

export default App;
