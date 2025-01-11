#include <stdio.h>

int main() {
	int n, i, sum = 0, temp;
	scanf(" %d", &n);

	for(i = 0; i < n; i++) {
		scanf(" %d", &temp);
		sum += temp;
	}

	printf("%d\n", sum);
}
