#include <iostream>

#include <cmath>
using namespace std;
int main() {
	double a;
	double b;
	cout << "Введіть значення катета а:";
	cin >> a;
	cout << "Введіть значення катета b:";
	cin >> b;
	double c = sqrt(pow(a, 2) + pow(b, 2));
	cout << "Гіпотенуза с=" << c << endl;
	return 0;
}
