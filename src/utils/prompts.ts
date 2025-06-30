const RANDOM_PROMPTS = [
  "A majestic dragon soaring through cloudy skies with golden sunlight",
  "A futuristic cityscape at sunset with flying cars and neon lights",
  "A peaceful forest clearing with magical glowing mushrooms",
  "An underwater palace with coral gardens and swimming dolphins",
  "A steampunk airship floating above Victorian London",
  "A cozy library with floating books and warm candlelight",
  "A cyberpunk street scene with holographic advertisements",
  "A mountain peak covered in snow with aurora borealis dancing overhead",
  "A vintage coffee shop on a rainy day with warm lighting",
  "A space station orbiting a colorful nebula",
  "A medieval castle on a cliff overlooking the ocean",
  "A robot gardener tending to a futuristic greenhouse",
  "A magical potion shop with glowing bottles and mystical artifacts",
  "A desert oasis with palm trees and crystal clear water",
  "A lighthouse standing tall during a dramatic storm",
  "A floating island with waterfalls cascading into the clouds",
  "A cozy cabin in the woods with smoke rising from the chimney",
  "A bustling alien marketplace on a distant planet",
  "A crystal cave with bioluminescent plants and underground lakes",
  "A vintage train station with steam engines and travelers",
];

export const getRandomPrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * RANDOM_PROMPTS.length);
  return RANDOM_PROMPTS[randomIndex];
};