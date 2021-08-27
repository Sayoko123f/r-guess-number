import React from "react";
import PropTypes from 'prop-types';
GuessModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired
};


export default function GuessModal(props) {
    const close = e => {
        if (e.currentTarget === e.target) {
            props.setShowModal(false);
        }
    };

    const replay = () => {
        props.restart();
        props.setShowModal(false);
    }


    return (
        <div className="h-full w-full z-50 bg-gray-900 bg-opacity-80 absolute flex justify-center items-center" onClick={close}>
            <div className="px-2 py-4 bg-[#262626] text-white h-2/5 w-2/3 flex flex-col justify-between rounded-md shadow-md">
                <div className="text-center">說明
                    <div>答案為 0-9 的隨機組合</div>
                    <div>可能有重複的數字</div>
                    <div>若數字相同位置相同則得 1A</div>
                    <div>若數字相同位置不同則得 1B</div>
                    <div><a className="hover:text-[#F28705] text-[#C6C6C6]" href="https://zh.wikipedia.org/wiki/%E7%8C%9C%E6%95%B0%E5%AD%97" target="_blank" rel="noreferrer">維基百科</a></div>
                </div>
                <div className="flex justify-around">
                    <button className="styleArrowBtn font-bold" onClick={close}>關閉</button>
                    <button className="styleArrowBtn font-bold" onClick={replay}>重玩</button>
                </div>
            </div>
        </div>
    )
}