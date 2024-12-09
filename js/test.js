//buat test
document.getElementById("testForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form berdasarkan radio button yang dipilih
    const scores = Array.from(document.querySelectorAll("input[type='radio']:checked"))
        .map(input => parseInt(input.value));

    // Validasi apakah semua pertanyaan telah dijawab
    if (scores.length < 2) { // Ganti angka ini sesuai jumlah pertanyaan
        alert("Harap jawab semua pertanyaan sebelum mengirimkan.");
        return;
    }

    // Hitung total skor
    const totalScore = scores.reduce((sum, score) => sum + score, 0);

    // Kategorikan hasil
    let result;
    if (totalScore <= 10) {
        result = "Kondisi Anda sangat baik. Tidak ada tanda stres.";
    } else if (totalScore <= 15) {
        result = "Kondisi Anda cukup stabil, tetapi tetap waspada jika gejala meningkat.";
    } else if (totalScore <= 20) {
        result = "Kondisi Anda memerlukan perhatian. Cobalah kelola stres lebih baik.";
    } else {
        result = "Kondisi Anda membutuhkan bantuan profesional. Segera konsultasikan masalah Anda.";
    }

    // Tampilkan hasil
    document.getElementById("result-test").innerHTML = `
        <h3>Hasil Tes</h3>
        <p>Skor Anda: ${totalScore}</p>
        <p>${result}</p>
    `;
});

