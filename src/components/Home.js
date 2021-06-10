import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

function Home() {
	const [createTargetValue, setCreateTargetValue] = useState('');
	const [editTargetValue, setEditTargetValue] = useState('');
	const [deleted, setDeleted] = useState(false);
	const [swapped, setSwapped] = useState(false);
	const [notes, setNotes] = useState([
		{ id: uuidv4(), note: 'Buy some milk.' },
		{ id: uuidv4(), note: 'Go on a walk.' },
		{ id: uuidv4(), note: 'Complete assignment 5.' },
		{ id: uuidv4(), note: 'Walk the dog.' },
		{ id: uuidv4(), note: 'Buy cat litter.' },
		{ id: uuidv4(), note: 'Excercise.' },
		{ id: uuidv4(), note: 'Charge camera.' },
		{ id: uuidv4(), note: 'Clean apartment.' },
		{ id: uuidv4(), note: 'Cancel subscription.' },
		{ id: uuidv4(), note: 'Change batteries.' },
	]);
	const [toBeEdited, setToBeEdited] = useState();
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);

	const createNote = (content) => {
		const newNote = {
			id: uuidv4(),
			note: content,
		};

		setNotes((notes) => [...notes, newNote]);
	};

	const deleteNote = (id) => {
		let index;
		for (let i = 0; i < notes.length; i++) {
			if (notes[i].id === id) {
				index = i;
			}
		}

		notes.splice(index, 1);
		setNotes(notes);

		let getElement = document.getElementById(id);

		if (getElement.classList.contains('note-selected'))
			getElement.classList.remove('note-selected');
		else getElement.classList.add('note-selected');
	};

	const updateNote = (content) => {
		for (let i = 0; i < notes.length; i++) {
			if (toBeEdited === notes[i].id) {
				notes[i].note = content;
			}
		}
	};

	const handleClickCreate = (e) => {
		createNote(createTargetValue);
		setShowCreateForm(false);
	};

	const handleClickEdit = (e, id) => {
		updateNote(editTargetValue, id);
		setShowEditForm(false);
	};

	const handleChangeCreate = (e) => {
		setCreateTargetValue(e.target.value);
	};

	const handleChangeEdit = (e) => {
		setEditTargetValue(e.target.value);
	};

	const createNoteForm = () => {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				name="create"
				className="center"
			>
				<label>
					<input
						autoFocus
						type="text"
						className="create-note"
						name="create"
						id="create"
						onChange={handleChangeCreate}
					/>
				</label>
				<label>
					<input
						type="submit"
						className="addButton"
						value="Add"
						onClick={handleClickCreate}
					/>
				</label>
			</form>
		);
	};

	const EditNoteForm = () => {
		let currentNote;

		for (let i = 0; i < notes.length; i++) {
			if (toBeEdited === notes[i].id) {
				currentNote = notes[i].note;
			}
		}

		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				name="edit"
				className="myForm"
			>
				<label>
					Update note:
					<input
						autoFocus
						type="text"
						className="edit-note"
						name="edit"
						id="edit"
						placeholder={currentNote}
						onChange={handleChangeEdit}
					/>
				</label>
				<input
					type="submit"
					className="EditButton"
					value="Update"
					onClick={handleClickEdit}
				/>
			</form>
		);
	};

	const swapNotes = (noteIds) => {
		let getNoteData = [];

		for (let i = 0; i < notes.length; i++) {
			if (notes[i].id === noteIds[0]) {
				getNoteData.push({ id: notes[i].id, note: notes[i].note });
			}
			if (notes[i].id === noteIds[1]) {
				getNoteData.push({ id: notes[i].id, note: notes[i].note });
			}
		}

		for (let i = 0; i < notes.length; i++) {
			if (notes[i].id === getNoteData[0].id) {
				notes[i].note = getNoteData[1].note;
			}
			if (notes[i].id === getNoteData[1].id) {
				notes[i].note = getNoteData[0].note;
			}
		}
	};

	const selectNote = (id) => {
		let getElement = document.getElementById(id);

		if (getElement.classList.contains('note-selected'))
			getElement.classList.remove('note-selected');
		else getElement.classList.add('note-selected');
	};

	const ifTwoSelected = () => {
		let getSelectedElements = document.getElementsByClassName('note-selected');

		if (getSelectedElements.length === 2) {
			let getIds = [getSelectedElements[0].id, getSelectedElements[1].id];

			swapNotes(getIds);
			getSelectedElements[0].classList.remove('note-selected');
			getSelectedElements[0].classList.remove('note-selected');
		}
	};

	const showNotes = () => {
		return (
			<>
				{showEditForm ? EditNoteForm() : null}
				<div className="grid-6">
					{notes.map((item, index) => (
						<div
							key={index}
							id={item.id}
							className="note-item"
							onClick={() => {
								selectNote(item.id);
								ifTwoSelected();
								setSwapped(!swapped);
							}}
						>
							<p id={item.id} className="note-head">
								{index + 1}. {item.note}
							</p>
							<div className="buttons">
								<button
									onClick={() => {
										deleteNote(item.id);
										setDeleted(!deleted);
									}}
								>
									Delete
								</button>
								<button
									onClick={() => {
										setShowEditForm(!showEditForm);
										setToBeEdited(item.id);
										selectNote(item.id);
									}}
								>
									Edit
								</button>
							</div>
						</div>
					))}
				</div>
			</>
		);
	};

	return (
		<div>
			<button onClick={() => setShowCreateForm(!showCreateForm)}>
				Create new note
			</button>

			{showCreateForm ? createNoteForm() : null}

			{notes.length ? showNotes() : null}
		</div>
	);
}

export default Home;
