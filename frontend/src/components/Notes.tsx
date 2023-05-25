import React from "react";
import { Note as NoteModel } from "../models/INotes";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/Utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
interface NotesProps {
  note: NoteModel;
  className?: string;
  onNoteClicked: (note: NoteModel) => void;
  ondeleteNoteClicked: (note: NoteModel) => void;
}

const Notes = ({
  note,
  className,
  ondeleteNoteClicked,
  onNoteClicked,
}: NotesProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              ondeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Notes;
