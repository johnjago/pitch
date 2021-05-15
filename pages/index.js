import ExcelJS from 'exceljs';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

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
			for (let j = 0; j < (percents[i] * 1.5); j++) {
				list.push(abbreviations[i]);
			}
		}
		return list;
	}

	const makeSheets = async () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Player sheet 1');

		setUpPlayerSheetHeaders(worksheet);
		fillPlayerSheet(worksheet, createRandomChoiceList());
		// TODO: Set up coach sheet headers
		// TODO: Fill in coach sheet

		shadeRows(worksheet);
		addBorders(worksheet);
		worksheet.getColumn('A').style = {font: {bold: true}}; // TODO: this doesn't apply the style?

		// TODO: Adjust styles for printing
		// TODO: multiple sequential player/coach sheets in one printing

		const buffer = await workbook.xlsx.writeBuffer({base64: true});
		save('pitches.xlsx', buffer);
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

function setUpPlayerSheetHeaders(worksheet) {
	worksheet.getRow(1).values = ['', '01', '02', '03', '04', '05', '11', '12', '13', '14', '15', '21', '22', '23', '24', '25'];
	worksheet.getRow(8).values = ['', '31', '32', '33', '34', '35', '41', '42', '43', '44', '45', '51', '52', '53', '54', '55'];
	worksheet.getColumn('A').values = ['#1', '1', '2', '3', '4', '5', '', '', '1', '2', '3', '4', '5'];
}

function fillPlayerSheet(worksheet, pitches) {
	let pitchIndex = 0;
	for (let i = 2; i <= 13; i++) {
		// Skip a blank line and a header
		if (i === 7 || i === 8) {
			continue;
		}
		for (let j = 2; j <= 16; j++) {
			worksheet.getRow(i).getCell(j).value = pitches[pitchIndex++];
		}
	}
}

function shadeRows(worksheet) {
	worksheet.addConditionalFormatting({
		ref: 'A1:P13',
		rules: [
			{
				type: 'expression',
				formulae: ['MOD(ROW(),2)=0'],
				style: {fill: {type: 'pattern', pattern: 'lightGray'}},
			},
			{
				type: 'expression',
				formulae: ['ROW()=1'], // TODO: why can't I do the same thing for row 8?
				style: {font: {bold: true}},
			}
		]
	});
}

function addBorders(worksheet) {
	for (let i = 1; i <= 13; i++) {
		for (let j = 1; j <= 16; j++) {
			worksheet.getRow(i).getCell(j).border = {
				top: {style:'thin'},
				left: {style:'thin'},
				bottom: {style:'thin'},
				right: {style:'thin'}
			};
		}
	}
}

function save(filename, data) {
	const blob = new Blob([new Uint8Array(data)], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	} else {
		const el = window.document.createElement('a');
		el.href = window.URL.createObjectURL(blob);
		el.download = filename;
		document.body.appendChild(el);
		el.click();
		document.body.removeChild(el);
	}
}
