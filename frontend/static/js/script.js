// Backend API Configuration
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://your-backend.back4app.io'; 

function show() {
    const menu = document.getElementById("menucont");
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    if (isMobile) {
        // Se la media query è attiva, mostra/nascondi il menu
        menu.classList.toggle("openmenu");
    }
}

async function donate(event){
    event.preventDefault();
    
    const selectedRadio = document.querySelector('input[name="amount"]:checked');
    let amount;
    
    if (!selectedRadio) {
        alert('Please select a donation amount');
        return;
    }
    
    if (selectedRadio.value === 'insert') {
        const customInput = document.getElementById('other');
        amount = parseFloat(customInput.value);
        
        if (!amount || amount < 1) {
            alert('Please enter a valid amount (minimum €1)');
            return;
        }
    } else {
        amount = parseFloat(selectedRadio.value);
    }
    
    try {
        const res = await fetch(`${BACKEND_URL}/create-checkout-session`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount })
        });
        
        if (!res.ok) {
            throw new Error('Failed to create checkout session');
        }
        
        const data = await res.json();
        window.location = data.url;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}