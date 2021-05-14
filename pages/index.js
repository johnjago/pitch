import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import ExcelJS from 'exceljs';

export default function Home() {
	const [names, setNames] = useState(['', '', '', '', '', '', '', '', '', '']);
	const [abbreviations, setAbbreviations] = useState(['', '', '', '', '', '', '', '', '', '']);
	const [percents, setPercents] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	const [percentTotal, setPercentTotal] = useState(percents.reduce((acc, cur) => acc + cur, 0));

	const updateNames = (value, i) => {
		const namesCopy = [...names];
		namesCopy[i] = value;
		setNames(namesCopy);
	}

	const updateAbbreviations = (value, i) => {
		const abbreviationsCopy = [...abbreviations];
		abbreviationsCopy[i] = value;
		setAbbreviations(abbreviationsCopy);
	}

	const updatePercents = (value, i) => {
		const percentsCopy = [...percents];
		percentsCopy[i] = value;
		setPercents(percentsCopy);
		calculateTotal(percentsCopy);
	}

	const calculateTotal = (arr) => {
		const totalPercent = arr.reduce((total, percent) => {
			return total + percent;
		}, 0);
		setPercentTotal(totalPercent);
	};

	// createRandomChoiceList fills an array of 100 with with `percent` number of
	// each pitch, which gives us a data structure where we can simply pick a
	// random one from the array and have a `percent` chance of getting that pitch.
	const createRandomChoiceList = () => {
		const list = [];
		for (let i = 0; i < names.length; i++) {
			for (let j = 0; j < percents[i]; j++) {
				list.push(abbreviations[i]);
			}
		}
		return list;
	}

	const makeSheets = () => {
		console.log(createRandomChoiceList())
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Pitch Card Generator</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Pitch Card Generator
				</h1>
				<div className={styles.grid}>
					<div className={styles.col}>
						<h2>Pitch name</h2>
						{percents && percents.map((p, i) =>
							<input
								type="text"
								tabIndex={i*3 + 1}
								key={i}
								value={names[i]}
								onChange={e => updateNames(e.target.value, i)}
							/>
						)}
					</div>
					<div className={styles.col}>
						<h2>Pitch abbreviation</h2>
						{percents && percents.map((p, i) =>
							<input
								type="text"
								tabIndex={i*3 + 2}
								key={i}
								value={abbreviations[i]}
								onChange={e => updateAbbreviations(e.target.value, i)}
							/>
						)}
					</div>
					<div className={styles.col}>
						<h2>Pitch %</h2>
						{percents && percents.map((p, i) =>
							<input
								type="number"
								tabIndex={i*3 + 3}
								min="0"
								max="100"
								onFocus={e => e.target.select()}
								key={i}
								value={percents[i]}
								onChange={e => updatePercents(Number(e.target.value), i)}
							/>
						)}
						<div className={styles.total}>{percentTotal}%</div>
					</div>
				</div>
				<button className={styles.button} onClick={makeSheets}>Make sheets</button>
			</main>
		</div>
	)
}
