document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const metricInputs = document.getElementById('metric-inputs');
    const imperialInputs = document.getElementById('imperial-inputs');
    const heightCm = document.getElementById('height-cm');
    const weightKg = document.getElementById('weight-kg');
    const heightFt = document.getElementById('height-ft');
    const heightIn = document.getElementById('height-in');
    const weightLbs = document.getElementById('weight-lbs');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const calculateBtn = document.getElementById('calculate-bmi');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const healthyRange = document.getElementById('healthy-range');
    const weightStatus = document.getElementById('weight-status');
    const healthTips = document.getElementById('health-tips');

    // Unit system toggle
    document.getElementById('metric').addEventListener('change', function() {
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    });

    document.getElementById('imperial').addEventListener('change', function() {
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
    });

    // Initialize BMI Chart
    const bmiChart = new Chart(document.getElementById('bmi-chart'), {
        type: 'bar',
        data: {
            labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
            datasets: [{
                data: [18.5, 24.9, 29.9, 35],
                backgroundColor: [
                    '#dc3545', // danger
                    '#28a745', // success
                    '#ffc107', // warning
                    '#dc3545'  // danger
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'BMI Range'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Calculate BMI button click handler
    calculateBtn.addEventListener('click', calculateBMI);

    function calculateBMI() {
        let height, weight, bmi;
        const isMetric = document.getElementById('metric').checked;

        if (isMetric) {
            height = parseFloat(heightCm.value) / 100; // convert cm to m
            weight = parseFloat(weightKg.value);
            
            if (!height || !weight) {
                showError('Please enter both height and weight in metric units.');
                return;
            }
        } else {
            const feet = parseFloat(heightFt.value) || 0;
            const inches = parseFloat(heightIn.value) || 0;
            height = (feet * 12 + inches) * 0.0254; // convert to meters
            weight = parseFloat(weightLbs.value) * 0.453592; // convert to kg

            if (!heightFt.value || !weightLbs.value) {
                showError('Please enter both height and weight in imperial units.');
                return;
            }
        }

        // Calculate BMI
        bmi = weight / (height * height);
        
        // Update UI with results
        updateResults(bmi, height, weight);
    }

    function updateResults(bmi, height, weight) {
        // Display BMI value
        bmiValue.textContent = bmi.toFixed(1);

        // Determine BMI category and update UI
        let category, alertClass;
        if (bmi < 18.5) {
            category = 'Underweight';
            alertClass = 'danger';
        } else if (bmi < 25) {
            category = 'Normal weight';
            alertClass = 'success';
        } else if (bmi < 30) {
            category = 'Overweight';
            alertClass = 'warning';
        } else {
            category = 'Obese';
            alertClass = 'danger';
        }

        bmiCategory.className = `alert alert-${alertClass} mb-0`;
        bmiCategory.textContent = category;

        // Calculate and display healthy weight range
        const minWeight = 18.5 * (height * height);
        const maxWeight = 24.9 * (height * height);
        const isMetric = document.getElementById('metric').checked;

        if (isMetric) {
            healthyRange.textContent = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`;
        } else {
            const minLbs = minWeight * 2.20462;
            const maxLbs = maxWeight * 2.20462;
            healthyRange.textContent = `${minLbs.toFixed(1)} - ${maxLbs.toFixed(1)} lbs`;
        }

        // Update weight status
        const weightDiff = weight - minWeight;
        if (bmi < 18.5) {
            weightStatus.textContent = `${Math.abs(weightDiff).toFixed(1)} kg below healthy weight range`;
        } else if (bmi > 24.9) {
            weightStatus.textContent = `${weightDiff.toFixed(1)} kg above healthy weight range`;
        } else {
            weightStatus.textContent = 'Within healthy weight range';
        }

        // Update health tips
        updateHealthTips(bmi, age.value, gender.value);
    }

    function updateHealthTips(bmi, age, gender) {
        let tips = '<ul class="mb-0">';

        // General tips based on BMI
        if (bmi < 18.5) {
            tips += `
                <li>Consider consulting a healthcare provider about healthy weight gain.</li>
                <li>Focus on nutrient-dense foods.</li>
                <li>Include protein-rich foods in your diet.</li>
                <li>Try strength training exercises.</li>
            `;
        } else if (bmi < 25) {
            tips += `
                <li>Maintain your healthy lifestyle.</li>
                <li>Regular exercise (150 minutes/week).</li>
                <li>Balanced diet with plenty of fruits and vegetables.</li>
                <li>Regular health check-ups.</li>
            `;
        } else if (bmi < 30) {
            tips += `
                <li>Aim for gradual weight loss (1-2 lbs/week).</li>
                <li>Increase physical activity.</li>
                <li>Monitor portion sizes.</li>
                <li>Consider consulting a nutritionist.</li>
            `;
        } else {
            tips += `
                <li>Consult healthcare provider for personalized advice.</li>
                <li>Start with low-impact exercises.</li>
                <li>Focus on sustainable lifestyle changes.</li>
                <li>Consider professional support for weight management.</li>
            `;
        }

        // Age-specific tips
        if (age) {
            if (age < 18) {
                tips += '<li>Consult with pediatrician for age-appropriate advice.</li>';
            } else if (age > 65) {
                tips += '<li>Focus on maintaining muscle mass through strength training.</li>';
            }
        }

        // Gender-specific tips
        if (gender) {
            if (gender === 'female') {
                tips += '<li>Ensure adequate calcium and iron intake.</li>';
            } else if (gender === 'male') {
                tips += '<li>Focus on protein intake and strength training.</li>';
            }
        }

        tips += '</ul>';
        healthTips.innerHTML = tips;
    }

    function showError(message) {
        bmiValue.textContent = '--';
        bmiCategory.className = 'alert alert-danger mb-0';
        bmiCategory.textContent = message;
        healthyRange.textContent = '--';
        weightStatus.textContent = '--';
        healthTips.innerHTML = '<p class="text-muted">Please enter valid measurements to see health tips</p>';
    }

    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);

            if (value < min) this.value = min;
            if (value > max) this.value = max;
        });
    });
}); 