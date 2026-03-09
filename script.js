// Load data from localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('tableData')) || [];
    const tableBody = document.querySelector('#dataTableContent tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((item, index) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = item.name;
        newRow.insertCell(1).textContent = item.alamat;
        newRow.insertCell(2).textContent = item.jumlahTabung;
        newRow.insertCell(3).textContent = item.request;

        const deleteCell = newRow.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'tbl-biru';
        deleteButton.onclick = function() {
            deleteData(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('tableData', JSON.stringify(data));
}

// Add new data
function addData(name, alamat, jumlahTabung, request) {
    const data = JSON.parse(localStorage.getItem('tableData')) || [];
    data.push({ name, alamat, jumlahTabung, request });
    saveData(data);
    loadData();
}

// Delete data
function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('tableData')) || [];
    data.splice(index, 1);
    saveData(data);
    loadData();
}

// Form submit event
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const alamat = document.getElementById('alamat').value;
    const jumlahTabung = document.getElementById('jumlahTabung').value;
    const request = document.getElementById('request').value;

    if (name && alamat && jumlahTabung && request) {
        addData(name, alamat, jumlahTabung, request);
        // Do not reset form to keep data visible
    }
});

// Load data on page load
window.onload = loadData;
