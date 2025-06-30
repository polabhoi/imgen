import React, { useState } from 'react';
import { Wand2, Download, RefreshCw, Shuffle, Loader2 } from 'lucide-react';
import { generateImage } from '../services/clipdropApi';
import { getRandomPrompt } from '../utils/prompts';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: number;
}

const STYLES = [
  { value: 'realistic', label: 'Realistic' },
  { value: '3d-render', label: '3D Render' },
  { value: 'anime', label: 'Anime' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'oil-painting', label: 'Oil Painting' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your image');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageBlob = await generateImage(prompt, selectedStyle);
      const imageUrl = URL.createObjectURL(imageBlob);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        style: selectedStyle,
        timestamp: Date.now(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError('Failed to generate image. Please check your API key and try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setPrompt(randomPrompt);
  };

  const handleRegenerate = async (originalPrompt: string, originalStyle: string) => {
    setPrompt(originalPrompt);
    setSelectedStyle(originalStyle);
    
    setIsGenerating(true);
    setError(null);

    try {
      const imageBlob = await generateImage(originalPrompt, originalStyle);
      const imageUrl = URL.createObjectURL(imageBlob);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: originalPrompt,
        style: originalStyle,
        timestamp: Date.now(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError('Failed to regenerate image. Please try again.');
      console.error('Image regeneration error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-generated-${prompt.slice(0, 20).replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Input Section */}
      <div className="glass-strong rounded-2xl p-8 mb-8 neon-blue">
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="block text-white font-medium mb-3">
              Describe your image
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create... Be specific and creative!"
              className="w-full p-4 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300 resize-none"
              rows={3}
            />
          </div>

          {/* Style Selection */}
          <div>
            <label className="block text-white font-medium mb-3">
              Art Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full p-4 bg-black/20 border border-white/20 rounded-xl text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
            >
              {STYLES.map((style) => (
                <option key={style.value} value={style.value} className="bg-gray-900">
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold py-4 px-6 rounded-xl hover:from-neon-blue/80 hover:to-neon-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </button>

            <button
              onClick={handleSurpriseMe}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-white/20"
            >
              <Shuffle className="w-5 h-5" />
              Surprise Me
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Generated Images Grid */}
      {generatedImages.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Your Generated Images
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((image, index) => (
              <div
                key={image.id}
                className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleDownload(image.url, image.prompt)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleRegenerate(image.prompt, image.style)}
                      disabled={isGenerating}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-white text-sm font-medium mb-2">
                    {image.prompt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="capitalize">{image.style.replace('-', ' ')}</span>
                    <span>{new Date(image.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="loading-shimmer h-64 rounded-xl mb-4"></div>
          <p className="text-white font-medium">
            Creating your masterpiece... This may take a few moments.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;