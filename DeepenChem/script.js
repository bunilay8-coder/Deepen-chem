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
    
    let mouse = {
        x: null,
        y: null,
        radius: 150 
    };

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
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; 
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
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacityValue + ')';
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
        // Category 1
        { name: "1-4 Dioxane", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "2-Ethyl Hexanol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Actyl alcohol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Acetone", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Acetonitrile", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Cyclohexane", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Cyclohexanol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Cyclohexanone", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Di Methyl Formamide", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Di Methyl Sulphoxide", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Dipropylene glycol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Dodecan -1-ol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Ethanol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Ethyl Acetate", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Heptane", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Iso Phorone", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Iso Propyl Alcohol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Isopropyl myristate", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Lauryl alcohol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Mesitylene", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Methyl isobutyl ketone", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Methylene Chloride", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Mono Ethylene Glycol (MEG)", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Mono Tert Butyl Ether (MTBE)", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "N-Methyl Pyrrolidone", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Octyl alcohol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Paraffin Liquid Heavy / Light", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Phenol", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Propylene Glycol (Tech / USP / IP Grades)", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Pyridine", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Pyrrolidine", cat: "Organic Solvents & Liquid Intermediates" },
        { name: "Tetra Hydro Furan", cat: "Organic Solvents & Liquid Intermediates" },

        // Category 2
        { name: "2,4 D Acid tech 98%", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D Dimethylamine salt (400, 480, 600, 670, 720 g/l SL)", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D Ethyl ester tech 96%", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D Ethylhexyl ester (380, 660, 680 EC)", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D 2-Ethylhexyl ester tech 97%", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D Isobutyl ester tech 97%", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "2,4 D Sodium salt (95% SP, 95% WDG)", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Chlorimuron ethyl technical / 25% WP", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Chlorimuron ethyl 10% + Metsulfuron methyl 10% WP", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Chlorsulfuron technical / 75% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Chlorsulfuron 62.5 + Metsulfuron 12.5 WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Chlorsulfuron 15% + Metsulfuron 48% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Clodinafop tech / 8% EC / 15% WP", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Indol butyric acid", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Metsulfuron methyl technical / 20% WP / 60% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Nicosulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Pyrazosulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Sulfosulfuron technical / 75% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Thifensulfuron technical", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Tribenuron technical", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Acetamiprid technical / 20% SP", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Hexaconazole technical / 5% EC / 5% SC", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Indoxacarb technical (3:1, 9:1) / 15% SC / 30% WDG / 5% EC / 15% EC / 0.6% gel bait", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Isoprothiolane technical / 40% EC", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Propiconazole technical / 25% EC", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Propoxur technical / 20% EC / 1% DP / Propoxur 1.75% + Indoxacarb 0.25% gel bait", cat: "Agro-Chemicals & Crop Protection Techs" },
        { name: "Sulphur 80% WDG", cat: "Agro-Chemicals & Crop Protection Techs" },

        // Category 3
        { name: "Donepezil HCL", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Doxycycline Hyclate", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Fluoxetine HCL", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Ibuprofen", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Meloxicam", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Paracetamol I.P.", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "4-Amino Antipyrine", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "EGDMA / GMA / MMA (Methacrylates)", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "EMME", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Epichlorohydrin", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "EPN", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Hydrazine Hydrate 80%", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Hematoxylin Stain", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "N-Butyl Amine", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "N,N-Decanamide", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "NPMC", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Oxalyl chloride", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Para Amino Benzoic Acid", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Piperazine Anhydrous", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Sodium Polyanethol Sulphonic Acid", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Sulphanilamide", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Tertiary Butylamine", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Triethylbenzylammonium chloride (TEBAC)", cat: "APIs, Fine Chemicals & Reaction Intermediates" },
        { name: "Vitride", cat: "APIs, Fine Chemicals & Reaction Intermediates" },

        // Category 4
        { name: "BCAA (Branched-Chain Amino Acids)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Beta Alanine / DL-Alanine / L-Alanine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "DL-Methionine / L-Methionine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "DL-Tryptophan / L-Tryptophan", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Glycine / Sodium Glycinate", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Alanyl L-Glutamine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Arginine (Base, HCL, Alpha Ketoglutarate, Aspartate)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Aspargine Monohydrate / L-Aspartic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Carnitine (Base, HCL, Fumarate, Tartrate, N-Acetyl)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Citrulline / L-Citrulline DL-Maleate", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Cysteine (Base, HCL, Monohydrate, N-Acetyl)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Cystine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Glutamic acid / L-Glutamine / L-Glutathione Reduced", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Histidine (Base, Mono HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Isoleucine / L-Leucine / L-Valine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Lysine (Acetate, Base, HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Ornithine (L-Aspartate, Mono HCL)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Phenylalanine / L-Proline / L-Pyroglutamic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "L-Serine / L-Theanine / L-Threonine / L-Tyrosine (Acetyl L-Tyrosine)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Adenine / Adenine Sulphate", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Alpha Ketoglutaric Acid / Alpha Lipoic Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Ascorbic Acid / Folic Acid / Methyl Folate / Pyridoxal-5-Phosphate", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Betaine Anhydrous / Choline Bitartrate", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Calcium / Ferrous / Magnesium / Manganese Glycinates & Aspartates", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Carbocisteine / Creatine Monohydrate / Creatine Nitrate / Creatinine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "D-Chiro-Inositol / Inositol", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "D-Galactose / D-Mannose / D-Ribose / D-Xylose / L-Arabinose / L-Rhamnose", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Daidzein / Genistein / Resveratrol / Quercetin / Citrus Bioflavonoids", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Gallic Acid Monohydrate / Pyrogallol", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Gamma Amino Butyric Acid (GABA) / Melatonin / Taurine", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Lactic Acid (80%, 88%) / L+ Tartaric Acid", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Maltose / Raffinose Pentahydrate / Sucrose / Pharma Grade Sugar", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "S-Adenosyl L-Methionine (SAMe)", cat: "Amino Acids, Food Additives & Nutraceuticals" },
        { name: "Stevia / Sucralose", cat: "Amino Acids, Food Additives & Nutraceuticals" },

        // Category 5
        { name: "Acid Slurry 90%", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Aerosil 200 / Cabosil M-5 / Colloidal Silicone Dioxide / Fumed Silica", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Glycerin 99.5%", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Kollidon 30 / PVPK 30 / PVPK 90", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Lactose (Anhydrous DCL 11/21, Monohydrate 100/200 mesh)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Microcrystalline Cellulose (MCC)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Magnesium Stearate I.P.", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Methyl Paraben", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "SLES (Sodium Lauryl Ether Sulphate)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Sodium Lauryl Sulphate (Needle / Powder)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Sorbitol IP", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Starch powder", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Stearic Acid", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Talcum Powder", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Titanium Dioxide", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "TRO (Turkey Red Oil)", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Tween 20 / Tween 80", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },
        { name: "Xanthan Gum", cat: "Pharmaceutical Excipients, Polymers & Surfactants" },

        // Category 6
        { name: "Acetic acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Caustic Lye / Caustic Potash / Caustic Soda Flakes", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Phosphoric Acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Aluminium Powder / Zinc Dust", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Calcium Chloride / Calcium Gluconate / Calcium Caseinate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Cobalt Acetate / Copper Salt / Copper Sulphate / Ferric Chloride / Ferrous Sulphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Manganese Sulphate / Nickel Sulphate / Osmic Acid / Molybdic Acid", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Magnesium Salt / Magnesium Sulphate / Magnesium Phosphate Dibasic", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Potassium Salt / Potassium Sorbate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Sodium Bicarbonate / Soda Ash / Sodium Citrate / Sodium Hydrosulphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Sodium Chloride (Common Salt) / Sodium Malonate / Sodium Monofluorophosphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Sodium Sulphate / Sodium Sulfite / Tri Sodium Orthophosphate", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Sodium Borohydride", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Tris Base / Buffer", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" },
        { name: "Zinc Chloride / Zinc Salt", cat: "Basic Inorganics, Acids, Alkalis & Inorganic Salts" }
    ];

    const productListContainer = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');

    function renderProducts(category, searchQuery) {
        productListContainer.innerHTML = ''; 
        
        const filteredProducts = productsData.filter(product => {
            const matchesCategory = category === 'All' || product.cat === category;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productLink = document.createElement('a');
                productLink.classList.add('product-item');
                productLink.textContent = product.name;
                
                const email = "deepenchemicals1@gmail.com";
                const subject = encodeURIComponent(`Product Inquiry - ${product.name}`);
                const body = encodeURIComponent(`Hello, I would like to inquire about ${product.name}.\n\nQuantity- `);
                
                productLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
                productLink.target = "_blank";
                
                productListContainer.appendChild(productLink);
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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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
});