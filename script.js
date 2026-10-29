document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuBtn.contains(event.target);
        if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // ==========================================
    // 2. INTERACTIVE PARTICLE BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');

    let particlesArray = [];
    let numberOfParticles = 80; 
    
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    function setCanvasSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        if (canvas.width < 768) {
            numberOfParticles = 40;
            mouse.radius = 80; 
        } else {
            numberOfParticles = 80;
            mouse.radius = 150;
        }
        init();
    }

    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0, 168, 150, 0.4)'; 
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (mouse.x != null && distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * 8; 
                let directionY = forceDirectionY * force * 8;

                this.x -= directionX;
                this.y -= directionY;
            } else {
                this.x += this.directionX;
                this.y += this.directionY;
            }

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 1; 
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5; 
            let directionY = (Math.random() * 1) - 0.5;
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                    let opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 168, 150, ' + opacityValue + ')'; 
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    animate();

    // ==========================================
    // 3. PRODUCTS CATALOG LOGIC
    // ==========================================
    const productsData = [
        { name: "1-4 Dioxane", cat: "Organic Solvents & Liquid Intermediates" }, { name: "2-Ethyl Hexanol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Actyl alcohol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Acetone", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Acetonitrile", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Cyclohexane", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Cyclohexanol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Cyclohexanone", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Di Methyl Formamide", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Di Methyl Sulphoxide", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Dipropylene glycol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Dodecan -1-ol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Ethyl Acetate", cat: "Organic Solvents & Liquid Intermediates" }, { name: "N-Heptane", cat: "Organic Solvents & Liquid Intermediates" }, { name: "N-Hexane", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Iso Phorone", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Iso Propyl Alcohol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Isopropyl myristate", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Lauryl alcohol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Mesitylene", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Methyl isobutyl ketone", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Methylene Chloride", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Mono Ethylene Glycol (MEG)", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Mono Tert Butyl Ether (MTBE)", cat: "Organic Solvents & Liquid Intermediates" }, { name: "N-Methyl Pyrrolidone", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Octyl alcohol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Paraffin Liquid Heavy / Light", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Phenol", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Propylene Glycol (Tech / USP / IP Grades)", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Pyridine", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Pyrrolidine", cat: "Organic Solvents & Liquid Intermediates" }, { name: "Tetra Hydro Furan", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Isodecyl Alcohol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "2,4 D Acid tech 98%", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D Dimethylamine salt (400, 480, 600, 670, 720 g/l SL)", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D Ethyl ester tech 96%", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D Ethylhexyl ester (380, 660, 680 EC)", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D 2-Ethylhexyl ester tech 97%", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D Isobutyl ester tech 97%", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "2,4 D Sodium salt (95% SP, 95% WDG)", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Chlorimuron ethyl technical / 25% WP", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Chlorimuron ethyl 10% + Metsulfuron methyl 10% WP", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Chlorsulfuron technical / 75% WDG", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Chlorsulfuron 62.5 + Metsulfuron 12.5 WDG", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Chlorsulfuron 15% + Metsulfuron 48% WDG", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Clodinafop tech / 8% EC / 15% WP", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Indol butyric acid", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Metsulfuron methyl technical / 20% WP / 60% WDG", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Nicosulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Pyrazosulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Sulfosulfuron technical / 75% WDG", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Thifensulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Tribenuron technical", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Acetamiprid technical / 20% SP", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Hexaconazole technical / 5% EC / 5% SC", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Indoxacarb technical (3:1, 9:1) / 15% SC / 30% WDG / 5% EC / 15% EC / 0.6% gel bait", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Isoprothiolane technical / 40% EC", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Propiconazole technical / 25% EC", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Propoxur technical / 20% EC / 1% DP / Propoxur 1.75% + Indoxacarb 0.25% gel bait", cat: "Agro-Chemicals & Crop Protection Techs" }, { name: "Sulphur 80% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Donepezil HCL", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Doxycycline Hyclate", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Fluoxetine HCL", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Ibuprofen", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Meloxicam", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Paracetamol I.P.", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "4-Amino Antipyrine", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "EGDMA / GMA / MMA (Methacrylates)", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "EMME", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Epichlorohydrin", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "EPN", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Hydrazine Hydrate 80%", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Hematoxylin Stain", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "N-Butyl Amine", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "N,N-Decanamide", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "NPMC", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Oxalyl chloride", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Para Amino Benzoic Acid", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Piperazine Anhydrous", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Sodium Polyanethol Sulphonic Acid", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Sulphanilamide", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Tertiary Butylamine", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Triethylbenzylammonium chloride (TEBAC)", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Vitride", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Benzyl Benzaldehyde", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "Bisphenol", cat: "APIs, Fine Chemicals & Reaction Intermediates" }, { name: "PTSA (p-Toluenesulfonic Acid)", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "BCAA (Branched-Chain Amino Acids)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Beta Alanine / DL-Alanine / L-Alanine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "DL-Methionine / L-Methionine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "DL-Tryptophan / L-Tryptophan", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Glycine / Sodium Glycinate", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Alanyl L-Glutamine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Arginine (Base, HCL, Alpha Ketoglutarate, Aspartate)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Aspargine Monohydrate / L-Aspartic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Carnitine (Base, HCL, Fumarate, Tartrate, N-Acetyl)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Citrulline / L-Citrulline DL-Maleate", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Cysteine (Base, HCL, Monohydrate, N-Acetyl)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Cystine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Glutamic acid / L-Glutamine / L-Glutathione Reduced", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Histidine (Base, Mono HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Isoleucine / L-Leucine / L-Valine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Lysine (Acetate, Base, HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Ornithine (L-Aspartate, Mono HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Phenylalanine / L-Proline / L-Pyroglutamic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "L-Serine / L-Theanine / L-Threonine / L-Tyrosine (Acetyl L-Tyrosine)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Adenine / Adenine Sulphate", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Alpha Ketoglutaric Acid / Alpha Lipoic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Ascorbic Acid / Folic Acid / Methyl Folate / Pyridoxal-5-Phosphate", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Betaine Anhydrous / Choline Bitartrate", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Calcium / Ferrous / Magnesium / Manganese Glycinates & Aspartates", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Carbocisteine / Creatine Monohydrate / Creatine Nitrate / Creatinine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "D-Chiro-Inositol / Inositol", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "D-Galactose / D-Mannose / D-Ribose / D-Xylose / L-Arabinose / L-Rhamnose", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Daidzein / Genistein / Resveratrol / Quercetin / Citrus Bioflavonoids", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Gallic Acid Monohydrate / Pyrogallol", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Gamma Amino Butyric Acid (GABA) / Melatonin / Taurine", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Lactic Acid (80%, 88%) / L+ Tartaric Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Maltose / Raffinose Pentahydrate / Sucrose / Pharma Grade Sugar", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "S-Adenosyl L-Methionine (SAMe)", cat: "Amino Acids, Food Additives & Nutraceuticals" }, { name: "Stevia / Sucralose", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Aerosil 200 / Cabosil M-5 / Colloidal Silicone Dioxide / Fumed Silica", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Glycerin Tech / IP / BP / USP", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Kollidon 30 / PVPK 30 / PVPK 90", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Lactose (Anhydrous DCL 11/21, Monohydrate 100/200 mesh)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Microcrystalline Cellulose (MCC)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Magnesium Stearate I.P.", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Methyl Paraben", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "SLES (Sodium Lauryl Ether Sulphate)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Sodium Lauryl Sulphate (Needle / Powder)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Sorbitol IP", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Starch powder", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Stearic Acid", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Talcum Powder", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Titanium Dioxide", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Tween 20 / Tween 80", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Xanthan Gum", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "High Flow", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Diphenyl Isodecyl Phosphate (DPDP)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "2-Ethylhexyl Diphenyl Phosphate", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Tridecyl Phosphate", cat: "Pharmaceutical Excipients, Polymers & Surfactants" }, { name: "Divinyl Phosphate", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Acetic acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Caustic Lye / Caustic Potash / Caustic Soda Flakes", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Phosphoric Acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Aluminium Powder / Zinc Dust", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Calcium Chloride / Calcium Gluconate / Calcium Caseinate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Cobalt Acetate / Copper Salt / Copper Sulphate / Ferric Chloride / Ferrous Sulphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Manganese Sulphate / Nickel Sulphate / Osmium Acid / Molybdic Acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Magnesium Salt / Magnesium Sulphate / Magnesium Phosphate Dibasic", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Potassium Salt / Potassium Sorbate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Bicarbonate / Soda Ash / Sodium Citrate / Sodium Hydrosulphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Chloride (Common Salt) / Sodium Malonate / Sodium Monofluorophosphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Sulphate / Sodium Sulfite / Tri Sodium Orthophosphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Borohydride", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Tris Base / Buffer", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Zinc Chloride / Zinc Salt", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Formic Acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Thiosulfate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Cuprous Iodide", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }, { name: "Sodium Methoxide", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }
    ];

    const productListContainer = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');

    function closeAllInquireButtons() {
        document.querySelectorAll('.inquire-action-btn.show').forEach(btn => {
            btn.classList.remove('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product-item')) {
            closeAllInquireButtons();
        }
    });

    function renderProducts(category, searchQuery) {
        productListContainer.innerHTML = ''; 
        
        const filteredProducts = productsData.filter(product => {
            const matchesCategory = category === 'All' || product.cat === category;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');
                
                const nameSpan = document.createElement('span');
                nameSpan.classList.add('product-name');
                nameSpan.textContent = product.name;

                const inquireBtn = document.createElement('a');
                inquireBtn.classList.add('inquire-action-btn');
                inquireBtn.textContent = "Inquire?";
                
                const email = "deepenchemicals1@gmail.com";
                const subject = encodeURIComponent(`Product Inquiry - ${product.name}`);
                const body = encodeURIComponent(`Hello, I would like to inquire about ${product.name}.\n\nQuantity- `);
                
                inquireBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
                inquireBtn.target = "_blank";

                productDiv.appendChild(nameSpan);
                productDiv.appendChild(inquireBtn);

                productDiv.addEventListener('click', (e) => {
                    if (e.target === inquireBtn || inquireBtn.contains(e.target)) {
                        return;
                    }
                    
                    const isAlreadyShowing = inquireBtn.classList.contains('show');
                    closeAllInquireButtons();
                    
                    if (!isAlreadyShowing) {
                        inquireBtn.classList.add('show');
                    }
                });

                productListContainer.appendChild(productDiv);
            });
        } else {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.classList.add('no-results');
            noResultsDiv.textContent = 'No products found matching your criteria.';
            productListContainer.appendChild(noResultsDiv);
        }

        const inquiryBtn = document.createElement('a');
        const email = "deepenchemicals1@gmail.com";
        const subject = encodeURIComponent("Product Inquiry");
        const body = encodeURIComponent("Hey, I would like to inquire about this product\n\nProduct name - \n\nQuantity - ");
        
        inquiryBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        inquiryBtn.target = "_blank";
        inquiryBtn.className = 'inquiry-btn'; 
        inquiryBtn.textContent = "Can't find what you're looking for? Click here to Inquire";
        
        productListContainer.appendChild(inquiryBtn);
    }

    searchInput.addEventListener('input', () => {
        renderProducts(categoryFilter.value, searchInput.value);
    });

    categoryFilter.addEventListener('change', () => {
        renderProducts(categoryFilter.value, searchInput.value);
    });

    renderProducts('Organic Solvents & Liquid Intermediates', '');

    // ==========================================
    // 4. MAIN CONTACT FORM SUBMISSION LOGIC (AJAX)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://formsubmit.co/ajax/deepenchemicals1@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(response => response.json())
            .then(data => {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again or email us directly.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 5. FOOTER QUICK REACH FORM LOGIC (AJAX)
    // ==========================================
    const quickReachForm = document.getElementById('quick-reach-form');
    const quickSubmitBtn = document.getElementById('quick-submit-btn');

    if (quickReachForm) {
        quickReachForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const originalBtnText = quickSubmitBtn.innerText;
            quickSubmitBtn.innerText = 'Sending...';
            quickSubmitBtn.disabled = true;

            const formData = new FormData(quickReachForm);
            const object = Object.fromEntries(formData);
            object._subject = "New Quick Reach Inquiry from Website Footer";
            const json = JSON.stringify(object);

            fetch('https://formsubmit.co/ajax/deepenchemicals1@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(response => response.json())
            .then(data => {
                quickReachForm.reset(); 
                quickSubmitBtn.innerText = 'Sent!';
                setTimeout(() => {
                    quickSubmitBtn.innerText = originalBtnText;
                    quickSubmitBtn.disabled = false;
                }, 2500);
            })
            .catch(error => {
                console.error('Error:', error);
                quickSubmitBtn.innerText = 'Error. Try again.';
                setTimeout(() => {
                    quickSubmitBtn.innerText = originalBtnText;
                    quickSubmitBtn.disabled = false;
                }, 2500);
            });
        });
    }

    // ==========================================
    // 6. LOCAL SMART CHATBOT LOGIC (NO API)
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if(chatWindow.classList.contains('active')) { chatInput.focus(); }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    chatSend.addEventListener('click', processMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') processMessage();
    });

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        if (sender === 'bot') { msgDiv.innerHTML = text; } else { msgDiv.textContent = text; }
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        appendMessage('user', text);
        chatInput.value = '';
        setTimeout(() => { generateBotResponse(text); }, 600);
    }

    // ENTIRE UPDATED KNOWLEDGE BASE
    const knowledgeBase = {
        "1-4 dioxane": "**Basic Info**: Cyclic ether (C4H8O2), clear, colorless liquid, miscible with water and most organic solvents. **Chemical Class**: Ether / Heterocyclic Compound. **Primary Use Cases**: Industrial solvent for cellulose acetate, ethyl cellulose, resins, oils, and waxes; stabilizer for chlorinated solvents; laboratory reaction solvent. **Key Advantages**: Exceptional solvency power across both polar and non-polar organic compounds; stable under neutral and basic conditions. **Safety & Handling**: Highly flammable; forms explosive peroxides upon exposure to air; designated as a suspected human carcinogen (IARC Group 2B).",
        "2-ethyl hexanol (2-eh)": "**Basic Info**: High-boiling, branched C8 fatty alcohol (C8H18O) with a characteristic mild odor. **Chemical Class**: Aliphatic Alcohol. **Primary Use Cases**: Primary feedstock for plasticizers such as Di(2-ethylhexyl) phthalate (DEHP) and Dioctyl terephthalate (DOTP); manufacturing of 2-ethylhexyl acrylate for adhesives/paints; additive in lube oils and fuels; low-foaming surfactant intermediate. **Key Advantages**: Low volatility; excellent viscosity-modifying properties in plastics; hydrophobic nature improves water resistance in downstream polymers. **Safety & Handling**: Low acute toxicity; causes moderate eye and skin irritation. Combustible liquid (flash point ~75°C).",
        "actyl alcohol / octyl alcohol (1-octanol)": "**Basic Info**: Straight-chain fatty alcohol (C8H18O) with a pungent, woody floral odor. **Chemical Class**: Primary Aliphatic Alcohol. **Primary Use Cases**: Fragrance and flavor formulations; defoaming agent in industrial processes; wetting agent and surfactant chemical intermediate; reference standard for partition coefficient (Kow) measurements. **Key Advantages**: Excellent surfactant capability; ideal lipophilicity benchmark for pharmaceutical drug design. **Safety & Handling**: Mild skin and eye irritant. Low vapor pressure reduces inhalation hazard under ambient conditions.",
        "acetone": "**Basic Info**: Simplest aliphatic ketone (C3H6O), volatile, colorless, highly flammable with a sweetish odor. **Chemical Class**: Ketone. **Primary Use Cases**: Chemical intermediate in the synthesis of Methyl Methacrylate (MMA), Bisphenol A (BPA), and Isophorone; universal industrial solvent for resins, fiberglass, and lacquers; precision cleaning and degreasing agent in electronics and laboratories. **Key Advantages**: Miscible in all proportions with water and most organic solvents; rapid evaporation rate leaving no residue; relatively low toxicity profile compared to chlorinated solvents. **Safety & Handling**: Highly flammable liquid and vapor (flash point -20°C); static discharge hazard. Vapors can cause drowsiness and dizziness.",
        "acetonitrile (acn)": "**Basic Info**: Organic nitrile (CH3CN), clear, volatile liquid with an ether-like odor. **Chemical Class**: Nitrile / Polar Aprotic Solvent. **Primary Use Cases**: Mobile phase solvent in High-Performance Liquid Chromatography (HPLC) and LC-MS; solvent for DNA/RNA oligonucleotide synthesis; extraction solvent for butadiene in petrochemical refiners; lithium battery electrolyte formulation. **Key Advantages**: Low UV cut-off wavelength (~190 nm), ideal for spectrophotometric detection; low viscosity; high dielectric constant; excellent dissolving power for polar organic compounds. **Safety & Handling**: Toxic if swallowed, inhaled, or absorbed through skin; metabolizes slowly into cyanide in the human body. Requires work in well-ventilated fume hoods.",
        "cyclohexane": "**Basic Info**: Cycloalkane (C6H12), colorless liquid with a petroleum-like odor, immiscible with water. **Chemical Class**: Alicyclic Hydrocarbon. **Primary Use Cases**: Primary precursor for KA oil (cyclohexanone/cyclohexanol mixture) used in Adipic Acid and Caprolactam production (Nylon 6,6 and Nylon 6); extraction solvent for essential oils; reaction diluent in polymerizations. **Key Advantages**: Highly stable, non-polar solvent; clean distillation profile; non-corrosive to metals. **Safety & Handling**: Highly flammable; harmful to aquatic life with long-lasting effects; inhalation of high concentrations causes central nervous system (CNS) depression.",
        "cyclohexanol": "**Basic Info**: Secondary alicyclic alcohol (C6H11OH), viscous liquid or low-melting solid (mp ~25°C) with a camphoraceous odor. **Chemical Class**: Secondary Alcohol. **Primary Use Cases**: Intermediate in the manufacture of adipic acid for Nylon 6,6; solvent for lacquers, cellulosics, and dry cleaning soaps; textile finishing agent. **Key Advantages**: Strong solvency for fats, oils, and natural/synthetic resins; acts as a coupling agent for immiscible liquid mixtures. **Safety & Handling**: Harmful if swallowed or inhaled; causes skin and respiratory irritation.",
        "cyclohexanone": "**Basic Info**: Cyclic ketone (C6H10O), clear, yellowish liquid with a peppermint or acetone-like odor. **Chemical Class**: Cyclic Ketone. **Primary Use Cases**: Chemical intermediate for Caprolactam (precursor to Nylon 6); primary solvent for PVC adhesives, printing inks, agricultural formulations, and paints/coatings. **Key Advantages**: Powerful solvent action for high-molecular-weight polymers, PVC resins, and cellulosics; controlled evaporation rate. **Safety & Handling**: Flammable liquid; harmful by inhalation; causes serious eye damage upon direct contact.",
        "di methyl formamide (dmf)": "**Basic Info**: Hydrophilic, polar aprotic solvent (C3H7NO), clear liquid with a faint amine-like odor. **Chemical Class**: Amide / Polar Aprotic Solvent. **Primary Use Cases**: Spinning solvent for acrylic fibers and polyurethane coatings; reaction medium for solid-phase peptide synthesis (SPPS); processing solvent in pharmaceutical API synthesis; wire enamel formulation. **Key Advantages**: High boiling point (153°C); miscible with water and most organic solvents; capable of dissolving challenging inorganic salts and high polymers. **Safety & Handling**: Hepatotoxic (causes liver damage); reproductive toxin; readily absorbed through intact skin. Protective butyl rubber gloves required.",
        "di methyl sulphoxide (dmso)": "**Basic Info**: Highly polar, organosulfur compound (C2H6OS), clear liquid, highly hygroscopic. **Chemical Class**: Sulfoxide / Polar Aprotic Solvent. **Primary Use Cases**: Universal reaction solvent in chemical synthesis (SN2 reactions, Swern oxidations); cryoprotectant for biological cell storage; transdermal drug delivery vehicle in veterinary and human pharmaceuticals; paint stripping formulations. **Key Advantages**: Exceptional solubilization capacity for difficult hydrophobic molecules; low systemic toxicity compared to DMF/NMP; outstanding membrane penetration capability. **Safety & Handling**: Readily penetrates human skin, carrying dissolved toxins directly into the bloodstream. Garlic-like taste/odor output via lungs upon skin contact.",
        "dipropylene glycol (dpg)": "**Basic Info**: Mixture of structural isomers (C6H14O3), odorless, colorless, hygroscopic viscous liquid. **Chemical Class**: Glycol / Ether-Alcohol. **Primary Use Cases**: Carrier and fixative in fine fragrances, cosmetics, and personal care products; solvent for printing inks; plasticizer for unsaturated polyester resins; hydraulic fluid component. **Key Advantages**: Low odor profile; very low skin irritation potential; excellent coupling agent blending oil and water fractions. **Safety & Handling**: Non-hazardous profile; low toxicity via oral and dermal routes; stable under standard storage conditions.",
        "dodecan-1-ol / lauryl alcohol": "**Basic Info**: High-purity fatty alcohol (C12H26O), solid white mass or clear liquid above 24°C with a floral odor. **Chemical Class**: Primary Fatty Alcohol. **Primary Use Cases**: Raw material for Sodium Lauryl Sulfate (SLS) and Sodium Lauryl Ether Sulfate (SLES) surfactants; lubricant additive; intermediate in personal care emollients, lotions, and pharmaceutical creams. **Key Advantages**: Excellent biodegradability; provides rich foaming and emulsification properties when converted to sulfates/ethoxylates. **Safety & Handling**: Very toxic to aquatic life; low human oral toxicity. Causes mild skin irritation on prolonged contact.",
        "ethyl acetate": "**Basic Info**: Volatile ester (C4H8O2) with a pleasant, fruity odor; clear and colorless. **Chemical Class**: Carboxylic Acid Ester. **Primary Use Cases**: Solvent in gravure and flexographic printing inks; solvent for adhesives, wood coatings, and nail polish removers; extraction solvent in pharmaceutical processing and coffee/tea decaffeination. **Key Advantages**: Fast evaporation rate; lower toxicity profile compared to aromatics and chlorinated solvents; highly bio-based potential via ethanol fermentation route. **Safety & Handling**: Highly flammable (flash point -4°C); vapor may cause flash fire. Eye and respiratory tract irritant.",
        "n-heptane": "**Basic Info**: Straight-chain alkane (C7H16), clear, volatile liquid with a gasoline-like odor. **Chemical Class**: Aliphatic Hydrocarbon. **Primary Use Cases**: Zero-point reference standard for octane rating determinations; extraction solvent for vegetable oils and botanical extractions; rubber cement formulations; laboratory non-polar reaction solvent. **Key Advantages**: High chemical stability; defined narrow boiling range; non-reactive toward strong bases or nucleophiles. **Safety & Handling**: Highly flammable liquid and vapor; toxic to aquatic life; aspiration hazard if swallowed.",
        "n-hexane": "**Basic Info**: Straight-chain C6 alkane (C6H14), highly volatile hydrocarbon. **Chemical Class**: Aliphatic Hydrocarbon. **Primary Use Cases**: Industrial extraction of edible oils from oilseeds (soybean, rapeseed, sunflower); cleaning and degreasing solvent; formulation of contact adhesives and leather products. **Key Advantages**: Outstanding oil extraction efficiency; low boiling point (69°C) enables easy recovery and recycling via evaporation. **Safety & Handling**: Neurotoxic—chronic exposure causes peripheral neuropathy due to its metabolite 2,5-hexanedione. Highly flammable.",
        "isophorone": "**Basic Info**: Unsaturated cyclic ketone (C9H14O), yellowish liquid with a peppermint-like odor. **Chemical Class**: Unsaturated Cyclic Ketone. **Primary Use Cases**: High-boiling solvent for vinyl and acrylic printing inks; formulation solvent for emulsifiable concentrate (EC) pesticides; raw material for Isophorone Diisocyanate (IPDI) used in polyurethane coatings. **Key Advantages**: High boiling point (215°C) and slow evaporation rate; exceptional solvency for vinyl resins and lacquers. **Safety & Handling**: Harmful if swallowed or inhaled; causes serious eye irritation; suspected carcinogen.",
        "isopropyl alcohol (ipa) / isopropanol": "**Basic Info**: Volatile monohydric alcohol (C3H8O), clear, miscible with water, characteristic pungent odor. **Chemical Class**: Secondary Alcohol. **Primary Use Cases**: Hospital-grade disinfectant and antiseptic (70% solution); precision cleaning solvent in semiconductor and electronics manufacturing; extraction solvent; process solvent in pharmaceuticals. **Key Advantages**: Powerful bactericidal and virucidal efficacy; rapid residue-free evaporation; low toxicity relative to methanol. **Safety & Handling**: Highly flammable; vapors cause drowsiness; keep away from heat, sparks, and open flames.",
        "isopropyl myristate (ipm)": "**Basic Info**: Ester of isopropyl alcohol and myristic acid (C17H34O2), clear, low-viscosity liquid. **Chemical Class**: Fatty Acid Ester. **Primary Use Cases**: Emollient, skin conditioning agent, and penetration enhancer in cosmetic creams, lotions, and pharmaceutical topical preparations (transdermal gels, ointments). **Key Advantages**: Reduces greasy feel caused by heavy oils; rapidly absorbed by skin; enhances active drug delivery across the stratum corneum. **Safety & Handling**: Non-toxic; mild skin compatibility; potential mild comedogenicity in heavy facial formulations.",
        "mesitylene (1,3,5-trimethylbenzene)": "**Basic Info**: Symmetric aromatic hydrocarbon (C9H12), clear liquid with a sweet aromatic odor. **Chemical Class**: Aromatic Hydrocarbon. **Primary Use Cases**: Specialty solvent in organic synthesis; developer for patternable polymers in microelectronics; precursor to trimesic acid and plastics additives. **Key Advantages**: High thermal stability; symmetrical structure provides distinct physical properties compared to ortho/meta isomers. **Safety & Handling**: Flammable liquid; toxic to aquatic organisms; causes respiratory tract irritation.",
        "methyl isobutyl ketone (mibk)": "**Basic Info**: Stable, medium-boiling ketone (C6H12O) with a pleasant odor. **Chemical Class**: Aliphatic Ketone. **Primary Use Cases**: Extractant for rare-earth metals (zirconium, hafnium, niobium); solvent for nitrocellulose, acrylic resins, and alkyd paints; dewaxing agent for mineral oils. **Key Advantages**: Excellent solvency with moderate evaporation rate; lower water solubility compared to MEK and Acetone, enabling liquid-liquid extractions. **Safety & Handling**: Highly flammable; harmful if inhaled; suspected of causing cancer (IARC 2B).",
        "methylene chloride (dichloromethane / dcm)": "**Basic Info**: Volatile, non-flammable chlorinated hydrocarbon (CH2Cl2) with a sweet chloroform-like odor. **Chemical Class**: Halogenated Hydrocarbon. **Primary Use Cases**: Process solvent in pharmaceutical API synthesis and tablet coating; paint stripping formulations; polyurethane foam blowing agent; laboratory extraction solvent. **Key Advantages**: Non-flammable under ambient conditions; very low boiling point (39.6°C) allowing low-temperature distillations; powerful solvency for organic compounds. **Safety & Handling**: Toxic; metabolizes to carbon monoxide in human body; potential carcinogen. Strict occupational exposure limits (OSHA) apply.",
        "mono ethylene glycol (meg)": "**Basic Info**: Odorless, colorless, viscous, hygroscopic liquid (C2H6O2) with a sweet taste. **Chemical Class**: Dihydric Alcohol / Glycol. **Primary Use Cases**: Raw material for Polyethylene Terephthalate (PET) resins and polyester fibers; automotive engine coolant and antifreeze formulations; industrial heat transfer fluids; gas dehydration. **Key Advantages**: Depresses the freezing point of water efficiently; high chemical reactivity due to primary hydroxyl groups. **Safety & Handling**: Toxic if ingested (causes acute kidney failure via calcium oxalate formation); store away from food and animal feed.",
        "mono tert butyl ether (mtbe)": "**Basic Info**: Volatile ether (C5H12O), clear liquid, highly soluble in organic solvents and partially soluble in water. **Chemical Class**: Ether. **Primary Use Cases**: Fuel additive to boost octane rating and oxygen content in gasoline; economical substitute for diethyl ether in laboratory extractions and organometallic reactions. **Key Advantages**: High octane rating; does not readily form peroxides compared to diethyl ether or THF. **Safety & Handling**: Highly flammable; distinctive unpleasant odor at low concentrations; mobile in groundwater if leaked.",
        "n-methyl pyrrolidone (nmp)": "**Basic Info**: Dipolar aprotic solvent (C5H9NO), clear, high-boiling liquid with low volatility. **Chemical Class**: Cyclic Amide / Lactam. **Primary Use Cases**: Solvent for cathode binder slurry (PVDF) in Lithium-Ion battery manufacturing; photoresist stripper in semiconductor manufacturing; solvent for engineering plastics (PTFE, PEEK, polyimides); agricultural chemical formulations. **Key Advantages**: Extremely high thermal and chemical stability; high solvency for a wide range of polymers and organic reagents. **Safety & Handling**: Teratogenic (may damage the unborn child); skin irritant. Requires specialized nitrile/butyl protective equipment.",
        "paraffin liquid heavy / light": "**Basic Info**: Highly refined mixtures of saturated aliphatic and alicyclic hydrocarbons derived from petroleum. **Chemical Class**: Mineral Hydrocarbon. **Primary Use Cases**: Light: Cosmetic lotions, baby oils, textile lubricants. Heavy: Internal lubricant/laxative in pharmaceuticals, ointment bases, plasticizers for rubber/polymers. **Key Advantages**: Chemically inert; hydrophobic barrier properties; non-color, non-odor, high purity (USP/BP compliant). **Safety & Handling**: Aspiration hazard if swallowed in low viscosity grades. Non-irritating to intact skin.",
        "phenol": "**Basic Info**: Aromatic crystalline solid (C6H5OH) with a distinct sweet, tarry odor; turns pink upon oxidation. **Chemical Class**: Phenol / Aromatic Alcohol. **Primary Use Cases**: Raw material for Phenol-Formaldehyde resins (Bakelite), Bisphenol A (BPA), and Caprolactam; precursor to salicylic acid/aspirin; disinfectant formulations. **Key Advantages**: High chemical reactivity at ortho and para positions for polymer synthesis; strong germicidal action. **Safety & Handling**: Highly toxic and corrosive; causes severe chemical burns via skin absorption with local anesthetic effect (painless initial damage). Rapid clinical response required upon contact.",
        "propylene glycol (tech / usp / ip grades)": "**Basic Info**: Clear, viscous, virtually odorless diol (C3H8O2), hygroscopic, miscible with water. **Chemical Class**: Glycol / Dihydric Alcohol. **Primary Use Cases**: USP/IP: Humectant and solvent for food, pharmaceuticals, and e-liquids. Tech: De-icing fluids, unsaturated polyester resins, liquid detergents. **Key Advantages**: Low systemic toxicity (GRAS status); safe replacement for ethylene glycol in consumer-facing formulations. **Safety & Handling**: Non-hazardous profile; stable under ambient conditions.",
        "pyridine": "**Basic Info**: Basic heterocyclic aromatic compound (C5H5N), clear liquid with a nauseating fishy odor. **Chemical Class**: Heterocyclic Aromatic Amine. **Primary Use Cases**: Precursor to agricultural chemicals (Paraquat, Diquat); reagent and solvent in pharmaceutical synthesis (acetylation reactions, sulfonylations); catalyst in esterifications. **Key Advantages**: Functions dual-purpose as a nucleophilic catalyst and acid scavenger (hydrochloride salt former). **Safety & Handling**: Flammable liquid; toxic by inhalation, ingestion, and dermal absorption; causes male reproductive harm.",
        "pyrrolidine": "**Basic Info**: Cyclic secondary amine (C4H9N), clear liquid with an ammoniacal, fishy odor. **Chemical Class**: Heterocyclic Secondary Amine. **Primary Use Cases**: Building block for pharmaceutical active ingredients (e.g., procyclidine, pyrrobutamine); rubber vulcanization accelerators; epoxy curing agent; enamine synthesis intermediate. **Key Advantages**: Strong base and active nucleophile; easily forms enamines with aldehydes and ketones. **Safety & Handling**: Highly flammable; corrosive—causes severe skin burns and eye damage.",
        "tetra hydro furan (thf)": "**Basic Info**: Volatile cyclic ether (C4H8O) with an ether-like odor, completely miscible with water. **Chemical Class**: Cyclic Ether. **Primary Use Cases**: Solvent for PVC welding cements, polyurethane coatings, and magnetic tapes; reaction solvent for organometallic chemistry (Grignard reagents, LAH reductions); precursor to Polytetramethylene ether glycol (PTMEG). **Key Advantages**: Exceptional solvent power for high polymers; high reaction yields in organometallic chemistry due to strong coordination ability. **Safety & Handling**: Highly flammable; forms explosive peroxides upon exposure to oxygen; store over BHT stabilizers.",
        "isodecyl alcohol (ida)": "**Basic Info**: Branched isomeric C10 primary fatty alcohol (C10H22O). **Chemical Class**: Branched Aliphatic Alcohol. **Primary Use Cases**: Production of plasticizers like Diisodecyl Phthalate (DIDP); synthetic lubricant basestocks; anti-foaming agents; specialty surfactant synthesis. **Key Advantages**: Lower volatility and higher thermal stability compared to lower-chain alcohols; superior weathering performance in plasticized PVC. **Safety & Handling**: Causes mild skin irritation; low volatility reduces workplace vapor risk.",
        "2,4-d formulations": "**Formulations Included**: Acid tech 98%, Dimethylamine salt (400, 480, 600, 670, 720 g/l SL), Ethyl ester tech 96%, Ethylhexyl ester (380, 660, 680 EC), 2-Ethylhexyl ester tech 97%, Isobutyl ester tech 97%, Sodium salt (95% SP, 95% WDG). **Basic Info**: Synthetic auxin (phenoxyacetic acid family) systemic herbicide (C8H6Cl2O3). **Chemical Class**: Phenoxy-carboxylic Acid Herbicide. **Primary Use Cases**: Selective post-emergence control of broadleaf weeds in cereal crops (wheat, corn, sorghum), sugarcane, pasture, turf, and aquatic environments. **Key Advantages**: Highly selective (does not harm monocotyledonous crops/grasses); multiple ester and salt options allow tailored volatility and rainfastness. **Safety & Handling**: Harmful if swallowed; severe eye damage potential (especially amine salts); avoid drift to sensitive broadleaf crops (cotton, tomatoes).",
        "chlorimuron ethyl & combinations": "**Formulations Included**: Technical / 25% WP; Chlorimuron ethyl 10% + Metsulfuron methyl 10% WP. **Basic Info**: Sulfonylurea broadleaf herbicide. **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Selective post-emergence broadleaf weed control in soybean and pulse crops. **Key Advantages**: Active at extremely low dosage rates (grams per hectare); systemic translocation to roots and growing points via acetolactate synthase (ALS) inhibition. **Safety & Handling**: High safety margin for mammals; highly toxic to terrestrial non-target plants and aquatic plants.",
        "chlorsulfuron & combinations": "**Formulations Included**: Technical / 75% WDG; Chlorsulfuron 62.5 + Metsulfuron 12.5 WDG; Chlorsulfuron 15% + Metsulfuron 48% WDG. **Basic Info**: Broad-spectrum systemic sulfonylurea herbicide. **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Pre-emergence and post-emergence weed control in cereal crops (wheat, barley, rye) and non-crop vegetation management. **Key Advantages**: Residual soil activity prevents subsequent flushes of broadleaf weeds; low application rates. **Safety & Handling**: Very low mammalian toxicity; persistent in alkaline soils—observe rotational crop restrictions.",
        "clodinafop-propargyl": "**Formulations Included**: Technical / 8% EC / 15% WP. **Basic Info**: Selective post-emergence graminicide (C17H11ClFNO4). **Chemical Class**: Aryloxyphenoxypropionate (Fop) Herbicide. **Primary Use Cases**: Control of annual grass weeds (e.g., Phalaris minor, wild oats) in wheat fields. **Key Advantages**: Fast uptake; safe on wheat crops when formulated with the safener Cloquintocet-mexyl. **Safety & Handling**: Skin sensitizer; toxic to aquatic organisms.",
        "indole-3-butyric acid (iba)": "**Basic Info**: Plant growth regulator / auxin phytohormone (C12H13NO2). **Chemical Class**: Plant Growth Regulator / Indole Auxin. **Primary Use Cases**: Commercial vegetative propagation; rooting hormone for plant cuttings in nurseries and tissue culture. **Key Advantages**: Stimulates adventitious root initiation faster and more reliably than naturally occurring IAA; higher metabolic stability inside plant tissues. **Safety & Handling**: Low toxicity; handle with standard agricultural PPE.",
        "metsulfuron methyl": "**Formulations Included**: Technical / 20% WP / 60% WDG. **Basic Info**: Systemic selective sulfonylurea herbicide (C14H15N5O6S). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Control of broadleaf weeds and brush in cereals, pastures, and forestry. **Key Advantages**: Absorbed through foliage and roots; ultra-low dosage requirement; excellent tank-mix compatibility. **Safety & Handling**: Very low mammalian toxicity; highly toxic to aquatic life.",
        "nicosulfuron": "**Basic Info**: Post-emergence sulfonylurea herbicide (C15H18N6O6S). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Selective grass and broadleaf weed control in maize/corn crops. **Key Advantages**: Rapid crop metabolism in corn ensures high selectivity; effectively controls difficult grass weeds like Sorghum halepense. **Safety & Handling**: Do not apply with organophosphate insecticides (causes crop phytotoxicity).",
        "pyrazosulfuron-ethyl": "**Basic Info**: Systemic paddy field herbicide (C14H18N6O7S). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Control of annual and perennial sedges and broadleaf weeds in transplanted and direct-seeded rice crops. **Key Advantages**: Applied pre- or early post-emergence; high safety to rice plants. **Safety & Handling**: Low oral and dermal toxicity; maintain water management in paddy fields post-application.",
        "sulfosulfuron": "**Formulations Included**: Technical / 75% WDG. **Basic Info**: Selective early post-emergence sulfonylurea herbicide (C16H18N6O7S2). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Control of Phalaris minor and broadleaf weeds in wheat crops. **Key Advantages**: Dual root and foliar absorption; prevents yield losses in intensive wheat production systems. **Safety & Handling**: Follow crop rotation intervals for sensitive crops like sorghum or mustard.",
        "thifensulfuron-methyl": "**Basic Info**: Short-residual systemic herbicide (C12H13N5O6S2). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Selective broadleaf weed control in cereals and soybeans. **Key Advantages**: Breaks down rapidly in soil, allowing complete crop rotational flexibility. **Safety & Handling**: Low toxicity to humans and mammals.",
        "tribenuron-methyl": "**Basic Info**: Selective post-emergence herbicide (C15H17N5O6S). **Chemical Class**: Sulfonylurea Herbicide. **Primary Use Cases**: Broadleaf weed control in broad-acre cereal crops. **Key Advantages**: Rapid uptake by foliage; stops weed growth within hours of application. **Safety & Handling**: Mild skin sensitizer; avoid environmental release to waterways.",
        "acetamiprid": "**Formulations Included**: Technical / 20% SP. **Basic Info**: Odorless neonicotinoid systemic insecticide (C10H11ClN4). **Chemical Class**: Neonicotinoid Insecticide. **Primary Use Cases**: Control of sucking insects (aphids, thrips, whiteflies, jassids) in cotton, vegetables, tea, and fruit crops. **Key Advantages**: Translaminar activity; lower toxicity to honeybees compared to imidacloprid; effective against organophosphate-resistant pests. **Safety & Handling**: Toxic if swallowed; low risk to non-target pollinators when used per label instructions.",
        "hexaconazole": "**Formulations Included**: Technical / 5% EC / 5% SC. **Basic Info**: Broad-spectrum systemic triazole fungicide (C14H17Cl2N3O). **Chemical Class**: Triazole Fungicide. **Primary Use Cases**: Control of sheath blight in rice, powdery mildew in mango/grapes, and scab in apples. **Key Advantages**: Protective, curative, and eradicant actions; inhibits ergosterol biosynthesis in fungal cell membranes. **Safety & Handling**: Suspected of damaging fertility; toxic to aquatic life.",
        "indoxacarb": "**Formulations Included**: Technical (3:1, 9:1 isomers), 15% SC, 30% WDG, 5% EC, 15% EC, 0.6% gel bait. **Basic Info**: Oxadiazine broad-spectrum insecticide (C22H17ClF3N3O7). **Chemical Class**: Oxadiazine Insecticide. **Primary Use Cases**: Control of lepidopteran larvae (caterpillars, bollworms) in field crops; professional cockroach and ant gel baits. **Key Advantages**: Bio-activated inside pest gut enzymes; preserves beneficial predator insects; voltage-gated sodium channel blocker. **Safety & Handling**: Toxic if swallowed; high toxicity to aquatic species.",
        "isoprothiolane": "**Formulations Included**: Technical / 40% EC. **Basic Info**: Systemic fungicide and plant growth regulator (C12H18O4S2). **Chemical Class**: Dithiolane Fungicide. **Primary Use Cases**: Control of Rice Blast (Pyricularia oryzae) and planthoppers in paddy rice crops. **Key Advantages**: Dual action—acts both as a protective/curative fungicide and suppresses pest populations. **Safety & Handling**: Harmful if swallowed; causes moderate skin irritation.",
        "propiconazole": "**Formulations Included**: Technical / 25% EC. **Basic Info**: Broad-spectrum systemic fungicide (C15H17Cl2N3O2). **Chemical Class**: Triazole Fungicide. **Primary Use Cases**: Control of rusts, leaf spots, and blights in cereals, turf, banana plantations, and peanuts. **Key Advantages**: Strong acropetal translocational activity (moves upward within plant xylem); long residual protection. **Safety & Handling**: Suspected reproductive hazard; toxic to aquatic organisms.",
        "propoxur & combinations": "**Formulations Included**: Technical / 20% EC / 1% DP / Propoxur 1.75% + Indoxacarb 0.25% gel bait. **Basic Info**: Non-systemic carbamate insecticide (C11H15NO3). **Chemical Class**: N-Methyl Carbamate Insecticide. **Primary Use Cases**: Household and public health pest control (mosquitoes, flies, ants, cockroaches, fleas); turf pest control. **Key Advantages**: Rapid knockdown action by cholinesterase inhibition; fast vapor action in enclosed spaces. **Safety & Handling**: Toxic; reversible cholinesterase inhibitor. Antidote: Atropine sulfate.",
        "sulphur 80% wdg": "**Basic Info**: Water dispersible granule contact fungicide, acaricide, and essential secondary plant nutrient. **Chemical Class**: Inorganic Element. **Primary Use Cases**: Control of powdery mildew, rusts, and mites in grapes, mangoes, cumin, and vegetables; sulfur nutrient replenishment in soil. **Key Advantages**: Multisite contact activity (zero risk of resistance build-up); organic farming suitable; easy measuring and mixing with water. **Safety & Handling**: Non-toxic to mammals; avoid mixing with mineral oils or within 14 days of oil sprays to prevent phytotoxicity.",
        "donepezil hcl": "**Basic Info**: Reversible acetylcholinesterase inhibitor (C24H29NO3·HCl). **Therapeutic Class**: Central Nervous System / Anti-Alzheimer's Agent. **Primary Use Cases**: Palliative treatment of mild, moderate, and severe Alzheimer's disease dementia. **Key Advantages**: High selectivity for brain acetylcholinesterase over butyrylcholinesterase; long elimination half-life (~70 hours) allowing once-daily oral administration. **Safety & Handling**: Cholinergic side effects (nausea, diarrhea, bradycardia); handle in containment facility.",
        "doxycycline hyclate": "**Basic Info**: Broad-spectrum synthetic tetracycline-class antibiotic (C22H24N2O8·HCl·1/2H2O·1/2C2H6O). **Therapeutic Class**: Antibacterial Agent. **Primary Use Cases**: Treatment of respiratory tract infections, acne vulgaris, chlamydia, Lyme disease, and malaria prophylaxis. **Key Advantages**: Higher lipophilicity and oral bioavailability compared to tetracycline; safer profile in patients with mild-to-moderate renal impairment. **Safety & Handling**: Causes photosensitivity; contra-indicated in pregnant women and children under 8 years (causes tooth discoloration).",
        "fluoxetine hcl": "**Basic Info**: Selective serotonin reuptake inhibitor (SSRI) (C17H18F3NO·HCl). **Therapeutic Class**: Antidepressant / Anxiolytic. **Primary Use Cases**: Major depressive disorder (MDD), Obsessive-Compulsive Disorder (OCD), Bulimia Nervosa, and Panic Disorder. **Key Advantages**: Long active half-life (and active metabolite norfluoxetine), minimizing withdrawal symptoms upon missed doses. **Safety & Handling**: Risk of serotonin syndrome when combined with MAOIs; handle API with dust mask and containment.",
        "ibuprofen": "**Basic Info**: Non-steroidal anti-inflammatory drug (NSAID) derived from propionic acid (C13H18O2). **Therapeutic Class**: Analgesic / Anti-inflammatory / Antipyretic. **Primary Use Cases**: Relief of mild-to-moderate pain, fever reduction, treatment of dysmenorrhea, rheumatoid arthritis, and osteoarthritis. **Key Advantages**: Well-characterized safety profile; lower gastrointestinal toxicity relative to aspirin and indomethacin at therapeutic doses. **Safety & Handling**: Prolonged high-dose use increases cardiovascular and GI ulceration risks. Standard industrial dust protection.",
        "meloxicam": "**Basic Info**: Enolic acid-class NSAID (C14H13N3O4S2). **Therapeutic Class**: Anti-arthritic / NSAID. **Primary Use Cases**: Symptomatic management of osteoarthritis and rheumatoid arthritis. **Key Advantages**: Preferential inhibition of COX-2 over COX-1, leading to reduced adverse gastrointestinal effects compared to non-selective NSAIDs. **Safety & Handling**: Black box warning for cardiovascular and GI risks typical of NSAIDs.",
        "paracetamol i.p. (acetaminophen)": "**Basic Info**: Widely used non-opioid analgesic and antipyretic (C8H9NO2), compliant with Indian Pharmacopoeia standards. **Therapeutic Class**: Analgesic / Antipyretic. **Primary Use Cases**: Mild-to-moderate pain management and fever reduction across all age groups. **Key Advantages**: High gastric tolerance; does not affect platelet aggregation or gastric mucosal lining like classical NSAIDs. **Safety & Handling**: Hepatotoxic in overdose (>4 g/day in adults) due to NAPQI metabolite formation; handle bulk powder safely to prevent dust explosions.",
        "4-amino antipyrine": "**Basic Info**: Pyrazolone derivative (C11H13N3O), crystalline powder. **Primary Use Cases**: Chromogenic reagent for biochemical assays (determination of phenol, glucose, cholesterol, and uric acid); pharmaceutical synthesis intermediate. **Key Advantages**: Yields intensely colored quinoneimine dyes upon enzymatic or chemical oxidation for precise colorimetric analysis.",
        "egdma / gma / mma (methacrylates)": "**Full Names**: Ethylene Glycol Dimethacrylate (EGDMA), Glycidyl Methacrylate (GMA), Methyl Methacrylate (MMA). **Primary Use Cases**: Acrylic polymer manufacturing, dental restorative materials, hydrogel contact lenses, cross-linking agents, and optical resins. **Key Advantages**: Highly controllable polymerization rates; provides hardness, scratch resistance, and optical clarity in final polymer products.",
        "emme (diethyl ethoxymethylene malonate)": "**Basic Info**: Reactive electrophilic condensation monomer (C10H16O5). **Primary Use Cases**: Core intermediate in the Gould-Jacobs reaction for synthesizing quinolone/fluoroquinolone antibacterial agents (e.g., ciprofloxacin, norfloxacin). **Key Advantages**: High purity enables high-yield heterocyclic ring closures.",
        "epichlorohydrin (ech)": "**Basic Info**: Organochlorine compound and epoxide (C3H5ClO), volatile, reactive liquid. **Primary Use Cases**: Manufacture of epoxy resins, synthetic glycerine, specialty water treatment polymers (polyamines), and ion-exchange resins. **Key Advantages**: Bifunctional reactivity (epoxide + alkyl chloride functionality) makes it an exceptional polymer cross-linker. **Safety & Handling**: Toxic; volatile; alkylating agent and suspected human carcinogen.",
        "epn (o-ethyl o-(4-nitrophenyl) phenylphosphonothioate)": "**Basic Info**: Organophosphorus compound (C14H14NO4PS). **Primary Use Cases**: Intermediate in agricultural organophosphate insecticide synthesis. **Key Advantages**: Potent cholinesterase inhibition profile for agricultural pest management.",
        "hydrazine hydrate 80%": "**Basic Info**: Inorganic liquid mixture (N2H4·H2O), colorless with an ammoniacal odor. **Primary Use Cases**: Boiler water oxygen scavenger to prevent corrosion; blowing agent intermediate (azodicarbonamide); synthesis of agrochemicals (triazoles) and APIs. **Key Advantages**: Powerful reducing agent leaving zero solid residues (decomposes into N2 gas and water). **Safety & Handling**: Carcinogenic, toxic, corrosive, and environmental hazard. Handle under closed nitrogen systems.",
        "hematoxylin stain": "**Basic Info**: Natural phenolic compound extracted from logwood tree heartwood (C16H14O6). **Primary Use Cases**: Histopathology and cytology staining (combined with Eosin as H&E stain) to visualize cellular nuclei under optical microscopes. **Key Advantages**: Gold-standard Nuclear dye with sharp contrast and permanence.",
        "n-butyl amine & tertiary butylamine (tba)": "**Basic Info**: Primary aliphatic amines (C4H11N). **Primary Use Cases**: Vulcanization accelerators in rubber processing; pharmaceutical intermediates (e.g., synthesis of Terbutaline, Ceftaxime); corrosion inhibitors. **Key Advantages**: Strong basicity and nucleophilicity for organic transformations.",
        "n,n-decanamide & npmc": "**Primary Use Cases**: Specialty amides used as crop protection formulation adjuvants, solvency enhancers, and carbamate pesticide intermediates. **Key Advantages**: Superior solvency and penetration enhancement for active crop protection ingredients.",
        "oxalyl chloride": "**Basic Info**: Acyl chloride derived from oxalic acid ((COCl)2). **Primary Use Cases**: Convert carboxylic acids to acyl chlorides under mild conditions; reagent for Swern oxidation of alcohols to aldehydes/ketones. **Key Advantages**: Highly reactive; generates gaseous byproducts (CO, CO2, HCl) which simplifies product purification. **Safety & Handling**: Corrosive, toxic, reacts violently with water to liberate HCl gas.",
        "para-aminobenzoic acid (paba)": "**Basic Info**: Non-protein amino acid (C7H7NO2). **Primary Use Cases**: Synthesis of local anesthetics (e.g., Procaine), cross-linking agents, dyes, and UV-B absorbing sunscreens. **Key Advantages**: Strong optical absorption capability in the UV-B spectrum.",
        "piperazine anhydrous": "**Basic Info**: Cyclic diamine (C4H10N2). **Primary Use Cases**: Veterinary anthelmintic API; precursor to piperazine-class drugs (e.g., sildenafil, levocetirizine); gas sweetening amine solvent (CO2 capture). **Key Advantages**: Strong CO2 absorption kinetics in gas scrubbing applications.",
        "sodium polyanethol sulfonate (sps)": "**Basic Info**: Polymeric synthetic anticoagulant salt. **Primary Use Cases**: Blood culture media additive in clinical microbiology diagnostics. **Key Advantages**: Neutralizes antibacterial activity of human serum proteins (complement system) and inhibits phagocytosis, accelerating bacterial detection.",
        "sulphanilamide": "**Basic Info**: Simplest sulfonamide antibacterial agent (C6H8N2O2S). **Primary Use Cases**: Topical antifungal/antibacterial powder; chemical intermediate for the synthesis of complex sulfa drugs. **Key Advantages**: Competitive inhibitor of bacterial dihydropteroate synthase (PABA analogue).",
        "triethylbenzylammonium chloride (tebac)": "**Basic Info**: Quaternary ammonium salt (C13H22ClN). **Primary Use Cases**: Phase-Transfer Catalyst (PTC) in biphasic organic synthesis (alkylations, nucleophilic substitutions). **Key Advantages**: Accelerates reaction rates under mild conditions between immiscible organic and aqueous phases.",
        "vitride (sodium bis(2-methoxyethoxy)aluminum hydride / red-al)": "**Basic Info**: Organoaluminum hydride reducing agent solution in toluene. **Primary Use Cases**: Industrial-scale reduction of esters, carboxylic acids, lactones, and azides to alcohols and amines. **Key Advantages**: Non-pyrophoric alternative to Lithium Aluminum Hydride (LiAlH4); highly soluble in aromatic hydrocarbons. **Safety & Handling**: Reacts vigorously with moisture releasing flammable Hydrogen gas.",
        "benzyl benzaldehyde & bisphenol a (bpa)": "**Primary Use Cases**: Fragrance fixatives (Benzyl derivatives) and core chemical monomer for Polycarbonate plastics and Epoxy resins (BPA). **Key Advantages**: BPA imparts exceptional mechanical impact strength and thermal clarity to engineering plastics.",
        "ptsa (p-toluenesulfonic acid)": "**Basic Info**: Organic soluble strong acid catalyst (C7H8O3S·H2O), white solid. **Primary Use Cases**: Acid catalyst for esterification, transesterification, acetalization, and dehydration reactions. **Key Advantages**: Non-oxidizing solid alternative to concentrated sulfuric acid; highly soluble in organic solvents.",
        "bcaa (branched-chain amino acids: l-leucine, l-isoleucine, l-valine)": "**Basic Info**: Trio of essential amino acids with branched aliphatic side chains. **Primary Use Cases**: Sports nutrition supplements, parenteral nutrition formulations, muscle recovery and anti-catabolism products. **Key Advantages**: Directly metabolized in skeletal muscle tissue rather than liver; triggers mTOR pathway for muscle protein synthesis.",
        "beta alanine / dl-alanine / l-alanine": "**Primary Use Cases**: Pre-workout supplements (Beta-Alanine buffers lactic acid via carnosine synthesis); parenteral infusion solutions (L-Alanine); food flavor enhancer. **Key Advantages**: Beta-Alanine significantly increases intracellular muscle carnosine levels, delaying neuromuscular fatigue.",
        "dl-methionine / l-methionine": "**Primary Use Cases**: Essential sulfur amino acid; additive in poultry and livestock feed formulations; liver detoxification and pharmaceutical formulations. **Key Advantages**: Essential limiting amino acid in animal nutrition that drives growth performance and feathering.",
        "dl-tryptophan / l-tryptophan": "**Primary Use Cases**: Essential precursor to Serotonin, Melatonin, and Niacin; sleep aids, mood support nutraceuticals, and specialized medical feeds. **Key Advantages**: Naturally modulates sleep architecture and serotonin biosynthesis pathways.",
        "glycine / sodium glycinate": "**Primary Use Cases**: Simplest non-essential amino acid; buffering agent in antacids; sweetener/flavor improver; industrial synthesis of glyphosate herbicide. **Key Advantages**: High solubility; excellent buffering capacity around neutral pH.",
        "l-alanyl l-glutamine (sustamine)": "**Basic Info**: Highly stable dipeptide form of L-Glutamine (C8H15N3O4). **Primary Use Cases**: Clinical parenteral/enteral nutrition, sports hydration and recovery beverages. **Key Advantages**: Superior thermal stability and solubility compared to free L-Glutamine, which degrades rapidly in liquid solutions.",
        "l-arginine (base, hcl, alpha ketoglutarate - aakg, aspartate)": "**Primary Use Cases**: Nitric Oxide (NO) donor supplements for cardiovascular health, erectile dysfunction support, and vasodilation in athletic supplements. **Key Advantages**: Endogenous precursor to nitric oxide causing vasodilation and improved tissue perfusion.",
        "l-asparagine monohydrate / l-aspartic acid": "**Primary Use Cases**: Component of parenteral nutrition; raw material for synthesizing Aspartame sweetener; neuro-nutritional formulations. **Key Advantages**: Critical role in the malate-aspartate shuttle for cellular energy transport.",
        "l-carnitine (base, hcl, fumarate, tartrate, n-acetyl)": "**Primary Use Cases**: Fat oxidation and energy metabolism supplements, cardiac health products, male fertility formulations. **Key Advantages**: Essential obligate carrier for transporting long-chain fatty acids across mitochondrial membranes for β-oxidation.",
        "l-citrulline / l-citrulline dl-malate": "**Primary Use Cases**: Nitric oxide boosting, athletic endurance, reduction of delayed onset muscle soreness (DOMS). **Key Advantages**: Elevates plasma L-Arginine levels more effectively than oral L-Arginine ingestion due to bypassing first-pass hepatic metabolism.",
        "l-cysteine (base, hcl, monohydrate, n-acetyl l-cysteine - nac)": "**Primary Use Cases**: Precursor to Glutathione; NAC as a mucolytic respiratory drug and acetaminophen overdose antidote; dough conditioner in baking. **Key Advantages**: Potent thiol-containing antioxidant agent; cleaves disulfide bonds in thick respiratory mucus.",
        "l-cystine": "**Basic Info**: Covalently linked dimer of two L-Cysteine molecules via a disulfide bond. **Primary Use Cases**: Hair and nail growth supplements; keratin structure synthesis; cell culture media additive. **Key Advantages**: High structural stability providing essential sulfur linkages in structural proteins.",
        "l-glutamic acid / l-glutamine / l-glutathione reduced": "**Primary Use Cases**: Intestinal mucosa repair and immunity (L-Glutamine); master intracellular antioxidant and skin-lightening agent (Reduced Glutathione); flavor enhancement (Glutamic acid/MSG). **Key Advantages**: Reduced Glutathione direct neutralization of reactive oxygen species (ROS) and free radicals.",
        "l-histidine (base, mono hcl)": "**Primary Use Cases**: Infant nutrition formulations; precursor to Histamine; biological buffering agent in protein therapeutics. **Key Advantages**: Imidazole side chain (pKa ≈ 6.0) makes it ideal for physiological buffering.",
        "l-isoleucine / l-leucine / l-valine": "**(See BCAA section above for detailed breakdown).**",
        "l-lysine (acetate, base, hcl)": "**Primary Use Cases**: Essential amino acid for animal feed fortification, herpes simplex virus management supplements, collagen synthesis support. **Key Advantages**: Essential limiting amino acid for animal growth performance.",
        "l-ornithine (l-aspartate - lola, mono hcl)": "**Primary Use Cases**: Treatment of hepatic encephalopathy (LOLA); urea cycle enhancement supplements for ammonia detoxification. **Key Advantages**: Direct substrate in the hepatic urea cycle for lowering toxic blood ammonia levels.",
        "l-phenylalanine / l-proline / l-pyroglutamic acid": "**Primary Use Cases**: Precursor to Dopamine and Tyrosine (Phenylalanine); collagen matrix building block (Proline); cognitive enhancement supplements (Pyroglutamic acid). **Key Advantages**: Vital structural and neurotransmitter biosynthetic starting materials.",
        "l-serine / l-theanine / l-threonine / l-tyrosine (acetyl l-tyrosine)": "**Primary Use Cases**: Nootropic calming support without sedation (L-Theanine from tea); neurotransmitter synthesis under stress (L-Tyrosine); essential gut/immune support (L-Threonine). **Key Advantages**: L-Theanine crosses the blood-brain barrier to promote alpha brainwave activity.",
        "adenine / adenine sulfate": "**Basic Info**: Purine nucleobase (C5H5N5). **Primary Use Cases**: Cell culture media component; biochemical research; blood preservation solutions (CPDA-1). **Key Advantages**: Essential substrate for cellular ATP, DNA, and RNA synthesis.",
        "alpha ketoglutaric acid (akg) / alpha lipoic acid (ala)": "**Primary Use Cases**: Intermediate in Krebs cycle energy production (AKG); universal fat and water-soluble antioxidant for diabetic neuropathy (ALA). **Key Advantages**: ALA regenerates endogenous antioxidants (Vitamin C, Vitamin E, Glutathione).",
        "ascorbic acid / folic acid / methyl folate / pyridoxal-5-phosphate (p5p)": "**Primary Use Cases**: Essential vitamins for antioxidant defense (C), neural tube defect prevention (Folic Acid/L-Methylfolate), and coenzymatic amino acid metabolism (P5P - active B6). **Key Advantages**: Methyl Folate and P5P provide active coenzyme forms requiring no enzymatic conversion in MTHFR-polymorphic patients.",
        "betaine anhydrous (trimethylglycine) / choline bitartrate": "**Primary Use Cases**: Lipotropic factors for liver health, methyl group donors for homocysteine reduction, cognitive support. **Key Advantages**: Protects against osmotic stress and lowers plasma homocysteine levels.",
        "calcium / ferrous / magnesium / manganese glycinates & aspartates": "**Primary Use Cases**: High-bioavailability mineral supplementation in human nutraceuticals and pharmaceutical mineral therapies. **Key Advantages**: Organic amino acid chelation shields minerals from stomach acid digestion, eliminating gastrointestinal irritation and improving intestinal absorption.",
        "carbocisteine / creatine monohydrate / creatine nitrate / creatinine": "**Primary Use Cases**: Mucolytic respiratory therapy (Carbocisteine); explosive muscle strength, power output, and ATP regeneration (Creatine Monohydrate/Nitrate). **Key Advantages**: Creatine is the most clinically validated ergogenic aid for increasing intramuscular phosphocreatine stores.",
        "d-chiro-inositol / inositol (myo-inositol)": "**Primary Use Cases**: Management of Polycystic Ovary Syndrome (PCOS), insulin sensitivity improvement, panic disorder therapy. **Key Advantages**: Key second messenger modulating intracellular insulin signaling cascades.",
        "specialized monosaccharides (d-galactose, d-mannose, d-ribose, d-xylose, l-arabinose, l-rhamnose)": "**Primary Use Cases**: Urinary Tract Health (D-Mannose binds E. coli); ATP synthesis enhancement (D-Ribose); diagnostic gut permeability testing (D-Xylose/L-Rhamnose). **Key Advantages**: D-Mannose prevents bacterial adherence to urothelial cells without altering blood glucose levels.",
        "plant polyphenols (daidzein, genistein, resveratrol, quercetin, citrus bioflavonoids)": "**Primary Use Cases**: Anti-aging, cardiovascular protection, mast-cell stabilization/anti-allergy (Quercetin), phytoestrogen support for menopause (Daidzein/Genistein). **Key Advantages**: Potent free radical scavenging capabilities and anti-inflammatory enzyme inhibition (COX/LOX).",
        "gallic acid monohydrate / pyrogallol": "**Primary Use Cases**: Analytical chemistry reagents; raw material for Propyl Gallate antioxidant; tanning and dye manufacturing. **Key Advantages**: Strong phenolic antioxidant capacity.",
        "gaba / melatonin / taurine": "**Primary Use Cases**: Sleep architecture regulation (Melatonin); inhibitory neurotransmission for relaxation (GABA); cardiac function and osmoregulation (Taurine). **Key Advantages**: Melatonin directly regulates circadian rhythms; GABA reduces neuronal excitability.",
        "lactic acid (80%, 88%) / l+ tartaric acid": "**Primary Use Cases**: Acidulants and pH regulators in beverage and confectionery manufacturing; AHAs for skin exfoliation in cosmetics; pharma effervescent systems. **Key Advantages**: Natural organic acids providing clean sour taste and mild antimicrobial action.",
        "specialty sugars (maltose, raffinose, sucrose pharma grade)": "**Primary Use Cases**: Lyophilization cake lyoprotectants for biological APIs; tablet binders and sweetening vehicles. **Key Advantages**: Low endotoxin pharma-grade sugars protect fragile protein therapeutics during freeze-drying.",
        "s-adenosyl l-methionine (same)": "**Primary Use Cases**: Osteoarthritis pain management, clinical depression support, intrahepatic cholestasis therapy. **Key Advantages**: Primary endogenous methyl donor participating in over 40 metabolic transmethylation reactions.",
        "stevia / sucralose": "**Primary Use Cases**: High-intensity zero-calorie sweeteners for diabetic dietary products and pharmaceuticals. **Key Advantages**: Sucralose is 600x sweeter than sucrose with thermal stability suitable for baking and liquid formulations.",
        "aerosil 200 / cabosil m-5 / colloidal silicone dioxide / fumed silica": "**Basic Info**: Sub-micron synthetic amorphous silicon dioxide (SiO2). **Primary Use Cases**: Glidant in tablet manufacturing; thixotropic thickening agent in oils and liquid suspensions; anti-caking agent in dry powders. **Key Advantages**: Dramatically improves powder flowability during high-speed tablet compression by reducing interparticulate friction.",
        "glycerin (tech / ip / bp / usp)": "**Basic Info**: Trihydric sugar alcohol (C3H8O3), clear, viscous liquid. **Primary Use Cases**: Solvent, humectant, and plasticizer in pharmaceutical syrups, creams, cosmetics, and food products. **Key Advantages**: Highly hygroscopic; non-toxic; pleasant sweet taste.",
        "kollidon 30 / pvpk 30 / pvpk 90 (povidone / polyvinylpyrrolidone)": "**Basic Info**: Synthetic water-soluble polymer of N-vinylpyrrolidone. **Primary Use Cases**: Wet granulation binder in tablet manufacturing; solubilizer and bioavailability enhancer for poorly soluble APIs; film-forming agent. **Key Advantages**: Exceptional binding capability; soluble in both water and alcoholic solvents.",
        "lactose (anhydrous dcl 11/21, monohydrate 100/200 mesh)": "**Primary Use Cases**: Standard diluent and filler in solid oral dosage forms (tablets and capsules). **Key Advantages**: Excellent compressibility and physical stability; predictable particle size distributions for direct compression.",
        "microcrystalline cellulose (mcc - e.g., avicel ph101/ph102)": "**Basic Info**: Purified, partially depolymerized cellulose. **Primary Use Cases**: Primary dry binder, filler, and disintegrant in direct compression tabling. **Key Advantages**: High plastic deformation under pressure provides exceptional compact strength at low compaction forces.",
        "magnesium stearate i.p.": "**Basic Info**: Magnesium salt of fatty acids (predominantly stearic acid). **Primary Use Cases**: Hydrophobic boundary lubricant in pharmaceutical tablet and capsule manufacturing. **Key Advantages**: Prevents powder adhesion to metal punch faces and dies during high-speed tableting.",
        "paraben preservatives (methyl paraben / propyl paraben)": "**Primary Use Cases**: Broad-spectrum antimicrobial preservatives in oral liquids, topical creams, and cosmetics. **Key Advantages**: Effective across a wide pH range (4-8); cost-effective long-term stability.",
        "surfactants (sles / sls needle & powder)": "**Primary Use Cases**: Primary anionic surfactants for personal care cleansers, shampoos, toothpastes, and emulsion polymerization. **Key Advantages**: High foaming capacity, rapid wetting, and powerful grease emulsification.",
        "sorbitol ip": "**Primary Use Cases**: Non-cariogenic bulk sweetener, humectant, and plasticizer for softgel capsules; liquid syrup vehicle. **Key Advantages**: Non-crystallizing formulation grade; friendly to diabetic products.",
        "starch powder / stearic acid / talcum powder / titanium dioxide": "**Primary Use Cases**: Tablet disintegrant (Starch), opacifier/white pigment (Titanium Dioxide), glidant (Talc), and ointment hardener (Stearic Acid). **Key Advantages**: Essential structural and functional excipients in solid/semi-solid pharmaceutical manufacturing.",
        "polysorbates (tween 20 / tween 80)": "**Basic Info**: Non-ionic polyoxyethylene sorbitan fatty acid esters. **Primary Use Cases**: Emulsifiers, solubilizers for hydrophobic APIs, and wetting agents in parenteral, oral, and topical formulations. **Key Advantages**: Non-ionic nature renders them compatible with almost all active ingredients and electrolytes.",
        "xanthan gum": "**Basic Info**: High-molecular-weight anionic polysaccharide produced by fermentation of Xanthomonas campestris. **Primary Use Cases**: Rheology modifier and stabilizer in food dressings, pharmaceutical suspensions, and oral liquids. **Key Advantages**: High pseudoplastic (shear-thinning) behavior; exceptional stability across broad pH and temperature ranges.",
        "specialty phosphates (dpdp, 2-ethylhexyl diphenyl phosphate, tridecyl phosphate, divinyl phosphate)": "**Primary Use Cases**: Flame-retardant plasticizers for Flexible PVC, synthetic rubbers, polyurethane foams, and engineering resins. **Key Advantages**: Dual functionality: provides plasticizing flexibility while acting as an effective fire-retardant/smoke suppressant.",
        "acetic acid (glacial)": "**Basic Info**: Concentrated carboxylic acid (CH3COOH), clear liquid with a pungent vinegar odor. **Primary Use Cases**: Manufacture of Vinyl Acetate Monomer (VAM), acetic anhydride, solvent in PTA production, pH control agent in food and pharmaceuticals. **Key Advantages**: Versatile polar protic acid; readily biodegradable.",
        "caustic lye / caustic potash / caustic soda flakes (naoh / koh)": "**Basic Info**: Strong inorganic bases (Sodium Hydroxide / Potassium Hydroxide). **Primary Use Cases**: Soap and detergent manufacturing (saponification), water treatment neutralizer, chemical processing base, paper pulp processing. **Key Advantages**: High reactivity for neutralizations and saponification; economical basicity. **Safety & Handling**: Highly corrosive; causes severe skin burns and permanent blindness. Generates intense heat when dissolved in water.",
        "phosphoric acid (h3po4)": "**Basic Info**: Mineral acid, clear viscous liquid. **Primary Use Cases**: Phosphate fertilizer manufacturing; metal rust removal and phosphatizing conversion coatings; food acidulant in soft drinks (colas). **Key Advantages**: Provides a sharp, tangy flavor profile in foods; forms protective insoluble phosphate coatings on steel.",
        "aluminium powder / zinc dust": "**Primary Use Cases**: Anti-corrosion industrial zinc-rich coatings; chemical reducing agents; pyrotechnic formulations; cellular concrete blowing agents. **Key Advantages**: High surface area reactivity for chemical reductions and cathodic corrosion protection.",
        "calcium / cobalt / copper / iron / manganese / nickel / osmium / molybdenum salts": "**Primary Use Cases**: Trace element crop nutrients, industrial chemical catalysts, electroplating bath salts, and feed fortifiers. **Key Advantages**: Essential transition metal cations for enzymatic cofactors and redox catalysis.",
        "sodium bicarbonate / soda ash (sodium carbonate) / sodium citrate / sodium hydrosulfite": "**Primary Use Cases**: Soda Ash: Glass manufacturing. Bicarbonate: Effervescent tablets, antacids, baking. Hydrosulfite: Powerful textile bleaching/reducing agent. **Key Advantages**: Reliable pH buffering and safe carbon dioxide generation profiles.",
        "sodium borohydride (nabh4)": "**Basic Info**: Inorganic white crystalline powder reducing agent. **Primary Use Cases**: Selective reduction of aldehydes and ketones to primary and secondary alcohols in API synthesis; heavy metal recovery from waste streams. **Key Advantages**: Milder and more selective than LiAlH4; can be used in protic solvents like methanol and aqueous basic solutions. **Safety & Handling**: Reacts with water to release flammable hydrogen gas.",
        "tris base / tris buffer": "**Basic Info**: Primary amine organic compound (C4H11NO3). **Primary Use Cases**: Buffer solutions in biochemistry and molecular biology (TAE/TBE buffers, SDS-PAGE); pharmaceutical buffer for biological injectables. **Key Advantages**: Effective physiological buffering range between pH 7.0 and 9.0; low interference with enzymatic reactions.",
        "sodium methoxide (naoch3)": "**Basic Info**: Strong, non-nucleophilic alkoxide base, available as powder or solution in methanol. **Primary Use Cases**: Base catalyst for biodiesel transesterification; reaction initiator in organic synthesis and pharmaceutical condensation reactions. **Key Advantages**: High catalytic activity for ester exchange reactions. **Safety & Handling**: Reacts violently with water releasing flammable methanol; highly corrosive solid."
    };

    // NORMALIZATION: Removes ALL spaces, hyphens, and punctuation for perfect matching
    const normalizeText = (text) => {
        return text.toLowerCase()
                   .replace(/[-_]/g, '') // remove hyphens/slashes
                   .replace(/[.,#!$%^&*;:{}=`~()?]/g, '') // remove punctuation
                   .replace(/\s+/g, '') // remove spaces
                   .trim();
    };

    function generateBotResponse(userQuery) {
        const q = normalizeText(userQuery);
        let bestMatch = null;
        let longestMatchLength = 0;

        for (const key in knowledgeBase) {
            // Split the key by actual delimiters to create variations
            // e.g., "2-Ethyl Hexanol (2-EH)" -> ["2-Ethyl Hexanol", "2-EH"]
            const rawParts = key.split(/[\/\(\),]/).map(p => p.trim()).filter(p => p.length > 2);
            
            for (const part of rawParts) {
                const normalizedPart = normalizeText(part);
                
                // Check if the normalized user query contains the normalized part
                if (q.includes(normalizedPart)) {
                    if (normalizedPart.length > longestMatchLength) {
                        longestMatchLength = normalizedPart.length;
                        bestMatch = key;
                    }
                }
            }
        }

        if (bestMatch) {
            const data = knowledgeBase[bestMatch];
            
            // Format the response
            const response = `
                <strong>Chemical:</strong> ${bestMatch.toUpperCase()}<br><br>
                ${data.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                <br><br>
                <em>You can easily get more information about this product, as well as get pack size and COA, by inquiring with Deepen Chemicals.</em>
                <br><br>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deepenchemicals1@gmail.com&su=Product%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(bestMatch)}.%0A%0AQuantity%3A%20" target="_blank" style="display: inline-block; background: var(--accent-cyan); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: bold;">Inquire about ${bestMatch}</a>
            `;
            appendMessage('bot', response);
            return;
        }

        // Check for greetings (using the raw query since punctuation doesn't matter here)
        const lowerQuery = userQuery.toLowerCase();
        if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey')) {
            appendMessage('bot', 'Hello! I am the Deepen Chemicals Assistant. Ask me about any chemical, and I\'ll check our catalog for you.');
            return;
        }

        // Check for pricing
        if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('rate') || lowerQuery.includes('quotation')) {
            appendMessage('bot', 'For the best pricing and quotations, please contact our sales team directly via WhatsApp or send us an email at <strong>deepenchemicals1@gmail.com</strong>.');
            return;
        }

        // Fallback for unlisted products
        const fallbackReply = `I couldn't find detailed information on "<strong>${userQuery}</strong>" in my current database. However, Deepen Chemicals specializes in sourcing <em>hard-to-find</em> chemicals.<br><br>Please send us an inquiry, and our team will check availability for you: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deepenchemicals1@gmail.com&su=Product%20Sourcing%20Request&body=Hello%2C%20I%20am%20looking%20for%20${encodeURIComponent(userQuery)}.%20Is%20this%20available%3F" target="_blank" style="color: var(--accent-cyan); font-weight: bold; text-decoration: underline;">Inquire about this product</a>`;
        
        appendMessage('bot', fallbackReply);
    }
});