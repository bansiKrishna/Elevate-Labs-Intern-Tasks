package com.task3.Library_Managent_system;

public class Book {

    private  int bookId;
    private String title;
    private String author;
    private Boolean available;

    public Book(int bookId,  String title,String author){
        this.bookId = bookId;
        this.author = author;
        this.title = title;
        this.available = true;
    }

    public int getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Boolean isAvailable() {
        return available;
    }

    public void issueBook(){
        available = false;
    }
    public void returnBook(){
        available = true;
    }

    public void displayBook(){
        System.out.println(
                "Id:" + bookId +
                " Title:" + title+
                " Author:" + author +
                " status:" + (available ? "Available" : "Issued")
        );
    }
}

