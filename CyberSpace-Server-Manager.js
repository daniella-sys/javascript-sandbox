//'utf-8' додавати при кожному читанні файла
import fs from 'fs/promises';
async function checkEnvironment(){
  try{
    const step1 = await fs.readFile("server_settings.json", 'utf-8');
  }catch(error){
    const file = `{"serverName": "UA_Zone", "maxSlots": 50, "maintenance": false}`;
    await fs.writeFile("server_settings.json", file);
  }
}
async function processChatModeration(){
  try{
    const step2 = await fs.readFile("raw_chat.txt", 'utf-8');
    const step3 = step2.split(' '); //розбиваєз пробілами
    const step4 = step3.filter((item) => item !== "SPAM" &&  item !== "AD");
    const step5 = step4.join(' ');
    const step6 = await fs.writeFile('filtered_chat.txt', step5);
  }catch(error){
    console.log(error);
  }
}
async function analyzeServerLogs(){
  try{
    const step7 = await fs.readFile('filtered_chat.txt', 'utf-8');
    const step8 = step7.includes("DDoS") || step7.includes("CRASH");
    if(step8 === true){
      await fs.appendFile('security_alerts.log', "\n" + "Критична загроза безпеці!");
    }else{
      await fs.appendFile('security_alerts.log', "\n" + "Сканування безпеки пройдено успішно.");
    }
  }catch(error){
    console.log(error);
  }
}
async function calculateDonations(){
  try{
    const step9 = await fs.readFile('donations.txt', 'utf-8');
    const step10 = step9.split('-');
    const step11 = step10.reduce((accumulator, item) => {
      return accumulator + Number(item);
    }, 0);
    const step12 = await fs.writeFile('total_revenue.txt', step11);
  }catch(error){
   console.log(error);
  }
}
async function generateReport(){
  try{
    const step13 = await fs.readFile('total_revenue.txt', 'utf-8');
    const step67 = await fs.readFile('filtered_chat.txt', 'utf-8');
    const step14 = step67.length;
    const step15 = "ЗВІТ СЕРВЕРА: Загальний донат становить" + step13 + "грн. Очищений чат містить" + step14 + "символів.";
    const step16 =  await fs.writeFile('final_report.txt', step15);
  }catch(error){
    console.log(error);
  }
}
async function main() {
  try {
    await checkEnvironment();
    await processChatModeration();
    await analyzeServerLogs();
    await calculateDonations();
    await generateReport();
    console.log(" Проект успішно виконано! Всі звіти згенеровано.");
  } catch (err) {
    console.log("Глобальна помилка проекту:", err.message);
  }
}

main();
