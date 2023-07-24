function registerVehicle() {
    const vehicleOwner = document.getElementById('vehicleOwner').value;
    const vehicleMake = document.getElementById('vehicleMake').value;
    const vehicleModel = document.getElementById('vehicleModel').value;
    const vehiclePlate = document.getElementById('vehiclePlate').value;

    // Crear un objeto vehículo con los datos
    const vehicle = {
        owner: vehicleOwner,
        make: vehicleMake,
        model: vehicleModel,
        plate: vehiclePlate
    };

    // Obtener los vehículos almacenados previamente (si los hay)
    const existingVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

    // Verificar si el vehículo ya existe por su placa
    const existingVehicleIndex = existingVehicles.findIndex((v) => v.plate === vehiclePlate);

    if (existingVehicleIndex !== -1) {
        // Si el vehículo ya existe, reemplazar sus datos con la edición
        existingVehicles[existingVehicleIndex] = vehicle;
    } else {
        // Si el vehículo no existe, agregarlo a la lista
        existingVehicles.push(vehicle);
    }

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('vehicles', JSON.stringify(existingVehicles));

    // Limpiar el formulario
    document.getElementById('vehicleForm').reset();

    // Mostrar la lista de vehículos registrados
    displayVehicles();
    }

    function displayVehicles() {
    const vehicleList = document.getElementById('vehicleList');
    vehicleList.innerHTML = '';

    const existingVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

    // Mostrar los vehículos registrados en la lista
    existingVehicles.forEach((vehicle, index) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = 
        `<tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${vehicle.owner}</td>
            <td class="text-center">${vehicle.make}</td>
            <td class="text-center">${vehicle.model}</td>
            <td class="text-center">${vehicle.plate}</td>
            <td class="text-center"><button type="button" class="button-editar" onclick="editVehicle(${index})">Editar</button> <button type="button" class="button-eliminar" onclick="deleteVehicle(${index})">Eliminar</button></td>
        </tr>`;
        vehicleList.appendChild(listItem);
    });
    }

    function editVehicle(index) {
    const existingVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const vehicle = existingVehicles[index];

    // Rellenar el formulario con los datos del vehículo seleccionado para editar
    document.getElementById('vehicleOwner').value = vehicle.owner;
    document.getElementById('vehicleMake').value = vehicle.make;
    document.getElementById('vehicleModel').value = vehicle.model;
    document.getElementById('vehiclePlate').value = vehicle.plate;

    // Eliminar el vehículo de la lista para que no se duplique al guardar los cambios
    existingVehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(existingVehicles));
    }

    function deleteVehicle(index) {
    const existingVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    existingVehicles.splice(index, 1); // Eliminar el vehículo de la lista
    localStorage.setItem('vehicles', JSON.stringify(existingVehicles)); // Guardar la lista actualizada
    displayVehicles(); // Mostrar la lista de vehículos actualizada
    }

    // Mostrar la lista de vehículos registrados al cargar la página
    displayVehicles();