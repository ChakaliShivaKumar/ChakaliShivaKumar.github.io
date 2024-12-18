document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("bookingModal1");
    const deliveryTypeField = document.getElementById("deliveryTypeField");
    const deliveryDescriptionField = document.getElementById("deliveryDescriptionField");
    const bookingForm = document.getElementById("bookingForm");
    const gpsLocationField = document.getElementById("gpsLocation");
  
    // Add event listeners to all "Book Now" buttons
    const buttons = document.querySelectorAll(".openModalButton");
  
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Traverse to the nearest parent with the class "single-info"
        const singleInfoDiv = event.target.closest(".single-info");
  
        const deliveryType = singleInfoDiv.querySelector(".deliveryType").textContent.trim();
        
        const deliveryDescription = singleInfoDiv.querySelector(".deliveryDescription").textContent.trim();
        
        deliveryTypeField.value = deliveryType;
        deliveryDescriptionField.value = deliveryDescription;

        // Fetch the user's GPS location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            gpsLocationField.value = `https://www.google.com/maps?q=${latitude},${longitude}`;
          },
          (error) => {
            gpsLocationField.value = "Unable to fetch location.";
            console.error("Error fetching location:", error);
          }
        );
      } else {
        gpsLocationField.value = "Geolocation not supported.";
      }
      });
    });
  
    // Handle form submission
    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault();
      
        // Gather form data
        const deliveryType = deliveryTypeField.value;
        const deliveryDescription = deliveryDescriptionField.value;
        const customerName = document.getElementById("customerName").value.trim();
        const customerEmail = document.getElementById("customerEmail").value.trim();
        const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
        const gpsLocation = gpsLocationField.value.trim();
        const contactNumber = document.getElementById("contactNumber").value.trim();
      
        if (!customerName || !customerEmail || !deliveryAddress || !contactNumber) {
          alert("Please fill out all required fields.");
          return;
        }
    
        const bookingData = {
          type: deliveryType,
          description: deliveryDescription,
          name: customerName,
          email: customerEmail,
          address: deliveryAddress,
          location: gpsLocation,
          contact: contactNumber,
        };
      
        try {
          const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email", {
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
  