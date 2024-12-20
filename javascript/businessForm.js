// Event listener and API connection logic

document.addEventListener("DOMContentLoaded", () => {
    // Form submission event listeners
    const serviceProviderForm = document.getElementById("serviceProviderForm");
    const vehicleOwnerForm = document.getElementById("vehicleOwnerForm");
    const driverForm = document.getElementById("driverForm");
  
    // Helper function to send form data to the server
    const submitForm = (url, formData, formElement, modalId) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Form submitted successfully!");
            formElement.reset();
            
          } else {
            throw new Error("Failed to submit form.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while submitting the form.");
        });

    };
  
    // Service Provider form submission
    if (serviceProviderForm) {
      serviceProviderForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const formData = {
          fullName: document.getElementById("fullName").value,
          mobileNo: document.getElementById("mobileNo").value,
          email: document.getElementById("emailId").value,
          address: document.getElementById("address").value,
          businessName : document.getElementById("businessName").value,
          additionalInfo: {
            organizationType: document.getElementById("organisationType").value,
            transportationType: document.getElementById("transportationType").value,
            numberOfVehicles: document.getElementById("numberOfVehicles").value,
          },
        };
  
        submitForm("http://localhost:3003/submit-service-provider", formData, serviceProviderForm, "serviceProviderModal");

      });
    }
  
    // Vehicle Owner form submission
    if (vehicleOwnerForm) {
      vehicleOwnerForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const formData = {
          fullName: document.getElementById("fullNameOwner").value,
          mobileNo: document.getElementById("mobileNoOwner").value,
          email: document.getElementById("emailIdOwner").value,
          address: document.getElementById("addressOwner").value,
          additionalInfo: {
            numberOfVehicles: document.getElementById("numberOfVehiclesOwner").value,
            vehicleType: document.getElementById("vehicleType").value,
          },
        };
  
        submitForm("http://localhost:3003/submit-vehicle-owner", formData, vehicleOwnerForm, "vehicleOwnerModal");
      });
    }
  
    // Driver form submission
    if (driverForm) {
      driverForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const driverLicenseElement = document.getElementById("driverLicense");
  
        const formData = {
          fullName: document.getElementById("driverFullName").value,
          mobileNo: document.getElementById("driverMobileNo").value,
          email: document.getElementById("driverEmail").value,
          address: document.getElementById("driverAddress").value,
          additionalInfo: {
            hasTransportLicense: driverLicenseElement ? driverLicenseElement.value : "N/A",
            drivingExperience: document.getElementById("driverExperience").value,
            vehicleType: document.getElementById("driverVehicleType").value,
          },
        };
  
        submitForm("http://localhost:3003/submit-driver", formData, driverForm, "driverModal");
      });
    }

  });
  