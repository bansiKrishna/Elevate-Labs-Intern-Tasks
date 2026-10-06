package com.notesManager.NotesApp.controller;


import com.notesManager.NotesApp.Note;
import com.notesManager.NotesApp.service.NotesService;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NotesService notesService;

    public NotesController(NotesService notesService) {
        this.notesService = notesService;
    }

    @PostMapping
    public String addNote(@RequestBody String content) {
        return notesService.addNote(content);
    }

    @GetMapping
    public List<Note> getNotes() {
        return notesService.getNotes();
    }

    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable int id) {
        return notesService.deleteNote(id);
    }
}