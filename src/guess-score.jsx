import React from "react";
import PropTypes from 'prop-types';
GuessScore.propTypes = {
    guessCount: PropTypes.number.isRequired,
    // guessTimer: PropTypes.number.isRequired
};


export default function GuessScore(props) {
    return (
        <>
            <span className="text-[#C6C6C6]">你猜了 {props.guessCount} 次</span>
        </>
    )
}