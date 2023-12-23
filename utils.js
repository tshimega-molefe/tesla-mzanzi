// lerp(a,b,t)=a+t⋅(b−a)

function lerp(A, B, t) {
  // Linearly interpolates between values A and B at percentage 't' along the range.
  return A + (B - A) * t;
}

// Calculate the intersection of two line segments
function getIntersection(A, B, C, D) {
  // Numerator for the t parameter of the intersection point
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);

  // Numerator for the u parameter of the intersection point
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);

  // Denominator for both t and u parameters
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  // Check if the line segments are not parallel
  if (bottom !== 0) {
    // Calculate t and u parameters
    const t = tTop / bottom;
    const u = uTop / bottom;

    // Check if the intersection point is within both line segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      // Calculate the coordinates of the intersection point using linear interpolation
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }

  // Return null if there is no intersection
  return null;
}
