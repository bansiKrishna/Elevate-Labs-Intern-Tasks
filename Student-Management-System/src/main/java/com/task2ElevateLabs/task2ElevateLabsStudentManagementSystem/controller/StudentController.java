package com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem.controller;

import com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem.Student;
import com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    //add student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    //Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get a single student details
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    //    update student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        boolean deleted = studentService.deleteStudent(id);

        if (deleted) {
            return "Student deleted successfully";
        }

        return "Student not found";
    }
}
