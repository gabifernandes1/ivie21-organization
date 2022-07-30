import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';

function App() {
	const [convidado, setConvidado] = useState();
	const [confirmado, setConfirmado] = useState(false);
	const [loading, setLoading] = useState(true);
	const [no, setNo] = useState(false);

	useEffect(() => {
		let url = window.location.pathname.split('/')[1];
		sendData();
		async function sendData() {
			if (window.location.pathname !== '/') {
				let usuario = await axios.post(`${process.env.REACT_APP_URL4}`, [
					`${window.location.pathname.split('/')[1]}`,
				]);
				setConvidado(usuario.data[0]);
			} else {
				setNo(true);
			}
		}
	}, []);

	async function entrou() {
		await axios
			.post(`${process.env.REACT_APP_URL5}`, [
				`${window.location.pathname.split('/')[1]}`,
			])
			.then(setConfirmado(true));
	}
	return (
		<div className="App">
			{no ? (
				<p id="white">NENHUM CONVIDADO</p>
			) : (
				<>
					{convidado ? (
						<>
							<p id="white">CONVIDADO: {convidado.nome}</p>

							<p id="white">
								{convidado.ENTROU == 'S' ? (
									<p> Convidado já entrou.</p>
								) : (
									<div onClick={entrou}>
										{confirmado ? (
											<p id="green">CONVIDADO CONFIRMADO!</p>
										) : (
											<p id="black">CONFIRMAR</p>
										)}
									</div>
								)}
							</p>
						</>
					) : (
						<>
							<p id="white">BUSCANDO CONVIDADO...</p>
						</>
					)}
				</>
			)}

			{loading ? (
				<div style={{ width: 50, height: 50 }}>
					<ChangingProgressProvider values={[100, 0]}>
						{(percentage) => (
							<CircularProgressbar
								styles={buildStyles({
									rotation: (1 - percentage / 100) / 2,
								})}
								value={percentage}
							/>
						)}
					</ChangingProgressProvider>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default App;
