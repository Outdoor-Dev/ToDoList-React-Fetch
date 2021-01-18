import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [task, setTask] = useState([
		"Walk dog",
		"Wash clothes",
		"Clean house"
	]);
    const [userInput, setUserInput] = useState("");
    
    useEffect(() =>{
        fetch('examples/example.json')
	 .then(function(response) {
		if (!response.ok) {
	    throw Error(response.statusText);
	 }
   
	    return response.json();
	 })
	  .then(function(responseAsJson) {
   
	    console.log(responseAsJson);
	 })
    .catch(function(error) {
	    console.log('Looks like there was a problem: \n', error);
    });
    },[]);

	const handleKeyUp = event => {
		if (event.keyCode === 13 && userInput !== "") {
			setTask(task.concat(userInput));
			setUserInput("");
		}
	};
	const itemDelete = index => {
		let updatedList = task.filter(
			(tasks, taskIndex) => index !== taskIndex
		);
		setTask(updatedList);
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
								{value}

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
