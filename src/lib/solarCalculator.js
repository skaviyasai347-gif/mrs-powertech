// Reasonable, transparent estimation model for a rooftop solar calculator.
// Figures are indicative averages for Tamil Nadu / Chennai and should be
// treated as estimates only — final sizing requires a site survey.

const AVG_TARIFF_PER_UNIT = { Residential: 7, Commercial: 9.5, Industrial: 8.5 } // ₹ per kWh (blended slab average)
const SUN_HOURS_PER_DAY = 4.5 // effective peak sun hours in Chennai
const COST_PER_KW = { Residential: 55000, Commercial: 48000, Industrial: 45000 } // ₹ per kW installed (all-in)
const CO2_PER_UNIT_KG = 0.82 // kg CO2 avoided per unit of grid electricity displaced
const DEGRADATION_ANNUAL = 0.006 // ~0.6% output degradation per year

function subsidyForSize(kw, connectionType) {
  if (connectionType !== 'Residential') return 0
  if (kw <= 1) return 30000
  if (kw <= 2) return 60000
  return 78000 // 3kW and above capped subsidy under Surya Ghar Yojana
}

export function calculateSolarPlan({ monthlyBill, connectionType }) {
  const tariff = AVG_TARIFF_PER_UNIT[connectionType] || AVG_TARIFF_PER_UNIT.Residential
  const monthlyUnits = monthlyBill / tariff
  const dailyUnits = monthlyUnits / 30

  const rawSystemSize = dailyUnits / SUN_HOURS_PER_DAY
  const systemSizeKw = Math.max(1, Math.round(rawSystemSize * 10) / 10)

  const costPerKw = COST_PER_KW[connectionType] || COST_PER_KW.Residential
  const estimatedCost = Math.round(systemSizeKw * costPerKw)

  const subsidy = subsidyForSize(systemSizeKw, connectionType)
  const netCost = Math.max(0, estimatedCost - subsidy)

  const yearlyUnitsGenerated = Math.round(systemSizeKw * SUN_HOURS_PER_DAY * 365)
  const yearlySavings = Math.round(yearlyUnitsGenerated * tariff)

  const paybackYears = yearlySavings > 0 ? Math.round((netCost / yearlySavings) * 10) / 10 : null

  let cumulative = 0
  let currentOutput = yearlyUnitsGenerated
  for (let y = 0; y < 25; y++) {
    cumulative += currentOutput * tariff
    currentOutput *= 1 - DEGRADATION_ANNUAL
  }
  const twentyFiveYearSavings = Math.round(cumulative - netCost)

  const co2ReductionTonnesPerYear = Math.round((yearlyUnitsGenerated * CO2_PER_UNIT_KG) / 1000)

  return {
    monthlyUnits: Math.round(monthlyUnits),
    systemSizeKw,
    estimatedCost,
    subsidy,
    netCost,
    yearlySavings,
    paybackYears,
    twentyFiveYearSavings,
    co2ReductionTonnesPerYear
  }
}
