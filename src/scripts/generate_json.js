import * as fs from 'fs';
import { readFileSync } from 'fs';

const jsonPath = '../data/raw/structure.json';
try {
    const jsonContent = readFileSync(jsonPath, 'utf-8');

    const jsonData = JSON.parse(jsonContent);

    const mainCategories = findBy("portal-transparencia", jsonData);

    console.log(mainCategories.length);

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

        const originalChildrenArray = findBy(element.id, jsonData);

        console.log("-----------> Creating children categories for " + element.label);
        const mainCategoryProcessed = {
            id: element.id,
            label: correctText[element.label],
            src_image: srcPathNames[element.label], 
            link: "", // estas categorias no redirigen a un link externo, queda vacío
            order: order[element.label],
            children: createChildren(originalChildrenArray, jsonData),
        }

        processedJson.push(mainCategoryProcessed);
    });

    // Agrega categoria que redirige a link externo a mano porque no está en el json crudo
    const categoryToExternal = {
        id: "consulta-los-conjuntos-de-datos-abiertos_portal-transparencia",
        label: "Consulta los conjuntos de datos abiertos",
        src_image: "/images/icons/database.svg", 
        link: "https://datos.monterrey.gob.mx/",
        order: 7,
        children: [] // esta categoría no tiene children, queda vacío
    }

    processedJson.push(categoryToExternal);

    writeFile(processedJson.sort((a, b) => a.order - b.order));

} catch (error) {
    console.error('Error parsing file:', error.message);
}

function findBy(id, jsonData) {
    return jsonData.filter(item => item.to && (item.to === id || item.to === id + "_"));
}

function createChildren(originalChildrenArray, jsonData) {
    const visitedSet = new Set();

    function createChildrenRecursive(element) {
        console.log("Creating " + element.label);

        if (!visitedSet.has(element.id)) {
            const childrenObject = {
                id: element.id,
                label: element.label,
                description: "",
                transparency_report: ""
            };

            // Marcar como visitado antes de procesar hijos
            visitedSet.add(element.id);

            const childrenField = findBy(element.id, jsonData);

            // Llegué al nodo final, creo el reporte de transparencia
            if (hasTransparencyReport(element)) {
                childrenObject.transparency_report = createTransparencyReport(element);
            } else {
                 // Filtrar y mapear solo los elementos no nulos
                 childrenObject.children = childrenField.map(child => createChildrenRecursive(child)).filter(child => child !== null);
            }

            return childrenObject;
        }

        return null;  // Si ya fue visitado, devolvemos null
    }

    // Iniciar el procesamiento con los elementos originales
    const processedArray = originalChildrenArray.map(element => createChildrenRecursive(element)).filter(child => child !== null);

    // Limpiar el conjunto de visitados para futuros procesamientos
    visitedSet.clear();

    return processedArray;
}

function hasTransparencyReport(element) {
    return element.reporte_transparencia && Array.isArray(element.reporte_transparencia) && element.reporte_transparencia.length > 0;
}

function createTransparencyReport(element) {
    // TODO: acá hay que obtener los links de reporte transparencia del otro json a partir de los ids de este arreglo
    return element.reporte_transparencia;
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
