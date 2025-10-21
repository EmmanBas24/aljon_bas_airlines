// passengers.js

document.addEventListener('DOMContentLoaded', function () {
    const passengerFormsContainer = document.getElementById('passengerFormsContainer');
    const passengerForm = document.getElementById('passengerForm');

    const raw = sessionStorage.getItem('bookingDetails');
    if (!raw) {
        alert('Booking details not found. Please start over.');
        window.location.href = 'search.html';
        return;
    }

    const bookingDetails = JSON.parse(raw);
    const numberOfPassengers = parseInt(bookingDetails.searchParams.passengers, 10) || 1;

    if (isNaN(numberOfPassengers) || numberOfPassengers < 1) {
        alert('Invalid number of passengers. Returning to search page.');
        window.location.href = 'search.html';
        return;
    }

    function generatePassengerForm(index) {
        return `
            <div class="passenger-card">
                <h3><i class="fas fa-user"></i> Passenger ${index + 1}</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="fullName_${index}">Full Name</label>
                        <input type="text" id="fullName_${index}" class="form-control"
                            placeholder="Enter full name" required
                            pattern="[-A-Za-zÀ-ž .']+">
                    </div>
                    <div class="form-group">
                        <label for="age_${index}">Age</label>
                        <input type="number" id="age_${index}" class="form-control"
                            placeholder="Enter age" min="1" max="120" required>
                    </div>
                    <div class="form-group">
                        <label for="contactNumber_${index}">Contact Number</label>
                        <input type="tel" id="contactNumber_${index}" class="form-control"
                            placeholder="e.g., 09123456789" required
                            pattern="[0-9]{10,12}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group large-input">
                        <label for="emailAddress_${index}">Email Address</label>
                        <input type="email" id="emailAddress_${index}" class="form-control"
                            placeholder="email@example.com" required>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate forms
    passengerFormsContainer.innerHTML = '';
    for (let i = 0; i < numberOfPassengers; i++) {
        passengerFormsContainer.insertAdjacentHTML('beforeend', generatePassengerForm(i));
    }

    passengerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const passengersData = [];
        for (let i = 0; i < numberOfPassengers; i++) {
            const fullName = document.getElementById(`fullName_${i}`);
            const age = document.getElementById(`age_${i}`);
            const contact = document.getElementById(`contactNumber_${i}`);
            const email = document.getElementById(`emailAddress_${i}`);

            if (!fullName.checkValidity()) {
                alert(`Please enter a valid full name for Passenger ${i + 1}.`);
                fullName.focus();
                return;
            }
            if (!age.checkValidity()) {
                alert(`Please enter a valid age for Passenger ${i + 1}.`);
                age.focus();
                return;
            }
            if (!contact.checkValidity()) {
                alert(`Please enter a valid contact number (10-12 digits) for Passenger ${i + 1}.`);
                contact.focus();
                return;
            }
            if (!email.checkValidity()) {
                alert(`Please enter a valid email address for Passenger ${i + 1}.`);
                email.focus();
                return;
            }

            passengersData.push({
                name: fullName.value.trim(),
                age: parseInt(age.value, 10),
                contact: contact.value.trim(),
                email: email.value.trim()
            });
        }

        bookingDetails.passengersInfo = passengersData;
        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Save passenger list for summary page
        sessionStorage.setItem('passengerList', JSON.stringify(passengersData));

        window.location.href = 'summary.html';
    });
});
