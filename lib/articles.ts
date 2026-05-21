export type Lang = "id" | "en";

export interface ArticleBody {
  type: "paragraph" | "quote" | "subheading" | "bullet";
  text?: { id: string; en: string };
  author?: { id: string; en: string };
  items?: { id: string; en: string }[];
}

export interface Article {
  id: number;
  slug: string;
  category: { id: string; en: string };
  tag: "featured" | "news" | "insight";
  date: string;
  readTime: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  body: ArticleBody[];
}

export const articles: Article[] = [
  {
    id: 1,
    slug: "credit-connect-launch-jabodetabek",
    category: { id: "Ekosistem EV", en: "EV Ecosystem" },
    tag: "featured",
    date: "15 Mei 2026",
    readTime: "5 min",
    title: {
      id: "Renewa Green Resmi Luncurkan Platform Credit Connect di Jabodetabek",
      en: "Renewa Green Officially Launches Credit Connect Platform in Greater Jakarta",
    },
    excerpt: {
      id: "PT Renewa Green Energy menandai babak baru ekosistem EV Indonesia dengan peluncuran resmi platform Credit Connect — menghubungkan lebih dari 20 lembaga pembiayaan dengan calon pengguna motor listrik di wilayah Jabodetabek.",
      en: "PT Renewa Green Energy marks a new chapter in Indonesia's EV ecosystem with the official launch of Credit Connect — connecting more than 20 financing institutions with prospective electric motorcycle users across Greater Jakarta.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "JAKARTA, 15 Mei 2026 — PT Renewa Green Energy hari ini secara resmi meluncurkan platform Credit Connect di wilayah Jabodetabek, menandai dimulainya operasional ekosistem pembiayaan motor listrik (EV) yang pertama dan terintegrasi di Indonesia. Peluncuran ini menjadi tonggak awal dari target ambisius perusahaan untuk mendistribusikan 100.000 unit motor EV pada tahun 2035.",
          en: "JAKARTA, 15 May 2026 — PT Renewa Green Energy today officially launched its Credit Connect platform across Greater Jakarta, marking the commencement of Indonesia's first integrated electric motorcycle (EV) financing ecosystem. The launch represents the opening milestone of the company's ambitious target to distribute 100,000 EV units by 2035.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Platform Credit Connect menghubungkan lebih dari 20 lembaga pembiayaan — mulai dari bank umum, BPR, koperasi, hingga perusahaan multifinance — dengan calon pengguna motor listrik secara digital. Proses pengajuan kredit yang sebelumnya membutuhkan waktu berminggu-minggu kini dapat diselesaikan dalam hitungan jam, membuka akses pembiayaan bagi segmen masyarakat yang selama ini belum terlayani.",
          en: "The Credit Connect platform connects more than 20 financing institutions — spanning commercial banks, rural banks, cooperatives, and multifinance companies — with prospective electric motorcycle users through a fully digital process. Credit applications that previously took weeks can now be completed in hours, opening financing access to previously underserved segments of society.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Hari ini bukan sekadar peluncuran produk. Ini adalah deklarasi bahwa ekosistem energi hijau Indonesia dimulai dari jalanan — dari setiap orang yang berani beralih ke motor listrik. Credit Connect adalah jembatan pertama itu. Kami membangun sistem di mana motor EV bukan lagi barang mewah, melainkan pilihan yang terjangkau dan mudah dijangkau oleh siapapun.",
          en: "Today is not merely a product launch. It is a declaration that Indonesia's green energy ecosystem starts on the streets — from every person who dares to switch to an electric motorcycle. Credit Connect is that first bridge. We are building a system where an EV motorcycle is no longer a luxury, but an affordable and accessible choice for everyone.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Dalam fase pilot yang berlangsung selama tiga bulan terakhir, Credit Connect telah berhasil memfasilitasi penyaluran 500 unit motor EV kepada pengguna pertama di Jabodetabek. Tingkat approval kredit mencapai 73%, jauh di atas rata-rata industri pembiayaan kendaraan konvensional yang berkisar 55-60%. Hal ini menunjukkan bahwa model penilaian risiko berbasis data Renewa mampu menjangkau segmen yang selama ini dianggap berisiko tinggi oleh lembaga keuangan tradisional.",
          en: "During the three-month pilot phase, Credit Connect successfully facilitated the distribution of 500 EV units to initial users across Greater Jakarta. The credit approval rate reached 73%, well above the conventional vehicle financing industry average of 55–60%. This demonstrates that Renewa's data-driven risk assessment model can effectively reach segments that traditional financial institutions have historically considered high-risk.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Dari sisi komersial, kami sangat puas dengan respons pasar selama pilot. Tingkat konversi yang kami catat jauh melebihi proyeksi awal. Yang lebih penting, kami melihat demand nyata dari segmen pengemudi ojek online dan kurir — mereka yang paling merasakan manfaat langsung dari penghematan bahan bakar motor EV. Ini validasi terkuat bahwa model bisnis kami berada di jalur yang tepat.",
          en: "From a commercial standpoint, we are highly satisfied with the market response during the pilot. The conversion rates we recorded far exceeded our initial projections. More importantly, we are seeing genuine demand from the ride-hailing driver and courier segment — those who feel the most direct benefit from the fuel savings of an EV motorcycle. This is the strongest validation that our business model is on the right track.",
        },
        author: {
          id: "Zaki Umaro, Chief Commercial Officer PT Renewa Green Energy",
          en: "Zaki Umaro, Chief Commercial Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "subheading",
        text: { id: "Roadmap Ekspansi 2026", en: "2026 Expansion Roadmap" },
      },
      {
        type: "paragraph",
        text: {
          id: "Pasca peluncuran di Jabodetabek, Renewa menargetkan ekspansi Credit Connect ke kota-kota besar Jawa pada kuartal ketiga 2026, meliputi Surabaya, Bandung, Semarang, dan Yogyakarta. Target penyaluran unit EV pada akhir 2026 ditetapkan sebesar 2.000 unit, dengan proyeksi mitra pembiayaan bertambah menjadi 35 institusi. Renewa juga tengah menjajaki integrasi dengan platform ride-hailing nasional untuk mempercepat adopsi armada EV secara masif.",
          en: "Following the Greater Jakarta launch, Renewa targets Credit Connect expansion to major Javanese cities in Q3 2026, covering Surabaya, Bandung, Semarang, and Yogyakarta. The EV unit distribution target for end-2026 is set at 2,000 units, with financing partners projected to grow to 35 institutions. Renewa is also exploring integration with national ride-hailing platforms to accelerate mass EV fleet adoption.",
        },
      },
    ],
  },

  {
    id: 2,
    slug: "mou-idxcarbon-carbon-credit-ev",
    category: { id: "Carbon Market", en: "Carbon Market" },
    tag: "news",
    date: "28 Mei 2026",
    readTime: "4 min",
    title: {
      id: "Renewa Tandatangani MoU dengan IDXCarbon untuk Listing Carbon Credit EV",
      en: "Renewa Signs MoU with IDXCarbon for EV Carbon Credit Listing",
    },
    excerpt: {
      id: "Kemitraan strategis dengan IDXCarbon membuka jalur perdagangan karbon kredit terverifikasi dari aktivitas ride mobility EV Indonesia — langkah konkret menuju pasar karbon nasional yang matang.",
      en: "A strategic partnership with IDXCarbon opens verified carbon credit trading pathways from Indonesian EV ride mobility — a concrete step towards a mature national carbon market.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "JAKARTA, 28 Mei 2026 — PT Renewa Green Energy dan IDXCarbon (Bursa Karbon Indonesia) hari ini menandatangani Memorandum of Understanding (MoU) untuk kerja sama dalam verifikasi dan listing karbon kredit yang dihasilkan dari aktivitas ride mobility kendaraan listrik di platform Renewa. Penandatanganan dilakukan di Gedung Bursa Efek Indonesia, Jakarta, disaksikan oleh perwakilan Otoritas Jasa Keuangan (OJK) dan Kementerian Energi dan Sumber Daya Mineral.",
          en: "JAKARTA, 28 May 2026 — PT Renewa Green Energy and IDXCarbon (Indonesia Carbon Exchange) today signed a Memorandum of Understanding (MoU) for cooperation in the verification and listing of carbon credits generated from electric vehicle ride mobility activity on the Renewa platform. The signing took place at the Indonesia Stock Exchange building in Jakarta, witnessed by representatives of the Financial Services Authority (OJK) and the Ministry of Energy and Mineral Resources.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Melalui kemitraan ini, setiap kilometer perjalanan yang ditempuh oleh motor EV dalam jaringan Renewa akan dikonversi menjadi karbon kredit terverifikasi menggunakan metodologi yang disepakati bersama IDXCarbon dan sesuai standar internasional Verra (VCS). Karbon kredit tersebut kemudian dapat diperdagangkan di platform IDXCarbon oleh perusahaan-perusahaan yang ingin mengimbangi jejak karbon operasional mereka.",
          en: "Under this partnership, every kilometre travelled by EV motorcycles in the Renewa network will be converted into verified carbon credits using a methodology agreed with IDXCarbon and aligned with international Verra (VCS) standards. These carbon credits can then be traded on the IDXCarbon platform by companies seeking to offset their operational carbon footprint.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Kolaborasi ini adalah pembuktian nyata bahwa mobilitas listrik Indonesia bukan hanya soal menghemat BBM — ini tentang menciptakan aset ekonomi baru dari setiap perjalanan yang bersih. Kami membangun ekosistem di mana seorang pengemudi ojek online di Bekasi berkontribusi langsung pada pasar karbon internasional. Itu adalah transformasi ekonomi yang luar biasa.",
          en: "This collaboration is real proof that Indonesian electric mobility is not just about saving fuel — it's about creating a new economic asset from every clean journey. We are building an ecosystem where a ride-hailing driver in Bekasi contributes directly to the international carbon market. That is an extraordinary economic transformation.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "subheading",
        text: { id: "Potensi Pasar dan Proyeksi", en: "Market Potential and Projections" },
      },
      {
        type: "paragraph",
        text: {
          id: "Berdasarkan estimasi internal Renewa, satu unit motor EV yang aktif beroperasi selama satu tahun mampu menghasilkan antara 0,8 hingga 1,2 ton setara CO₂ kredit karbon, tergantung intensitas penggunaan dan faktor emisi grid listrik setempat. Dengan target 2.000 unit aktif pada akhir 2026, Renewa memproyeksikan dapat menghasilkan sekitar 2.000 ton CO₂e kredit karbon tahunan — yang pada harga karbon saat ini di IDXCarbon senilai Rp 90.000–120.000 per ton, berpotensi menghasilkan pendapatan tambahan hingga Rp 240 juta per tahun.",
          en: "Based on Renewa's internal estimates, one actively operating EV motorcycle unit can generate between 0.8 and 1.2 tonnes of CO₂-equivalent carbon credits per year, depending on usage intensity and local grid emission factors. With a target of 2,000 active units by end-2026, Renewa projects the ability to generate approximately 2,000 tCO₂e in annual carbon credits — which at current IDXCarbon prices of Rp 90,000–120,000 per tonne, could generate additional revenue of up to Rp 240 million per year.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Ini bukan hanya revenue stream tambahan. Pendapatan carbon credit akan kami salurkan sebagian untuk mensubsidi cicilan kredit pengguna EV kami — menciptakan siklus positif di mana semakin banyak orang beralih ke EV, semakin murah cicilan mereka, dan semakin besar kredit karbon yang kami hasilkan. Itulah keunggulan model ekosistem terintegrasi yang kami bangun.",
          en: "This is not just an additional revenue stream. Part of the carbon credit income will be channelled to subsidise the loan instalments of our EV users — creating a positive cycle where the more people switch to EVs, the cheaper their instalments become, and the greater the carbon credits we generate. That is the advantage of the integrated ecosystem model we are building.",
        },
        author: {
          id: "Zaki Umaro, Chief Commercial Officer PT Renewa Green Energy",
          en: "Zaki Umaro, Chief Commercial Officer, PT Renewa Green Energy",
        },
      },
    ],
  },

  {
    id: 3,
    slug: "circular-economy-baterai-ev",
    category: { id: "Energi Terbarukan", en: "Renewable Energy" },
    tag: "insight",
    date: "10 Juni 2026",
    readTime: "7 min",
    title: {
      id: "Mengapa Circular Economy Baterai EV adalah Kunci Transisi Energi Indonesia",
      en: "Why EV Battery Circular Economy is the Key to Indonesia's Energy Transition",
    },
    excerpt: {
      id: "Indonesia membutuhkan solusi menyeluruh untuk menangani jutaan baterai EV yang akan habis masa pakainya pada 2030. Fasilitas daur ulang Renewa hadir sebagai jawaban — mengubah limbah menjadi penyimpanan energi surya.",
      en: "Indonesia needs a comprehensive solution for millions of EV batteries reaching end-of-life by 2030. Renewa's recycling facility answers this — transforming waste into solar energy storage.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "Transisi menuju kendaraan listrik di Indonesia berjalan dengan laju yang semakin cepat. Namun di balik antusiasme terhadap motor EV, terdapat pertanyaan krusial yang belum banyak dibicarakan: apa yang akan terjadi dengan jutaan baterai lithium-ion ketika masa pakainya berakhir? Indonesia diproyeksikan menghadapi gelombang limbah baterai EV pertamanya pada 2028–2030, bertepatan dengan periode ketika unit-unit EV yang mulai beredar pada 2023–2024 mencapai akhir siklus baterainya.",
          en: "The transition towards electric vehicles in Indonesia is accelerating. But behind the enthusiasm for EV motorcycles lies a crucial question that has not been widely discussed: what will happen to the millions of lithium-ion batteries when their service life ends? Indonesia is projected to face its first wave of EV battery waste in 2028–2030, coinciding with the period when EV units that began circulating in 2023–2024 reach the end of their battery cycle.",
        },
      },
      {
        type: "subheading",
        text: { id: "Tantangan Nyata yang Sering Diabaikan", en: "A Real Challenge Often Overlooked" },
      },
      {
        type: "paragraph",
        text: {
          id: "Baterai lithium-ion yang digunakan pada motor EV roda dua umumnya memiliki masa pakai 3–5 tahun atau setara 40.000–60.000 kilometer. Setelah itu, kapasitasnya turun di bawah 80% dari kapasitas awal dan tidak lagi efisien untuk mobilitas. Namun baterai tersebut masih menyimpan sekitar 70–75% kapasitasnya — cukup untuk digunakan dalam aplikasi penyimpanan energi stasioner seperti panel surya rumahan atau sistem off-grid.",
          en: "Lithium-ion batteries used in two-wheel EV motorcycles typically have a lifespan of 3–5 years or 40,000–60,000 kilometres. After that, their capacity drops below 80% of the original and they are no longer efficient for mobility. However, these batteries still retain around 70–75% of their capacity — sufficient for use in stationary energy storage applications such as household solar panels or off-grid systems.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Saat kami merancang ekosistem Renewa, kami sadar bahwa motor EV hanyalah titik masuk. Pertanyaan sesungguhnya adalah: bagaimana kita memastikan bahwa setiap atom baterai yang kita distribusikan hari ini punya siklus hidup yang panjang dan bermartabat? Fasilitas daur ulang bukan biaya — ini adalah generator nilai tambah yang mengubah limbah menjadi aset energi.",
          en: "When we designed the Renewa ecosystem, we were aware that the EV motorcycle is only an entry point. The real question is: how do we ensure that every atom of battery we distribute today has a long and dignified lifecycle? The recycling facility is not a cost — it is a value generator that transforms waste into an energy asset.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "subheading",
        text: { id: "Model Renewa: Tiga Tahap Siklus Baterai", en: "Renewa's Model: Three-Stage Battery Lifecycle" },
      },
      {
        type: "bullet",
        items: [
          {
            id: "Tahap 1 — Mobilitas (0–5 tahun): Baterai digunakan penuh untuk menggerakkan motor EV dalam jaringan Credit Connect.",
            en: "Stage 1 — Mobility (0–5 years): Battery used at full capacity to power EV motorcycles within the Credit Connect network.",
          },
          {
            id: "Tahap 2 — Second Life Energy Storage (5–8 tahun): Baterai yang kapasitasnya turun di bawah 80% dikumpulkan, dikondisikan ulang, dan digunakan sebagai penyimpanan energi untuk panel surya rumahan dan UMKM.",
            en: "Stage 2 — Second Life Energy Storage (5–8 years): Batteries with capacity below 80% are collected, reconditioned, and used as energy storage for household solar panels and SMEs.",
          },
          {
            id: "Tahap 3 — Material Recovery (8+ tahun): Baterai yang sudah tidak layak pakai sama sekali didaur ulang untuk memulihkan litium, kobalt, nikel, dan mangan — bahan baku untuk baterai generasi berikutnya.",
            en: "Stage 3 — Material Recovery (8+ years): Batteries no longer fit for use are recycled to recover lithium, cobalt, nickel, and manganese — raw materials for the next generation of batteries.",
          },
        ],
      },
      {
        type: "paragraph",
        text: {
          id: "Fasilitas pengolahan baterai pertama Renewa dijadwalkan beroperasi di kawasan industri Karawang pada kuartal keempat 2027, dengan kapasitas awal pengolahan 5.000 unit baterai per tahun. Investasi awal untuk fasilitas ini mencapai Rp 45 miliar, dengan target mencapai titik impas pada tahun ketiga operasional.",
          en: "Renewa's first battery processing facility is scheduled to become operational in the Karawang industrial zone in Q4 2027, with an initial processing capacity of 5,000 battery units per year. The initial investment for this facility reaches Rp 45 billion, with a target to reach breakeven in the third year of operations.",
        },
      },
    ],
  },

  {
    id: 4,
    slug: "ekspansi-mitra-pembiayaan-25",
    category: { id: "Kemitraan", en: "Partnership" },
    tag: "news",
    date: "25 Juni 2026",
    readTime: "3 min",
    title: {
      id: "Renewa Perluas Jaringan Mitra Pembiayaan ke 25 Lembaga Keuangan",
      en: "Renewa Expands Financing Partner Network to 25 Financial Institutions",
    },
    excerpt: {
      id: "Ekspansi jaringan mitra pembiayaan Renewa mencakup bank umum, BPR, koperasi, dan perusahaan multifinance — memperluas akses kredit motor EV ke segmen masyarakat yang lebih luas.",
      en: "Renewa's financing partner network now spans commercial banks, rural banks, cooperatives, and multifinance companies — broadening EV motorcycle credit access to a wider segment of society.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "JAKARTA, 25 Juni 2026 — Hanya enam pekan sejak peluncuran resmi Credit Connect, PT Renewa Green Energy hari ini mengumumkan perluasan jaringan mitra pembiayaannya menjadi 25 lembaga keuangan — melampaui target awal 20 mitra yang ditetapkan untuk akhir tahun 2026. Ekspansi ini mencakup penambahan 5 mitra baru: dua BPR dari Jawa Barat, satu koperasi simpan pinjam, satu perusahaan multifinance skala nasional, dan satu bank digital.",
          en: "JAKARTA, 25 June 2026 — Just six weeks after the official Credit Connect launch, PT Renewa Green Energy today announced the expansion of its financing partner network to 25 financial institutions — surpassing its initial target of 20 partners set for end-2026. This expansion includes five new partners: two rural banks from West Java, one savings and loan cooperative, one national multifinance company, and one digital bank.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Dalam enam minggu pertama, kami menerima lebih dari 40 pendekatan dari berbagai lembaga keuangan yang tertarik bergabung sebagai mitra Credit Connect. Ini jauh melebihi ekspektasi kami. Pasar mulai memahami bahwa motor EV bukan sekadar tren teknologi — ini adalah aset yang memiliki profil risiko kredit yang lebih baik dari motor konvensional karena biaya operasionalnya jauh lebih rendah dan nilai baterai dapat dijadikan agunan tambahan.",
          en: "In the first six weeks, we received more than 40 approaches from various financial institutions interested in joining as Credit Connect partners. This far exceeded our expectations. The market is beginning to understand that EV motorcycles are not just a technology trend — they are assets with a better credit risk profile than conventional motorcycles, because their operational costs are significantly lower and the battery value can serve as additional collateral.",
        },
        author: {
          id: "Zaki Umaro, Chief Commercial Officer PT Renewa Green Energy",
          en: "Zaki Umaro, Chief Commercial Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Keberagaman tipe mitra pembiayaan merupakan strategi yang disengaja oleh Renewa. BPR dan koperasi, misalnya, memiliki kedekatan dengan segmen masyarakat pedesaan dan pinggiran kota yang justru paling potensial sebagai pengguna motor EV untuk keperluan logistik lokal. Sementara bank digital memungkinkan proses onboarding pengguna yang sepenuhnya tanpa kertas dan dapat diselesaikan dalam 15 menit.",
          en: "The diversity of financing partner types is a deliberate strategy by Renewa. Rural banks and cooperatives, for example, have proximity to rural and peri-urban communities that represent the most potent segment as EV motorcycle users for local logistics. Meanwhile, digital banks enable a fully paperless user onboarding process completable in 15 minutes.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Target kami bukan semata-mata jumlah mitra. Target kami adalah jangkauan. Dengan 25 mitra yang tersebar dari bank nasional hingga koperasi lokal, kami memiliki kapasitas untuk menjangkau hampir setiap segmen masyarakat produktif Indonesia yang membutuhkan akses transportasi EV yang terjangkau.",
          en: "Our target is not merely the number of partners. Our target is reach. With 25 partners spread from national banks to local cooperatives, we have the capacity to reach almost every segment of Indonesia's productive population that needs access to affordable EV transportation.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
    ],
  },

  {
    id: 5,
    slug: "lanskap-motor-listrik-indonesia-2026",
    category: { id: "Ekosistem EV", en: "EV Ecosystem" },
    tag: "insight",
    date: "8 Juli 2026",
    readTime: "6 min",
    title: {
      id: "Lanskap Motor Listrik Indonesia 2026: Peluang dan Tantangan",
      en: "Indonesia's Electric Motorcycle Landscape 2026: Opportunities and Challenges",
    },
    excerpt: {
      id: "Analisis mendalam tentang kondisi pasar motor EV Indonesia: adopsi konsumen, infrastruktur pengisian daya, regulasi insentif, dan proyeksi pertumbuhan hingga 2030.",
      en: "An in-depth analysis of Indonesia's EV motorcycle market: consumer adoption, charging infrastructure, incentive regulations, and growth projections through 2030.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "Indonesia adalah pasar motor terbesar kedua di dunia, dengan penjualan tahunan mencapai 6–7 juta unit. Dari angka itu, penetrasi motor listrik pada paruh pertama 2026 baru mencapai sekitar 3,2% — setara 190.000 unit. Angka ini memang meningkat signifikan dari 1,1% di tahun 2024, namun masih jauh di bawah Thailand (8,4%) dan Vietnam (6,7%) yang menerapkan kebijakan subsidi dan infrastruktur pengisian lebih agresif.",
          en: "Indonesia is the world's second-largest motorcycle market, with annual sales of 6–7 million units. Of that, electric motorcycle penetration in H1 2026 has reached approximately 3.2% — equivalent to 190,000 units. This figure is a significant increase from 1.1% in 2024, but still well below Thailand (8.4%) and Vietnam (6.7%), which have implemented more aggressive subsidy policies and charging infrastructure.",
        },
      },
      {
        type: "subheading",
        text: { id: "Tiga Faktor Pendorong Utama", en: "Three Key Driving Factors" },
      },
      {
        type: "bullet",
        items: [
          {
            id: "Harga BBM: Kenaikan harga Pertalite menjadi Rp 12.500/liter pada Maret 2026 menjadi katalis terkuat. Pengemudi ojek online yang menempuh 150–200 km per hari dapat menghemat Rp 35.000–50.000 per hari dengan beralih ke motor EV.",
            en: "Fuel prices: The rise in Pertalite fuel to Rp 12,500/litre in March 2026 became the strongest catalyst. Ride-hailing drivers covering 150–200 km per day can save Rp 35,000–50,000 daily by switching to EV motorcycles.",
          },
          {
            id: "Regulasi insentif: Perpanjangan subsidi pembelian motor EV sebesar Rp 8 juta per unit untuk tahun 2026 mempertahankan daya saing harga EV terhadap motor konvensional di segmen 110–125cc.",
            en: "Incentive regulations: The extension of EV motorcycle purchase subsidies of Rp 8 million per unit for 2026 maintains EV price competitiveness against conventional motorcycles in the 110–125cc segment.",
          },
          {
            id: "Ekosistem pembiayaan: Hadirnya platform seperti Credit Connect memangkas hambatan terbesar adopsi EV — keterbatasan akses kredit yang terjangkau dengan tenor yang fleksibel.",
            en: "Financing ecosystem: The presence of platforms like Credit Connect cuts the biggest barrier to EV adoption — limited access to affordable credit with flexible tenors.",
          },
        ],
      },
      {
        type: "quote",
        text: {
          id: "Apa yang kami lihat bukan hanya pertumbuhan pasar biasa. Ini adalah inflection point. Ketika tiga faktor — harga BBM, insentif pemerintah, dan ekosistem pembiayaan — bertemu pada waktu yang sama, percepatan adopsi EV tidak berjalan linear. Ia berjalan eksponensial. Renewa diposisikan tepat di persimpangan ketiga faktor itu.",
          en: "What we are seeing is not just ordinary market growth. This is an inflection point. When three factors — fuel prices, government incentives, and the financing ecosystem — converge at the same time, EV adoption acceleration does not proceed linearly. It proceeds exponentially. Renewa is positioned precisely at the intersection of those three factors.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "subheading",
        text: { id: "Tantangan yang Masih Harus Diatasi", en: "Challenges Still to be Overcome" },
      },
      {
        type: "paragraph",
        text: {
          id: "Di sisi lain, tantangan nyata masih ada. Infrastruktur Stasiun Pengisian Kendaraan Listrik Umum (SPKLU) untuk roda dua masih sangat terbatas di luar kota besar. Kecemasan jangkauan (range anxiety) tetap menjadi hambatan psikologis, meskipun data menunjukkan bahwa rata-rata pengguna motor harian di Indonesia hanya menempuh 40–60 km per hari — jauh di bawah jangkauan 80–120 km yang ditawarkan motor EV kelas menengah saat ini.",
          en: "On the other hand, real challenges remain. Public EV charging infrastructure (SPKLU) for two-wheelers is still very limited outside major cities. Range anxiety remains a psychological barrier, although data shows the average daily motorcycle user in Indonesia covers only 40–60 km per day — well below the 80–120 km range offered by mid-range EV motorcycles today.",
        },
      },
      {
        type: "quote",
        text: {
          id: "Dari perspektif komersial, tantangan terbesar bukan teknis — melainkan persepsi. Membangun kepercayaan konsumen terhadap layanan purna jual dan ketersediaan suku cadang adalah pekerjaan yang membutuhkan konsistensi jangka panjang. Itulah mengapa ekosistem Renewa mencakup komponen maintenance dan after-sales — karena menjual motor EV adalah awal, bukan akhir, dari hubungan kami dengan pengguna.",
          en: "From a commercial perspective, the biggest challenge is not technical — it is perception. Building consumer trust in after-sales service and spare parts availability is work that requires long-term consistency. That is why the Renewa ecosystem includes maintenance and after-sales components — because selling an EV motorcycle is the beginning, not the end, of our relationship with users.",
        },
        author: {
          id: "Zaki Umaro, Chief Commercial Officer PT Renewa Green Energy",
          en: "Zaki Umaro, Chief Commercial Officer, PT Renewa Green Energy",
        },
      },
    ],
  },

  {
    id: 6,
    slug: "groundbreaking-plts-jawa-tengah",
    category: { id: "Energi Terbarukan", en: "Renewable Energy" },
    tag: "news",
    date: "22 Juli 2026",
    readTime: "4 min",
    title: {
      id: "Ground-Breaking PLTS Pertama Renewa di Jawa Tengah",
      en: "Ground-Breaking of Renewa's First Solar Plant (PLTS) in Central Java",
    },
    excerpt: {
      id: "Renewa memulai konstruksi pembangkit listrik tenaga surya (PLTS) pertamanya di Jawa Tengah dengan kapasitas awal 5 MW — langkah awal menuju target 500 MW kapasitas energi terbarukan pada 2035.",
      en: "Renewa commences construction of its first solar power plant (PLTS) in Central Java with an initial capacity of 5 MW — the first step toward its 500 MW renewable energy capacity target by 2035.",
    },
    body: [
      {
        type: "paragraph",
        text: {
          id: "SEMARANG, 22 Juli 2026 — PT Renewa Green Energy hari ini melaksanakan upacara ground-breaking Pembangkit Listrik Tenaga Surya (PLTS) pertamanya di Kabupaten Demak, Jawa Tengah. Proyek dengan kapasitas terpasang 5 Megawatt Peak (MWp) ini merupakan langkah perdana Renewa dalam pilar keempat bisnisnya — Green Energy — dan menjadi fondasi dari target ambisius 500 MW kapasitas energi terbarukan pada tahun 2035.",
          en: "SEMARANG, 22 July 2026 — PT Renewa Green Energy today held the ground-breaking ceremony of its first Solar Power Plant (PLTS) in Demak Regency, Central Java. This project with a 5 Megawatt Peak (MWp) installed capacity represents Renewa's first step into its fourth business pillar — Green Energy — and forms the foundation of its ambitious 500 MW renewable energy capacity target by 2035.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Lokasi di Kabupaten Demak dipilih berdasarkan sejumlah pertimbangan strategis: intensitas radiasi matahari yang tinggi (rata-rata 5,2 kWh/m²/hari), ketersediaan lahan bekas tambak yang tidak produktif seluas 8 hektar, serta kedekatan dengan infrastruktur transmisi PLN jaringan 20 kV yang memungkinkan koneksi grid dengan biaya investasi yang efisien.",
          en: "The Demak Regency location was chosen based on several strategic considerations: high solar radiation intensity (average 5.2 kWh/m²/day), availability of 8 hectares of unproductive former fishpond land, and proximity to PLN's 20 kV transmission infrastructure that allows grid connection at efficient investment cost.",
        },
      },
      {
        type: "quote",
        text: {
          id: "PLTS ini bukan hanya tentang 5 MW. Ini adalah bukti konsep bahwa Renewa mampu mengeksekusi seluruh rantai nilai ekosistem energi hijau — dari kredit motor EV di jalanan kota hingga listrik matahari yang mengalir ke grid nasional. Setiap pilar yang kami bangun memperkuat yang lain. Karbon kredit dari EV membiayai ekspansi PLTS, dan listrik PLTS pada akhirnya akan mengisi daya armada EV kami secara langsung.",
          en: "This PLTS is not just about 5 MW. It is proof of concept that Renewa can execute the entire value chain of the green energy ecosystem — from EV motorcycle credit on city streets to solar electricity flowing into the national grid. Every pillar we build strengthens the others. Carbon credits from EVs finance the expansion of PLTS, and PLTS electricity will ultimately charge our EV fleet directly.",
        },
        author: {
          id: "Hendry Donald, Chief Executive Officer PT Renewa Green Energy",
          en: "Hendry Donald, Chief Executive Officer, PT Renewa Green Energy",
        },
      },
      {
        type: "subheading",
        text: { id: "Detail Teknis dan Timeline", en: "Technical Details and Timeline" },
      },
      {
        type: "bullet",
        items: [
          {
            id: "Kapasitas: 5 MWp (fase 1), dapat diperluas hingga 15 MWp pada fase 2 (2028)",
            en: "Capacity: 5 MWp (phase 1), expandable to 15 MWp in phase 2 (2028)",
          },
          {
            id: "Teknologi: Panel monokristalin bifacial 540 Wp, inverter string 110 kW, monitoring berbasis SCADA real-time",
            en: "Technology: 540 Wp bifacial monocrystalline panels, 110 kW string inverters, real-time SCADA-based monitoring",
          },
          {
            id: "Jadwal COD (Commercial Operation Date): Q1 2027",
            en: "COD (Commercial Operation Date) schedule: Q1 2027",
          },
          {
            id: "Estimasi produksi energi tahunan: 7.300 MWh, setara kebutuhan listrik 2.400 rumah tangga",
            en: "Estimated annual energy production: 7,300 MWh, equivalent to the electricity needs of 2,400 households",
          },
        ],
      },
      {
        type: "quote",
        text: {
          id: "Dari aspek komersial, proyek PLTS ini adalah proof of return yang sangat penting bagi investor kami. Dengan IRR proyeksi 14–16% dan tenor Power Purchase Agreement 20 tahun bersama PLN, ini adalah investasi yang memiliki visibilitas pendapatan jangka panjang yang sangat jelas. Keberhasilan proyek ini akan membuka jalur pembiayaan yang lebih besar untuk ekspansi PLTS berikutnya.",
          en: "From a commercial perspective, this PLTS project is a very important proof of return for our investors. With a projected IRR of 14–16% and a 20-year Power Purchase Agreement tenor with PLN, this is an investment with very clear long-term revenue visibility. The success of this project will open larger financing channels for the next PLTS expansion.",
        },
        author: {
          id: "Zaki Umaro, Chief Commercial Officer PT Renewa Green Energy",
          en: "Zaki Umaro, Chief Commercial Officer, PT Renewa Green Energy",
        },
      },
    ],
  },
];
