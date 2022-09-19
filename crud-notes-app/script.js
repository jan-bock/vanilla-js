// const notesContainer = document.getElementById("notes-container");
// const addNoteButton = notesContainer.querySelector(".add-note");

// const getNotes = () => {
//     return JSON.parse(localStorage.getItem("notes") || "[]") //defaults to empty array if its a new session
// }

// addNoteButton.addEventListener("click", () => addNote());

// const saveNotes = (notes) => {
//     localStorage.setItem("notes", JSON.stringify(notes)); //stores notes array to localstorage
// }

// const createNote = (id, noteContent) => {
//     //create text area to create a new note element
    
//     const el = document.createElement("textarea");
//     el.classList.add("note");
//     el.value = noteContent;
//     el.placeholder = "empty note";
    
//     //on note content change:
//     el.addEventListener("change", () => {
//         updateNote(id, element.value);
//     })
    
//     el.addEventListener("dblclick", () => {
//         const doDelete = confirm("Confirm deletion")
//         if (doDelete) deleteNote(id, el);
//     })
// }

// getNotes().forEach(note => {
//     const noteElement = createNote(note.id, note.content)
//     notesContainer.insertBefore(noteElement, placeholder);
// })

// const deleteNote = (id, element) => {

// }

// const updateNote = (id, newContent) => {

// }

// const addNote = () => {
//     const existingNotes = getNotes();
//     const noteObject = {
//         id: Math.floor(Math.random * 100000),
//         content: ""
//     };

//     const noteElement = createNote(noteObject.id, noteObject.content);
//     notesContainer.insertBefore(noteElement, addNoteButton);

//     existingNotes.push(noteObject);
//     saveNotes(existingNotes);
// }

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Type to add a new note...";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}


