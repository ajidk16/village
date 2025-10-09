<main class="bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
	<div class="bg-slate-100 text-sm dark:bg-slate-900">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
			<div class="flex items-center gap-3">
				<span class="inline-flex items-center gap-1"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M2.25 6.75l8.955 5.372a2.25 2.25 0 002.29 0L22.5 6.75M3.75 17.25h16.5a1.5 1.5 0 001.5-1.5V6.879c0-.57-.305-1.096-.8-1.377L12.8 1.89a1.5 1.5 0 00-1.6 0L3.05 5.502c-.494.281-.8.807-.8 1.377V15.75a1.5 1.5 0 001.5 1.5z"
						/></svg
					> desa@harmoni.id</span
				>
				<span class="hidden items-center gap-1 sm:inline-flex"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M2.25 3.75l16.5 16.5m-4.125-3.375A11.25 11.25 0 015.625 5.625M8.25 3.75A15.75 15.75 0 0020.25 15.75"
						/></svg
					> (0721) 123-456</span
				>
			</div>
			<div class="flex items-center gap-3">
				<button
					id="themeToggle"
					class="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
					aria-label="Toggle tema gelap/terang"
				>
					<svg
						id="iconSun"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="hidden h-5 w-5"
						><path
							fill="currentColor"
							d="M12 18a6 6 0 100-12 6 6 0 000 12ZM12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1Zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1Zm10-9a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1ZM4 12a1 1 0 01-1-1H2a1 1 0 100 2h1a1 1 0 011-1Zm14.95-6.364a1 1 0 010 1.414l-.707.707a1 1 0 01-1.415-1.414l.708-.707a1 1 0 011.414 0ZM6.172 17.657a1 1 0 010 1.414l-.708.707A1 1 0 114.05 18.364l.707-.707a1 1 0 011.415 0Zm12.728 0l-.708.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.415 1.414ZM6.172 6.343a1 1 0 01-1.415 0l-.707-.707A1 1 0 115.05 4.222l.707.707a1 1 0 010 1.414Z"
						/></svg
					>
					<svg id="iconMoon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
						><path
							fill="currentColor"
							d="M21 12.79A9 9 0 1111.21 3c.2 0 .4 0 .6.02A7 7 0 0021 12a7.05 7.05 0 01-.02.79Z"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>

	<!-- Navbar -->
	<header
		id="navbar"
		class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur transition-all dark:border-slate-800 dark:bg-slate-950/60"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<a href="#" class="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
					<span
						class="bg-brand-600 shadow-soft inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
						>DH</span
					>
					<span>Desa Harmoni</span>
				</a>
				<nav class="hidden items-center gap-6 text-sm md:flex">
					<a href="#beranda" class="hover:text-brand-600">Beranda</a>
					<a href="#layanan" class="hover:text-brand-600">Layanan</a>
					<a href="#berita" class="hover:text-brand-600">Berita</a>
					<a href="#profil" class="hover:text-brand-600">Profil</a>
					<a href="#galeri" class="hover:text-brand-600">Galeri</a>
					<a href="#kontak" class="hover:text-brand-600">Kontak</a>
				</nav>
				<button
					id="btnMenu"
					class="rounded-lg p-2 hover:bg-slate-200 md:hidden dark:hover:bg-slate-800"
					aria-label="Buka menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						viewBox="0 0 24 24"
						fill="currentColor"><path d="M4 6h16M4 12h16M4 18h16" /></svg
					>
				</button>
			</div>
			<!-- Mobile menu -->
			<div id="mobileMenu" class="hidden pb-4 md:hidden">
				<div class="flex flex-col gap-2 text-sm">
					<a href="#beranda" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Beranda</a
					>
					<a href="#layanan" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Layanan</a
					>
					<a href="#berita" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Berita</a
					>
					<a href="#profil" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Profil</a
					>
					<a href="#galeri" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Galeri</a
					>
					<a href="#kontak" class="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
						>Kontak</a
					>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section id="beranda" class="relative overflow-hidden">
		<div
			class="from-brand-600/10 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
		></div>
		<div class="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-24 lg:px-8">
			<div class="grid items-center gap-10 md:grid-cols-2">
				<div class="fade-up">
					<h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
						Desa Harmoni <span class="text-brand-600">Maju</span> & Berdaya
					</h1>
					<p class="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
						Portal resmi untuk layanan administrasi, informasi kegiatan, dan potensi Desa Harmoni.
						Transparan, cepat, dan ramah warga.
					</p>
					<div class="mt-6 flex flex-wrap gap-3">
						<a
							href="#layanan"
							class="bg-brand-600 hover:bg-brand-700 shadow-soft inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white"
						>
							Ajukan Layanan
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 24 24"
								fill="currentColor"><path d="M13.5 4.5l6 6-6 6m-9-6h15" /></svg
							>
						</a>
						<a
							href="#berita"
							class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
						>
							Lihat Berita
						</a>
					</div>
					<div class="mt-8 grid grid-cols-3 gap-4 text-center">
						<div
							class="shadow-soft rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70"
						>
							<div class="text-2xl font-bold">7K+</div>
							<div class="text-xs text-slate-500">Penduduk</div>
						</div>
						<div
							class="shadow-soft rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70"
						>
							<div class="text-2xl font-bold">12</div>
							<div class="text-xs text-slate-500">Dusun</div>
						</div>
						<div
							class="shadow-soft rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70"
						>
							<div class="text-2xl font-bold">95%</div>
							<div class="text-xs text-slate-500">Layanan Online</div>
						</div>
					</div>
				</div>
				<div class="fade-up relative">
					<div
						class="shadow-soft from-brand-600/20 aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-tr to-emerald-500/20 dark:border-slate-800"
					></div>
					<div class="absolute -bottom-6 -left-6 hidden md:block">
						<div
							class="shadow-soft rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<p class="text-sm">
								Jam Pelayanan: <span class="font-medium">Senin–Jumat 08.00–15.00</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Layanan -->
	<section id="layanan" class="bg-slate-50 py-16 md:py-20 dark:bg-slate-900/40">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="fade-up mx-auto max-w-2xl text-center">
				<h2 class="text-2xl font-bold md:text-3xl">Layanan Cepat & Transparan</h2>
				<p class="mt-3 text-slate-600 dark:text-slate-300">
					Urus administrasi kependudukan dan surat menyurat secara online.
				</p>
			</div>
			<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Card -->
				<div
					class="fade-up hover:shadow-soft rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="bg-brand-600/10 text-brand-700 dark:text-brand-300 mb-4 grid h-11 w-11 place-content-center rounded-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M6 2h9a2 2 0 012 2v3h1a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2Zm2 6h8V4H8v4Zm0 3v2h8v-2H8Zm0 4v2h6v-2H8Z"
							/></svg
						>
					</div>
					<h3 class="font-semibold">Surat Pengantar</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
						Domisili, usaha, pengantar RT/RW dan lainnya.
					</p>
					<button class="text-brand-700 mt-4 text-sm font-medium hover:underline"
						>Ajukan sekarang</button
					>
				</div>
				<div
					class="fade-up hover:shadow-soft rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="bg-brand-600/10 text-brand-700 dark:text-brand-300 mb-4 grid h-11 w-11 place-content-center rounded-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24"
							><path
								d="M12 2a7 7 0 00-7 7v3.586l-1.707 1.707A1 1 0 004 16h16a1 1 0 00.707-1.707L19 12.586V9a7 7 0 00-7-7Zm0 20a5 5 0 01-5-5h10a5 5 0 01-5 5Z"
							/></svg
						>
					</div>
					<h3 class="font-semibold">Pelaporan</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
						Sampaikan aspirasi & aduan warga secara mudah.
					</p>
					<button class="text-brand-700 mt-4 text-sm font-medium hover:underline">Laporkan</button>
				</div>
				<div
					class="fade-up hover:shadow-soft rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="bg-brand-600/10 text-brand-700 dark:text-brand-300 mb-4 grid h-11 w-11 place-content-center rounded-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M3 5a2 2 0 012-2h3l2 2h9a2 2 0 012 2v1H3V5Zm0 4h20v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9Zm5 3v2h6v-2H8Z"
							/></svg
						>
					</div>
					<h3 class="font-semibold">Data Kependudukan</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
						Cek KK, KTP, dan statistik demografi.
					</p>
					<button class="text-brand-700 mt-4 text-sm font-medium hover:underline">Cek data</button>
				</div>
				<div
					class="fade-up hover:shadow-soft rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="bg-brand-600/10 text-brand-700 dark:text-brand-300 mb-4 grid h-11 w-11 place-content-center rounded-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="currentColor"><path d="M12 3l9 4-9 4-9-4 9-4Zm0 7l9 4-9 4-9-4 9-4Z" /></svg
						>
					</div>
					<h3 class="font-semibold">Transparansi Dana</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
						Realisasi APBDes, proyek, dan progresnya.
					</p>
					<button class="text-brand-700 mt-4 text-sm font-medium hover:underline"
						>Lihat laporan</button
					>
				</div>
			</div>
		</div>
	</section>

	<!-- Berita -->
	<section id="berita" class="py-16 md:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="fade-up flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 class="text-2xl font-bold md:text-3xl">Berita Terkini</h2>
					<p class="mt-2 text-slate-600 dark:text-slate-300">
						Informasi terbaru kegiatan dan pengumuman desa.
					</p>
				</div>
				<a href="#" class="text-brand-700 text-sm font-medium hover:underline">Arsip berita</a>
			</div>
			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<!-- Post Card -->
				<article
					class="fade-up hover:shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
				>
					<div class="aspect-video bg-slate-200 dark:bg-slate-800"></div>
					<div class="p-5">
						<span class="text-brand-700 text-xs font-medium">09 Okt 2025</span>
						<h3 class="mt-2 font-semibold">Pelatihan UMKM: Branding & Pemasaran Digital</h3>
						<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
							Pemdes mengadakan pelatihan untuk mendorong ekonomi kreatif warga.
						</p>
						<a
							class="text-brand-700 mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
							href="#">Baca selengkapnya</a
						>
					</div>
				</article>
				<article
					class="fade-up hover:shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
				>
					<div class="aspect-video bg-slate-200 dark:bg-slate-800"></div>
					<div class="p-5">
						<span class="text-brand-700 text-xs font-medium">03 Okt 2025</span>
						<h3 class="mt-2 font-semibold">Posyandu Balita Bulan Oktober</h3>
						<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
							Jadwal posyandu di tiap dusun, mohon hadir tepat waktu.
						</p>
						<a
							class="text-brand-700 mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
							href="#">Baca selengkapnya</a
						>
					</div>
				</article>
				<article
					class="fade-up hover:shadow-soft overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
				>
					<div class="aspect-video bg-slate-200 dark:bg-slate-800"></div>
					<div class="p-5">
						<span class="text-brand-700 text-xs font-medium">28 Sep 2025</span>
						<h3 class="mt-2 font-semibold">Gotong Royong Saluran Irigasi</h3>
						<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
							Kegiatan rutin menjaga kebersihan saluran untuk musim tanam.
						</p>
						<a
							class="text-brand-700 mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
							href="#">Baca selengkapnya</a
						>
					</div>
				</article>
			</div>
		</div>
	</section>

	<!-- Profil Kepala Desa -->
	<section id="profil" class="bg-slate-50 py-16 md:py-20 dark:bg-slate-900/40">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid items-center gap-10 lg:grid-cols-3">
				<div class="fade-up lg:col-span-1">
					<div
						class="aspect-square rounded-3xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800"
					></div>
				</div>
				<div class="fade-up lg:col-span-2">
					<h2 class="text-2xl font-bold md:text-3xl">Sambutan Kepala Desa</h2>
					<p class="mt-3 text-slate-600 dark:text-slate-300">
						Selamat datang di website resmi Desa Harmoni. Mari bersama membangun desa yang inklusif,
						transparan, dan berkelanjutan.
					</p>
					<div class="mt-6 grid gap-4 sm:grid-cols-3">
						<div
							class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
						>
							<div class="text-sm text-slate-500">Periode</div>
							<div class="font-semibold">2023–2029</div>
						</div>
						<div
							class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
						>
							<div class="text-sm text-slate-500">Program Unggulan</div>
							<div class="font-semibold">Smart Village</div>
						</div>
						<div
							class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
						>
							<div class="text-sm text-slate-500">Layanan</div>
							<div class="font-semibold">24/7 Online</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Statistik Singkat -->
	<section class="py-16 md:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="from-brand-600/10 fade-up rounded-3xl border border-slate-200 bg-gradient-to-br to-emerald-500/10 p-6 md:p-10 dark:border-slate-800"
			>
				<div class="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<div class="text-3xl font-bold">2.1%</div>
						<div class="text-xs text-slate-600 dark:text-slate-300">Pertumbuhan Penduduk</div>
					</div>
					<div>
						<div class="text-3xl font-bold">87%</div>
						<div class="text-xs text-slate-600 dark:text-slate-300">Cakupan Air Bersih</div>
					</div>
					<div>
						<div class="text-3xl font-bold">62%</div>
						<div class="text-xs text-slate-600 dark:text-slate-300">Akses Internet</div>
					</div>
					<div>
						<div class="text-3xl font-bold">15</div>
						<div class="text-xs text-slate-600 dark:text-slate-300">Program Aktif</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Galeri -->
	<section id="galeri" class="bg-slate-50 py-16 md:py-20 dark:bg-slate-900/40">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="fade-up mx-auto max-w-2xl text-center">
				<h2 class="text-2xl font-bold md:text-3xl">Galeri Kegiatan</h2>
				<p class="mt-3 text-slate-600 dark:text-slate-300">
					Dokumentasi momen kebersamaan warga Desa Harmoni.
				</p>
			</div>
			<div class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
				<div class="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
			</div>
		</div>
	</section>

	<!-- Pengumuman & Agenda -->
	<section class="py-16 md:py-20">
		<div class="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
			<div class="space-y-6 lg:col-span-2">
				<div
					class="fade-up rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
				>
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Pengumuman</h3>
						<a class="text-brand-700 text-sm hover:underline" href="#">Lihat semua</a>
					</div>
					<ul class="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
						<li class="flex items-start gap-3 py-3">
							<span
								class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
								>Baru</span
							>
							<div>
								<p class="font-medium">Perubahan Jam Layanan Hari Jumat</p>
								<p class="text-sm text-slate-600 dark:text-slate-300">
									Mulai 10 Oktober 2025, layanan tutup pukul 14.00 WIB.
								</p>
							</div>
						</li>
						<li class="flex items-start gap-3 py-3">
							<span
								class="rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
								>Penting</span
							>
							<div>
								<p class="font-medium">Pembayaran PBB</p>
								<p class="text-sm text-slate-600 dark:text-slate-300">
									Batas akhir 30 Oktober 2025 di balai desa.
								</p>
							</div>
						</li>
						<li class="flex items-start gap-3 py-3">
							<span
								class="rounded-full bg-sky-100 px-2.5 py-1 text-xs text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
								>Info</span
							>
							<div>
								<p class="font-medium">Program Beasiswa Siswa Berprestasi</p>
								<p class="text-sm text-slate-600 dark:text-slate-300">
									Pendaftaran dibuka hingga 20 Oktober 2025.
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div
					class="fade-up rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
				>
					<h3 class="text-lg font-semibold">Agenda Kegiatan</h3>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
							<div class="text-xs text-slate-500">12 Okt 2025</div>
							<div class="font-medium">Senam Pagi Bersama</div>
							<div class="text-sm text-slate-600 dark:text-slate-300">Lapangan Desa, 06.00 WIB</div>
						</div>
						<div class="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
							<div class="text-xs text-slate-500">18 Okt 2025</div>
							<div class="font-medium">Pelatihan Budidaya Lele</div>
							<div class="text-sm text-slate-600 dark:text-slate-300">Balai Desa, 09.00 WIB</div>
						</div>
					</div>
				</div>
			</div>
			<aside class="space-y-6">
				<div
					class="fade-up rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
				>
					<h3 class="font-semibold">Kontak Cepat</h3>
					<ul class="mt-3 space-y-2 text-sm">
						<li>Balai Desa: (0721) 123-456</li>
						<li>Email: desa@harmoni.id</li>
						<li>Alamat: Jl. Melati No. 1, Harmoni</li>
					</ul>
				</div>
				<div
					class="fade-up rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
				>
					<h3 class="font-semibold">Unduhan</h3>
					<ul class="mt-3 list-inside list-disc space-y-2 text-sm">
						<li><a class="hover:underline" href="#">Formulir Surat Pengantar</a></li>
						<li><a class="hover:underline" href="#">Panduan Layanan Online</a></li>
						<li><a class="hover:underline" href="#">Profil Potensi Desa (PDF)</a></li>
					</ul>
				</div>
			</aside>
		</div>
	</section>

	<!-- Kontak -->
	<section id="kontak" class="bg-slate-50 py-16 md:py-20 dark:bg-slate-900/40">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid items-start gap-8 lg:grid-cols-2">
				<div class="fade-up">
					<h2 class="text-2xl font-bold md:text-3xl">Hubungi Kami</h2>
					<p class="mt-3 text-slate-600 dark:text-slate-300">
						Kirim pertanyaan, saran, atau aduan Anda melalui formulir berikut.
					</p>
					<form class="mt-6 space-y-4">
						<div>
							<label class="text-sm" for="nama">Nama</label>
							<input
								id="nama"
								type="text"
								class="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-xl border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
								placeholder="Nama lengkap"
							/>
						</div>
						<div class="grid gap-4 sm:grid-cols-2">
							<div>
								<label class="text-sm" for="email">Email</label>
								<input
									id="email"
									type="email"
									class="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-xl border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
									placeholder="nama@email.com"
								/>
							</div>
							<div>
								<label class="text-sm" for="telp">Telepon</label>
								<input
									id="telp"
									type="tel"
									class="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-xl border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
									placeholder="08xxxxxxxxxx"
								/>
							</div>
						</div>
						<div>
							<label class="text-sm" for="pesan">Pesan</label>
							<textarea
								id="pesan"
								rows="4"
								class="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-xl border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
								placeholder="Tulis pesan Anda..."
							></textarea>
						</div>
						<button
							type="button"
							class="bg-brand-600 hover:bg-brand-700 shadow-soft inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white"
							>Kirim Pesan</button
						>
					</form>
				</div>
				<div class="fade-up lg:mt-8">
					<div class="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
						<iframe
							title="Peta Desa Harmoni"
							class="aspect-video w-full"
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							src="https://www.openstreetmap.org/export/embed.html?bbox=106.806%2C-6.2%2C106.86%2C-6.15&layer=mapnik"
						></iframe>
					</div>
					<p class="mt-3 text-xs text-slate-500">
						*Peta ini contoh. Ganti koordinat sesuai lokasi desa Anda.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-slate-200 py-10 dark:border-slate-800">
		<div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
			<div>
				<div class="flex items-center gap-2 font-semibold">
					<span
						class="bg-brand-600 inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
						>DH</span
					>
					<span>Desa Harmoni</span>
				</div>
				<p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
					Melayani dengan sepenuh hati untuk kesejahteraan warga.
				</p>
			</div>
			<div>
				<h4 class="font-semibold">Menu</h4>
				<ul class="mt-3 space-y-2 text-sm">
					<li><a class="hover:underline" href="#beranda">Beranda</a></li>
					<li><a class="hover:underline" href="#layanan">Layanan</a></li>
					<li><a class="hover:underline" href="#berita">Berita</a></li>
					<li><a class="hover:underline" href="#kontak">Kontak</a></li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold">Dokumen</h4>
				<ul class="mt-3 space-y-2 text-sm">
					<li><a class="hover:underline" href="#">APBDes</a></li>
					<li><a class="hover:underline" href="#">RPJMDes</a></li>
					<li><a class="hover:underline" href="#">Perdes</a></li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold">Ikuti Kami</h4>
				<div class="mt-3 flex gap-3">
					<a
						class="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
						href="#"
						aria-label="Facebook"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M13 10h3V7h-3V5.5A1.5 1.5 0 0114.5 4H16V1h-2.5A4.5 4.5 0 009 5.5V7H6v3h3v10h4V10Z"
							/></svg
						>
					</a>
					<a
						class="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
						href="#"
						aria-label="Instagram"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5Zm10 3H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2Zm-5 3a5 5 0 110 10 5 5 0 010-10Zm6.5-.75a1 1 0 110 2 1 1 0 010-2Z"
							/></svg
						>
					</a>
					<a
						class="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
						href="#"
						aria-label="YouTube"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M23.5 6.2a3 3 0 00-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 00.5 6.2 31.6 31.6 0 000 12c0 1.98.1 3.94.5 5.8a3 3 0 002.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 002.1-2.1c.4-1.86.5-3.82.5-5.8 0-1.98-.1-3.94-.5-5.8ZM9.75 8.75l6 3.25-6 3.25V8.75Z"
							/></svg
						>
					</a>
				</div>
			</div>
		</div>
		<div class="mt-8 text-center text-xs text-slate-500">
			© <span id="year"></span> Pemerintah Desa Harmoni. Dibuat dengan Tailwind CSS.
		</div>
	</footer>

	<!-- Back to top -->
	<button
		id="toTop"
		class="shadow-soft pointer-events-none fixed right-5 bottom-5 rounded-full border border-slate-200 bg-white/80 p-3 opacity-0 backdrop-blur transition dark:border-slate-800 dark:bg-slate-900/80"
		aria-label="Kembali ke atas"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M19.5 15.75L12 8.25l-7.5 7.5"
			/></svg
		>
	</button>
</main>
