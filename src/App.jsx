import { useState } from 'react';

function Square({ value, onSquareClick }) {
	const textColor = value === 'X' ? 'text-red-600' : 'text-green-600';
	return (
		<button
			className={`size-20 border border-gray-500 m-2 font-bold text-2xl text-center ${textColor}`}
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}
function Board({ xIsNext, squares, onPlay }) {
	const winner = calculateWinner(squares);
	let status = '';
	if (winner) {
		status = winner === 'Draw' ? `It's a draw!` : `${winner} is the Winner`;
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}
	function handleClick(index) {
		const nextSquares = squares.slice();
		if (squares[index] || calculateWinner(squares)) {
			return;
		}
		if (xIsNext) {
			nextSquares[index] = 'X';
		} else {
			nextSquares[index] = 'O';
		}
		onPlay(nextSquares);
	}
	return (
		<>
			<h1 className="text-3xl text-center">{status}</h1>
			<div className="flex">
				<Square
					value={squares[0]}
					onSquareClick={() => handleClick(0)}
				/>
				<Square
					value={squares[1]}
					onSquareClick={() => handleClick(1)}
				/>
				<Square
					value={squares[2]}
					onSquareClick={() => handleClick(2)}
				/>
			</div>
			<div className="flex">
				<Square
					value={squares[3]}
					onSquareClick={() => handleClick(3)}
				/>
				<Square
					value={squares[4]}
					onSquareClick={() => handleClick(4)}
				/>
				<Square
					value={squares[5]}
					onSquareClick={() => handleClick(5)}
				/>
			</div>
			<div className="flex">
				<Square
					value={squares[6]}
					onSquareClick={() => handleClick(6)}
				/>
				<Square
					value={squares[7]}
					onSquareClick={() => handleClick(7)}
				/>
				<Square
					value={squares[8]}
					onSquareClick={() => handleClick(8)}
				/>
			</div>
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [xIsNext, setXIsNext] = useState(true);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		setXIsNext(!xIsNext);
		const nexHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nexHistory);
		setCurrentMove(nexHistory.length - 1);
	}

	function jumpTo(move) {
		setCurrentMove(move);
		setXIsNext(move % 2 === 0);
	}

	const moves = history.map((suqares, move) => {
		let description = '';
		if (move) {
			description = `Go to move ${move}`;
		} else {
			description = 'Go to game start';
		}
		return (
			<li key={move} className="border p-2">
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});
	return (
		<div className="w-full h-screen bg-slate-900 flex justify-center items-center text-white gap-10 ">
			<div>
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div>
				<h1 className="text-3xl">Game History</h1>
				<ol className="p-2">{moves}</ol>
			</div>
		</div>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	if (squares.every((square) => square !== null)) {
		return 'Draw';
	}
	return null;
}
