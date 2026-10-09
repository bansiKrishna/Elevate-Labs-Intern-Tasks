package org.example;

import java.util.ArrayList;
import java.util.List;

public class BankAccount {
    private String accountHolder;
    private String accountNumber;
    private double balance;
    private List<String> transactions;

    public BankAccount(String accountHolder, String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial Balance cannot be negative!!!");
        }
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactions = new ArrayList<>();

        transactions.add("Account opened with balance: Rs. " + initialBalance);
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }

        balance += amount;
        transactions.add("Deposited: Rs. " + amount);
        System.out.println("Deposit successful.");
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
        } else if (amount > balance) {
            System.out.println("Insufficient balance.");
        } else {
            balance -= amount;
            transactions.add("Withdrawn: Rs. " + amount);
            System.out.println("Withdrawal successful.");
        }
    }

    public void checkBalance() {
        System.out.printf("Available Balance: Rs. %.2f%n", balance);
    }

    public void displayAccountDetails() {
        System.out.println("\n--- Account Details ---");
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Account Number: " + accountNumber);
        checkBalance();
    }

    public void showTransactions() {
        System.out.println("\n--- Transaction History ---");

        for (String transaction : transactions) {
            System.out.println(transaction);
        }
    }
}