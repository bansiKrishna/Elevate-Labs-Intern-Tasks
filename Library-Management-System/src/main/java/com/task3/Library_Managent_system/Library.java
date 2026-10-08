package com.task3.Library_Managent_system;


import java.util.ArrayList;

public class Library {

    private ArrayList<Book> books;
    private ArrayList<User> users;

    public Library() {
        books = new ArrayList<>();
        users = new ArrayList<>();
    }

    public void addBook(Book book) {
        books.add(book);
        System.out.println("Book added successfully.");
    }

    public void addUser(User user) {
        users.add(user);
        System.out.println("User added successfully.");
    }

    public void displayBooks() {
        System.out.println("\n===== BOOK LIST =====");

        if (books.isEmpty()) {
            System.out.println("No books available.");
            return;
        }

        for (Book book : books) {
            book.displayBook();
        }
    }

    public void displayUsers() {
        System.out.println("\n===== USER LIST =====");

        if (users.isEmpty()) {
            System.out.println("No users registered.");
            return;
        }

        for (User user : users) {
            user.displayUser();
        }
    }

    public void issueBook(int bookId, int userId) {

        Book selectedBook = null;
        User selectedUser = null;

        for (Book book : books) {
            if (book.getBookId() == bookId) {
                selectedBook = book;
                break;
            }
        }

        for (User user : users) {
            if (user.getUserId() == userId) {
                selectedUser = user;
                break;
            }
        }

        if (selectedBook == null) {
            System.out.println("Book not found.");
            return;
        }

        if (selectedUser == null) {
            System.out.println("User not found.");
            return;
        }

        if (!selectedBook.isAvailable()) {
            System.out.println("Book is already issued.");
            return;
        }

        selectedBook.issueBook();

        System.out.println(
                "Book \"" + selectedBook.getTitle() +
                        "\" issued to " + selectedUser.getName() + "."
        );
    }

    public void returnBook(int bookId) {

        for (Book book : books) {

            if (book.getBookId() == bookId) {

                if (book.isAvailable()) {
                    System.out.println("Book is already available.");
                    return;
                }

                book.returnBook();

                System.out.println(
                        "Book \"" + book.getTitle() +
                                "\" returned successfully."
                );

                return;
            }
        }

        System.out.println("Book not found.");
    }
}