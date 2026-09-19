#include <iostream>

using namespace std;
int main() {
	int score = 20;
	int bonus = score++;
	cout << score << endl;
	cout << bonus << endl;
	int penalty = --score;
	cout << penalty << endl;
	cout << score << endl;
	return 0;
}
