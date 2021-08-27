import React from "react";
import PropTypes from 'prop-types';
GuessNumberSelector.propTypes = {
    nums: PropTypes.array.isRequired,
    setNums: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}


export default function GuessNumberSelector(props) {
    const nowNum = props.nums[props.index];
    const handleAddClick = (event, n) => {
        let newNum = nowNum + n;
        if (n === 1 && nowNum === 9) {
            newNum = 0;
        } else if (n === -1 && nowNum === 0) {
            newNum = 9;
        }
        const arr = props.nums.slice(0);
        arr[props.index] = newNum;
        props.setNums(arr);
    }

    return (
        <div className="bg-[#262626]">
            <button className="styleArrowBtn" onClick={(event) => { handleAddClick(event, 1) }}>▲</button>
            <div className="px-2 text-2xl text-white my-0.5">{nowNum}</div>
            <button className="styleArrowBtn" onClick={(event) => { handleAddClick(event, -1) }}>▼</button>
        </div>
    )
}