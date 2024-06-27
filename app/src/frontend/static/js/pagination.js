function setupPagination(currentPage, tableData, rowsPerPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const pageCount = Math.ceil(tableData.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('page-button');
        button.addEventListener('click', function () {
            currentPage = i;
            displayTableData(currentPage);
            updatePaginationButtons();
        });
        paginationDiv.appendChild(button);
    }
    updatePaginationButtons(currentPage);
}

function updatePaginationButtons(currentPage) {
    const buttons = document.querySelectorAll('.page-button');
    buttons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

window.setupPagination = setupPagination;
window.updatePaginationButtons = updatePaginationButtons;