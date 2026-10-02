package com.task2ElevateLabs.task2ElevateLabsStudentManagementSystem;


import com.fasterxml.jackson.annotation.JsonTypeId;
import jakarta.websocket.server.ServerEndpoint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {


    private Long id;
    private String name;
    private double marks;
    private String semester;
    private String branch;
    private String email;

}
