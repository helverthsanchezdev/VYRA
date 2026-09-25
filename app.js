const STORAGE_VEHICLES = "yire_vehicles";
const STORAGE_FAVORITES = "yire_favorites";
const LEGACY_CAR = "carro";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80";

const CATALOG = [
    {
        id: "toyota-corolla-2022",
        marca: "Toyota",
        modelo: "Corolla",
        anio: 2022,
        kilometraje: 35000,
        precio: 75000000,
        ciudad: "Cúcuta",
        tipo: "Sedán",
        motor: "1.8 L",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "Único dueño, mantenimiento en concesionario y excelente estado general.",
        imagen: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
        vendedor: "Laura Gómez",
        telefono: "318 441 2290"
    },
    {
        id: "chevrolet-camaro-2021",
        marca: "Chevrolet",
        modelo: "Camaro",
        anio: 2021,
        kilometraje: 28000,
        precio: 120000000,
        ciudad: "Bucaramanga",
        tipo: "Deportivo",
        motor: "6.2 L V8",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "Edición deportiva con interiores en piel y paquete de performance.",
        imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
        vendedor: "Andrés Ríos",
        telefono: "300 512 8841"
    },
    {
        id: "porsche-911-2023",
        marca: "Porsche",
        modelo: "911",
        anio: 2023,
        kilometraje: 12000,
        precio: 450000000,
        ciudad: "Bogotá",
        tipo: "Deportivo",
        motor: "3.0 L Biturbo",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "Poco uso, full equipo y historial de servicio en taller autorizado.",
        imagen: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
        vendedor: "Camila Duarte",
        telefono: "310 220 1198"
    },
    {
        id: "mazda-cx5-2020",
        marca: "Mazda",
        modelo: "CX-5",
        anio: 2020,
        kilometraje: 54000,
        precio: 98000000,
        ciudad: "Medellín",
        tipo: "SUV",
        motor: "2.5 L",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "SUV familiar con techo panorámico, cámaras y sensores.",
        imagen: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
        vendedor: "Julián Pardo",
        telefono: "315 908 3344"
    },
    {
        id: "renault-duster-2019",
        marca: "Renault",
        modelo: "Duster",
        anio: 2019,
        kilometraje: 78000,
        precio: 58000000,
        ciudad: "Cúcuta",
        tipo: "SUV",
        motor: "2.0 L",
        transmision: "Manual",
        combustible: "Gasolina",
        descripcion: "Ideal para ciudad y carretera. Papeles al día y listo para traspaso.",
        imagen: "https://images.unsplash.com/photo-1606668718722-28177875841d?auto=format&fit=crop&w=900&q=80",
        vendedor: "Sofía Mendoza",
        telefono: "317 660 2211"
    },
    {
        id: "bmw-x3-2022",
        marca: "BMW",
        modelo: "X3",
        anio: 2022,
        kilometraje: 22000,
        precio: 210000000,
        ciudad: "Bogotá",
        tipo: "SUV",
        motor: "2.0 L Turbo",
        transmision: "Automática",
        combustible: "Híbrido",
        descripcion: "Versión luxury, asientos eléctricos y asistencia de conducción.",
        imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
        vendedor: "Mateo Salazar",
        telefono: "301 774 5560"
    },
    {
        id: "kia-sportage-2021",
        marca: "Kia",
        modelo: "Sportage",
        anio: 2021,
        kilometraje: 41000,
        precio: 89000000,
        ciudad: "Cali",
        tipo: "SUV",
        motor: "2.0 L",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "Garantía vigente, bajo consumo y muy buen estado interior.",
        imagen: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=900&q=80",
        vendedor: "Elena Ruiz",
        telefono: "304 119 7782"
    },
    {
        id: "mercedes-c200-2020",
        marca: "Mercedes-Benz",
        modelo: "C200",
        anio: 2020,
        kilometraje: 36000,
        precio: 145000000,
        ciudad: "Barranquilla",
        tipo: "Sedán",
        motor: "1.5 L Turbo",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: "Sedán ejecutivo con acabados premium y paquete de seguridad.",
        imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        vendedor: "Diego Herrera",
        telefono: "312 445 9090"
    }
];

let vehicles = [];
let favorites = [];
let selectedVehicle = null;

function money(value) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

function km(value) {
    return `${new Intl.NumberFormat("es-CO").format(Number(value) || 0)} km`;
}

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        return fallback;
    }
}

function migrateLegacyCar() {
    const legacy = readJSON(LEGACY_CAR, null);
    if (!legacy || !legacy.marca) return null;
    return {
        id: "publicado-" + Date.now(),
        marca: legacy.marca,
        modelo: legacy.modelo,
        anio: Number(legacy.anio) || new Date().getFullYear(),
        kilometraje: Number(legacy.kilometraje) || 0,
        precio: Number(legacy.precio) || 0,
        ciudad: legacy.ciudad || "Cúcuta",
        tipo: "Sedán",
        motor: "N/D",
        transmision: "Automática",
        combustible: "Gasolina",
        descripcion: legacy.descripcion || "Vehículo publicado por un usuario.",
        imagen: DEFAULT_IMAGE,
        vendedor: "Vendedor VYRA",
        telefono: "318 555 0142"
    };
}

function loadVehicles() {
    const saved = readJSON(STORAGE_VEHICLES, null);
    const extras = Array.isArray(saved) ? saved : [];
    const legacy = migrateLegacyCar();
    if (legacy && !extras.some((item) => item.marca === legacy.marca && item.modelo === legacy.modelo)) {
        extras.unshift(legacy);
        localStorage.setItem(STORAGE_VEHICLES, JSON.stringify(extras));
        localStorage.removeItem(LEGACY_CAR);
    }
    vehicles = [...extras, ...CATALOG];
    favorites = readJSON(STORAGE_FAVORITES, []);
}

function uniqueValues(key) {
    return [...new Set(vehicles.map((car) => String(car[key])))].sort();
}

function fillSelect(id, values) {
    const select = document.getElementById(id);
    if (!select) return;
    const current = select.value;
    const first = select.querySelector("option");
    select.innerHTML = "";
    if (first) select.appendChild(first);
    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
    select.value = current;
}

function populateFilters() {
    fillSelect("filterMarca", uniqueValues("marca"));
    fillSelect("filterAnio", uniqueValues("anio"));
    fillSelect("filterTipo", uniqueValues("tipo"));
    fillSelect("filterCombustible", uniqueValues("combustible"));
    fillSelect("filterTransmision", uniqueValues("transmision"));
    fillSelect("filterCiudad", uniqueValues("ciudad"));
}

function currentFilters() {
    return {
        query: (document.getElementById("heroQuery")?.value || "").trim().toLowerCase(),
        marca: document.getElementById("filterMarca")?.value || "",
        precio: document.getElementById("filterPrecio")?.value || "",
        anio: document.getElementById("filterAnio")?.value || "",
        tipo: document.getElementById("filterTipo")?.value || "",
        combustible: document.getElementById("filterCombustible")?.value || "",
        transmision: document.getElementById("filterTransmision")?.value || "",
        ciudad: document.getElementById("filterCiudad")?.value || ""
    };
}

function filteredVehicles() {
    const filters = currentFilters();
    return vehicles.filter((car) => {
        const text = `${car.marca} ${car.modelo} ${car.ciudad}`.toLowerCase();
        const matchesQuery = !filters.query || text.includes(filters.query);
        const matchesMarca = !filters.marca || car.marca === filters.marca;
        const matchesPrecio = !filters.precio || Number(car.precio) <= Number(filters.precio);
        const matchesAnio = !filters.anio || String(car.anio) === filters.anio;
        const matchesTipo = !filters.tipo || car.tipo === filters.tipo;
        const matchesFuel = !filters.combustible || car.combustible === filters.combustible;
        const matchesGear = !filters.transmision || car.transmision === filters.transmision;
        const matchesCity = !filters.ciudad || car.ciudad === filters.ciudad;
        return matchesQuery && matchesMarca && matchesPrecio && matchesAnio && matchesTipo && matchesFuel && matchesGear && matchesCity;
    });
}

function heartIcon(active) {
    const fill = active ? "currentColor" : "none";
    return `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.4 3.2 5 6.6 5c2 0 3.3 1.2 5.4 3.4C14.1 6.2 15.4 5 17.4 5c3.4 0 5.4 3.4 3.8 6.4C19 15.6 12 20 12 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;
}

function renderVehicles() {
    const grid = document.getElementById("carrosPublicados");
    const empty = document.getElementById("emptyState");
    const count = document.getElementById("resultsCount");
    if (!grid) return;

    const list = filteredVehicles();
    if (count) count.textContent = `${list.length} vehículo${list.length === 1 ? "" : "s"}`;
    if (empty) empty.hidden = list.length > 0;
    grid.innerHTML = list.map((car, index) => {
        const fav = favorites.includes(car.id);
        return `
            <article class="carro" style="animation-delay:${index * 40}ms">
                <div class="card-media">
                    <img src="${car.imagen}" alt="${car.marca} ${car.modelo}">
                    <button class="fav-btn ${fav ? "active" : ""}" type="button" data-fav="${car.id}" aria-label="Favorito">
                        ${heartIcon(fav)}
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-top">
                        <h3>${car.marca} ${car.modelo}</h3>
                        <span class="badge">${car.tipo}</span>
                    </div>
                    <p class="meta">${car.anio} · ${km(car.kilometraje)} · ${car.ciudad}</p>
                    <p class="precio">${money(car.precio)}</p>
                    <button class="boton" type="button" data-details="${car.id}">Ver detalles</button>
                </div>
            </article>
        `;
    }).join("");
}

function findVehicle(id) {
    return vehicles.find((car) => car.id === id);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
}

function closeModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
        modal.hidden = true;
    });
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
}

function showDetails(id) {
    const car = findVehicle(id);
    if (!car) return;
    selectedVehicle = car;
    document.getElementById("detailsImage").src = car.imagen;
    document.getElementById("detailsImage").alt = `${car.marca} ${car.modelo}`;
    document.getElementById("detailsTipo").textContent = car.tipo;
    document.getElementById("detailsTitle").textContent = `${car.marca} ${car.modelo}`;
    document.getElementById("detailsPrice").textContent = money(car.precio);
    document.getElementById("detailsDescription").textContent = car.descripcion;
    document.getElementById("detailsSpecs").innerHTML = `
        <div><dt>Año</dt><dd>${car.anio}</dd></div>
        <div><dt>Kilometraje</dt><dd>${km(car.kilometraje)}</dd></div>
        <div><dt>Motor</dt><dd>${car.motor || "N/D"}</dd></div>
        <div><dt>Transmisión</dt><dd>${car.transmision}</dd></div>
        <div><dt>Combustible</dt><dd>${car.combustible}</dd></div>
        <div><dt>Ciudad</dt><dd>${car.ciudad}</dd></div>
    `;
    openModal("detailsModal");
}

function showContact() {
    if (!selectedVehicle) return;
    document.getElementById("contactSellerName").textContent = `Vendedor: ${selectedVehicle.vendedor}`;
    document.getElementById("contactVehicle").textContent = `Vehículo: ${selectedVehicle.marca} ${selectedVehicle.modelo}`;
    document.getElementById("contactPrice").textContent = `Precio: ${money(selectedVehicle.precio)}`;
    document.getElementById("contactPhone").textContent = `Teléfono: ${selectedVehicle.telefono}`;
    openModal("contactModal");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    setTimeout(() => {
        toast.hidden = true;
    }, 2800);
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter((item) => item !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(favorites));
    renderVehicles();
}

function requiredFields(form, names) {
    for (const name of names) {
        const field = form.elements[name];
        if (!field || String(field.value).trim() === "") {
            return `Completa el campo ${name}.`;
        }
    }
    return "";
}

function savePublishedVehicle(car) {
    const saved = readJSON(STORAGE_VEHICLES, []);
    saved.unshift(car);
    localStorage.setItem(STORAGE_VEHICLES, JSON.stringify(saved));
}

function publicarCarro() {
    const form = document.getElementById("publishForm") || document.getElementById("publishPageForm");
    if (!form) return false;

    const errorBox = document.getElementById("publishError");
    const error = requiredFields(form, ["marca", "modelo", "anio", "precio", "kilometraje", "ciudad", "descripcion", "vendedor", "telefono"]);
    if (error) {
        if (errorBox) {
            errorBox.hidden = false;
            errorBox.textContent = "Completa todos los campos obligatorios.";
        } else {
            alert("Completa todos los campos obligatorios.");
        }
        return false;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const car = {
        id: "user-" + Date.now(),
        marca: data.marca.trim(),
        modelo: data.modelo.trim(),
        anio: Number(data.anio),
        kilometraje: Number(data.kilometraje),
        precio: Number(data.precio),
        ciudad: data.ciudad.trim(),
        tipo: data.tipo || "Sedán",
        motor: (data.motor || "N/D").trim(),
        transmision: data.transmision || "Automática",
        combustible: data.combustible || "Gasolina",
        descripcion: data.descripcion.trim(),
        imagen: (data.imagen || "").trim() || DEFAULT_IMAGE,
        vendedor: data.vendedor.trim(),
        telefono: data.telefono.trim()
    };

    savePublishedVehicle(car);
    vehicles.unshift(car);
    const hero = document.getElementById("heroQuery");
    if (hero) hero.value = "";
    document.querySelectorAll("#filters input, #filters select").forEach((field) => {
        field.value = "";
    });
    populateFilters();
    renderVehicles();
    form.reset();
    if (errorBox) errorBox.hidden = true;
    closeModals();
    showToast("El vehículo fue publicado correctamente.");
    return true;
}

function mostrarCarro() {
    loadVehicles();
    populateFilters();
    renderVehicles();
}

function bindEvents() {
    const navToggle = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
    navToggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(open));
    });

    nav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });

    document.querySelectorAll("[data-open-publish]").forEach((btn) => {
        btn.addEventListener("click", () => openModal("publishModal"));
    });

    document.querySelectorAll("[data-close-modal]").forEach((el) => {
        el.addEventListener("click", closeModals);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModals();
    });

    document.getElementById("heroSearchForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        renderVehicles();
        document.getElementById("vehiculos")?.scrollIntoView({ behavior: "smooth" });
    });

    ["filterMarca", "filterPrecio", "filterAnio", "filterTipo", "filterCombustible", "filterTransmision", "filterCiudad"]
        .forEach((id) => {
            document.getElementById(id)?.addEventListener("input", renderVehicles);
            document.getElementById(id)?.addEventListener("change", renderVehicles);
        });

    document.getElementById("clearFilters")?.addEventListener("click", () => {
        const hero = document.getElementById("heroQuery");
        if (hero) hero.value = "";
        document.querySelectorAll("#filters input, #filters select").forEach((field) => {
            field.value = "";
        });
        renderVehicles();
    });

    document.getElementById("carrosPublicados")?.addEventListener("click", (event) => {
        const details = event.target.closest("[data-details]");
        const fav = event.target.closest("[data-fav]");
        if (details) showDetails(details.dataset.details);
        if (fav) toggleFavorite(fav.dataset.fav);
    });

    document.getElementById("contactSellerBtn")?.addEventListener("click", showContact);
    document.getElementById("publishForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        publicarCarro();
    });
    document.getElementById("publishPageForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (publicarCarro()) {
            window.location.href = "index.html#vehiculos";
        }
    });
    document.getElementById("sellerMessageForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = event.target.mensaje.value.trim();
        const errorBox = document.getElementById("contactError");
        if (!message) {
            errorBox.hidden = false;
            errorBox.textContent = "Escribe un mensaje para el vendedor.";
            return;
        }
        errorBox.hidden = true;
        event.target.reset();
        closeModals();
        showToast("Mensaje enviado al vendedor.");
    });
    document.getElementById("siteContactForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        event.target.reset();
        showToast("Recibimos tu mensaje. Te contactaremos pronto.");
    });
}

mostrarCarro();
bindEvents();
