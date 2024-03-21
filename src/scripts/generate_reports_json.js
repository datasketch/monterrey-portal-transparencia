import * as fs from "fs";
import { readFileSync } from "fs";

const reportJsonPath = "../data/raw/transparency_report.json";
const dataFullScrappingPath = "../data/scrapped/dataFullScrapping.json";
const dataScrappingByLabelPath = "../data/scrapped/dataScrappingByLabel.json";

try {
  const reportJsonContent = readFileSync(reportJsonPath, "utf-8");
  const reportJsonData = JSON.parse(reportJsonContent);
  const dataScrappingByLabelJsonContent = readFileSync(dataScrappingByLabelPath, "utf-8");
  const dataScrappingByLabelJsonData = JSON.parse(dataScrappingByLabelJsonContent);
  const dataFullScrappingJsonContent = readFileSync(dataFullScrappingPath, "utf-8");
  const dataFullScrappingJsonData = JSON.parse(dataFullScrappingJsonContent);

  const processedReports = [];

  reportJsonData.forEach((element) => {
    let title = element.fraccion_nombre_del_documento;
    if(!element.fraccion_nombre_del_documento && element.documentos[0]) {
      const fileName = element.documentos[0].split("/").pop();
      title = fileName.split(".")[0];
    }
    const report = {
      title: title,
      description: element.descripcion,
      link: element.documentos[0],
      year: element.ano_de_inicio || element.ano_de_finalizacion,
      month: element.mes_de_inicio || element.mes_de_finalizacion,
      date: element.fecha
    };

    const isDuplicate = processedReports.some(existingReport => 
      existingReport.title === report.title &&
      existingReport.description === report.description &&
      existingReport.link === report.link &&
      existingReport.year === report.year &&
      existingReport.month === report.month &&
      existingReport.date === report.date
    );

    if(!isDuplicate) {
      processedReports.push(report);
    }
    
  });

  dataScrappingByLabelJsonData.forEach((element) => {
    if(element) {
      processedReports.push(...element.documentos);
    }
  });

  dataFullScrappingJsonData.forEach((element) => {
    if(element) {
      processedReports.push(...element.documentos);
    }
  });

  writeFile(processedReports);
} catch(error) {
    console.error("Error parsing file:", error.message);
}


function writeFile(processedJson) {
    const filePath = "../data/processed/reports.json";

    try {
        const jsonString = JSON.stringify(processedJson, null, 2);
        fs.writeFileSync(filePath, jsonString, "utf-8");
        console.log(`File ${filePath} created successfully.`);
    } catch (err) {
        console.error("Error writing file:", err);
    }
}