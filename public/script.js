// Load all patients on start
window.onload = loadPatients;

// Submit form
document.getElementById("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        id: document.getElementById("patientId").value || null,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        fee: document.getElementById("fee").value,
        next_appointment: document.getElementById("next_appointment").value,
        condition: document.getElementById("condition").value,
        medications: document.getElementById("medications").value
    };

    await fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    clearForm();
    loadPatients();
});

// Load patients
async function loadPatients() {
    const res = await fetch("/patients");
    const patients = await res.json();

    const list = document.getElementById("patientsList");
    list.innerHTML = "";

    patients.forEach(p => {
        const card = document.createElement("div");
        card.className = "patient-card";
        card.innerHTML = `
            <div class="patient-name">${p.name}</div>
            <div class="patient-info">
                العمر: ${p.age}<br>
                الرسوم: ${p.fee} شيكل<br>
                الموعد القادم: ${p.next_appointment || "لا يوجد"}<br><br>
                <strong>الحالة:</strong><br>${p.condition}<br><br>
                <strong>الأدوية:</strong><br>${p.medications}
            </div>
            <button style="margin-top:15px" onclick="editPatient(${p.id})">تعديل</button>
        `;
        list.appendChild(card);
    });
}

// Fill form for edit
async function editPatient(id) {
    const res = await fetch("/patients");
    const patients = await res.json();
    const p = patients.find(x => x.id === id);

    document.getElementById("patientId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("age").value = p.age;
    document.getElementById("fee").value = p.fee;
    document.getElementById("next_appointment").value = p.next_appointment;
    document.getElementById("condition").value = p.condition;
    document.getElementById("medications").value = p.medications;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearForm() {
    document.getElementById("patientId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("fee").value = "";
    document.getElementById("next_appointment").value = "";
    document.getElementById("condition").value = "";
    document.getElementById("medications").value = "";
}
