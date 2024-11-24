// Function to load and display the results
function loadResults() {
    const userResponses = JSON.parse(localStorage.getItem('userResponses')) || [];

    const goodAdjectives = [];
    const contentAdjectives = [];
    const improvementAdjectives = [];

    // Process user responses
    userResponses.forEach(entry => {
        // Skip entries missing the "adjective" key
        if (!entry.adjective) {
            console.warn('Skipping malformed entry:', entry);
            return;
        }

        const { adjective, firstQuestion, secondQuestion } = entry;

        // Classify adjectives into columns
        if (firstQuestion >= 7) {
            goodAdjectives.push(adjective);
        }

        if (firstQuestion === secondQuestion) {
            contentAdjectives.push(adjective);
        }

        if (secondQuestion > firstQuestion) {
            improvementAdjectives.push(adjective);
        }
    });

    // Populate the three columns
    populateColumn('good-adjectives', goodAdjectives, "YOUR POSITIVE TRAITS");
    populateColumn('content-adjectives', contentAdjectives, "TRAITS YOU’RE CONTENT WITH");
    populateColumn('improve-adjectives', improvementAdjectives, "AREAS FOR GROWTH");
}

// Function to populate a specific column with adjectives and a title
function populateColumn(columnId, adjectives, title) {
    const column = document.getElementById(columnId);
    const ul = column.querySelector('ul');

    // Ensure the title (h3) is displayed
    const h3 = column.querySelector('h3');
    if (h3) {
        h3.textContent = title;
    }

    // Clear and populate the list
    ul.innerHTML = '';
    adjectives.forEach(adjective => {
        const listItem = document.createElement('li');
        listItem.textContent = adjective;
        ul.appendChild(listItem);
    });
}

// Load the results when the page is ready
document.addEventListener('DOMContentLoaded', loadResults);


// Function to export results as PDF
function exportToPDF() {
    const pdfContent = document.getElementById('results-container');
    const options = {
        margin: 1,
        filename: 'tarot-card-game-results.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(pdfContent).set(options).save();
}

// Load the results when the page is ready
document.addEventListener('DOMContentLoaded', loadResults);

// Attach PDF export functionality to button
document.getElementById('export-pdf').addEventListener('click', exportToPDF);