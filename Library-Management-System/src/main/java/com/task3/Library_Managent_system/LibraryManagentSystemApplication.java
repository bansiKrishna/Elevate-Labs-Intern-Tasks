package com.task3.Library_Managent_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Scanner;

@SpringBootApplication
public class LibraryManagentSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryManagentSystemApplication.class, args);
		Scanner scanner = new Scanner(System.in);
		Library library = new Library();

		System.out.println("Server started for Library Management system ");


		while (true) {

			System.out.println("\n========== LIBRARY MANAGEMENT SYSTEM ==========");
			System.out.println("1. Add Book");
			System.out.println("2. Add User");
			System.out.println("3. Display Books");
			System.out.println("4. Display Users");
			System.out.println("5. Issue Book");
			System.out.println("6. Return Book");
			System.out.println("7. Exit");
			System.out.print("Enter your choice: ");

			int choice = scanner.nextInt();
			scanner.nextLine();

			switch (choice) {

				case 1:
					System.out.print("Enter Book ID: ");
					int bookId = scanner.nextInt();
					scanner.nextLine();

					System.out.print("Enter Book Title: ");
					String title = scanner.nextLine();

					System.out.print("Enter Author: ");
					String author = scanner.nextLine();

					library.addBook(
							new Book(bookId, title, author)
					);
					break;

				case 2:
					System.out.print("Enter User ID: ");
					int userId = scanner.nextInt();
					scanner.nextLine();

					System.out.print("Enter User Name: ");
					String name = scanner.nextLine();

					library.addUser(
							new User(userId, name)
					);
					break;

				case 3:
					library.displayBooks();
					break;

				case 4:
					library.displayUsers();
					break;

				case 5:
					System.out.print("Enter Book ID: ");
					int issueBookId = scanner.nextInt();

					System.out.print("Enter User ID: ");
					int issueUserId = scanner.nextInt();

					library.issueBook(
							issueBookId,
							issueUserId
					);
					break;

				case 6:
					System.out.print("Enter Book ID: ");
					int returnBookId = scanner.nextInt();

					library.returnBook(returnBookId);
					break;

				case 7:
					System.out.println("Thank you for using the Library Management System.");
					scanner.close();
					return;

				default:
					System.out.println("Invalid choice. Please try again.");

			}
		}

	}

}
