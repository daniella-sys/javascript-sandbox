#include <iostream>

using namespace std;
int main() {
	double price;
	int quantity;
	cout << "Ціна товару:";
	cin >> price; //зчитуємо ціну яку введе користувач це і буде значення нашої змінної
	cout << "Кількість товарів:";
	cin >> quantity;
	double total_cost = price * quantity;
	cout << "Загальна вартість:" << total_cost << endl;
	return 0;
}
