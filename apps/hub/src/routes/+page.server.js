const businessDatabase = {
  bms: {
    name: "Tobias Beard",
    company: "Bearded Man Services",
    specialties: "Maintenance • Landscaping • Moving",
    phone: "470-453-8358",
    email: "Beardtobias@gmail.com",
    website: "bms.movingwithclarity.com",
    logo: "/images/brand/logo.png",
    arAssets: [
      { id: 'pavilion', name: 'The Belle Meade Pavilion', glb: '/models/cedar_pergola.glb', usdz: '/models/cedar_pergola.usdz', desc: 'Premium rough-sawn Western Red Cedar with matte black steel joinery.' },
      { id: 'stonework', name: 'Artisan Flagstone Hearth', glb: '/models/stone_firepit.glb', usdz: '/models/stone_firepit.usdz', desc: 'Hand-dressed Tennessee fieldstone with geometric radial pathways.' }
    ],
    projects: [
      { title: "White-Glove Relocation", img: "/images/portfolio/moving_service.jpg", desc: "Seamless asset transport, secure packing, and premium residential relocation services." },
      { title: "Custom Pergolas & Gazebos", img: "/images/portfolio/pergola_bar.jpg", desc: "Architectural cedar frameworks and outdoor pavilions equipped with custom stone masonry build-outs." },
      { title: "Artisan Pathways & Stonework", img: "/images/portfolio/stone_walkway.jpg", desc: "Curved stepping-stone paths laid into custom gravel borders with clean edging." },
      { title: "Geometric Stone Carpeting", img: "/images/portfolio/geometric_garden.jpg", desc: "High-contrast multi-colored stone layouts styled in sharp star patterns centered around focal trees." },
      { title: "Elite Landscape Maintenance", img: "/images/portfolio/garden_deck.jpg", desc: "Organic dark mulching beds, deck perimeter garden detailing, and custom evergreen hedging." },
      { title: "Deck Restoration & Carpentry", img: "/images/portfolio/deck_treatment.jpg", desc: "Deep fiber pressure treatments, precise wood restoration, and ultra-durable premium weather staining." }
    ]
  }
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const tenantSlug = locals.tenant;

  if (!tenantSlug || !businessDatabase[tenantSlug]) {
    return { isHubHomepage: true };
  }

  return {
    isHubHomepage: false,
    business: businessDatabase[tenantSlug]
  };
}
