#include <iostream>

using namespace std;
int main() {
	int counter = 10;
	int a = counter++;
	cout << "Постфіксний інкремент:" << a << endl;
	cout << "Couter:" << counter << endl;

	int b = ++counter;
	cout << b << endl;
	cout << counter << endl;
	return 0;
}
