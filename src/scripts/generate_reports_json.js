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
      conservation_of_information: element.conservacion_de_la_informacion,
      periodicity_of_information: element.periodicidad_de_la_informacion,
      start_year:  element.ano_de_inicio,
      end_year: element.ano_de_finalizacion,
      start_month: element.mes_de_inicio,
      end_month: element.mes_de_finalizacion,
      start_quarter: element.trimestre_de_inicio,
      end_quarter: element.trimestre_de_finalizacion,
      bimester: element.bimestre,
      biweekly: element.quincena,
      date: element.fecha,
      responsible: element.responsable, // existe en el json?
      record_number: element.numero_de_acta,
      session_number: element.numero_de_sesion,
      external_link_name: element.nombre_del_enlace_externo,
      external_link: element.enlace_externo,
      observation: element.observation,
      errata: element.fe_de_erratas,
      assistence_type: element.tipo_de_asistencia, // existe en el json?
      name_of_the_public_citizen_consultation: element.nombre_de_la_consulta_ciudadana_publica,
      link_of_the_public_citizen_consultation: element.enlace_de_la_consulta_ciudadana_publica,
      gazette_type: element.tipo_de_gaceta,
      gazette_number: element.numero_de_gaceta,
      section_number: element.numero_de_seccion,
      district: element.distrito,
      plan_or_program: element.plan_o_programa,
      norm: element.norma,
      topic: element.tema,
      document_format: element.documento_formato // existe en el json?
    };

    const isDuplicate = processedReports.some(existingReport => 
    existingReport.title === report.title &&
    existingReport.description === report.description &&
    existingReport.link === report.link &&
    existingReport.conservation_of_information === report.conservation_of_information &&
    existingReport.periodicity_of_information === report.periodicity_of_information &&
    existingReport.start_year === report.start_year &&
    existingReport.end_year === report.end_year &&
    existingReport.start_month === report.start_month &&
    existingReport.end_month === report.end_month &&
    existingReport.start_quarter === report.start_quarter &&
    existingReport.end_quarter === report.end_quarter &&
    existingReport.bimester === report.bimester &&
    existingReport.biweekly === report.biweekly &&
    existingReport.date === report.date &&
    existingReport.responsible === report.responsible &&
    existingReport.record_number === report.record_number &&
    existingReport.session_number === report.session_number &&
    existingReport.external_link_name === report.external_link_name &&
    existingReport.external_link === report.external_link &&
    existingReport.observation === report.observation &&
    existingReport.errata === report.errata &&
    existingReport.assistence_type === report.assistence_type &&
    existingReport.name_of_the_public_citizen_consultation === report.name_of_the_public_citizen_consultation &&
    existingReport.link_of_the_public_citizen_consultation === report.link_of_the_public_citizen_consultation &&
    existingReport.gazette_type === report.gazette_type &&
    existingReport.gazette_number === report.gazette_number &&
    existingReport.section_number === report.section_number &&
    existingReport.district === report.district &&
    existingReport.plan_or_program === report.plan_or_program &&
    existingReport.norm === report.norm &&
    existingReport.topic === report.topic &&
    existingReport.document_format === report.document_format
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