document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("bookingModal1");
    const deliveryTypeField = document.getElementById("deliveryTypeField");
    const bookingForm = document.getElementById("bookingForm");
  
  
    // Function to round the time to the nearest 15-minute interval
  function roundTimeToNearestInterval(time) {
    const [hours, minutes] = time.split(":").map(Number);
  
    // Round minutes to the nearest 15
    const roundedMinutes = Math.round(minutes / 15) * 15;
  
    // If rounded minutes = 60, increment the hour by 1 and reset minutes to 00
    if (roundedMinutes === 60) {
      return `${hours + 1}:00`;
    }
  
    // Ensure two digits for minutes
    const roundedMinutesStr = String(roundedMinutes).padStart(2, '0');
    return `${hours}:${roundedMinutesStr}`;
  }
  
  // Listen for changes on the pickupTime input field
  const pickupTimeInput = document.getElementById("pickupTime");
  
  pickupTimeInput.addEventListener("input", function () {
    const time = pickupTimeInput.value;
    const roundedTime = roundTimeToNearestInterval(time);
    
    // Set the value of the input to the rounded time (to nearest 15-minute interval)
    pickupTimeInput.value = roundedTime;
  });
  
  // Listen for changes on the pickupTime input field
  const dropTimeInput = document.getElementById("dropTime");
  
  dropTimeInput.addEventListener("input", function () {
    const time = dropTimeInput.value;
    const roundedTime = roundTimeToNearestInterval(time);
    
    // Set the value of the input to the rounded time (to nearest 15-minute interval)
    dropTimeInput.value = roundedTime;
  });
  
  
    //Validations for date
    const pickupDateInput = document.getElementById("pickupDate");
    const dropDateInput = document.getElementById("dropDate");
  
    // Ensure the pickup date cannot be before today
    const today = new Date().toISOString().split("T")[0];
    pickupDateInput.setAttribute("min", today);
  
    pickupDateInput.addEventListener("change", () => {
      // Ensure drop date is after pickup date
      const pickupDate = pickupDateInput.value;
      dropDateInput.setAttribute("min", pickupDate);
    });
  
    dropDateInput.addEventListener("change", () => {
      const pickupDate = pickupDateInput.value;
      const dropDate = dropDateInput.value;
  
      if (new Date(dropDate) <= new Date(pickupDate)) {
        alert("Drop date must be after the pickup date.");
        dropDateInput.value = ""; // Clear invalid date
      }
    });
  
  
    // Add event listeners to all "Book Now" buttons
    const buttons = document.querySelectorAll(".openModalButton");
  
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const singleInfoDiv = event.target.closest(".single-info");
  
        const deliveryType = singleInfoDiv.querySelector(".deliveryType").textContent.trim();
  
        deliveryTypeField.value = deliveryType;
  
      });
    });
  
    // Handle form submission
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Gather form data
      const deliveryType = deliveryTypeField.value;
      const customerName = document.getElementById("customerName").value.trim();
      const customerEmail = document.getElementById("email").value.trim();
      const pickupDate = document.getElementById("pickupDate").value.trim();
      const pickupTime = document.getElementById("pickupTime").value.trim();
      const dropDate = document.getElementById("dropDate").value.trim();
      const dropTime = document.getElementById("dropTime").value.trim();
      const persons = document.getElementById("numberOfPersons").value.trim();
      const weight = document.getElementById("weight").value.trim();
      const fullAddress = document.getElementById("address").value.trim();
      const contactNumber = document.getElementById("mobileNumber").value.trim();
  
      // Validate fields
      if (
        !customerName ||
        !pickupDate ||
        !pickupTime ||
        !dropDate ||
        !dropTime ||
        !fullAddress ||
        !weight ||
        !contactNumber
      ) {
        alert("Please fill out all required fields.");
        return;
      }
  
      const bookingData = {
        type: deliveryType,
        name: customerName,
        contact: contactNumber,
        email: customerEmail,
        pickupDate,
        pickupTime,
        dropDate,
        dropTime,
        persons,
        weight: weight,
        address: fullAddress,
      };
  
  
  
      try {
        const response = await fetch("https://goods-booking.onrender.com/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });
  
        if (response.ok) {
          alert("Booking confirmed! Confirmation emails sent.");
        } else {
          alert("Failed to send confirmation emails.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      }
  
      // Reset the form
      bookingForm.reset();
  
      // Close the modal
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    });
  });
  