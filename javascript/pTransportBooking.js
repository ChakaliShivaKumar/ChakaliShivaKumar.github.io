document.addEventListener("DOMContentLoaded", () => {
    const vehicleRentalForm = document.getElementById("vehicleRentalForm");
    const selfDriveRentalForm = document.getElementById("selfDriveRentalForm");
    const shuttleServiceForm = document.getElementById("shuttleServiceForm");
    const driverBookingForm = document.getElementById("driverBookingForm");
    const interstateForm = document.getElementById("interstateForm");
    const intrastateForm = document.getElementById("intrastateForm");


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
  

    // vehicleRentalForm submission
    if (vehicleRentalForm) {
        vehicleRentalForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Vehicle Rentals (With Driver)",
            name: document.getElementById("customerName").value,
            contact: document.getElementById("mobileNumber").value,
            email: document.getElementById("customerEmail").value,
            pickupLocation: document.getElementById("pickupLocation").value,
            pickupDate: document.getElementById("pickupDate").value.trim(),
            pickupTime: document.getElementById("pickupTime").value.trim(),
            dropDate: document.getElementById("dropDate").value.trim(),
            dropTime: document.getElementById("dropTime").value.trim(),
            persons: document.getElementById("numberOfPersons").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            vehicleRentalForm.reset();
  
        });
        
    }

    if (selfDriveRentalForm) {
        selfDriveRentalForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Vehicle Rentals (Self Drive)",
            name: document.getElementById("ScustomerName").value,
            contact: document.getElementById("SmobileNumber").value,
            email: document.getElementById("ScustomerEmail").value,
            pickupLocation: document.getElementById("SpickupLocation").value,
            pickupDate: document.getElementById("SpickupDate").value.trim(),
            pickupTime: document.getElementById("SpickupTime").value.trim(),
            dropDate: document.getElementById("SdropDate").value.trim(),
            dropTime: document.getElementById("SdropTime").value.trim(),
            persons: document.getElementById("SnumberOfPersons").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            selfDriveRentalForm.reset();
  
        });
        
    }


    if (shuttleServiceForm) {
        shuttleServiceForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Shuttle/Commute Transportation",
            name: document.getElementById("CcustomerName").value,
            contact: document.getElementById("CmobileNumber").value,
            email: document.getElementById("CcustomerEmail").value,
            pickupLocation: document.getElementById("CpickupLocation").value,
            pickupDate: document.getElementById("CpickupDate").value.trim(),
            pickupTime: document.getElementById("CpickupTime").value.trim(),
            dropDate: document.getElementById("CdropDate").value.trim(),
            dropTime: document.getElementById("CdropTime").value.trim(),
            persons: document.getElementById("CnumberOfPersons").value,
            periodOfService: document.getElementById("periodOfService").value,
            numberOfTimes: document.getElementById("numberOfTimes").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email-shuttle", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            shuttleServiceForm.reset();
  
        });
        
    }

    if (driverBookingForm) {
        driverBookingForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Driver",
            name: document.getElementById("DcustomerName").value,
            contact: document.getElementById("DmobileNumber").value,
            email: document.getElementById("DcustomerEmail").value,
            pickupLocation: document.getElementById("DpickupLocation").value,
            pickupDate: document.getElementById("DpickupDate").value.trim(),
            pickupTime: document.getElementById("DpickupTime").value.trim(),
            dropDate: document.getElementById("DdropDate").value.trim(),
            dropTime: document.getElementById("DdropTime").value.trim(),
            vehicleType: document.getElementById("DvehicleType").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email-driver", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            driverBookingForm.reset();
  
        });
        
    }

    if (interstateForm) {
        interstateForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Interstate Transportation",
            name: document.getElementById("IntercustomerName").value,
            contact: document.getElementById("IntermobileNumber").value,
            email: document.getElementById("IntercustomerEmail").value,
            pickupLocation: document.getElementById("InterpickupLocation").value,
            pickupDate: document.getElementById("InterpickupDate").value.trim(),
            pickupTime: document.getElementById("InterpickupTime").value.trim(),
            dropDate: document.getElementById("InterdropDate").value.trim(),
            dropTime: document.getElementById("InterdropTime").value.trim(),
            persons: document.getElementById("InternumberOfPersons").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            interstateForm.reset();
  
        });
        
    }

    if (intrastateForm) {
        intrastateForm.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const formData = {
            type: "Intrastate Transportation",
            name: document.getElementById("IntracustomerName").value,
            contact: document.getElementById("IntramobileNumber").value,
            email: document.getElementById("IntracustomerEmail").value,
            pickupLocation: document.getElementById("IntrapickupLocation").value,
            pickupDate: document.getElementById("IntrapickupDate").value.trim(),
            pickupTime: document.getElementById("IntrapickupTime").value.trim(),
            dropDate: document.getElementById("IntradropDate").value.trim(),
            dropTime: document.getElementById("IntradropTime").value.trim(),
            persons: document.getElementById("IntranumberOfPersons").value,
          };


          try {
            const response = await fetch("https://chakalishivakumar-github-io.onrender.com/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
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
            intrastateForm.reset();
  
        });
        
    }

});
