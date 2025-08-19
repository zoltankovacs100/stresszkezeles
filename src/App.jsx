import React, { useState } from "react";
import jsPDF from "jspdf";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	LabelList,
	Cell
} from 'recharts';

const blocks = [
	[
		"Szeretek a versengés öröméért versenyezni másokkal, függetlenül a díjtól.",
		"Úgy gondolom, hogy kevés beleszólásom van a döntéseimbe, sokszor mások irányítanak helyettem.",
		"Úgy gondolom, hogy terhelhető vagyok.",
		"Igyekszem mindig tökéletes munkát kiadni a kezeimből.",
		"Nehezen viselem a monotonitást"
	],
	[
		"A határidők nagyon fontosak nekem.",
		"Gyakran esek apátiába, mert nem tudok változtatni a dolgok menetén.",
		"Szerintem el fogom érni a céljaimat, ha elég keményen dolgozok értük.",
		"Gyakran kérek másoktól segítséget.",
		"Szeretem az extrém-sportokat"
	],
	[
		"Nagyratörő céljaim vannak.",
		"A hibáimat általában rajtam kívülálló okoknak köszönhetem.",
		"Sok mindenben jobb vagyok, mint az átlag.",
		"Jól kezelem a kríziseket.",
		"Mindig új kihívásokat keresek, mert izgalmasnak találom őket."
	],
	[
		"Nehezen tolerálom, amikor mások miatt nem tudok haladni.",
		"Gyakran nehéz megtalálnom a motivációt a munkámhoz.",
		"A hibáimat szeretem fejlődési lehetőségként felfogni.",
		"A lojalitás számomra elsődleges.",
		"Szeretek új helyeket felfedezni"
	],
	[
		"Amikor valaki felbosszant, hajlamos vagyok felemelni a hangomat.",
		"Sokszor azt érzem, hogy mások jobbak nálam.",
		"A tetteimért én vagyok a felelős, így a sikeremért is.",
		"Gyakran mások szükségleteit a sajátom elé helyezem.",
		"Hajlamos vagyok mérlegelés után magasabb kockázatot vállalni, mint mások."
	],
	[
		"Nyaralás közben is a munkámon jár az eszem.",
		"Sokszor nincs is kedvem kikelni az ágyból.",
		"Jó problémamegoldó vagyok,  nem ijedek meg a kihívásoktól.",
		"Manipulálok másokat, ha erre van szükségem céljaim eléréséhez.",
		"Gyakran belemegyek veszélyes helyzetekbe az izgalom kedvéért."
	]
];

const categories = [
	{ code: "A", name: "A-típus", desc: "A határidőkhöz való ragaszkodás, versengési kényszer, multitasking, nehézségek a kikapcsolásban, intolerancia másokkal, érzelmi sebezhetőség, agresszió stressz esetén." },
	{ code: "B", name: "Külső kontrollos típus", desc: "Úgy érzi, nem irányítja életét. Külső tényezőket tesz felelőssé, alacsony motiváció, kis önbizalom, tehetetlenség érzés, hibákra fókuszál." },
	{ code: "C", name: "Hardy típus", desc: "Elkötelezettség, kihívásokra való reagálás, kontrollképesség, hisz abban, amit csinál, fejlődési lehetőség mindenben, egészségesebb, hatékonyabb interperszonálisan." },
	{ code: "D", name: "C-típus", desc: "Másoktól függ, támogatást vár, szükség esetén manipulál, jó krízis-menedzser, lojalitást értékeli, gyakran mártír vagy áldozat szerep." },
	{ code: "E", name: "R-típus", desc: "Folyamatosan új élményekre vágyik, szereti az adrenalint és a kockázatot, kalandvágy, szeret utazni, mindig kilép komfortzónájából, elfogadja a kihívásokat." }
];

const getLetter = idx => ["A", "B", "C", "D", "E"][idx];

const TYPES = [
	{ key: "A", name: "A-típus" },
	{ key: "B", name: "Külső kontrollos" },
	{ key: "C", name: "Hardy" },
	{ key: "D", name: "C-típus" },
	{ key: "E", name: "R-típus" }
];

const getColor = value => {
	if (value <= 11) return "#ffe733";
	if (value <= 17) return "#ffa540";
	if (value <= 21) return "#7fff8a";
	if (value <= 25) return "#228b22";
	if (value <= 27) return "#ff6b6b";
	return "#a00000";
};

function StressBarChart({ results }) {
	const chartData = TYPES.map(t => ({ type: t.key, name: t.name, value: results[t.key] }));
	return (
		<div style={{ background: "#155131", borderRadius: "15px", padding: "1rem", margin: "1rem 0" }}>
			<h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Eredmények grafikusan</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barSize={28}>
					<XAxis type="number" domain={[6, 30]} ticks={[6, 10, 15, 20, 25, 30]} tick={{ fill: "#fff" }} />
					<YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 14 }} width={120} />
					<Bar dataKey="value" isAnimationActive={false} radius={[0, 4, 4, 0]}>
						<LabelList dataKey="value" position="right" fill="#fff" fontWeight="bold" fontSize={14} />
						{chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={getColor(entry.value)} />))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export default function StressTestApp() {
	const [answers, setAnswers] = useState(Array.from({ length: 6 }, () => [null, null, null, null, null]));
	const [submitted, setSubmitted] = useState(false);
	const [scores, setScores] = useState({});

	const handleSelect = (blockIdx, itemIdx, value) => {
		let block = answers[blockIdx].slice();
		block[itemIdx] = Number(value);
		block = block.map((val, idx) => (idx !== itemIdx && val === Number(value) ? null : val));
		setAnswers([...answers.slice(0, blockIdx), block, ...answers.slice(blockIdx + 1)]);
	};

	const canSubmit = answers.every(block => block.filter(v => v !== null).length === 5);

	const evaluate = () => {
		const result = { A: 0, B: 0, C: 0, D: 0, E: 0 };
		for (let block = 0; block < 6; block++) {
			for (let i = 0; i < 5; i++) {
				if (answers[block][i]) {
					const letter = getLetter(i);
					result[letter] += answers[block][i];
				}
			}
		}
		setScores(result);
		setSubmitted(true);
	};

	const savePDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(14);
		doc.text("Stresszkezelés teszt eredménye:", 10, 10);
		let y = 20;
		Object.entries(scores).forEach(([code, value]) => {
			doc.text(`${categories.find(c => c.code === code).name}: ${value}`, 10, y);
			doc.setFontSize(10);
			doc.text(categories.find(c => c.code === code).desc, 10, y + 6);
			y += 20;
			doc.setFontSize(14);
		});
		doc.save("stresszteszt-eredmeny.pdf");
	};

	const styles = {
		app: { fontFamily: "sans-serif", background: "#10451d", minHeight: "100vh", color: "#fff", padding: "0", margin: "0", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" },
		header: { background: "#183a1d", padding: "1.5rem", textAlign: "center", fontSize: 22, fontWeight: "bold" },
		card: { background: "#155131", borderRadius: "15px", padding: "1.3rem", margin: "1rem 0.3rem", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" },
		label: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0.6rem 0" },
		select: { fontSize: 16, padding: "0.3rem 0.7rem", borderRadius: "6px", border: "1px solid #217a41", background: "#183a1d", color: "#fff", outline: "none" },
		button: { background: "#19714b", color: "#fff", fontSize: 18, border: "none", borderRadius: "12px", padding: "1rem", margin: "1rem 0.7rem 1rem 0", width: "44%", cursor: "pointer" },
		btnRow: { display: "flex", justifyContent: "center", gap: "1rem" },
		result: { background: "#13281d", borderRadius: "12px", padding: "1rem", margin: "1.5rem 0.3rem" }
	};

	return (
		<div style={styles.app}>
			<div style={styles.header}>Stresszkezelés teszt</div>
			{blocks.map((block, blockIdx) => (
				<div style={styles.card} key={blockIdx}>
					<div>
						<b>{blockIdx + 1}. blokk</b>
						<div style={{ fontSize: 13, margin: "0.5rem 0 0.7rem 0" }}>Ossz ki minden számot (1–5) egyszer, aszerint, mennyire illik rád!</div>
					</div>
					{block.map((q, itemIdx) => (
						<div style={styles.label} key={itemIdx}>
							<span>{getLetter(itemIdx)}. {q}</span>
							<select style={styles.select} value={answers[blockIdx][itemIdx] || ""} onChange={e => handleSelect(blockIdx, itemIdx, e.target.value)}>
								<option value="">Válassz</option>
								{[5, 4, 3, 2, 1]
									.filter(n => !answers[blockIdx].includes(n) || answers[blockIdx][itemIdx] === n)
									.map(n => (<option key={n} value={n}>{n}</option>))}
							</select>
						</div>
					))}
				</div>
			))}
			<div style={styles.btnRow}>
				<button style={styles.button} disabled={!canSubmit} onClick={evaluate}>Értékelés</button>
				<button style={styles.button} disabled={!submitted} onClick={savePDF}>Mentés PDF-be</button>
			</div>
			{submitted && (
				<div style={styles.result}>
					<div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Eredmények:</div>
					<StressBarChart results={scores} />
				</div>
			)}
		</div>
	);
}
