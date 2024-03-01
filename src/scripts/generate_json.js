import * as fs from 'fs';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const jsonPath = '../data/raw/structure.json';

try {
  const jsonContent = readFileSync(jsonPath, 'utf-8');

  const jsonData = JSON.parse(jsonContent);

  const mainCategories = jsonData.filter(element => {
    return (element.padre && Array.isArray(element.padre) && element.padre.includes("portal-transparencia_"))});

   const processedJson = [];

   mainCategories.forEach(element => {
        console.log("----------- Creating main category ----------- ");
        console.log("Creating " + element.label);

        const originalChildrenArray = findBy(element.id, jsonData);

        const mainCategoryProcessed = {
            id: uuidv4(),
            label: replaceAll(element.label, "-", " "),
            src_image: "", // TODO: este dato queda pendiente porque no está en el json crudo, de donde lo sacamos?
            link: "", // estas categorias no redirigen a un link externo, queda vacío
            children: createChildren(originalChildrenArray, jsonData)
        }

        processedJson.push(mainCategoryProcessed);
    });

    // Agrega categoria que redirige a link externo a mano porque no está en el json crudo
    const categoryToExternal = {
        id: uuidv4(),
        label: "consulta los conjuntos de datos abiertos",
        src_image: "", // TODO: este dato queda pendiente, agregarlo a mano en este caso
        link: "https://datos.monterrey.gob.mx/",
        children: [] // esta categoría no tiene children, queda vacío
    }

    processedJson.push(categoryToExternal);

    writeFile(processedJson);
 
} catch (error) {
  console.error('Error parsing file:', error.message);
}

function findBy(fatherId, jsonData) {
    return jsonData.filter(item => Array.isArray(item.padre) && item.padre.includes(fatherId));
}

function createChildren(originalChildrenArray, jsonData) {
    console.log("----------- Creating children categories -----------");
    
    if (Array.isArray(originalChildrenArray)) {
      const processedChildrenArray = [];
  
      originalChildrenArray.forEach(element => {

        console.log("Creating " + element.label);

        const childrenObject = {
            id: uuidv4(),
            label: replaceAll(element.label, "-", " "),
            description: "", // TODO: ver de donde sacar este campo
            transparency_report: ""// TODO: tomar los datos del crudo transparency_report.json a partir del id del campo reporte_transparencia? 
        };

        const childrenField = findBy(element.id, jsonData);
        
        // Si el elemento tiene hijos se llama recursivamente la función para ellos
        if (childrenField && Array.isArray(childrenField)) {
            childrenObject.children = createChildren(childrenField, jsonData);
        }

        processedChildrenArray.push(childrenObject);
      });

      return processedChildrenArray;
    }
    return originalChildrenArray;
}

function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
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
