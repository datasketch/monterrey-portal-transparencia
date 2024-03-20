import jsdom from 'jsdom';
import axios from 'axios';
import * as fs from 'fs';

const baseUrl = "https://www.monterrey.gob.mx/";

async function scrapeHtmlByLabelAndGenerateJSON() {
    console.log("Scrapping htmls by label...");
    try {
        const dataHtmlWithAccordion = await generateHtmlWithAccordionDocuments();
        const dataPublicServices = generatePublicServiceDocuments();
        const dataPermisosEne24 = await generateJustLinksDocuments([
            "https://www.monterrey.gob.mx/transparencia/Oficial/Permisos_Ene24.asp"
        ]); 
        let dataWithLabel = dataHtmlWithAccordion.concat(dataPublicServices).concat(dataPermisosEne24);
        writeFile(dataWithLabel, "../data/scrapped/dataScrappingByLabel.json");
        
        // Pendiente
        //const urls = await getPermisosSsypcUrls();
        //generateJustLinksDocuments(urls);

        // TODO
        // "https://www.monterrey.gob.mx/transparencia/Oficial/FIDEGRAN_Contratos.asp" accordion con label x titulo
        // "https://www.monterrey.gob.mx/transparencia/Oficial/SEDUE.asp" tabs, ya estan scrappeados los documentos
    } catch (error) {
        console.error('Error al hacer scraping:', error);
        return null;
    }
}

async function getPermisosSsypcUrls() {
    try {        
        const links = [];
        const url = "https://www.monterrey.gob.mx/transparencia/Oficial/PERMISOS_SSYPC.asp";
        const document = await getDocument(url);
            
        document.querySelectorAll('.col-md-9').forEach(element => {
            const elements = element.querySelector('.box.box-warning');

            elements.querySelectorAll('li a').forEach(linkElement => {
                const link = new URL(linkElement.href, baseUrl).href;
                links.push(link);
            });
        });
        return links;
        
    } catch (error) {
        console.error('Error al hacer scraping:', error);
        return null;
    }
}

async function generateJustLinksDocuments(urls) {
    try {     

        const data = [];
        for (const url of urls) {
            const documentos = [];
            const document = await getDocument(url);
            const label = document.querySelector('.box.box-warning p').textContent.match(/\d{4}/)[0];

            document.querySelectorAll('.box.box-warning a').forEach(linkElement => {
                    const link = new URL(linkElement.href, baseUrl).href;
                    const title = linkElement.textContent.trim();
                    const documento = { "title": title, "link": link };
                    documentos.push(documento);
            });
            data.push({ url, label, documentos });
        }
        
    } catch (error) {
        console.error('Error al hacer scraping:', error);
        return null;
    }
}

async function generateHtmlWithAccordionDocuments() {
    const urlsAccordion = ["https://www.monterrey.gob.mx/transparencia/Oficial/SAYUNTAMIENTO.asp", 
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2024.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2023.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2022.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2021.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2020.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2019.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2018.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2017.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/SSP_Index_Permisos2016.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac23.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac22.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac21.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac20.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac16.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac15.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco23.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco22.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco21.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco20.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco16.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco15.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano23.asp", 
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano22.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano21.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano20.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Subdivisiones17.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Subdivisiones16.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Subdivisiones15.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Obras_Publicas_Contratos.asp"
                    ];
        
        const data = [];
        for (const url of urlsAccordion) {
            const document = await getDocument(url);

            document.querySelectorAll('.accordion').forEach(element => {
                const label = element.textContent.trim().toLowerCase();
                const documentos = [];
                const elements = element.parentElement.querySelector('.panel3') || element.parentElement.querySelector('.panel33')

                elements.querySelectorAll('a').forEach(linkElement => {
                    const link = new URL(linkElement.href, baseUrl).href;
                    const title = linkElement.textContent.trim();
                    const documento = { "title": title, "link": link };
                    documentos.push(documento);
                });

                data.push({ url, label, documentos });
            });
        }   
        return data;
}

function generatePublicServiceDocuments() {
    return [
        {
          "url": "https://www.monterrey.gob.mx/transparencia/Oficial/ServiciosPublicos.asp",
          "label": "contratos y convenios",
          "documentos": [
            {
              "title": "Contrato de Concesión Red Recolector",
              "link": "https://www.monterrey.gob.mx/pdf/Hipervinculos/SERVICIOSPUBLICOS/Art._95_Fracc_XXVII/Contrato_de_Concesi%C3%B3n_Red_Recolector.pdf"
            }
          ]
        }
    ];
}

async function scrapeFullHtmlAndGenerateJSON() {
    console.log("Scrapping full htmls...");
    try {
        const urls = [
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac19.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac18.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Frac17.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco19.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco18.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/Eco17.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano19.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano18.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano17.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano16.asp",
                      "https://www.monterrey.gob.mx/transparencia/Oficial/ControlUrbano15.asp"
                    ];
        
        const data = [];
        for (const url of urls) {
            const document = await getDocument(url);

            document.querySelectorAll('.col-md-9').forEach(element => {
                const documentos = [];
                const elements = element.querySelector('.box.box-warning');

                elements.querySelectorAll('dd a').forEach(linkElement => {
                    const link = new URL(linkElement.href, baseUrl).href;
                    const title = linkElement.textContent.trim();
                    const documento = { "title": title, "link": link };
                    documentos.push(documento);
                });

                data.push({ url, documentos });
            });
        }
        writeFile(data, "../data/scrapped/dataFullScrapping.json");  
        
    } catch (error) {
        console.error('Error al hacer scraping:', error);
        return null;
    }
}

async function getDocument(url) {
    const response = await axios.get(url);
    const dom = new jsdom.JSDOM(response.data);
    return dom.window.document;
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

scrapeFullHtmlAndGenerateJSON();
scrapeHtmlByLabelAndGenerateJSON();

