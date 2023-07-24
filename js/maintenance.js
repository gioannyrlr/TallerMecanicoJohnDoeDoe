function registerMaintenance() {
    const maintenanceVehicle = document.getElementById('maintenanceVehicle').value;
    const maintenanceType = document.getElementById('maintenanceType').value;
    const maintenanceDate = document.getElementById('maintenanceDate').value;

    // Crear un objeto mantenimiento con los datos
    const maintenance = {
        vehicle: maintenanceVehicle,
        type: maintenanceType,
        date: maintenanceDate
    };

    // Obtener los mantenimientos almacenados previamente (si los hay)
    const existingMaintenances = JSON.parse(localStorage.getItem('maintenances')) || [];

    // Verificar si el mantenimiento ya existe (combinación de vehículo y fecha)
    const existingMaintenanceIndex = existingMaintenances.findIndex((m) => m.vehicle === maintenanceVehicle && m.date === maintenanceDate);

    if (existingMaintenanceIndex !== -1) {
        // Si el mantenimiento ya existe, reemplazar sus datos con la edición
        existingMaintenances[existingMaintenanceIndex] = maintenance;
    } else {
        // Si el mantenimiento no existe, agregarlo a la lista
        existingMaintenances.push(maintenance);
    }

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('maintenances', JSON.stringify(existingMaintenances));

    // Limpiar el formulario
    document.getElementById('maintenanceForm').reset();

    // Mostrar la lista de mantenimientos registrados
    displayMaintenances();
    }

    function displayMaintenances() {
    const maintenanceList = document.getElementById('maintenanceList');
    maintenanceList.innerHTML = '';

    const existingMaintenances = JSON.parse(localStorage.getItem('maintenances')) || [];

    // Mostrar los mantenimientos registrados en la lista
    existingMaintenances.forEach((maintenance, index) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = 
        `<tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${maintenance.vehicle}</td>
            <td class="text-center">${maintenance.type}</td>
            <td class="text-center">${maintenance.date}</td>
            <td class="text-center"><button type="button" class="button-editar" onclick="editMaintenance(${index})">Editar</button> <button type="button" class="button-eliminar" onclick="deleteMaintenance(${index})">Eliminar</button></td>
        </tr>`;
        maintenanceList.appendChild(listItem);
    });
    }

    function editMaintenance(index) {
    const existingMaintenances = JSON.parse(localStorage.getItem('maintenances')) || [];
    const maintenance = existingMaintenances[index];

    // Rellenar el formulario con los datos del mantenimiento seleccionado para editar
    document.getElementById('maintenanceVehicle').value = maintenance.vehicle;
    document.getElementById('maintenanceType').value = maintenance.type;
    document.getElementById('maintenanceDate').value = maintenance.date;

    // Eliminar el mantenimiento de la lista para que no se duplique al guardar los cambios
    existingMaintenances.splice(index, 1);
    localStorage.setItem('maintenances', JSON.stringify(existingMaintenances));
    }

    function deleteMaintenance(index) {
    const existingMaintenances = JSON.parse(localStorage.getItem('maintenances')) || [];
    existingMaintenances.splice(index, 1); // Eliminar el mantenimiento de la lista
    localStorage.setItem('maintenances', JSON.stringify(existingMaintenances)); // Guardar la lista actualizada
    displayMaintenances(); // Mostrar la lista de mantenimientos actualizada
    }

    // Mostrar la lista de mantenimientos registrados al cargar la página
    displayMaintenances();