import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double result = sc.nextDouble();

        while (true) {

            System.out.print("Enter operator (+, -, *, /) or '=' to exit: ");
            char operator = sc.next().charAt(0);

            if (operator == '=') {
                break;
            }

            System.out.print("Enter number: ");
            double num = sc.nextDouble();

            switch (operator) {
                case '+':
                    result += num;
                    break;

                case '-':
                    result -= num;
                    break;

                case '*':
                    result *= num;
                    break;

                case '/':
                    if (num == 0) {
                        System.out.println("Cannot divide by zero!");
                        continue;
                    }
                    result /= num;
                    break;

                default:
                    System.out.println("Invalid operator!");
                    continue;
            }

            System.out.println("Answer = " + result);
        }

        System.out.println("Final Answer = " + result);
        sc.close();
    }
}