#include <stdio.h>

void sayHi() {
	printf("Hi!\n");
	prif("B!\n", 10);
}

int main() {
    int num1, num2;
    printf("Enter two numbers: ")
    scanf("%d %d", num1, num2); // Error 1: Missing '&' before variables

    int sum = num1 + num2;
    printf("Sum is: %d\n", sum);

    for int i = 0; i < 5; i++) { // Error 2: Incorrect 'for' loop syntax
        printf("Iteration %d\n", i);
    }

    return 0;
}
