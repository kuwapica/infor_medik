document.getElementById("testForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form berdasarkan radio button yang dipilih
    const scores = Array.from(document.querySelectorAll("input[type='radio']:checked"))
        .map(input => parseInt(input.value));

    // Validasi apakah semua pertanyaan telah dijawab
    if (scores.length < 20) {
        alert("Harap jawab semua pertanyaan sebelum mengirimkan.");
        return;
    }

    // Pisahkan skor berdasarkan kategori
    const stressScores = scores.slice(0, 5); // Pertanyaan 1–5 untuk stres
    const anxietyScores = scores.slice(5, 10); // Pertanyaan 6–10 untuk kecemasan
    const depressionScores = scores.slice(10, 15); // Pertanyaan 11–15 untuk depresi
    const balanceScores = scores.slice(15, 20); // Pertanyaan 16–20 untuk keseimbangan hidup

    // Hitung skor total untuk masing-masing kategori
    const stressTotal = stressScores.reduce((sum, score) => sum + score, 0);
    const anxietyTotal = anxietyScores.reduce((sum, score) => sum + score, 0);
    const depressionTotal = depressionScores.reduce((sum, score) => sum + score, 0);
    const balanceTotal = balanceScores.reduce((sum, score) => sum + score, 0);

    // Hitung total keseluruhan skor
    const overallScore = stressTotal + anxietyTotal + depressionTotal + balanceTotal;

    // Fungsi untuk menentukan kategori, tips, dan kemungkinan penyakit
    const categorize = (score, thresholds, tips, illnesses) => {
        if (score <= thresholds[0]) return { category: "Sangat Baik", tips: tips[0], illness: illnesses[0] };
        else if (score <= thresholds[1]) return { category: "Ringan", tips: tips[1], illness: illnesses[1] };
        else if (score <= thresholds[2]) return { category: "Sedang", tips: tips[2], illness: illnesses[2] };
        else return { category: "Berat", tips: tips[3], illness: illnesses[3] };
    };

    // Thresholds, tips, dan penyakit kemungkinan untuk masing-masing kategori
    const stressTips = [
        "Pertahankan kebiasaan baik Anda.",
        "Lakukan latihan pernapasan atau olahraga ringan.",
        "Kurangi beban kerja dan cari dukungan teman atau keluarga.",
        "Segera konsultasikan dengan ahli kesehatan mental."
    ];
    const stressIllnesses = [
        "Tidak ada indikasi penyakit.",
        "Kemungkinan stres ringan.",
        "Kemungkinan stres moderat.",
        "Kemungkinan stres kronis."
    ];

    const anxietyTips = [
        "Anda tidak menunjukkan tanda kecemasan. Tetaplah menjaga keseimbangan.",
        "Coba lakukan meditasi atau journaling.",
        "Luangkan waktu untuk relaksasi seperti yoga atau berjalan-jalan.",
        "Konsultasikan dengan psikolog untuk penanganan lebih lanjut."
    ];
    const anxietyIllnesses = [
        "Tidak ada indikasi penyakit.",
        "Kemungkinan gangguan kecemasan ringan.",
        "Kemungkinan gangguan kecemasan sedang.",
        "Kemungkinan gangguan kecemasan berat."
    ];

    const depressionTips = [
        "Tidak ada tanda depresi. Tetaplah positif.",
        "Fokus pada hal-hal yang membuat Anda bahagia.",
        "Jangan ragu mencari bantuan dari keluarga atau teman.",
        "Segera konsultasikan dengan terapis profesional."
    ];
    const depressionIllnesses = [
        "Tidak ada indikasi penyakit.",
        "Kemungkinan depresi ringan.",
        "Kemungkinan depresi sedang.",
        "Kemungkinan depresi berat atau klinis."
    ];

    const balanceTips = [
        "Keseimbangan hidup Anda baik. Pertahankan!",
        "Prioritaskan waktu untuk diri sendiri.",
        "Atur kembali waktu untuk pekerjaan dan keluarga.",
        "Pertimbangkan untuk berbicara dengan seorang konselor."
    ];
    const balanceIllnesses = [
        "Keseimbangan hidup terjaga.",
        "Kemungkinan kurangnya prioritas pada keseimbangan hidup.",
        "Kemungkinan burnout ringan.",
        "Kemungkinan burnout berat."
    ];

    // Kategorikan dan ambil tips serta penyakit untuk masing-masing aspek
    const stressResult = categorize(stressTotal, [10, 20, 30], stressTips, stressIllnesses);
    const anxietyResult = categorize(anxietyTotal, [10, 20, 30], anxietyTips, anxietyIllnesses);
    const depressionResult = categorize(depressionTotal, [10, 20, 30], depressionTips, depressionIllnesses);
    const balanceResult = categorize(balanceTotal, [10, 20, 30], balanceTips, balanceIllnesses);

    // Kesimpulan akhir berdasarkan total skor keseluruhan
    let conclusion;
    if (overallScore <= 40) {
        conclusion = "Kondisi mental Anda sangat baik secara keseluruhan.";
    } else if (overallScore <= 60) {
        conclusion = "Kondisi mental Anda stabil, tetapi tetap waspada.";
    } else if (overallScore <= 80) {
        conclusion = "Kondisi mental Anda memerlukan perhatian khusus.";
    } else {
        conclusion = "Kondisi mental Anda membutuhkan bantuan profesional segera.";
    }

    // Tampilkan hasil
    document.getElementById("result-test").innerHTML = `
        <h3>Hasil Tes</h3>
        <p><b>Stres:</b> Skor ${stressTotal} - Kategori ${stressResult.category}</p>
        <p>${stressResult.tips}</p>
        <p><b>Kemungkinan:</b> ${stressResult.illness}</p>
        <br>
        <p><b>Kecemasan:</b> Skor ${anxietyTotal} - Kategori ${anxietyResult.category}</p>
        <p>${anxietyResult.tips}</p>
        <p><b>Kemungkinan:</b> ${anxietyResult.illness}</p>
        <br>
        <p><b>Depresi:</b> Skor ${depressionTotal} - Kategori ${depressionResult.category}</p>
        <p>${depressionResult.tips}</p>
        <p><b>Kemungkinan:</b> ${depressionResult.illness}</p>
        <br>
        <p><b>Keseimbangan Hidup:</b> Skor ${balanceTotal} - Kategori ${balanceResult.category}</p>
        <p>${balanceResult.tips}</p>
        <p><b>Kemungkinan:</b> ${balanceResult.illness}</p>
        <br>
        <h3>Total Keseluruhan Skor</h3>
        <p><b>Skor Keseluruhan:</b> ${overallScore}</p>
        <p><b>Kesimpulan:</b> ${conclusion}</p>
    `;
});
