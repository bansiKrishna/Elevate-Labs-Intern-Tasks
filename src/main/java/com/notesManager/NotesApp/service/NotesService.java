package com.notesManager.NotesApp.service;

import com.notesManager.NotesApp.Note;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotesService {

    private static final String FILE_NAME = "notes.txt";

    // Add a note
    public String addNote(String content) {

        List<Note> notes = getNotes();

        int newId = notes.isEmpty()
                ? 1
                : notes.get(notes.size() - 1).getId() + 1;

        try (FileWriter writer = new FileWriter(FILE_NAME, true)) {

            writer.write(newId + "|" + content);
            writer.write(System.lineSeparator());

            return "Note added successfully.";

        } catch (IOException e) {

            return "Error saving note: " + e.getMessage();
        }
    }

    // Get all notes
    public List<Note> getNotes() {

        List<Note> notes = new ArrayList<>();

        try (FileReader reader = new FileReader(FILE_NAME)) {

            StringBuilder line = new StringBuilder();
            int character;

            while ((character = reader.read()) != -1) {

                if (character == '\n') {

                    addNoteFromLine(notes, line.toString().trim());
                    line.setLength(0);

                } else if (character != '\r') {

                    line.append((char) character);
                }
            }

            // Read last line
            if (!line.isEmpty()) {
                addNoteFromLine(notes, line.toString().trim());
            }

        } catch (IOException e) {

            // File does not exist yet
        }

        return notes;
    }

    // Convert file line into Note object
    private void addNoteFromLine(List<Note> notes, String line) {

        if (line.isEmpty()) {
            return;
        }

        String[] parts = line.split("\\|", 2);

        if (parts.length == 2) {

            int id = Integer.parseInt(parts[0]);
            String content = parts[1];

            notes.add(new Note(id, content));
        }
    }

    // Delete note by ID
    public String deleteNote(int id) {

        List<Note> notes = getNotes();

        boolean removed = notes.removeIf(note -> note.getId() == id);

        if (!removed) {
            return "Note with ID " + id + " not found.";
        }

        try (FileWriter writer = new FileWriter(FILE_NAME)) {

            for (Note note : notes) {

                writer.write(note.getId() + "|" + note.getContent());
                writer.write(System.lineSeparator());
            }

            return "Note deleted successfully.";

        } catch (IOException e) {

            return "Error deleting note: " + e.getMessage();
        }
    }
}