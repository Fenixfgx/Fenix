    const formGroups = document.querySelectorAll('.form-group');
    const stepButtons = document.querySelector('.step-buttons');
    let currentStep = 1;

    function showStep(step) {
      formGroups.forEach(group => group.classList.remove('active'));
      document.querySelector(`.step${step}`).classList.add('active');

      if (step === 1) {
        stepButtons.querySelector('button:first-child').style.display = 'none';
      } else if (step === 5) {
        stepButtons.querySelector('button:last-child').innerText = 'Enviar';
      } else {
        stepButtons.querySelector('button:first-child').style.display = 'inline-block';
        stepButtons.querySelector('button:last-child').innerText = 'Siguiente';
      }
    }

    function nextStep() {
      currentStep++;
      if (currentStep > 5) currentStep = 5;
      showStep(currentStep);
    }

    function prevStep() {
      currentStep--;
      if (currentStep < 1) currentStep = 1;
      showStep(currentStep);
    }

    showStep(currentStep);