
/**
 * Enhanced Jaccard similarity implementation for text comparison
 */
export const calculateJaccardSimilarity = (text1: string, text2: string): number => {
  // Tokenize text into n-grams (3-grams)
  const getNGrams = (text: string, n: number) => {
    const tokens = text.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const ngrams = new Set<string>();
    
    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.add(tokens.slice(i, i + n).join(' '));
    }
    
    return ngrams;
  };
  
  const ngrams1 = getNGrams(text1, 3);
  const ngrams2 = getNGrams(text2, 3);
  
  const intersection = new Set([...ngrams1].filter(ngram => ngrams2.has(ngram)));
  const union = new Set([...ngrams1, ...ngrams2]);
  
  if (union.size === 0) return 0;
  
  // Calculate and return similarity percentage
  const similarity = intersection.size / union.size;
  return Math.min(Math.round(similarity * 100), 92); // Cap at 92% as requested
};
