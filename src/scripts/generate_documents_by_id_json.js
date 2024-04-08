import jsdom from 'jsdom';
import axios from 'axios';
import * as fs from 'fs';

const baseUrl = 'https://www.monterrey.gob.mx/';

scrapeHtmlByIdAndGenerateJSON();

async function scrapeHtmlByIdAndGenerateJSON() {
  console.log('Scrapping htmls by id...');
  try {
    const data = [];
    await addAyudantamientoDictamenesDocs(data);
    addNormatividadDocs(data);
    await addCalendarizacionYAsistenciaASesiones(data);
    writeFile(data, '../data/scrapped/dataScrappingById.json');
    
  } catch (error) {
    console.error('Error al hacer scraping:', error);
    return null;
  }
}

async function addCalendarizacionYAsistenciaASesiones(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial_/Ayuntamiento_Sesiones_y_Comisiones.html";
  const document = await getDocument(url);

  for (let year = 2019; year <= 2024; year++) {
      const documentos = [];
      const elements = document.querySelectorAll('.tabs a');
  
      elements.forEach((linkElement) => {
          const link = new URL(linkElement.href, baseUrl).href;
          const title = linkElement.textContent.trim();
          const regex = /(\d{4})\//;
          const match = link.match(regex);
          if (match && year == match[1]) {
            const documento = { title: title, link: link };
            documentos.push(documento);
          }
      });
  
      let id = `calendarizacion-y-asistencia-a-sesiones-y-comisiones-${year}_ayuntamiento-sesiones-y-comisiones_portal-transparencia`;
      data.push({ id, documentos });
  }
}

async function addAyudantamientoDictamenesDocs(data) {
  const prefixId = "_dictamenes-anos-2009-2023_ayuntamiento-sesiones-y-comisiones_portal-transparencia";
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial/Index_Dictamenes.asp";
  const document = await getDocument(url);

  for (let year = 2019; year <= 2023; year++) {
      const documentos = [];
      const elements = document.getElementById(year);
  
      elements.querySelectorAll('a').forEach((linkElement) => {
          const link = new URL(linkElement.href, baseUrl).href;
          const title = linkElement.textContent.trim();
          const documento = { title: title, link: link };
          documentos.push(documento);
      });
  
      let id = year + prefixId;
      data.push({ id, documentos });
  }
}

function addNormatividadDocs(data) {
    const documentos = [];
    const documento = { title: "NORMATIVIDAD RELACIONADA CON LAS ACTAS DE LAS SESIONES", link: "https://www.monterrey.gob.mx/pdf/portaln/2020/NORMATIVIDAD%20RELACIONADA%20CON%20LAS%20ACTAS%20DE%20LAS%20SESIONES.docx"};
    documentos.push(documento);
    const id = "normatividad-relacionada-con-las-sesiones-votacion-e-integracion-de-comisiones-del-ayuntamiento_ayuntamiento-sesiones-y-comisiones_portal-transparencia";
    data.push({ id, documentos });
}

function writeFile(processedJson, filePath) {
    try {
      const jsonString = JSON.stringify(processedJson, null, 2);
      fs.writeFileSync(filePath, jsonString, 'utf-8');
      console.log(`File ${filePath} created successfully.`);
    } catch (err) {
      console.error('Error writing file:', err);
    }
}

async function getDocument(url) {
    const response = await axios.get(url);
    const dom = new jsdom.JSDOM(response.data);
    return dom.window.document;
}
