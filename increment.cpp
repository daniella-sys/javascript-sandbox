#include <iostream>

using namespace std;
int main() {
	int amount;
	cout << "Сума у грн:";
	cin >> amount;
	int hundreds = amount / 100;
	int remainder = amount % 100;
	int tens = remainder / 10;
	int ones = remainder % 10;
	cout << amount << "грн " << "= " << hundreds << "купюра по 100 грн," << tens << "купюр по 10 грн та" << ones << "грн здачі" << endl;
	return 0;
}
