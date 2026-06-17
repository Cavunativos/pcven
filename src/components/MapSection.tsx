import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Satellite, Globe2, MessageCircle, Locate } from "lucide-react";

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
const CHANNEL = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;
const WHATSAPP_BASE = "https://wa.me/584126893075";

type SelectedPlace = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

declare global {
  interface Window {
    google: any;
    __pcvenInitMap?: () => void;
  }
}

let mapsLoader: Promise<void> | null = null;
function loadMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("ssr"));
  if (window.google?.maps) return Promise.resolve();
  if (mapsLoader) return mapsLoader;
  if (!BROWSER_KEY) return Promise.reject(new Error("Falta la clave del navegador de Google Maps"));

  mapsLoader = new Promise((resolve, reject) => {
    window.__pcvenInitMap = () => resolve();
    const s = document.createElement("script");
    const channelParam = CHANNEL ? `&channel=${encodeURIComponent(CHANNEL)}` : "";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${BROWSER_KEY}&loading=async&libraries=places,marker&callback=__pcvenInitMap&v=weekly${channelParam}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });
  return mapsLoader;
}

export default function MapSection() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const suggestionsBoxRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<SelectedPlace | null>(null);
  const [satellite, setSatellite] = useState(true);

  // Init map
  useEffect(() => {
    let cancelled = false;
    loadMaps()
      .then(async () => {
        if (cancelled || !mapDivRef.current) return;
        const { Map } = (await window.google.maps.importLibrary("maps")) as any;
        const { AutocompleteSessionToken } = (await window.google.maps.importLibrary("places")) as any;
        sessionTokenRef.current = new AutocompleteSessionToken();
        const map = new Map(mapDivRef.current, {
          center: { lat: 11.0028, lng: -63.8736 }, // Isla de Margarita
          zoom: 11,
          mapTypeId: "hybrid",
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
        });
        mapRef.current = map;
        setReady(true);
      })
      .catch((e) => setError(e?.message ?? "Error al cargar el mapa"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Toggle satellite/roadmap
  useEffect(() => {
    if (mapRef.current) mapRef.current.setMapTypeId(satellite ? "hybrid" : "roadmap");
  }, [satellite]);

  // Click-away to close suggestions
  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (!suggestionsBoxRef.current) return;
      if (!suggestionsBoxRef.current.contains(ev.target as Node) && ev.target !== inputRef.current) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Debounced autocomplete
  useEffect(() => {
    if (!ready || !query.trim()) {
      setSuggestions([]);
      return;
    }
    const handle = setTimeout(async () => {
      try {
        const { AutocompleteSuggestion } = (await window.google.maps.importLibrary("places")) as any;
        const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: query,
          sessionToken: sessionTokenRef.current,
        });
        setSuggestions(results.slice(0, 6));
      } catch {
        setSuggestions([]);
      }
    }, 220);
    return () => clearTimeout(handle);
  }, [query, ready]);

  async function choose(suggestion: any) {
    try {
      const placePred = suggestion.placePrediction;
      if (!placePred) return;
      const place = placePred.toPlace();
      await place.fetchFields({ fields: ["displayName", "formattedAddress", "location"] });
      const loc = place.location;
      const lat = typeof loc.lat === "function" ? loc.lat() : loc.lat;
      const lng = typeof loc.lng === "function" ? loc.lng() : loc.lng;
      const picked: SelectedPlace = {
        name: place.displayName ?? placePred.text?.toString() ?? "Ubicación",
        address: place.formattedAddress ?? "",
        lat,
        lng,
      };
      setSelected(picked);
      setQuery(picked.name);
      setSuggestions([]);
      // Refresh session token after picking
      const { AutocompleteSessionToken } = (await window.google.maps.importLibrary("places")) as any;
      sessionTokenRef.current = new AutocompleteSessionToken();
      placeMarker(picked);
    } catch (e) {
      setError("No se pudo obtener detalles del lugar");
    }
  }

  function placeMarker(p: SelectedPlace) {
    const map = mapRef.current;
    if (!map) return;
    map.panTo({ lat: p.lat, lng: p.lng });
    map.setZoom(16);
    if (markerRef.current) markerRef.current.setMap(null);
    markerRef.current = new window.google.maps.Marker({
      map,
      position: { lat: p.lat, lng: p.lng },
      title: p.name,
      animation: window.google.maps.Animation.DROP,
    });
  }

  function locateMe() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const picked: SelectedPlace = {
          name: "Mi ubicación actual",
          address: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setSelected(picked);
        placeMarker(picked);
      },
      () => setError("Permiso de ubicación denegado"),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  const earthUrl = selected
    ? `https://earth.google.com/web/@${selected.lat},${selected.lng},150a,1500d,35y,0h,45t,0r`
    : "https://earth.google.com/web/";
  const mapsUrl = selected
    ? `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`
    : "https://www.google.com/maps";
  const whatsappCapture = selected
    ? `${WHATSAPP_BASE}?text=${encodeURIComponent(
        `Hola PCVEN, quiero registrar este cliente/ubicación:\n📍 ${selected.name}\n${selected.address}\nhttps://www.google.com/maps?q=${selected.lat},${selected.lng}`
      )}`
    : `${WHATSAPP_BASE}?text=${encodeURIComponent("Hola PCVEN, quiero registrar un cliente")}`;

  return (
    <section id="ubicaciones" className="section bg-background">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--forest)] font-semibold">Ubicaciones & clientes</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight text-[color:var(--coffee)]">
            Encuentra direcciones y captura clientes desde el mapa.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Busca cualquier dirección del mundo, alterna entre vista satelital y mapa, y registra la ubicación de un cliente en un clic.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.6fr_1fr] gap-6">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-elevated)] bg-[color:var(--beige)]">
            {/* Search */}
            <div className="absolute z-10 top-4 left-4 right-4 sm:right-auto sm:w-[420px] max-w-[calc(100%-2rem)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[color:var(--coffee)]/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={ready ? "Buscar dirección, ciudad, negocio…" : "Cargando mapa…"}
                  disabled={!ready}
                  className="w-full rounded-full bg-white/95 backdrop-blur pl-10 pr-4 py-3 text-sm font-medium text-[color:var(--coffee)] shadow-lg outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-[color:var(--forest)] disabled:opacity-60"
                />
                {suggestions.length > 0 && (
                  <div
                    ref={suggestionsBoxRef}
                    className="mt-2 rounded-2xl bg-white shadow-xl border border-border overflow-hidden"
                  >
                    {suggestions.map((s, i) => {
                      const pp = s.placePrediction;
                      const main = pp?.mainText?.toString?.() ?? pp?.text?.toString?.() ?? "";
                      const sec = pp?.secondaryText?.toString?.() ?? "";
                      return (
                        <button
                          key={i}
                          onClick={() => choose(s)}
                          className="w-full text-left px-4 py-3 hover:bg-[color:var(--beige)]/60 transition-colors border-b last:border-b-0 border-border"
                        >
                          <div className="flex items-start gap-2">
                            <MapPin className="size-4 mt-0.5 text-[color:var(--forest)] shrink-0" />
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-[color:var(--coffee)] truncate">{main}</div>
                              {sec && <div className="text-xs text-muted-foreground truncate">{sec}</div>}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute z-10 bottom-4 left-4 flex gap-2">
              <button
                onClick={() => setSatellite((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[color:var(--coffee)] shadow-lg ring-1 ring-black/5 hover:bg-white"
                title="Alternar vista satelital"
              >
                <Satellite className="size-4" />
                {satellite ? "Vista mapa" : "Vista satelital"}
              </button>
              <button
                onClick={locateMe}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[color:var(--coffee)] shadow-lg ring-1 ring-black/5 hover:bg-white"
                title="Usar mi ubicación"
              >
                <Locate className="size-4" />
                Mi ubicación
              </button>
            </div>

            <div ref={mapDivRef} className="w-full h-[460px] sm:h-[560px]" />
            {!ready && !error && (
              <div className="absolute inset-0 grid place-items-center bg-[color:var(--beige)]/80 text-[color:var(--coffee)] text-sm">
                Cargando mapa interactivo…
              </div>
            )}
            {error && (
              <div className="absolute inset-0 grid place-items-center bg-[color:var(--beige)]/90 text-[color:var(--coffee)] text-sm px-6 text-center">
                {error}
              </div>
            )}
          </div>

          {/* Side panel */}
          <aside className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-xl font-bold text-[color:var(--coffee)]">
              {selected ? "Ubicación seleccionada" : "Selecciona una ubicación"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {selected
                ? "Captura este punto como cliente o ábrelo en Google Earth para una vista 3D."
                : "Busca una dirección en el mapa para ver detalles aquí."}
            </p>

            {selected && (
              <div className="mt-5 rounded-2xl bg-[color:var(--beige)]/60 p-4 border border-border">
                <div className="flex items-start gap-2">
                  <MapPin className="size-5 text-[color:var(--forest)] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-[color:var(--coffee)] truncate">{selected.name}</div>
                    <div className="text-xs text-muted-foreground break-words">{selected.address}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                      {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappCapture}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <MessageCircle className="size-4" />
                {selected ? "Capturar como cliente" : "Hablar con un asesor"}
              </a>
              <a
                href={earthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--forest)]/30 px-5 py-3 text-sm font-semibold text-[color:var(--forest)] hover:bg-[color:var(--forest)]/5 transition-colors"
              >
                <Globe2 className="size-4" />
                Abrir en Google Earth
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-[color:var(--coffee)] hover:bg-[color:var(--beige)]/60 transition-colors"
              >
                <MapPin className="size-4" />
                Abrir en Google Maps
              </a>
            </div>

            <p className="mt-5 text-[11px] text-muted-foreground leading-relaxed">
              Datos provistos por Google Maps Platform. Para guardar clientes en tu base de datos, activa Lovable Cloud y lo conectamos a un panel privado.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
