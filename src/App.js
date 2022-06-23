import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [convidado, setConvidado] = useState();
	const [confirmado, setConfirmado] = useState(false);
	useEffect(() => {
		let url = window.location.pathname.split('/')[1];

		sendData();
		async function sendData() {
			let usuario = await axios.post(`${process.env.REACT_APP_URL4}`, [
				`${window.location.pathname.split('/')[1]}`,
			]);
			setConvidado(usuario.data[0]);
			console.log(usuario);
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
			{window.location.pathname ? (
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
				<p id="white">BUSCANDO CONVIDADO...</p>
			)}
		</div>
	);
}

export default App;
