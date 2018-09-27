import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import GridLoader from "react-spinners/GridLoader";

// The specified colour is the purple from the design
const Loader = (props) => {
    if (props.mine) return <GridLoader sizeUnit={"px"} size={38} color={"#d600e4"} />;
    return <PulseLoader sizeUnit={"px"} size={38} color={"#d600e4"} />;
};

export default Loader;
