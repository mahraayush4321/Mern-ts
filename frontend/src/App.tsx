import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/INotes";
import Notes from "./components/Notes";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./Network/Notes_api";
import AddNoteBox from "./components/AddNoteBox";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNote, setShowAddNote] = useState(false);

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

  return (
    <Container>
      <Button onClick={() => setShowAddNote(true)}></Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNote && (
        <AddNoteBox
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={() => {}}
        />
      )}
    </Container>
  );
}

export default App;
