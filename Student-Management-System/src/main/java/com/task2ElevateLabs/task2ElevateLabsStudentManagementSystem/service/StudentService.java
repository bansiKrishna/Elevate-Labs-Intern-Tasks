package com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem.service;


import com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();

    private Long nextId = 1L;

    // CREATE
    public Student addStudent(Student student) {
        student.setId(nextId++);
        students.add(student);
        return student;
    }

    // READ ALL
    public List<Student> getAllStudents() {
        return students;
    }

    // READ BY ID
    public Student getStudentById(Long id) {

        for (Student student : students) {
            if (student.getId().equals(id)) {
                return student;
            }
        }

        return null;
    }

    // UPDATE
    public Student updateStudent(Long id, Student updatedStudent) {

        for (Student student : students) {

            if (student.getId().equals(id)) {

                student.setName(updatedStudent.getName());
                student.setEmail(updatedStudent.getEmail());
                student.setBranch(updatedStudent.getBranch());
                student.setSemester(updatedStudent.getSemester());

                return student;
            }
        }

        return null;
    }

    // DELETE
    public boolean deleteStudent(Long id) {

        return students.removeIf(
                student -> student.getId().equals(id)
        );
    }
}