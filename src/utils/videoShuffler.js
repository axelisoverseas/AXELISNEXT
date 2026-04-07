// Global video shuffle coordinator to ensure different orders across sections

class VideoShuffleCoordinator {
  constructor() {
    this.usedFirstThreeOrders = new Set();
    this.sessionId = `session-${Date.now()}-${Math.random()}`;
  }

  // Generate a hash from an array of first 3 items
  getFirstThreeHash(array) {
    if (array.length < 3) {
      return array
        .filter(item => item && item.id)
        .map(item => item.id)
        .join('-');
    }
    return array
      .slice(0, 3)
      .filter(item => item && item.id)
      .map(item => item.id)
      .join('-');
  }

  // Shuffle array with seed
  shuffleWithSeed(array, baseSeed) {
    // Filter out any undefined or invalid items
    const validItems = array.filter(item => item && item.id);
    const shuffled = [...validItems];
    let hash = 0;
    
    // Create hash from seed
    for (let i = 0; i < baseSeed.length; i++) {
      const char = baseSeed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use seeded random for consistent shuffle
    const random = () => {
      hash = (hash * 9301 + 49297) % 233280;
      return hash / 233280;
    };
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  // Get a unique shuffle for a section
  getUniqueShuffleForSection(array, sectionName, maxAttempts = 50) {
    // Validate input array
    if (!Array.isArray(array) || array.length === 0) {
      console.warn(`Invalid array provided to shuffle for section: ${sectionName}`);
      return [];
    }

    let attempts = 0;
    let shuffled;
    let firstThreeHash;

    do {
      const seed = `${this.sessionId}-${sectionName}-${attempts}-${Date.now()}`;
      shuffled = this.shuffleWithSeed(array, seed);
      firstThreeHash = this.getFirstThreeHash(shuffled);
      attempts++;
    } while (
      this.usedFirstThreeOrders.has(firstThreeHash) &&
      attempts < maxAttempts &&
      firstThreeHash.length > 0 // Ensure we have a valid hash
    );

    // Store this order to prevent reuse (only if valid)
    if (firstThreeHash.length > 0) {
      this.usedFirstThreeOrders.add(firstThreeHash);
    }

    console.log(`${sectionName} shuffle - Attempt ${attempts}, First 3: ${firstThreeHash}`);

    // Final cleanup: ensure no undefined items in the result
    const cleanedShuffled = shuffled.filter(item => item && item.id);
    return cleanedShuffled;
  }

  // Reset coordinator (useful for testing or manual refresh)
  reset() {
    this.usedFirstThreeOrders.clear();
    this.sessionId = `session-${Date.now()}-${Math.random()}`;
  }

  // Get debug info
  getDebugInfo() {
    return {
      sessionId: this.sessionId,
      usedOrders: Array.from(this.usedFirstThreeOrders),
      totalUsedOrders: this.usedFirstThreeOrders.size
    };
  }
}

// Create a singleton instance
const shuffleCoordinator = new VideoShuffleCoordinator();

// Export functions for components to use
export const getUniqueVideoShuffle = (videos, sectionName) => {
  // Validate input
  if (!Array.isArray(videos) || videos.length === 0) {
    console.warn(`Invalid videos array for section: ${sectionName}`);
    return [];
  }

  // Filter out any invalid items before shuffling
  const validVideos = videos.filter(video => video && video.id && typeof video === 'object');

  if (validVideos.length === 0) {
    console.warn(`No valid videos found for section: ${sectionName}`);
    return [];
  }

  if (validVideos.length !== videos.length) {
    console.warn(`Filtered out ${videos.length - validVideos.length} invalid videos from ${sectionName}`);
  }

  return shuffleCoordinator.getUniqueShuffleForSection(validVideos, sectionName);
};

// Simple fallback shuffle function
export const simpleVideoShuffle = (videos) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    return [];
  }

  const validVideos = videos.filter(video => video && video.id && typeof video === 'object');
  const shuffled = [...validVideos];

  // Simple Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const resetShuffleCoordinator = () => {
  shuffleCoordinator.reset();
};

export const getShuffleDebugInfo = () => {
  return shuffleCoordinator.getDebugInfo();
};

// Export for direct access if needed
export default shuffleCoordinator;
