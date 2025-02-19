#include <stdio.h>

int main() {
    int *ptr = NULL;
    *ptr = 10;  // Dereferencing a NULL pointer (causes segmentation fault)
    printf("Value: %d\n", *ptr);
    return 0;
}
