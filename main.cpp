#include <iostream>

using namespace std;
int main() {
	//оголосили змінні
	int id;
	float price;
	char category_code;
	bool in_stock;
	//присвоєння їм значення 
	id = 186;
	price = 456.62;
	category_code = 'A';
	in_stock = false;
	//Вивід інформації про товар 
	cout << "Id:" << id << endl;
	cout << "Price:" << price << endl;
	cout << "Category code:" << category_code << endl;
	cout << "In stock:" << in_stock << endl;
}
