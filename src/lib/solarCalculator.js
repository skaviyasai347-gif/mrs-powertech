// Rooftop Solar Calculator
// Input: Monthly Electricity Units (NOT EB Bill)
// Rule:
// 300–450 units  -> 3 kW
// 451–600 units  -> 4 kW
// 601–750 units  -> 5 kW
// Every additional 150 units -> +1 kW

const AVG_TARIFF_PER_UNIT = {
  Residential: 7,
  Commercial: 9.5,
  Industrial: 8.5
}

const SUN_HOURS_PER_DAY = 4.5

const COST_PER_KW = {
  Residential: 55000,
  Commercial: 48000,
  Industrial: 45000
}

const CO2_PER_UNIT_KG = 0.82
const DEGRADATION_ANNUAL = 0.006

function subsidyForSize(kw, connectionType) {
  if (connectionType !== "Residential") return 0

  if (kw <= 1) return 30000
  if (kw <= 2) return 60000

  return 78000
}

// Custom sizing rule
function calculateSystemSize(monthlyUnits) {
  if (monthlyUnits <= 0) return 1

  if (monthlyUnits < 300) {
    // Approximation for lower usage
    return Math.max(1, Math.ceil(monthlyUnits / 150))
  }

  if (monthlyUnits <= 450) {
    return 3
  }

  return 3 + Math.ceil((monthlyUnits - 450) / 150)
}

export function calculateSolarPlan({ monthlyUnits, connectionType }) {
  const tariff =
    AVG_TARIFF_PER_UNIT[connectionType] ||
    AVG_TARIFF_PER_UNIT.Residential

  // Determine system size from units
  const systemSizeKw = calculateSystemSize(monthlyUnits)

  const costPerKw =
    COST_PER_KW[connectionType] ||
    COST_PER_KW.Residential

  const estimatedCost = Math.round(systemSizeKw * costPerKw)

  const subsidy = subsidyForSize(systemSizeKw, connectionType)

  const netCost = Math.max(0, estimatedCost - subsidy)

  const yearlyUnitsGenerated = Math.round(
    systemSizeKw * SUN_HOURS_PER_DAY * 365
  )

  const yearlySavings = Math.round(
    yearlyUnitsGenerated * tariff
  )

  const paybackYears =
    yearlySavings > 0
      ? Math.round((netCost / yearlySavings) * 10) / 10
      : null

  let cumulative = 0
  let currentOutput = yearlyUnitsGenerated

  for (let y = 0; y < 25; y++) {
    cumulative += currentOutput * tariff
    currentOutput *= 1 - DEGRADATION_ANNUAL
  }

  const twentyFiveYearSavings = Math.round(
    cumulative - netCost
  )

  const co2ReductionTonnesPerYear = Math.round(
    (yearlyUnitsGenerated * CO2_PER_UNIT_KG) / 1000
  )

  return {
    monthlyUnits,
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