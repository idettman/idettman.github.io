/**
 * Sort ad impressions ASC
 */
const impressionIdsAscending = ads.sort((a, b) => {
    let aValue = (a.impression_id.length === 3) ? 1 + parseInt(a.impression_id.charAt(2)) : 1;
    let bValue = (b.impression_id.length === 3) ? 1 + parseInt(b.impression_id.charAt(2)) : 1;
    return aValue - bValue;
});