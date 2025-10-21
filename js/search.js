// search.js
document.addEventListener('DOMContentLoaded', function () {
    const flightSearchForm = document.getElementById('flightSearchForm');

    flightSearchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const flightType = document.querySelector('input[name="flightType"]:checked').value;
        const departureDate = document.getElementById('departureDate').value;
        const returnDate = flightType === 'roundTrip' ? document.getElementById('returnDate').value : '';
        const fromLocation = document.getElementById('fromLocation').value.trim();
        const toLocation = document.getElementById('toLocation').value.trim();
        const passengers = parseInt(document.getElementById('passengers').value, 10) || 1;

        if (!fromLocation) {
            alert('Please enter an origin.');
            return;
        }
        if (!toLocation) {
            alert('Please enter a destination.');
            return;
        }
        if (!departureDate) {
            alert('Please select a departure date.');
            return;
        }
        if (flightType === 'roundTrip') {
            if (!returnDate) {
                alert('Please select a return date for a round trip.');
                return;
            }
            if (new Date(returnDate) < new Date(departureDate)) {
                alert('Return date cannot be earlier than departure date.');
                return;
            }
        }

        const bookingDetails = {
            searchParams: {
                flightType,
                departDate: departureDate,
                returnDate: returnDate,
                from: fromLocation,
                to: toLocation,
                passengers
            },
            selectedDeparture: null,
            selectedReturn: null,
            passengersInfo: null
        };

        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        const params = new URLSearchParams();
        params.set('flightType', flightType);
        params.set('departDate', departureDate);
        if (flightType === 'roundTrip') params.set('returnDate', returnDate);
        params.set('from', fromLocation);
        params.set('to', toLocation);
        params.set('passengers', passengers.toString());

        window.location.href = `flights.html?${params.toString()}`;
    });

    const roundTripRadio = document.getElementById('roundTrip');
    const oneWayRadio = document.getElementById('oneWay');
    const returnDateGroup = document.getElementById('returnDateGroup');
    const returnDateInput = document.getElementById('returnDate');

    function toggleReturnDate() {
        if (oneWayRadio && oneWayRadio.checked) {
            returnDateGroup.style.display = 'none';
            returnDateInput.removeAttribute('required');
            returnDateInput.value = '';
        } else {
            returnDateGroup.style.display = 'block';
            returnDateInput.setAttribute('required', 'required');
        }
    }

    if (roundTripRadio && oneWayRadio) {
        toggleReturnDate();
        roundTripRadio.addEventListener('change', toggleReturnDate);
        oneWayRadio.addEventListener('change', toggleReturnDate);
    }
});
