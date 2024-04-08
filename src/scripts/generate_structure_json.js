import * as fs from 'fs';
import { readFileSync } from 'fs';

const structureJsonPath = '../data/raw/structure.json';
const reportJsonPath = '../data/raw/transparency_report.json';
const documentsPath = '../data/raw/documents.json';
const dataScrappingByLabelPath = '../data/scrapped/dataScrappingByLabel.json';
const dataFullScrappingPath = '../data/scrapped/dataFullScrapping.json';
const dataScrappingByIdPath = '../data/scrapped/dataScrappingById.json';

try {
  const structureJsonContent = readFileSync(structureJsonPath, 'utf-8');
  const structureJsonData = JSON.parse(structureJsonContent);
  const reportJsonContent = readFileSync(reportJsonPath, 'utf-8');
  const reportJsonData = JSON.parse(reportJsonContent);
  const documentsJsonContent = readFileSync(documentsPath, 'utf-8');
  const documentsJsonData = JSON.parse(documentsJsonContent);
  const dataScrappingByLabelJsonContent = readFileSync(
    dataScrappingByLabelPath,
    'utf-8'
  );
  const dataScrappingByLabelJsonData = JSON.parse(
    dataScrappingByLabelJsonContent
  );
  const dataFullScrappingJsonContent = readFileSync(
    dataFullScrappingPath,
    'utf-8'
  );
  const dataFullScrappingJsonData = JSON.parse(dataFullScrappingJsonContent);
  const dataScrappingByIdJsonContent = readFileSync(
    dataScrappingByIdPath,
    'utf-8'
  );
  const dataScrappingByIdJsonData = JSON.parse(
    dataScrappingByIdJsonContent
  );

  const mainCategories = findBy('portal-transparencia', structureJsonData);

  const srcPathNames = {
    'Obligaciones de transparencia': '/images/icons/magnifying-glass.svg',
    'Ayuntamiento, Sesiones y Comisiones': '/images/icons/bank.svg',
    'Gacetas Municipales': '/images/icons/news-paper.svg',
    Normatividad: '/images/icons/hammer.svg',
    'Consulta Información Fiscal ITDIF': '/images/icons/document.svg',
    'Solicita Información Pública de tu Interés': '/images/icons/lamp.svg',
    'Información Histórica 2015 - ENE 2022': '/images/icons/time.svg',
    'Contratos, Permisos, Licencia y Concesiones': '/images/icons/file.svg',
  };

  const processedJson = [];

  mainCategories.forEach((element) => {
    //console.log('-----------> Creating main category ' + element.label);

    const originalChildrenArray = findBy(element.id, structureJsonData);

    // console.log(
    //   '-----------> Creating children categories for ' + element.label
    // );
    const mainCategoryProcessed = {
      id: element.id,
      label: element.label,
      src_image: srcPathNames[element.label],
      link: '', // estas categorias no redirigen a un link externo, queda vacío
      order: element.order,
      description: element.descripcion,
      children: createChildren(
        originalChildrenArray,
        structureJsonData,
        reportJsonData,
        documentsJsonData,
        dataScrappingByLabelJsonData,
        dataFullScrappingJsonData,
        dataScrappingByIdJsonData
      ),
    };

    processedJson.push(mainCategoryProcessed);
  });

  // Agrega categoria que redirige a link externo a mano porque no está en el json crudo
  const categoryToExternal = {
    id: 'consulta-los-conjuntos-de-datos-abiertos_portal-transparencia',
    label: 'Consulta los conjuntos de datos abiertos',
    src_image: '/images/icons/database.svg',
    link: 'https://datos.monterrey.gob.mx/',
    order: 2200,
    children: [], // esta categoría no tiene children, queda vacío
  };

  processedJson.push(categoryToExternal);

  writeFile(processedJson.sort((a, b) => a.order - b.order));
} catch (error) {
  console.error('Error parsing file:', error.message);
}

function findBy(id, structureJsonData) {
  return structureJsonData.filter(
    (item) => item.to && (item.to === id || item.to === id + '_')
  );
}

function createChildren(
  originalChildrenArray,
  structureJsonData,
  reportJsonData,
  documentsJsonData,
  dataScrappingByLabelJsonData,
  dataFullScrappingJsonData,
  dataScrappingByIdJsonData
) {
  const visitedSet = new Set();

  function createChildrenRecursive(element) {
    console.log('Creating ' + element.label);

    if (!visitedSet.has(element.id)) {
      const childrenObject = {
        id: element.id,
        label: element.label,
        order: element.order,
        description: element.descripcion,
        reports: [],
      };

      // Marcar como visitado antes de procesar hijos
      visitedSet.add(element.id);

      const childrenField = findBy(element.id, structureJsonData);

      // No hay más hijos, valido si existe reporte y lo creo si existe
      if(Array.isArray(childrenField) &&
      childrenField.length == 0) {
        const reports = createTransparencyReportWithDocByIdJson(element.id, dataScrappingByIdJsonData);
        if(reports && reports.length > 0) {
          childrenObject.reports = reports;
        }
      }

      // Si llegué al nodo final y no se creó el reporte de transparencia, se crea
      if (
        childrenObject.reports.length == 0 &&
        hasTransparencyReport(element) &&
        Array.isArray(childrenField) &&
        childrenField.length == 0
      ) {
          if (existsInTransparencyReportJson(element)) {
          childrenObject.reports = createTransparencyReportWithReportJson(
            element.id,
            reportJsonData
          );
        } else {
          childrenObject.reports = createTransparencyReportWithDocJson(
            element.id,
            documentsJsonData,
            dataScrappingByLabelJsonData,
            dataFullScrappingJsonData
          );
        } 
      } else {
        // Filtrar y mapear solo los elementos no nulos
        childrenObject.children = childrenField
        .map((child) => createChildrenRecursive(child))
        .filter((child) => child !== null);
      }

      return childrenObject;
    }

    return null; // Si ya fue visitado, devolvemos null
  }

  // Iniciar el procesamiento con los elementos originales
  const processedArray = originalChildrenArray
    .map((element) => createChildrenRecursive(element))
    .filter((child) => child !== null);

  // Limpiar el conjunto de visitados para futuros procesamientos
  visitedSet.clear();

  return processedArray;
}

function hasTransparencyReport(element) {
  return (
    existsInTransparencyReportJson(element) || existsInDocumentsJson(element)
  );
}

function existsInTransparencyReportJson(element) {
  return (
    element.reporte_transparencia &&
    Array.isArray(element.reporte_transparencia) &&
    element.reporte_transparencia.length > 0
  );
}

function existsInDocumentsJson(element) {
  return (
    element.datos_faltantes_por_estructurar &&
    Array.isArray(element.datos_faltantes_por_estructurar) &&
    element.datos_faltantes_por_estructurar.length > 0
  );
}

function createTransparencyReportWithReportJson(id, reportJsonData) {
  const reports = reportJsonData.filter(
    (item) => item.slug && item.slug.includes(id)
  );
  const processedReports = [];

  reports.forEach((element) => {
    let title = element.fraccion_nombre_del_documento;
    if (!element.fraccion_nombre_del_documento && element.documentos[0]) {
      const fileName = element.documentos[0].split('/').pop();
      title = fileName.split('.')[0];
      title = decodeURIComponent(title);
    }

    const report = {
      title: title,
      description: element.descripcion,
      link: element.documentos[0],
      conservation_of_information: element.conservacion_de_la_informacion,
      periodicity_of_information: element.periodicidad_de_la_informacion,
      start_year: element.ano_de_inicio,
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
      name_of_the_public_citizen_consultation:
        element.nombre_de_la_consulta_ciudadana_publica,
      link_of_the_public_citizen_consultation:
        element.enlace_de_la_consulta_ciudadana_publica,
      gazette_type: element.tipo_de_gaceta,
      gazette_number: element.numero_de_gaceta,
      section_number: element.numero_de_seccion,
      district: element.distrito,
      plan_or_program: element.plan_o_programa,
      norm: element.norma,
      topic: element.tema,
      document_format: element.documento_formato, // existe en el json?
    };

    if (!isEmptyObject(element.nombre_de_la_entidad)) {
      report.entity_name = element.nombre_de_la_entidad[0];
    }

    if (!isEmptyObject(element.tipo_de_acta_o_sesion)) {
      report.type_of_record_or_session = element.tipo_de_acta_o_sesion[0];
    }

    processedReports.push(report);
  });

  return processedReports;
}

function createTransparencyReportWithDocJson(
  id,
  documentsJsonData,
  dataScrappingByLabelJsonData,
  dataFullScrappingJsonData,
) {
  const rawDocuments = documentsJsonData.filter((item) =>
    item.uid.includes(id)
  );

  const doc = rawDocuments[0];
  let documents = [];
  let reports = [];

  if (doc) {
    const findBy = doc.comentarios;
    if (findBy.includes('Búsqueda por label')) {
      reports = dataScrappingByLabelJsonData.filter((item) => {
        const label = String(doc['label (de estructura)']).toLowerCase();
        return item && item.label.includes(label) && item.url === doc.url;
      });
    } else {
      reports = dataFullScrappingJsonData.filter((item) => {
        return item && item.url === doc.url;
      });
    }
    if (reports && reports.length > 0) {
      documents = reports[0].documentos;
    }
  }

  const processedReports = [];

  documents.forEach((element) => {
    const report = {
      title: element.title,
      link: element.link,
    };
    processedReports.push(report);
  });

  return processedReports;
}

function createTransparencyReportWithDocByIdJson(
  id, 
  dataScrappingByIdJsonData) {
  let documents;

  const ids = dataScrappingByIdJsonData.filter((item) =>
    item.id.includes(id)
  );

  const processedReports = [];

  if (ids && ids.length > 0) {
    documents = ids[0].documentos;

    documents.forEach((element) => {
      const report = {
        title: element.title,
        link: element.link,
      };
      processedReports.push(report);
    });
  }
 
  return processedReports;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function writeFile(processedJson) {
  const filePath = '../data/processed/structure.json';

  try {
    const jsonString = JSON.stringify(processedJson, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf-8');
    console.log(`File ${filePath} created successfully.`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
