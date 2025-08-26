export function getVariations(variations: Record<string, any>[] | undefined) {
  if (!variations) return {};

  return variations.reduce((acc, variation) => {
    const key = variation.attribute?.slug;
    if (key) {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(variation);
    }
    return acc;
  }, {} as Record<string, any[]>);
}
