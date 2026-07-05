export const COMPANY = {
  name: 'MRS Powertech',
  tagline: 'Empowering Life with Solar',
  address: 'No.105 Prithivipakkam Main Road, Ambattur, Chennai - 53',
  addressNote: 'Opposite LIC Zonal Office',
  phones: ['9382233599', '9444404005'],
  email: 'mrspowertech2026@gmail.com',
  mapEmbed:
    'https://www.google.com/maps?q=No.105+Prithivipakkam+Main+Road+Ambattur+Chennai+53&output=embed'
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'Calculator', path: '/calculator' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' }
]

export const SERVICES = [
  { title: 'Residential Solar', desc: 'Rooftop systems designed for everyday homes, sized to your family\u2019s usage and roof.' },
  { title: 'Commercial Solar', desc: 'Reduce operating costs for offices, retail and hospitality with tailored solar arrays.' },
  { title: 'Industrial Solar', desc: 'High-capacity installations engineered for factories and manufacturing units.' },
  { title: 'Solar Panels', desc: 'Tier-1 monocrystalline and polycrystalline panels built for Chennai\u2019s climate.' },
  { title: 'Solar Inverters', desc: 'On-grid, off-grid and hybrid inverters matched to your consumption pattern.' },
  { title: 'Solar Installation', desc: 'End-to-end installation by certified technicians, completed on schedule.' },
  { title: 'Maintenance', desc: 'Scheduled cleaning, performance checks and rapid-response repairs.' },
  { title: 'Consultation', desc: 'Free site assessment and system design consultation before you commit.' },
  { title: 'Government Subsidy Assistance', desc: 'Complete paperwork support for the Pradhan Mantri Surya Ghar Yojana subsidy.' }
]

export const WHY_CHOOSE_US = [
  'Certified Installation', 'Premium Quality Products', 'Government Subsidy Guidance',
  'Affordable Pricing', 'Expert Team', 'Fast Installation',
  'After Sales Support', 'Warranty', 'Trusted Service'
]

export const WHY_GO_SOLAR = [
  { title: 'Save Electricity Bills', desc: 'Cut your monthly EB bill dramatically by generating your own power.' },
  { title: 'Increase Property Value', desc: 'Solar-equipped homes command a premium in resale value.' },
  { title: 'Environment Friendly', desc: 'Every unit generated displaces coal-based grid power.' },
  { title: 'Low Maintenance', desc: 'Modern systems need only periodic cleaning and inspection.' },
  { title: 'Government Subsidy', desc: 'Avail up to \u20b978,000 subsidy under Surya Ghar Yojana.' },
  { title: '25+ Years Lifespan', desc: 'Premium panels are warrantied for a quarter century of service.' },
  { title: 'Energy Independence', desc: 'Insulate your household or business from tariff hikes.' }
]

export const STATS = [
  { label: 'Projects Completed', value: 450, suffix: '+' },
  { label: 'Happy Customers', value: 400, suffix: '+' },
  { label: 'Units Generated', value: 12, suffix: 'M+' },
  { label: 'CO\u2082 Saved (tonnes)', value: 9500, suffix: '+' }
]

export const SUBSIDY_SLABS = [
  { capacity: '1 kW', subsidy: 30000 },
  { capacity: '2 kW', subsidy: 60000 },
  { capacity: '3 kW & above', subsidy: 78000 }
]

export const FALLBACK_PRODUCTS = [
  {
    id: 'p1', name: 'MonoPro 550W Solar Panel', category: 'Solar Panels', brand: 'MRS MonoPro',
    price: 18500, availability: true, image: null,
    description: 'High-efficiency monocrystalline panel engineered for maximum yield in limited roof space.',
    features: ['550W output', '21.5% efficiency', '25-year performance warranty', 'PID resistant']
  },
  {
    id: 'p2', name: 'HybridWave 5kW Inverter', category: 'Inverters', brand: 'MRS HybridWave', price: 62000, availability: true, image: null,
    description: 'Hybrid inverter supporting grid-tied and battery backup operation with app monitoring.',
    features: ['5kW continuous', 'MPPT dual tracker', 'Wi-Fi monitoring', '10-year warranty']
  },
  {
    id: 'p3', name: 'PowerCell Lithium Battery 5kWh', category: 'Batteries', brand: 'MRS PowerCell', price: 145000, availability: true, image: null,
    description: 'LiFePO4 battery bank for reliable backup during grid outages.',
    features: ['5kWh capacity', '6000+ cycles', 'Built-in BMS', 'Wall-mountable']
  },
  {
    id: 'p4', name: 'Mounting Structure Kit', category: 'Accessories', brand: 'MRS Structures', price: 9500, availability: true, image: null,
    description: 'Corrosion-resistant galvanized mounting structure for rooftop installations.',
    features: ['Hot-dip galvanized', 'Wind load tested', 'Custom tilt angles']
  }
]

export const FALLBACK_PROJECTS = [
  {
    id: 'pr1', title: 'Ambattur Residence Rooftop', location: 'Ambattur, Chennai', capacity: '5 kW',
    completion_date: '2025-11-10', description: 'A family home rooftop installation cutting the monthly EB bill by 85%.', cover_image: null
  },
  {
    id: 'pr2', title: 'Porur Textile Unit', location: 'Porur, Chennai', capacity: '80 kW',
    completion_date: '2025-08-22', description: 'Industrial-scale rooftop array powering daytime manufacturing load.', cover_image: null
  },
  {
    id: 'pr3', title: 'Anna Nagar Retail Showroom', location: 'Anna Nagar, Chennai', capacity: '15 kW',
    completion_date: '2025-05-02', description: 'Commercial installation reducing operational overhead for a retail chain.', cover_image: null
  }
]

export const FALLBACK_REVIEWS = [
  { id: 'r1', name: 'Karthik Raman', rating: 5, text: 'MRS Powertech handled everything from subsidy paperwork to installation. Bill dropped within the first month.' },
  { id: 'r2', name: 'Divya Suresh', rating: 5, text: 'Professional team, clean installation, and they explained the whole Surya Ghar Yojana process clearly.' },
  { id: 'r3', name: 'Anand Kumar', rating: 5, text: 'Excellent after-sales support. Any query is answered within the day.' },
  { id: 'r4', name: 'Priya Venkatesh', rating: 4, text: 'Good quality panels and fair pricing compared to other quotes we received.' }
]
