import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [task, setTask] = useState("");
	const [taskLists, setTaskLists] = useState([]);
	useEffect(() => {
		fetching();
	}, []);
	const change = e => {
		setTask(e.target.value);
	};
	const AddTask = () => {
		let newList = [...taskLists, { label: task, done: false }];

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/dsoto06", {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		})
			.then(response => response.json())
			.then(data => fetching())
			.catch(error => console.log("error", error));
	};

	const fetching = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dsoto06", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
				setTaskLists(data);
			})
			.catch(error => {
				//error handling
				console.log("ha ocurrido un error", error);
			});
	};
	fetching();

	const deletetask = e => {
		e.preventDefault();

		var raw = "";
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dsoto06", {
			method: "DELETE",
			body: raw,
			redirect: "follow"
		})
			.then(response => response.json())
			.then(data => setTaskLists([data]))
			.catch(error => console.log("error", error));
	};

	const counter = () => {
		if (taskLists.length == 0) {
			return "No tasks";
		} else {
			return <li>{taskLists.length} Tasks</li>;
		}
	};

	return (
		<div className="container">
			<div className="title">
				<h1>To Do List</h1>
			</div>
			<div className="list-group">
				<ul className="list-group">
					<li className="list-group-item">
						<input
							onChange={e => change(e)}
							placeholder="New Item"></input>
						<button
							className="btn btn-success float-right"
							onClick={AddTask}>
							Add
						</button>
					</li>
					{taskLists !== [] ? (
						<li>
							{taskLists.map(t => (
								<li key={t.data} className="list-group-item">
									{t.label}
								</li>
							))}
						</li>
					) : null}
					<li className="list-group-item">{counter()}</li>
					<button
						className="btn btn-danger float-right"
						onClick={e => deletetask(e)}>
						X
					</button>
				</ul>
			</div>
		</div>
	);
}
