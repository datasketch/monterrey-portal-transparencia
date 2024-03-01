import * as fs from 'fs';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const jsonPath = '../data/raw/structure.json';

try {
    const jsonContent = readFileSync(jsonPath, 'utf-8');

    const jsonData = JSON.parse(jsonContent);

    const mainCategories = jsonData.filter(element => {
        return (element.padre && Array.isArray(element.padre) && element.padre.includes("portal-transparencia"))
    });

    const srcPathNames = {
        'Obligaciones de transparencia': '/images/icons/magnifying-glass.svg',
        'Ayuntamiento sesiones y comisiones': '/images/icons/bank.svg',
        'Gacetas municipales': '/images/icons/news-paper.svg',
        'normatividad': '/images/icons/hammer.svg',
        'Consulta información fiscal itdif': '/images/icons/document.svg',
        'Solicita información pública de tu interes': '/images/icons/lamp.svg',
        'Información historica 2015 ene2022': '/images/icons/time.svg'
    }

    const order = {
        'Obligaciones de transparencia': 1,
        'Ayuntamiento sesiones y comisiones': 2,
        'Gacetas municipales': 3,
        'normatividad': 4,
        'Consulta información fiscal itdif': 5,
        'Solicita información pública de tu interes': 8,
        'Información historica 2015 ene2022': 9
    }

    const correctText = {
        'Obligaciones de transparencia': 'Obligaciones de transparencia',
        'Ayuntamiento sesiones y comisiones': 'Ayuntamiento, sesiones y comisiones',
        'Gacetas municipales': 'Gacetas municipales',
        'normatividad': 'Normatividad',
        'Consulta información fiscal itdif': 'Consulta información fiscal (ITDIF)',
        'Solicita información pública de tu interes': 'Solicita información pública de tu interés',
        'Información historica 2015 ene2022': 'Información histórica 2015-2022'
    }

    const processedJson = [];

    mainCategories.forEach(element => {
        console.log("-----------> Creating main category " + element.label);

        const originalChildrenArray = findBy(element.slug, jsonData);

        console.log("-----------> Creating children categories for " + element.label);
        const mainCategoryProcessed = {
            id: uuidv4(),
            label: correctText[element.label],
            src_image: srcPathNames[element.label], // TODO: este dato queda pendiente porque no está en el json crudo, de donde lo sacamos?
            link: "", // estas categorias no redirigen a un link externo, queda vacío
            order: order[element.label],
            children: createChildren(originalChildrenArray, jsonData),
        }

        processedJson.push(mainCategoryProcessed);
    });

    // Agrega categoria que redirige a link externo a mano porque no está en el json crudo
    const categoryToExternal = {
        id: uuidv4(),
        label: "Consulta los conjuntos de datos abiertos",
        src_image: "/images/icons/database.svg", // TODO: este dato queda pendiente, agregarlo a mano en este caso
        link: "https://datos.monterrey.gob.mx/",
        order: 7,
        children: [] // esta categoría no tiene children, queda vacío
    }

    processedJson.push(categoryToExternal);

    writeFile(processedJson.sort((a, b) => a.order - b.order));

} catch (error) {
    console.error('Error parsing file:', error.message);
}

function findBy(slug, jsonData) {
    return jsonData.filter(item => Array.isArray(item.padre) && item.padre.includes(slug));
}

function createChildren(originalChildrenArray, jsonData) {
    if (Array.isArray(originalChildrenArray)) {
        const processedChildrenArray = [];

        originalChildrenArray.forEach(element => {

            console.log("Creating " + element.label);

            const childrenObject = {
                id: uuidv4(),
                label: element.label,
                description: "", // TODO: ver de donde sacar este campo
                transparency_report: ""// TODO: tomar los datos del crudo transparency_report.json a partir del id del campo reporte_transparencia? 
            };

            const childrenField = findBy(element.slug, jsonData);

            // Si el elemento tiene hijos se llama recursivamente la función para ellos
            if (childrenField && childrenField.length > 0 && Array.isArray(childrenField)) {
                childrenObject.children = createChildren(childrenField, jsonData);
            }

            processedChildrenArray.push(childrenObject);
        });

        return processedChildrenArray;
    }
    return originalChildrenArray;
}

// function replaceAll(str, search, replacement) {
//     return str.split(search).join(replacement);
// }

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
