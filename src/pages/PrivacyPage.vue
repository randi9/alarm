<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="privacy-page">
        <h1>Kebijakan Privasi</h1>
        <p class="privacy-page__date">Terakhir diperbarui: 11 Mei 2026</p>

        <section>
          <h2>1. Pendahuluan</h2>
          <p>
            BunYing ("kami", "kita", atau "milik kami") mengoperasikan website bunying.id.
            Halaman ini menjelaskan kebijakan kami terkait pengumpulan, penggunaan, dan
            pengungkapan informasi pribadi saat Anda menggunakan layanan kami.
          </p>
        </section>

        <section>
          <h2>2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan informasi berikut:</p>
          <ul>
            <li>Informasi penggunaan situs (halaman yang dikunjungi, durasi kunjungan)</li>
            <li>Informasi perangkat (jenis browser, sistem operasi)</li>
            <li>Alamat IP</li>
            <li>Cookies dan teknologi pelacakan serupa</li>
          </ul>
        </section>

        <section>
          <h2>3. Penggunaan Informasi</h2>
          <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
          <ul>
            <li>Menyediakan dan memelihara layanan kami</li>
            <li>Meningkatkan pengalaman pengguna</li>
            <li>Menganalisis penggunaan situs</li>
            <li>Menampilkan iklan yang relevan</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Kami menggunakan cookies dan teknologi pelacakan serupa untuk melacak aktivitas
            di layanan kami dan menyimpan informasi tertentu. Cookies digunakan untuk
            mengoperasikan layanan kami, termasuk untuk menampilkan iklan melalui Google AdSense.
          </p>
        </section>

        <section>
          <h2>5. Iklan</h2>
          <p>
            Kami dapat menggunakan layanan iklan pihak ketiga, termasuk Google AdSense, untuk
            menampilkan iklan di website kami. Penyedia iklan ini mungkin menggunakan cookies
            untuk menampilkan iklan berdasarkan kunjungan Anda sebelumnya ke situs web kami
            atau situs web lain.
          </p>
        </section>

        <section>
          <h2>6. Tautan ke Situs Lain</h2>
          <p>
            Layanan kami mungkin berisi tautan ke situs lain yang tidak dioperasikan oleh kami.
            Kami sangat menyarankan Anda untuk meninjau kebijakan privasi setiap situs yang Anda kunjungi.
          </p>
        </section>

        <section>
          <h2>7. Keamanan</h2>
          <p>
            Keamanan informasi Anda penting bagi kami. Kami berusaha menggunakan cara yang
            dapat diterima secara komersial untuk melindungi informasi pribadi Anda, namun
            perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode
            penyimpanan elektronik yang 100% aman.
          </p>
        </section>

        <section>
          <h2>8. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan
            memberitahukan perubahan apa pun dengan memposting Kebijakan Privasi baru
            di halaman ini.
          </p>
        </section>

        <section>
          <h2>9. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
          </p>
          <ul>
            <li>Email: halo@bunying.id</li>
            <li>WhatsApp: +62 812-3456-7890</li>
          </ul>
        </section>

        <hr>

        <h1 style="margin-top: 3rem;">Syarat & Ketentuan</h1>

        <section>
          <h2>1. Ketentuan Umum</h2>
          <p>
            Dengan mengakses dan menggunakan website BunYing, Anda menyetujui untuk terikat
            oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari
            ketentuan ini, mohon untuk tidak menggunakan layanan kami.
          </p>
        </section>

        <section>
          <h2>2. Penggunaan Layanan</h2>
          <p>
            Semua ringtone dan alarm yang tersedia di BunYing disediakan untuk penggunaan pribadi.
            Dilarang mendistribusikan ulang, menjual, atau menggunakan untuk tujuan komersial
            tanpa izin tertulis dari kami.
          </p>
        </section>

        <section>
          <h2>3. Konten</h2>
          <p>
            Kami berusaha menyediakan konten yang akurat dan berkualitas. Namun, kami tidak
            menjamin bahwa semua konten bebas dari kesalahan. Penggunaan konten sepenuhnya
            menjadi tanggung jawab pengguna.
          </p>
        </section>

        <section>
          <h2>4. Hak Kekayaan Intelektual</h2>
          <p>
            Semua konten di website ini, termasuk teks, grafik, logo, dan audio, dilindungi
            oleh hak cipta dan hak kekayaan intelektual lainnya.
          </p>
        </section>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '../components/layout/AppFooter.vue'
</script>

<style scoped>
.privacy-page {
  max-width: 700px;
  margin: 0 auto;
  padding: var(--space-2xl) 0;
}

.privacy-page h1 {
  font-size: 2rem;
  margin-bottom: var(--space-sm);
}

.privacy-page__date {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: var(--space-2xl);
}

.privacy-page section {
  margin-bottom: var(--space-xl);
}

.privacy-page h2 {
  font-size: 1.2rem;
  margin-bottom: var(--space-sm);
  color: var(--text-primary);
}

.privacy-page p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.9rem;
  margin-bottom: var(--space-sm);
}

.privacy-page ul {
  padding-left: var(--space-xl);
  margin-bottom: var(--space-sm);
}

.privacy-page li {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.8;
  list-style: disc;
}

.privacy-page hr {
  border: none;
  border-top: 1px solid var(--glass-border);
  margin: var(--space-2xl) 0;
}
</style>
