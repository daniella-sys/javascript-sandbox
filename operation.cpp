#include <iostream>

using namespace std;
int main() {
	int total_seconds;
	cout << "Загальна кількість секунд:";
	cin >> total_seconds; //зчитали те що ввів користувач
	int minutes = total_seconds / 60;
	int seconds = total_seconds % 60; //залишок скунд
	cout << total_seconds << "сек" << "= " << minutes << "хв" << seconds << "сек" << endl;
	return 0;
}
