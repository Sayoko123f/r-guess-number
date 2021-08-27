import React, { useRef, useState } from "react";
import GuessNumberSelector from "./guess-number-selector";
import GuessModal from "./guess-modal";
import GuessScore from "./guess-score";

const GUESSLEN = 6;
const initNumsState = Array(GUESSLEN).fill(0);
const initAnswer = (len) => {
    return Array(len).fill(0).map(() => {
        return Math.floor(Math.random() * 10);
    });
};
const checkAnswer = (arr, usr) => {
    let a = 0;
    let b = 0;
    // check a
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === usr[i]) {
            a++;
            arr[i] = 'a';
            usr[i] = 'z';
        }
    }
    // check b
    for (let i = 0; i < arr.length; i++) {
        const index = arr.indexOf(usr[i]);
        if (index !== -1) {
            b++;
            arr[index] = 'b';
            usr[i] = 'x';
        }
    }
    return { a, b };
};


export default function GuessRoot() {
    const [showModal, setShowModal] = useState(false);
    const [nums, setNums] = useState(initNumsState);
    const [logs, setLogs] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [guessCount, setGuessCount] = useState(0);
    const ans = useRef(initAnswer(GUESSLEN));

    const restart = () => {
        ans.current = initAnswer(GUESSLEN);
        setLogs([]);
        setNums(initNumsState);
        setGuessCount(0);
        setIsWin(false);
    };

    const handleGuessClick = () => {
        if (isWin) {
            return;
        }
        const arr = ans.current.slice(0);
        const usr = nums.slice(0);
        const { a, b } = checkAnswer(arr, usr);
        setGuessCount(guessCount + 1);
        setLogs([{ a, b, nums }, ...logs]);
        // check win
        if (a === GUESSLEN) {
            setIsWin(true);
        }
    };

    return (
        <div className="bg-[#1B1B1B] h-full w-full">
            {showModal && <GuessModal setShowModal={setShowModal} restart={restart} />}
            <div className="p-2 text-center text-3xl text-white shadow-md relative">
                <span className="bg-[#F28705] text-black rounded-sm">1A2B </span><span>猜數字遊戲</span>
                <span className="inline-block h-6 w-6 absolute right-3 top-0 bottom-0 my-auto text-white" role="button" onClick={() => setShowModal(true)}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg></span>
            </div>
            <div className="w-2/3 h-2/5 mx-auto mt-6 overflow-auto text-white p-4 text-center shadow-md bg-[#262626]">
                {isWin && <div>You Win!</div>}
                {logs.map((e, i) => {
                    return (<div className="" key={i}>{e.nums.join("")} | {e.a}A{e.b}B</div>);
                })}
                <div className="">請猜 {GUESSLEN} 個數字，每個數字 0-9 ！</div>
            </div>
            <div className="flex flex-row justify-center gap-4 mt-6">
                {initNumsState.map((e, i) => {
                    return (<GuessNumberSelector index={i} nums={nums} setNums={setNums} key={i}></GuessNumberSelector>)
                })}
            </div>
            {/* Guess Button */}
            <div className="flex justify-center mt-6">
                <button className="px-4 py-2 text-xl text-black bg-[#F28705] font-bold rounded" onClick={handleGuessClick}>猜！</button>
            </div>
            <div className="flex justify-center mt-4">
                <GuessScore guessCount={guessCount} />
            </div>
        </div>
    )
}