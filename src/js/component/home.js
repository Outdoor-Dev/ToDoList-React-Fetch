import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [task, setTask] = useState([]);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pacho1018")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}

				return response.json();
			})
			.then(function(responseAsJson) {
				setTask(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleKeyUp = event => {
		if (event.keyCode === 13 && userInput !== "") {
			setTask(
				task.concat({
					label: userInput,
					done: false
				})
			);

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/pacho1018",
				{
					method: "PUT", // or 'POST'
					body: JSON.stringify(
						task.concat({
							label: userInput,
							done: false
						})
					), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}

					return response.json();
				})
				.then(response => {
					console.log("Success:", response);
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/pacho1018"
					)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}

							return response.json();
						})
						.then(function(responseAsJson) {
							setTask(responseAsJson);
						})
						.catch(function(error) {
							console.log(
								"Looks like there was a problem: \n",
								error
							);
						});
				})
				.catch(error => console.error("Error:", error));
			setUserInput("");
		}
	};
	const itemDelete = index => {
		let updatedList = task.filter(
			(tasks, taskIndex) => index !== taskIndex
		);
		setTask(updatedList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pacho1018", {
			method: "PUT", // or 'POST'
			body: JSON.stringify(updatedList), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}

				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/pacho1018"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}

						return response.json();
					})
					.then(function(responseAsJson) {
						setTask(responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(error => console.error("Error:", error));
	};

	return (
		<div className="container">
			<h1 className="todo-title"> Todos</h1>
			<div className="todo-list">
				<input
					className="tasks"
					type="text"
					onChange={e => setUserInput(e.target.value)}
					value={userInput}
					onKeyUp={handleKeyUp}
				/>

				<ul className="list-group">
					{task.map((value, index) => {
						return (
							<li className="list-group-item" key={index}>
								{value.label}

								<i
									className="far fa-trash-alt"
									onClick={() => itemDelete(index)}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
