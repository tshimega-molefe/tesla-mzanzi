// lerp(a,b,t)=a+t⋅(b−a)

function lerp(A, B, t) {
  // Linearly interpolates between values A and B at percentage 't' along the range.
  return A + (B - A) * t;
}
