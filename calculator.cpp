#include <iostream>

using namespace std;
int main() {
	int birth_year;
	int current_year;

	cout << "Введіть ваш рік народження:";
	cin >> birth_year; //зчитуємо введений рік народження то і буде нашою змінною
	cout << "Введіть поточний рік:";
	cin >> current_year; //зчитуємо введений рік це і буде значення нашої змінної
	int age = current_year - birth_year;
	cout << "Ваш вік:" << age << endl;
	return 0;
}
