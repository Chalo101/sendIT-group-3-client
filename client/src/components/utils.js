export function haversineDistance(coords1, coords2) {
    const toRad = (x) => (x * Math.PI) / 180;
  
    const lat1 = coords1[1];
    const lon1 = coords1[0];
    const lat2 = coords2[1];
    const lon2 = coords2[0];
  
    const R = 6371; // Radius of the Earth in km
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
  
    return d; // Distance in km
  }
  


  //Base price: $5
// Weight: $1 per kg
// Distance: $0.50 per km