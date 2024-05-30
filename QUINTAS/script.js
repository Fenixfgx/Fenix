const SHEET_ID = '1KwJ5OZAzZ385FlPcFYuOdXmtSdd1VhRVfaAU8Nxs3VA';
const USERS_RANGE = 'USERS!D:G';
const CARTERA_RANGE = 'CARTERA!A:F'; // Asegúrate de incluir la columna F para la sección de Cartera 2

let carteraData1 = []; // Variable global para almacenar los datos originales de la cartera de la sección 1
let carteraData2 = []; // Variable global para almacenar los datos originales de la cartera de la sección 2
let carteraData3 = []; // Variable global para almacenar los datos originales de la cartera de la sección 3
let carteraData4 = []; // Variable global para almacenar los datos originales de la cartera de la sección 3

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = await fetchSheetData(SHEET_ID, USERS_RANGE);
    const userIndex = userData.findIndex(row => row[0] === username && row[3] === password);

    if (userIndex !== -1) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('hola-section').classList.remove('hidden');
        document.getElementById('content').textContent = userData[userIndex][2];

        const defaultSearchValue = document.getElementById('content').textContent.trim(); // Obtener el valor después de "Hola" y limpiar espacios en blanco
        document.getElementById('search').value = defaultSearchValue;
        document.getElementById('search-2').value = defaultSearchValue;
        document.getElementById('search-3').value = ' ';
        document.getElementById('search-4').value = ' ';
        document.getElementById('search-tesoreria').value = defaultSearchValue;
        document.getElementById('search-mou').value = defaultSearchValue;
// Establecer el mismo valor por defecto en el campo de búsqueda de la sección 2

        // Filtrar la cartera basada en el valor por defecto del campo de búsqueda para ambas secciones
        filterCarteraList1(defaultSearchValue);
        filterCarteraList2(defaultSearchValue);
        filterCarteraList3(defaultSearchValue);
        filterCarteraList4(defaultSearchValue);

        carteraData1 = await fetchSheetData(SHEET_ID, CARTERA_RANGE);
        carteraData2 = await fetchSheetData(SHEET_ID, CARTERA_RANGE);
        carteraData3 = await fetchSheetData(SHEET_ID, CARTERA_RANGE);
        carteraData4 = await fetchSheetData(SHEET_ID, CARTERA_RANGE);// Obtener los datos de la cartera para ambas secciones
        const userCarteraData1 = carteraData1.filter(row => row[0] === username);
        const userCarteraData2 = carteraData2.filter(row => row[0] === username);
        const userCarteraData3 = carteraData3.filter(row => row[0] === username);
        const userCarteraData4 = carteraData4.filter(row => row[0] === username);// Filtrar los datos de la cartera para el usuario para ambas secciones
        populateCarteraList1(userCarteraData1);
        populateCarteraList2(userCarteraData2);
        populateCarteraList3(userCarteraData3);
        populateCarteraList4(userCarteraData4);

        // Ejecutar la búsqueda automáticamente después de 1 segundo
        setTimeout(() => {
            filterCarteraList1(document.getElementById('search').value.toLowerCase());
            filterCarteraList2(document.getElementById('search-2').value.toLowerCase());
            filterCarteraList3(document.getElementById('search-3').value.toLowerCase());
            filterCarteraList4(document.getElementById('search-4').value.toLowerCase());
          const searchTerm = defaultSearchValue.trim().toLowerCase();
            const filteredData = tesoreriaData.filter(row => row[0].toLowerCase().includes(searchTerm));
            populateFilteredTesoreriaTable(filteredData);
        }, 1000);
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.getElementById('search').addEventListener('input', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filterCarteraList1(searchTerm);
});

document.getElementById('search-2').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-2').value.toLowerCase();
    filterCarteraList2(searchTerm);
});

document.getElementById('search-3').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-3').value.toLowerCase();
    filterCarteraList3(searchTerm);
});

document.getElementById('search-4').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-4').value.toLowerCase();
    filterCarteraList4(searchTerm);
});

function filterCarteraList1(searchTerm) {
    const filteredData = carteraData1.filter(row => {
        // Verificar si el valor de la columna "A" incluye el término de búsqueda
        const matchesColumnA = row[0].toLowerCase().includes(searchTerm);
        // Verificar si el valor de la columna "E" no está entre los valores excluidos
        const excludeValues = ["PRIMER ETAPA", "SEGUNDA ETAPA", "TERCERA ETAPA", "CUARTA ETAPA"];
        const isExcluded = excludeValues.includes(row[4]);
        return matchesColumnA && !isExcluded;
    });
    populateCarteraList1(filteredData);
}

function filterCarteraList2(searchTerm) {
    const filteredData = carteraData2.filter(row => {
        // Verificar si el valor de la columna "A" incluye el término de búsqueda
        const matchesColumnA = row[0].toLowerCase().includes(searchTerm);
        // Verificar si el valor de la columna "F" no está entre los valores excluidos para la sección de Cartera 2
        const excludeValues = ["OTRO CONCEPTO", "ERR"];
        const isExcluded = excludeValues.includes(row[5]); // Columna F (índice 5)
        return matchesColumnA && !isExcluded;
    });
    populateCarteraList2(filteredData);
}

function filterCarteraList3(searchTerm) {
    const filteredData = carteraData3.filter(row => {
        // Verificar si el valor de la columna "A" incluye el término de búsqueda
        const matchesColumnA = row[0].toLowerCase().includes(searchTerm);
        // Verificar si el valor de la columna "F" no está entre los valores excluidos para la sección de Cartera 2
        const excludeValues = ["PRIMER ETAPA", "SEGUNDA ETAPA", "TERCERA ETAPA", "CUARTA ETAPA"];
        const isExcluded = excludeValues.includes(row[4]); // Columna F (índice 5)
        return matchesColumnA && !isExcluded;
    });
    populateCarteraList3(filteredData);
}

function filterCarteraList4(searchTerm) {
    const filteredData = carteraData4.filter(row => {
        // Verificar si el valor de la columna "A" incluye el término de búsqueda
        const matchesColumnA = row[0].toLowerCase().includes(searchTerm);
        // Verificar si el valor de la columna "F" no está entre los valores excluidos para la sección de Cartera 2
        const excludeValues = ["OTRO CONCEPTO", "ERR"];
        const isExcluded = excludeValues.includes(row[5]); // Columna F (índice 5)
        return matchesColumnA && !isExcluded;
    });
    populateCarteraList4(filteredData);
}

document.getElementById('go-back-to-hola').addEventListener('click', () => {
    document.getElementById('hola-section').classList.remove('hidden');
    document.getElementById('cartera-section').classList.add('hidden');
});

document.getElementById('go-back-to-hola-2').addEventListener('click', () => {
    document.getElementById('hola-section').classList.remove('hidden');
    document.getElementById('cartera-section-2').classList.add('hidden');
});

document.getElementById('go-back-to-hola-3').addEventListener('click', () => {
    document.getElementById('hola-section').classList.remove('hidden');
    document.getElementById('cartera-section-3').classList.add('hidden');
});

document.getElementById('go-back-to-hola-4').addEventListener('click', () => {
    document.getElementById('hola-section').classList.remove('hidden');
    document.getElementById('cartera-section-4').classList.add('hidden');
});

document.getElementById('go-to-cartera').addEventListener('click', () => {
    document.getElementById('hola-section').classList.add('hidden');
    document.getElementById('cartera-section').classList.remove('hidden');
});

document.getElementById('go-to-cartera-2').addEventListener('click', () => {
    document.getElementById('hola-section').classList.add('hidden');
    document.getElementById('cartera-section-2').classList.remove('hidden');
});

document.getElementById('go-to-cartera-3').addEventListener('click', () => {
    document.getElementById('hola-section').classList.add('hidden');
    document.getElementById('cartera-section-3').classList.remove('hidden');
});

document.getElementById('go-to-cartera-4').addEventListener('click', () => {
    document.getElementById('hola-section').classList.add('hidden');
    document.getElementById('cartera-section-4').classList.remove('hidden');
});

async function fetchSheetData(sheetId, range) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=AIzaSyC7trVxLML3qsNu1jYg7Qmmgc-RuWsMZg8`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

function populateCarteraList1(data) {
    const table = document.getElementById('cartera-list');
    let total = 0; // Variable para almacenar la suma de los valores de la segunda columna

    table.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const headers = []; // Modifica los títulos según tus columnas
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar cada fila de datos como una nueva fila en la tabla
    data.forEach(rowData => {
        const row = document.createElement('tr');

       // Crea la segunda celda con el contenido de la columna E
        const cell2 = document.createElement('td');
        cell2.textContent = rowData[4]; // Suponiendo que la columna E es la quinta columna (índice 4)
        row.appendChild(cell2);

       // Crea la tercera celda con el contenido de la columna B
const cell3 = document.createElement('td');
const valueWithoutSymbols = rowData[1].replace(/[$.,]/g, ''); // Eliminar símbolos de moneda y puntos
const numericValue = parseFloat(valueWithoutSymbols); // Convertir a número
const formattedValue = numericValue.toLocaleString(); // Formatear el valor numérico
cell3.textContent = formattedValue; // Mostrar el valor formateado
total += numericValue; // Sumar el valor de la columna B
row.appendChild(cell3);


        // Crea la cuarta celda con el contenido de la columna C
        const cell4 = document.createElement('td');
        cell4.textContent = rowData[2]; // Suponiendo que la columna C es la tercera columna (índice 2)
        row.appendChild(cell4);

        

        table.appendChild(row);
    });

    // Mostrar el total de la columna B fuera de la tabla
const totalElement = document.getElementById('total-column-B');
totalElement.textContent = `Total: $${total.toLocaleString()}`; // Utilizar toLocaleString para formatear el número

}

function populateCarteraList2(data) {
    const table = document.getElementById('cartera-list-2');
    populateCarteraList(data, table);
}

function populateCarteraList3(data) {
  const table = document.getElementById('cartera-list-3');
  table.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos

  // Crear la cabecera de la tabla
  const headerRow = document.createElement('tr');
  const headers = ['']; // Modifica los títulos según tus columnas
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Agregar cada fila de datos como una nueva fila en la tabla
  data.forEach(rowData => {
    const row = document.createElement('tr');

    // Crea la segunda celda con el contenido de la columna E
    const cell2 = document.createElement('td');
    cell2.textContent = rowData[4]; // Suponiendo que la columna E es la quinta columna (índice 4)
    row.appendChild(cell2);

    // Crea la tercera celda con el contenido de la columna B
    const cell3 = document.createElement('td');
    const valueWithoutSymbols = rowData[1].replace(/[$.,]/g, '');
    const numericValue = parseFloat(valueWithoutSymbols); // Convertir a número
    const formattedValue = numericValue.toLocaleString();
    cell3.textContent = formattedValue;// Suponiendo que la columna B es la segunda columna (índice 1)
    row.appendChild(cell3);

    // Crea la cuarta celda con el contenido de la columna C
    const cell4 = document.createElement('td');
    cell4.textContent = rowData[2]; // Suponiendo que la columna C es la tercera columna (índice 2)
    row.appendChild(cell4);

    // **Omitimos la creación de la quinta celda con el botón**

    table.appendChild(row);
  });
}

function populateCarteraList4(data) {
  const table = document.getElementById('cartera-list-4');
  table.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos

  // Crear la cabecera de la tabla
  const headerRow = document.createElement('tr');
  const headers = ['']; // Modifica los títulos según tus columnas
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Agregar cada fila de datos como una nueva fila en la tabla
  data.forEach(rowData => {
    const row = document.createElement('tr');

    // Crea la segunda celda con el contenido de la columna E
    const cell2 = document.createElement('td');
    cell2.textContent = rowData[4]; // Suponiendo que la columna E es la quinta columna (índice 4)
    row.appendChild(cell2);

    // Crea la tercera celda con el contenido de la columna B
    const cell3 = document.createElement('td');
    const valueWithoutSymbols = rowData[1].replace(/[$.,]/g, '');
    const numericValue = parseFloat(valueWithoutSymbols); // Convertir a número
    const formattedValue = numericValue.toLocaleString();
    cell3.textContent = formattedValue;// Suponiendo que la columna B es la segunda columna (índice 1)
    row.appendChild(cell3);

    // Crea la cuarta celda con el contenido de la columna C
    const cell4 = document.createElement('td');
    cell4.textContent = rowData[2]; // Suponiendo que la columna C es la tercera columna (índice 2)
    row.appendChild(cell4);

    // **Omitimos la creación de la quinta celda con el botón**

    table.appendChild(row);
  });
}


function populateCarteraList(data, table) {
    table.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const headers = ['']; // Modifica los títulos según tus columnas
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar cada fila de datos como una nueva fila en la tabla
    data.forEach(rowData => {
        const row = document.createElement('tr');

       // Crea la segunda celda con el contenido de la columna E
        const cell2 = document.createElement('td');
        cell2.textContent = rowData[4]; // Suponiendo que la columna E es la quinta columna (índice 4)
        row.appendChild(cell2);

        // Crea la tercera celda con el contenido de la columna B
    const cell3 = document.createElement('td');
    const valueWithoutSymbols = rowData[1].replace(/[$.,]/g, '');
    const numericValue = parseFloat(valueWithoutSymbols); // Convertir a número
    const formattedValue = numericValue.toLocaleString();
    cell3.textContent = formattedValue;// Suponiendo que la columna B es la segunda columna (índice 1)
    row.appendChild(cell3);

        // Crea la cuarta celda con el contenido de la columna C
        const cell4 = document.createElement('td');
        cell4.textContent = rowData[2]; // Suponiendo que la columna C es la tercera columna (índice 2)
        row.appendChild(cell4);

        
        table.appendChild(row);
    });
}

// Busca el elemento span con la clase "close" dentro del modal
const closeModalButton = document.querySelector('.modal .close');

// Agrega un evento clic al botón para cerrar el modal
closeModalButton.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
});


///


const TESORERIA_RANGE = 'TESORERIA!B:D'; // Rango para obtener datos de la hoja "TESORERIA"

let tesoreriaData = []; // Variable global para almacenar los datos originales de la tesorería

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init();
});

async function init() {
    // Obtener datos de la tesorería
    tesoreriaData = await fetchSheetData(SHEET_ID, TESORERIA_RANGE);
}

document.getElementById('search-tesoreria').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-tesoreria').value.trim().toLowerCase();
    const filteredData = tesoreriaData.filter(row => row[0].toLowerCase().includes(searchTerm));
    populateFilteredTesoreriaTable(filteredData);
});

function populateFilteredTesoreriaTable(filteredData) {
    const table = document.getElementById('tesoreria-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const headers = []; // Modificar los títulos según las columnas de TESORERIA
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar cada fila de datos filtrados como una nueva fila en la tabla
    filteredData.forEach(rowData => {
        const row = document.createElement('tr');

        // Agregar celda combinada con los datos de ambas columnas, junto con prefijos únicos
        const cell = document.createElement('td');
        const prefix1 = 'Total Aportes: ';
        const prefix2 = 'Deuda: ';
        cell.innerHTML = `${prefix1}${rowData[1]} <br> ${prefix2}${rowData[2]}`;
 // Agregar prefijos únicos y datos de ambas columnas
        row.appendChild(cell);

        table.appendChild(row);
    });
};

///


const TARGET_RANGE = 'TARGET!A1:B5'; // Rango para obtener datos de la hoja "TESORERIA"

let targetData = []; // Variable global para almacenar los datos originales de la tesorería

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init2();
});

async function init2() {
    // Obtener datos de la tesorería
    targetData = await fetchSheetData(SHEET_ID, TARGET_RANGE);
}

// Llamar a la función de inicialización cuando se active la sección "Cartera 1"
document.getElementById('go-to-cartera-4').addEventListener('click', async () => {
    await init2();
    populateTargetTable();
});

function populateTargetTable() {
    const table = document.getElementById('target-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const headers = []; // Modificar los títulos según las columnas de TARGET
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Agregar cada fila de datos como una nueva fila en la tabla
    targetData.slice(1).forEach(rowData => { // Empezar desde la segunda fila
        const row = document.createElement('tr');

        // Agregar celdas con los datos de la segunda y tercera columna de TARGET
        for (let i = 0; i < 2; i++) { // TARGET tiene dos columnas (de A a B)
            const cell = document.createElement('td');
            cell.textContent = rowData[i]; // Se supone que rowData tiene dos elementos
            row.appendChild(cell);
        }

        table.appendChild(row);
    });
}

///


const DEBERES_RANGE = 'DEBERES!E2:E2'; // Rango para obtener datos de la hoja "DEBERES"

let DEBData = []; // Variable global para almacenar los datos originales de la hoja "DEBERES"

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init3();
});

async function init3() {
    // Obtener datos de la hoja "DEBERES"
    DEBData = await fetchSheetData(SHEET_ID, DEBERES_RANGE);
}

// Llamar a la función de inicialización cuando se active la sección "Cartera 1"
document.getElementById('hola-section').addEventListener('click', async () => {
    await init3();
    populateDEBTable();
});

function populateDEBTable() {
    const table = document.getElementById('DEB-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = 'Saldo Tesorería'; // Modificar el título según el contenido de la columna de la hoja "DEBERES"
    headerRow.appendChild(header);
    table.appendChild(headerRow);

    // Agregar cada fila de datos como una nueva fila en la tabla
    DEBData.forEach(rowData => {
        const row = document.createElement('tr');

        // Agregar celda con los datos de la columna de la hoja "DEBERES"
        const cell = document.createElement('td');
        cell.textContent = rowData[0]; // Se supone que rowData tiene un solo elemento
        row.appendChild(cell);

        table.appendChild(row);
    });
}

///


const MOU_RANGE = 'MOU!B:C'; // Rango para obtener datos de la hoja "MOU"

let MOUData = []; // Variable global para almacenar los datos originales de la hoja "MOU"

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init4();
});

async function init4() {
    // Obtener datos de la hoja "MOU"
    MOUData = await fetchSheetData(SHEET_ID, MOU_RANGE);
    populateMOUTable(); // Llamar a la función de población de la tabla después de obtener los datos
}

// Llamar a la función de inicialización cuando se active la sección "hola-section"
document.getElementById('hola-section').addEventListener('click', async () => {
    await init4();
    populateMOUTable();

    // Activar automáticamente el buscador al cargar la sección "hola-section"
    const searchTerm = document.getElementById('search-mou').value.trim().toLowerCase();
    const filteredData = MOUData.filter(row => row[0].toLowerCase().includes(searchTerm));
    populateMOUTable(filteredData);
});

// Agregar un evento de entrada al campo de búsqueda
document.getElementById('search-mou').addEventListener('input', () => {
    const searchTerm = document.getElementById('search-mou').value.trim().toLowerCase();
    const filteredData = MOUData.filter(row => row[0].toLowerCase().includes(searchTerm));
    populateMOUTable(filteredData);
});

function populateMOUTable(data = MOUData) {
    const table = document.getElementById('MOU-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Crear la cabecera de la tabla
    const headerRow = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = 'Monto Aportado'; // Modificar el título según el contenido de la columna de la hoja "MOU"
    headerRow.appendChild(header);
    table.appendChild(headerRow);

    // Agregar cada fila de datos como una nueva fila en la tabla
    data.forEach(rowData => {
        const row = document.createElement('tr');

        // Agregar celda con los datos de la columna de la hoja "MOU"
        const cell = document.createElement('td');
        cell.textContent = rowData[1]; // Se supone que la columna "B" está en el índice 1
        row.appendChild(cell);

        table.appendChild(row);
    });
}

///


const TARGET2_RANGE = 'TARGET!F2:F5'; // Rango para obtener datos de la hoja "DEBERES"

let TARGET2Data = []; // Variable global para almacenar los datos originales de la hoja "DEBERES"

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init5();
});

async function init5() {
    // Obtener datos de la hoja "TARGET"
    TARGET2Data = await fetchSheetData(SHEET_ID, TARGET2_RANGE);
    populateTARGET2Table();
    generateCharts();
    generateH2Elements(); // Generar los elementos h2 con los valores de la tabla
}

function generateH2Elements() {
    TARGET2Data.forEach((rowData, index) => {
        const value = rowData[0];
        const h2 = document.createElement('h2');
        h2.textContent = value;
        h2.id = `value-${index + 1}`; // Asignar un id único
        document.getElementById(`h2-container-${index + 1}`).appendChild(h2); // Agregar el h2 al contenedor correspondiente
    });
}


function populateTARGET2Table() {
    const table = document.getElementById('TARGET2-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Agregar cada fila de datos como una nueva fila en la tabla
    TARGET2Data.forEach(rowData => {
        const row = document.createElement('tr');

        // Agregar celda con los datos de la columna de la hoja "TARGET"
        const cell = document.createElement('td');
        cell.textContent = rowData[0]; // Se supone que rowData tiene un solo elemento
        row.appendChild(cell);

        table.appendChild(row);
    });
}

function generateCharts() {
  TARGET2Data.forEach((rowData, index) => {
    const ctx = document.getElementById(`chart-${index + 1}`).getContext('2d');
    const percentage = parseFloat(rowData[0].replace('%', '')); // Extract the percentage value

    // Configure chart data
    const data = {
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: [
          '#ffc500', // Color of completed percentage
          '#438bd7' // Color of remaining percentage
        ]
      }],
      labels: [] // Empty labels
    };

    // Configure chart options for displaying the value inside the donut
    const options = {
      responsive: true,
      plugins: {
        // Add a plugin to display the value in the center of the donut
        doughnutLabel: {
          labels: [{
            font: {
              size: 16,
              weight: 'bold'
            },
            formatter: (value, context) => {
              const data = context.chart.data.datasets[0].data;
              const percentage = data[0];
              return `${percentage}%`;
            }
          }]
        }
      }
    };

    // Create the chart with updated options
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });
  });
}
//// 

const ANUNCIO_RANGE = 'TARGET!A11:B12'; // Rango para obtener datos de la hoja "TESORERIA"

let anuncioData = []; // Variable global para almacenar los datos originales de la tesorería

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await init6();
});

async function init6() {
    // Obtener datos de la tesorería
    anuncioData = await fetchSheetData(SHEET_ID, ANUNCIO_RANGE);
}

// Llamar a la función de inicialización cuando se active la sección "Cartera 1"
document.addEventListener('DOMContentLoaded', async () => {
    await init6();
    populateAnuncioTable();
});

function populateAnuncioTable() {
    const table = document.getElementById('anuncio-list');
    table.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Agregar cada fila de datos como una nueva fila en la tabla
    anuncioData.forEach(rowData => {
        const row = document.createElement('tr');

        // Agregar celda con los datos de la columna "B" de TARGET
        const cell = document.createElement('td');
        cell.textContent = rowData[1]; // Se supone que rowData tiene dos elementos, el segundo es la columna "B"
        row.appendChild(cell);

        table.appendChild(row);
    });
}

const table = document.getElementById('anuncio-list');
let backgroundColorIndex = 0;
const colors = ['rgb(0 128 38 / 43%)', 'rgb(205 10 10 / 53%)'];

function changeBackgroundColor() {
    if (table.textContent.trim().length > 0) { // Verificar si la tabla tiene contenido
        table.style.backgroundColor = colors[backgroundColorIndex];
        backgroundColorIndex = (backgroundColorIndex + 1) % colors.length;
    }
}

// Cambiar el color de fondo cada 2 segundos
setInterval(changeBackgroundColor, 2000);
