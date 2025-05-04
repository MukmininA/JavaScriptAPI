// ====== Guest Book Logic ======
const guestForm = document.getElementById('guestForm');
const listTamu = document.getElementById('listTamu');

guestForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    if (!nama || !alamat || !pesan) {
        alert('Semua kolom harus diisi!');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${nama}</strong> (${alamat})<br>
        Pesan: ${pesan}<br>
        <button class="btn-selesai">Selesai</button>
        <button class="btn-hapus">Hapus</button>
    `;

    listTamu.appendChild(listItem);
    alert('Tamu berhasil ditambahkan!');
    guestForm.reset();
});

listTamu.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-hapus')) {
        const yakin = confirm('Yakin ingin menghapus tamu ini?');
        if (yakin) {
            const li = event.target.parentElement;
            listTamu.removeChild(li);
        }
    } else if (event.target.classList.contains('btn-selesai')) {
        const li = event.target.parentElement;
        li.classList.add('selesai');
        event.target.disabled = true;
    }
});

// ====== Pexels API Logic ======
const apiKey = "pzjWPM9bvXkcUwM7W80EXoETPIkBHRPENwBBHP7mKiCvSlspyfH3CKWh";

async function fetchPexelsImages(query = "cat") {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=6`, {
            headers: {
                Authorization: apiKey
            }
        });

        const data = await response.json();
        const gallery = document.getElementById("pexelsImages");
        gallery.innerHTML = "";

        data.photos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo.src.medium;
            img.alt = photo.photographer;
            img.title = `Foto oleh: ${photo.photographer}`;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error("Gagal mengambil gambar dari Pexels:", error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchPexelsImages("Ragdoll");
});
