function registerCustomer() {
    const customerIdentification = document.getElementById('customerIdentification').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPhone = document.getElementById('customerPhone').value;

    // Crear un objeto cliente con los datos
    const customer = {
        identification: customerIdentification,
        name: customerName,
        address: customerAddress,
        phone: customerPhone
    };

    // Obtener los clientes almacenados previamente (si los hay)
    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];

    // Verificar si el cliente ya existe por su identificación
    const existingCustomerIndex = existingCustomers.findIndex((c) => c.identification === customerIdentification);

    if (existingCustomerIndex !== -1) {
        // Si el cliente ya existe, reemplazar sus datos
        existingCustomers[existingCustomerIndex] = customer;
    } else {
        // Si el cliente no existe, agregarlo a la lista
        existingCustomers.push(customer);
    }

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('customers', JSON.stringify(existingCustomers));

    // Limpiar el formulario
    document.getElementById('customerForm').reset();

    // Mostrar la lista de clientes registrados
    displayCustomers();
    }

    function displayCustomers() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];

    // Mostrar los clientes registrados en la lista
    existingCustomers.forEach((customer, index) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = 
        `<tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${customer.identification}</td>
            <td class="text-center">${customer.name}</td>
            <td class="text-center">${customer.address}</td>
            <td class="text-center">${customer.phone}</td>
            <td class="text-center"><button type="button" class="button-editar" onclick="editCustomer(${index})">Editar</button><button type="button" class="button-eliminar" onclick="deleteCustomer(${index})">Eliminar</button></td>
        </tr>`;
        customerList.appendChild(listItem);
    });
    }

    function editCustomer(index) {
    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const customer = existingCustomers[index];

    // Rellenar el formulario con los datos del cliente seleccionado para editar
    document.getElementById('customerIdentification').value = customer.identification;
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerAddress').value = customer.address;
    document.getElementById('customerPhone').value = customer.phone;
    }

    function deleteCustomer(index) {
    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    existingCustomers.splice(index, 1); // Eliminar el cliente de la lista
    localStorage.setItem('customers', JSON.stringify(existingCustomers)); // Guardar la lista actualizada
    displayCustomers(); // Mostrar la lista de clientes actualizada
    }

    // Mostrar la lista de clientes registrados al cargar la página
    displayCustomers();