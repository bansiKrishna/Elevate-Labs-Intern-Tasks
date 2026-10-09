package org.example;

import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        System.out.println("Bank Account Simulation");

        Scanner sc =new Scanner(System.in);
        System.out.println("-----------------------------------------------");
        System.out.println("Enter Account Holder Name: ");
        String name  = sc.nextLine();

        System.out.println("Enter Account Number: ");
        String accountNumber = sc.nextLine();

        System.out.println("Enter Initial Deposit: ");
        double initialBalance = sc.nextDouble();

        if(initialBalance<0){
            System.out.println("Invalid initial balance!!");

            sc.close();
            return;
        }
        BankAccount account = new BankAccount(name , accountNumber, initialBalance);
        int choice;
        do {
            System.out.println("\n==========BANK MENU===================\n");
            System.out.println("1.Deposite Money");
            System.out.println("2.Withdraw Money");
            System.out.println("3.Check Balance");
            System.out.println("4.Account Details");
            System.out.println("5.Transactions");
            System.out.println("6.EXIT");
            System.out.println("Enter your choice: ");
            choice = sc.nextInt();
            switch (choice){
                case 1:
                    System.out.println("Enter deposite amount in Rs:");
                    account.deposit(sc.nextDouble());
                    break;
                case 2:
                    System.out.println("Enter withdrawal amount in Rs: ");
                    account.withdraw(sc.nextDouble());
                    break;
                case 3:
                    account.checkBalance();
                    break;
                case 4:
                    account.displayAccountDetails();
                    break;
                case 5:
                    account.showTransactions();
                    break;
                case 6:
                    System.out.println("Thank You!!!");
                    break;
                default:
                    System.out.println("Invalid Choice!!!");
            }
        }while (choice!=6);
        sc.close();
    }
}