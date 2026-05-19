/**
 * Custom hook for unit status calculations
 * Provides functions to determine unit status based on water parameter ranges
 */

export function useUnitStatus() {
  // Calculate unit status based on latest waarde and ranges
  const getUnitStatus = (unit) => {
    let status = "Active";
    
    if (!unit.latestWaarde) {
      status = "Malfunction";
    } else if (unit.waarden_range) {
      const waarde = unit.latestWaarde;
      const range = Array.isArray(unit.waarden_range) ? unit.waarden_range[0] : unit.waarden_range;
      
      if (range) {
        const isInRange = 
          (!waarde.ph || (waarde.ph >= range.ph_min && waarde.ph <= range.ph_max)) &&
          (!waarde.temperatuur || (waarde.temperatuur >= range.temperatuur_min && waarde.temperatuur <= range.temperatuur_max)) &&
          (!waarde.water_level || (waarde.water_level >= range.water_level_min && waarde.water_level <= range.water_level_max)) &&
          (!waarde.zoutgehalte || (waarde.zoutgehalte >= range.zoutgehalte_min && waarde.zoutgehalte <= range.zoutgehalte_max)) &&
          (!waarde.microbiologie || (waarde.microbiologie <= range.microbiologie_max));
        
        if (!isInRange) {
          status = "Maintenance";
        }
      }
    }
    
    return status;
  };

  // Helper function to check if a value is in range
  const isValueInRange = (value, min, max) => {
    if (value === null || value === undefined) return true;
    return value >= min && value <= max;
  };

  // Helper function to check if a value exceeds max
  const isValueExceedsMax = (value, max) => {
    if (value === null || value === undefined) return false;
    return value > max;
  };

  return {
    getUnitStatus,
    isValueInRange,
    isValueExceedsMax,
  };
}
