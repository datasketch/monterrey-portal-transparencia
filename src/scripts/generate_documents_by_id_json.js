import jsdom from 'jsdom';
import axios from 'axios';
import * as fs from 'fs';

const baseUrl = 'https://www.monterrey.gob.mx/';

scrapeHtmlByIdAndGenerateJSON();

async function scrapeHtmlByIdAndGenerateJSON() {
  console.log('Scrapping htmls by id...');
  try {
    const prefixId = "_dictamenes-anos-2009-2023_ayuntamiento-sesiones-y-comisiones_portal-transparencia";
    const url = "https://www.monterrey.gob.mx/transparencia/Oficial/Index_Dictamenes.asp";

    const data = [];
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
     
    writeFile(data, '../data/scrapped/dataScrappingById.json');
    
  } catch (error) {
    console.error('Error al hacer scraping:', error);
    return null;
  }
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
