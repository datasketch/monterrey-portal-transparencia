import jsdom from 'jsdom';
import axios from 'axios';
import * as fs from 'fs';

async function scrapeAndGenerateJSON() {
    try {
        const urls = ["https://www.monterrey.gob.mx/transparencia/Oficial/SAYUNTAMIENTO.asp", 
                      //"https://www.monterrey.gob.mx/transparencia/Oficial/Permisos_Ene24.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2024.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2023.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2022.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2021.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2020.asp",
                      //"https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2019.asp",
                      //"https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2018.asp",
                      //"https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2017.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2016.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac23.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac22.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac21.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac20.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac19.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac18.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac17.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac16.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac15.asp"];
        
        for (const url of urls) {
            const response = await axios.get(url);
            const dom = new jsdom.JSDOM(response.data);
            const document = dom.window.document;

            const data = [];
            const baseUrl = "https://www.monterrey.gob.mx/";

            document.querySelectorAll('.accordion').forEach(element => {
                const label = element.textContent.trim();
                const documentos = [];

                const elements = element.parentElement.querySelector('.panel3') || element.parentElement.querySelector('.panel33')

                elements.querySelectorAll('a').forEach(linkElement => {
                    //const link = linkElement.href;
                    const link = new URL(linkElement.href, baseUrl).href;
                    const title = linkElement.textContent.trim();
                    const documento = { "title": title, "link": link };
                    documentos.push(documento);
                });

                data.push({ label, documentos });
            });

            const fileName = url.split("/").pop();
            const nameWithoutExtension = fileName.split(".")[0];

            const filePath = "../data/scrapped/" + nameWithoutExtension + ".json";
            writeFile(data, filePath);
        }
        
    } catch (error) {
        console.error('Error al hacer scraping:', error);
        return null;
    }
}

function writeFile(processedJson, filePath) {

  try {
      const jsonString = JSON.stringify(processedJson, null, 2);
      fs.writeFileSync(filePath, jsonString, "utf-8");
      console.log(`File ${filePath} created successfully.`);
  } catch (err) {
      console.error("Error writing file:", err);
  }
}

scrapeAndGenerateJSON();

