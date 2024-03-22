const articles = [
    {
        article: 'ART 01',
        description: 'Dirigindo veiculo danificado',
        prision: 0,
        fine: 5000,
        bail: 0,
    },
    {
        article: 'ART 02',
        description: 'Andando mascarado em vias publicas',
        prision: 10,
        fine: 50000,
        bail: 100000,
    }
];

const bodyTable = document.querySelector('#bodyTable');
const bodyTablePreview = document.querySelector('#bodyTablePreview');
const clearButton = document.getElementById('clearButton');

let totalPrision = 0;
let totalFine = 0;
let totalBail = 0;

articles.forEach(data => {
    const tr = document.createElement('tr');

    const tdArticles = document.createElement('td');
    tdArticles.textContent = data.article;

    const tdDescription = document.createElement('td');
    tdDescription.textContent = data.description;

    const tdPrision = document.createElement('td');
    tdPrision.textContent = `${data.prision} meses`;

    const tdFine = document.createElement('td');
    tdFine.textContent = `R$ ${data.fine}`;

    const tdBail = document.createElement('td');
    tdBail.textContent = `R$ ${data.bail}`;

    const tdActions = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Adicionar';
    button.addEventListener('click', () => {
        if (!isArticleAdded(data.article)) {
            addLinePreview(data);
            updateTotalValues(data);
            updateTotalFields();
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Este artigo já foi adicionado.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
    tdActions.appendChild(button);

    tr.appendChild(tdArticles);
    tr.appendChild(tdDescription);
    tr.appendChild(tdPrision);
    tr.appendChild(tdFine);
    tr.appendChild(tdBail);
    tr.appendChild(tdActions);

    bodyTable.appendChild(tr);
});

function isArticleAdded(article) {
    const trs = bodyTablePreview.getElementsByTagName('tr');
    for (let i = 0; i < trs.length; i++) {
        const tdArticles = trs[i].getElementsByTagName('td')[0];
        if (tdArticles.textContent === article) {
            return true;
        }
    }
    return false;
}

function addLinePreview(data) {
    const trPreviews = document.createElement('tr');

    const tdArticlesPreviews = document.createElement('td');
    tdArticlesPreviews.textContent = data.article;

    const tdDescriptionPreviews = document.createElement('td');
    tdDescriptionPreviews.textContent = data.description;

    const tdPrisionPreviews = document.createElement('td');
    tdPrisionPreviews.textContent = `${data.prision} meses`;

    const tdFinePreviews = document.createElement('td');
    tdFinePreviews.textContent = `R$ ${data.fine}`;

    const tdBailPreviews = document.createElement('td');
    tdBailPreviews.textContent = `R$ ${data.bail}`;

    const tdActionsPreviews = document.createElement('td');
    const buttonPreviews = document.createElement('button');
    buttonPreviews.textContent = 'Remover';
    buttonPreviews.addEventListener('click', () => {
        removeLinePreview(trPreviews);
        updateTotalValues(data, true);
        updateTotalFields();
    });
    tdActionsPreviews.appendChild(buttonPreviews);

    trPreviews.appendChild(tdArticlesPreviews);
    trPreviews.appendChild(tdDescriptionPreviews);
    trPreviews.appendChild(tdPrisionPreviews);
    trPreviews.appendChild(tdFinePreviews);
    trPreviews.appendChild(tdBailPreviews);
    trPreviews.appendChild(tdActionsPreviews);

    bodyTablePreview.appendChild(trPreviews);
}

function removeLinePreview(trPreviews) {
    trPreviews.remove();
}

function updateTotalValues(data, isRemoving = false) {
    if (!isRemoving) {
        totalPrision += data.prision;
        totalFine += data.fine;
        totalBail += data.bail;
    } else {
        totalPrision -= data.prision;
        totalFine -= data.fine;
        totalBail -= data.bail;
    }
}

function updateTotalFields() {
    const resultPrision = document.getElementById('resultPrision');
    const resultFine = document.getElementById('resultFine');
    const resultBail = document.getElementById('resultBail');

    resultPrision.placeholder = `${totalPrision.toLocaleString('pt-BR')} meses`;
    resultFine.placeholder = `R$ ${totalFine.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    resultBail.placeholder = `R$ ${totalBail.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

clearButton.addEventListener('click', () => {
    clearAllLines();
    resetTotalValues();
    updateTotalFields();
});

function clearAllLines() {
    while (bodyTablePreview.firstChild) {
        bodyTablePreview.removeChild(bodyTablePreview.firstChild);
    }
}

function resetTotalValues() {
    totalPrision = 0;
    totalFine = 0;
    totalBail = 0;
}