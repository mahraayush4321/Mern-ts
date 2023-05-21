import React from "react";
import { Note as NoteModel } from "../models/INotes";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";

interface NotesProps {
  note: NoteModel;
  className?: string;
}

const Notes = ({ note, className }: NotesProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Notes;