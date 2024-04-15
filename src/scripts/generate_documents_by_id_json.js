import jsdom from 'jsdom';
import axios from 'axios';
import * as fs from 'fs';

const baseUrl = 'https://www.monterrey.gob.mx/';

scrapeHtmlByIdAndGenerateJSON();

async function scrapeHtmlByIdAndGenerateJSON() {
  console.log('Scrapping htmls by id...');
  try {
    const data = [];
    await addAyudantamientoDictamenes(data);
    
    addNormatividadDocs(data);
    
    await addCalendarizacionYAsistenciaASesiones(data);
    
    await addSolicitaInformacionPublicaInformesIndicadores(data);
    await addSolicitaInformacionPublicaNomina(data); 
    addSolicitaInformacionPublicaInfoReservada(data);
    addSolicitaInformacionPublicaPadronTestigosSociales(data);
    await addSolicitaInformacionPublicaTestimoniosTestigosSociales(data);
    await addSolicitaInformacionPublicaCalendarioActividades(data);
    await addSolicitaInformacionPublicaAdquisiciones(data);
   
    addEstadisticasDeSolicitudesDeInformacion(data);
    
    writeFile(data, '../data/scrapped/dataScrappingById.json');
    
  } catch (error) {
    console.error('Error al hacer scraping:', error);
    return null;
  }
}

// Función para eliminar acentos de una cadena de texto
function eliminarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function addSolicitaInformacionPublicaAdquisiciones(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial_/Adquisiciones_.html";
  const document = await getDocument(url);

  const documentos = [];
  const elements = document.querySelectorAll('div.scrollable table a');

  elements.forEach((linkElement) => {
    const link = new URL(linkElement.href, baseUrl).href;
    const title = linkElement.textContent.trim();
    const documento = { title: title, link: link };
    documentos.push(documento);
  });

  let id = "plan-anual-de-adquisiciones_adquisiciones-arrendamientos-y-prestacion-de-servicios_adquisiciones_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

async function addSolicitaInformacionPublicaCalendarioActividades(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial_/Ciudadanos_ACDR.html";
  const document = await getDocument(url);

  const documentos = [];
  const elements = document.querySelectorAll('.striped a');

  elements.forEach((linkElement) => {
    const link = new URL(linkElement.href, baseUrl).href;
    const title = linkElement.textContent.trim();
    const documento = { title: title, link: link };
    documentos.push(documento);
  });

  let id = "calendario-de-actividades-culturales-deportivas-y-recreativas_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

async function addSolicitaInformacionPublicaTestimoniosTestigosSociales(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial_/Testigos_Sociales.html";
  const document = await getDocument(url);

  const documentos = [];
  const elements = document.querySelectorAll('#comments p a');

  elements.forEach((linkElement, index) => {
    if(index != 0) {
      const link = new URL(linkElement.href, baseUrl).href;
      const title = linkElement.textContent.trim();
      const documento = { title: title, link: link };
      documentos.push(documento);
    }
  });

  let id = "testimonios-de-testigos-sociales_testimonios-de-testigos-sociales_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

function addSolicitaInformacionPublicaPadronTestigosSociales(data) {
  let documentos = [];
  let documento = { title: "directorio_de_testigos_sociales_actualizado_a_25.08.2023", link: "https://www.nl.gob.mx/sites/default/files/directorio_de_testigos_sociales_actualizado_a_25.08.2023.pdf"};
  documentos.push(documento);
  let id = "padron-de-testigos-sociales_testimonios-de-testigos-sociales_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

function addSolicitaInformacionPublicaInfoReservada(data) {
  let documentos = [];
  let documento = { title: "ÍNDICES DE INFORMACIÓN RESERVADA DE LA ADMINISTRACIÓN PÚBLICA CENTRALIZADA DEL MUNICIPIO DE MONTERREY", link: "https://www.monterrey.gob.mx/pdf/portaln/2023/Indice_Acuerdos_Reserva_Mpio_Mty_noviembre23.xlsx"};
  documentos.push(documento);
  let id = "indices-de-informacion-reservada-de-la-administraicon-publica-centralizada-del-municipio-de-monterrey_indice-de-informacion-reservada_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
  documentos = [];
  documento = { title: "Instituto de la Juventud", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/INJURE_02_Indice_Acuerdos_Reserva.xlsx"};
  documentos.push(documento);
  documento = { title: "Instituto Municipal de Mujeres Regias", link: "https://www.monterrey.gob.mx/pdf/portaln/2023/IMMR_2023_JULIO_DICIEMBRE_Indice-Acuerdos-Reserva.xlsx"};
  documentos.push(documento);
  documento = { title: "Instituto Municipal de Planeación Urbana y Convivencia", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/IMPLANC_2024_03_INDICE_DE_ACUERDOS_DE_RESERVA.xlsx"};
  documentos.push(documento);
  documento = { title: "Fideicomiso Distrito Tec", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/FIDETEC_2024_03_MARZO_INDICE_ACUERDO_RESERVA.xlsx"};
  documentos.push(documento);
  documento = { title: "Fideicomiso de Mantenimiento Monterrey", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/FIDEM_2024_Indice_de_Expedientes_Reservados.xlsx"};
  documentos.push(documento);
  id = "indices-de-informacion-reservada-de-la-administracion-publica-paramunicipal_consulta-solicitudes-publicas-concluidas-y-sus-respuestas_indice-de-informacion-reservada_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

function addEstadisticasDeSolicitudesDeInformacion(data) {
  let documentos = [];
  let documento = { title: "ESTADÍSTICAS 2024", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/Indicadores_Transparencia_FEB24.xlsx"};
  documentos.push(documento);
  let id = "estadisticas-2024_estadisticas-de-solicitudes-de-informacion_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
  documentos = [];
  documento = { title: "ESTADÍSTICAS HISTÓRICAS", link: "https://www.monterrey.gob.mx/pdf/portaln/2024/ESTADISTICASCONCENTRADO_NOV08-FEB24.xlsx"};
  documentos.push(documento);
  id = "estadisticas-historicas_estadisticas-de-solicitudes-de-informacion_solicita-informacion-publica-de-tu-interes_portal-transparencia";
  data.push({ id, documentos });
}

async function addSolicitaInformacionPublicaNomina(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial/Index_ServidoresPublicosI.asp";
  const document = await getDocument(url);

  for (let year = 2009; year <= 2024; year++) {
    const documentos = [];
    const elements = document.querySelectorAll('.tabs a');

    elements.forEach((linkElement) => {
        const link = new URL(linkElement.href, baseUrl).href;
        const title = linkElement.textContent.trim();
        const regex = /(\d{4})\//;
        const match = link.match(regex);
        if (match && year == match[1] || title.includes(year)) {
          const documento = { title: title, link: link };
          documentos.push(documento);
        }
    });

    let id = `${year}_nomina-desglose-a-detalle_solicita-informacion-publica-de-tu-interes_portal-transparencia`;
    data.push({ id, documentos });
}
}

async function addSolicitaInformacionPublicaInformesIndicadores(data) {
  const url = "https://www.monterrey.gob.mx/transparencia/Oficial_/Planes_Municipales_IIMEP.html";
  const document = await getDocument(url);

    var accordions = document.querySelectorAll('.accordion');

    accordions.forEach(function(accordion) {
      const documentos = [];
      var titleId = eliminarAcentos(accordion.textContent.trim().toLowerCase().replace(/\s+/g, '-'));
      var panel = accordion.nextElementSibling;
      var links = panel.querySelectorAll('table a');

      links.forEach(linkElement => {
        const link = new URL(linkElement.href, baseUrl).href;
        const title = linkElement.textContent.trim();
        const documento = { title: title, link: link };
        documentos.push(documento);
      });

      let id = `tableros-de-control_${titleId}_informes-indicadores-metas-estadisticas-y-programas_informes-indicadores-metas-estadisticas-y-programas_solicita-informacion-publica-de-tu-interes_portal-transparencia`;
      data.push({ id, documentos });
  });
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

async function addAyudantamientoDictamenes(data) {
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
