import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/INotes";
import Notes from "./components/Notes";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./Network/Notes_api";
import AddNoteBox from "./components/AddEditNoteBox";
import { FaPlus } from "react-icons/fa";
import AddEditNoteBox from "./components/AddEditNoteBox";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNote, setShowAddNote] = useState(false);

  const [noteEdit, setnoteEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button className="mb-4" onClick={() => setShowAddNote(true)}>
        <FaPlus />
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes
              note={note}
              className={styles.note}
              onNoteClicked={setnoteEdit}
              ondeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNote && (
        <AddNoteBox
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
      {noteEdit && (
        <AddEditNoteBox
          noteToEdit={noteEdit}
          onDismiss={() => setnoteEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setnoteEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
