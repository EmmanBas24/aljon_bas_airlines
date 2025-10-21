document.addEventListener("DOMContentLoaded", () => {
    // --- Get booking details from sessionStorage ---
    const rawBooking = sessionStorage.getItem("bookingDetails");
    if (!rawBooking) {
        alert("⚠️ Missing booking details. Please go back and complete your booking.");
        window.location.href = "search.html";
        return;
    }

    const bookingDetails = JSON.parse(rawBooking);

    // --- Extract flights and passengers ---
    const departureFlight = bookingDetails.selectedDeparture || {};
    const returnFlight = bookingDetails.selectedReturn || {};
    const passengers = bookingDetails.passengersInfo || [];

    // --- Calculate total cost ---
    const departurePrice = departureFlight.price || 0;
    const returnPrice = returnFlight.price || 0;
    const totalCost = (departurePrice + returnPrice) * passengers.length;

    // --- Populate Flight Details ---
    const flightSection = document.getElementById("flightDetails");
    let flightHTML = `
        <h3 class="section-title"><i class="fas fa-plane-departure"></i> Flight Details</h3>
        <div class="detail-group">
            <h4 class="detail-subtitle">Departure Flight</h4>
            <div class="detail-item"><span>Flight No:</span><span>${departureFlight.flightNumber || "N/A"}</span></div>
            <div class="detail-item"><span>From:</span><span>${departureFlight.from || "N/A"}</span></div>
            <div class="detail-item"><span>To:</span><span>${departureFlight.to || "N/A"}</span></div>
            <div class="detail-item"><span>Date:</span><span>${departureFlight.date || "N/A"}</span></div>
            <div class="detail-item"><span>Departure:</span><span>${departureFlight.departureTime || "N/A"}</span></div>
            <div class="detail-item"><span>Arrival:</span><span>${departureFlight.arrivalTime || "N/A"}</span></div>
        </div>
    `;

    if (returnFlight.flightNumber) {
        flightHTML += `
        <div class="detail-group mt-3">
            <h4 class="detail-subtitle">Return Flight</h4>
            <div class="detail-item"><span>Flight No:</span><span>${returnFlight.flightNumber}</span></div>
            <div class="detail-item"><span>From:</span><span>${returnFlight.from}</span></div>
            <div class="detail-item"><span>To:</span><span>${returnFlight.to}</span></div>
            <div class="detail-item"><span>Date:</span><span>${returnFlight.date}</span></div>
            <div class="detail-item"><span>Departure:</span><span>${returnFlight.departureTime}</span></div>
            <div class="detail-item"><span>Arrival:</span><span>${returnFlight.arrivalTime}</span></div>
        </div>
        `;
    }

    flightSection.innerHTML = flightHTML;

    // --- Populate Passenger Details ---
    const passengerSection = document.getElementById("passengerDetails");
    passengerSection.innerHTML = `
        <h3 class="section-title"><i class="fas fa-users"></i> Passenger Details</h3>
        ${
            passengers.length === 0
                ? "<p>No passenger information available.</p>"
                : passengers.map((p, i) => `
                    <div class="detail-group ${i > 0 ? 'mt-3' : ''}">
                        <h4 class="detail-subtitle">Passenger ${i + 1}</h4>
                        <div class="detail-item"><span>Name:</span><span>${p.name}</span></div>
                        <div class="detail-item"><span>Age:</span><span>${p.age}</span></div>
                        <div class="detail-item"><span>Contact:</span><span>${p.contact}</span></div>
                        <div class="detail-item"><span>Email:</span><span>${p.email}</span></div>
                    </div>
                `).join("")
        }
    `;

    // --- Populate Price Details ---
    const priceSection = document.getElementById("priceDetails");
    priceSection.innerHTML = `
        <h3 class="section-title"><i class="fas fa-dollar-sign"></i> Price Breakdown</h3>
        <div class="detail-group mt-3">
            <div class="detail-item"><span>Number of Passengers:</span><span>${passengers.length}</span></div>
            <div class="detail-item"><span>Total Amount:</span><span>₱${totalCost.toLocaleString()}</span></div>
        </div>
    `;

    // --- Book Now Button ---
    document.getElementById('bookNowBtn').addEventListener('click', () => {
        alert('✅ Booking confirmed! Thank you for flying with SkyWings Airlines.');
        sessionStorage.clear();
        window.location.href = "index.html";
    });
});
